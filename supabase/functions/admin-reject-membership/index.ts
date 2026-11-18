import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function collectUserFiles(
  admin: ReturnType<typeof createClient>,
  bucketId: string,
  userId: string,
  folder = userId,
  depth = 0,
  visited = new Set<string>(),
): Promise<string[]> {
  if (depth > 8 || visited.has(folder)) {
    throw new Error("storage_folder_depth_or_cycle");
  }
  visited.add(folder);

  const paths: string[] = [];
  const pageSize = 1000;

  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await admin.storage.from(bucketId).list(folder, {
      limit: pageSize,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) throw new Error("storage_list_failed");

    const entries = data ?? [];
    for (const entry of entries) {
      const fullPath = `${folder}/${entry.name}`;
      if (entry.id) {
        paths.push(fullPath);
      } else {
        paths.push(...await collectUserFiles(admin, bucketId, userId, fullPath, depth + 1, visited));
      }
    }

    if (entries.length < pageSize) break;
  }

  return paths;
}

async function removeUserFiles(admin: ReturnType<typeof createClient>, userId: string) {
  // Explicit allowlist: rejection may remove only the applicant's avatar folder.
  // Identity documents and all other buckets are intentionally excluded.
  const bucketId = "avatars";
  const { data: buckets, error: bucketsError } = await admin.storage.listBuckets();
  if (bucketsError) throw new Error("storage_bucket_list_failed");
  if (!(buckets ?? []).some((bucket) => bucket.id === bucketId)) return;

  const paths = await collectUserFiles(admin, bucketId, userId);
  for (let index = 0; index < paths.length; index += 1000) {
    const batch = paths.slice(index, index + 1000);
    const { error } = await admin.storage.from(bucketId).remove(batch);
    if (error) throw new Error("storage_remove_failed");
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const authorization = req.headers.get("Authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return json({ error: "unauthorized" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
    (() => {
      try {
        const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
        return keys.default as string | undefined;
      } catch {
        return undefined;
      }
    })();

  if (!supabaseUrl || !serviceKey) {
    return json({ error: "server_configuration_error" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: authData, error: authError } = await admin.auth.getUser(token);
  if (authError || !authData.user) return json({ error: "unauthorized" }, 401);
  const adminId = authData.user.id;

  let body: { requestId?: unknown; reason?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const requestId = body.requestId;
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";
  if (!isUuid(requestId) || reason.length < 3 || reason.length > 1000) {
    return json({ error: "invalid_request_or_reason" }, 400);
  }

  const { data: adminProfile, error: adminProfileError } = await admin
    .from("profiles")
    .select("role,membership_status")
    .eq("id", adminId)
    .maybeSingle();

  if (adminProfileError || adminProfile?.role !== "admin" || adminProfile?.membership_status !== "approved") {
    return json({ error: "forbidden" }, 403);
  }

  const { data: membershipRequest, error: requestError } = await admin
    .from("membership_requests")
    .select("id,user_id,status")
    .eq("id", requestId)
    .maybeSingle();

  if (requestError || !membershipRequest || membershipRequest.status !== "pending") {
    return json({ error: "pending_request_not_found" }, 404);
  }

  const targetUserId = membershipRequest.user_id;
  const { data: targetProfile, error: targetProfileError } = await admin
    .from("profiles")
    .select("id,role,membership_status")
    .eq("id", targetUserId)
    .maybeSingle();

  if (targetProfileError || !targetProfile || targetProfile.role !== "member" || targetProfile.membership_status !== "pending") {
    return json({ error: "not_a_new_pending_member" }, 409);
  }

  // This history table has NO ACTION foreign keys to auth.users.
  // Refuse deletion if the account has a previous membership-access history.
  const { count: userHistoryCount, error: userHistoryError } = await admin
    .from("membership_access_history")
    .select("id", { count: "exact", head: true })
    .eq("user_id", targetUserId);
  const { count: actorHistoryCount, error: actorHistoryError } = await admin
    .from("membership_access_history")
    .select("id", { count: "exact", head: true })
    .eq("performed_by", targetUserId);

  if (userHistoryError || actorHistoryError) return json({ error: "membership_history_check_failed" }, 500);
  if ((userHistoryCount ?? 0) > 0 || (actorHistoryCount ?? 0) > 0) {
    return json({ error: "account_has_existing_membership_history" }, 409);
  }

  const { data: auditId, error: auditError } = await admin.rpc("begin_membership_rejection_audit", {
    p_request_reference: requestId,
    p_performed_by: adminId,
    p_reason: reason,
  });
  if (auditError || !auditId) return json({ error: "audit_start_failed" }, 500);

  try {
    await removeUserFiles(admin, targetUserId);

    const { error: deleteError } = await admin.auth.admin.deleteUser(targetUserId);
    if (deleteError) throw new Error("auth_user_delete_failed");

    const { error: finishError } = await admin.rpc("finish_membership_rejection_audit", {
      p_audit_id: auditId,
      p_status: "completed",
    });
    if (finishError) {
      // The user has already been deleted. Leave the audit in processing state for manual reconciliation.
      return json({ error: "deleted_but_audit_finalize_failed", auditReference: auditId }, 500);
    }

    return json({ success: true, requestReference: requestId });
  } catch (error) {
    await admin.rpc("finish_membership_rejection_audit", {
      p_audit_id: auditId,
      p_status: "failed",
    });
    const code = error instanceof Error ? error.message : "rejection_failed";
    return json({ error: code }, 500);
  }
});
