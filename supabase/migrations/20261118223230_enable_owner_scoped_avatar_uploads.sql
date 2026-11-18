-- Allow authenticated members to manage only their own avatar folder.
-- Admins retain moderation access to the whole public avatars bucket.
DROP POLICY IF EXISTS "Team managers can delete team photos" ON storage.objects;
DROP POLICY IF EXISTS "Team managers can update team photos" ON storage.objects;
DROP POLICY IF EXISTS "Team managers can upload team photos" ON storage.objects;

CREATE POLICY "Avatar owners and admins can read avatar objects"
ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'avatars'
  AND (
    (SELECT private.is_admin())
    OR (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = (SELECT auth.uid())
          AND p.membership_status IN ('pending', 'approved')
      )
    )
  )
);

CREATE POLICY "Avatar owners and admins can upload avatar objects"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND (
    (SELECT private.is_admin())
    OR (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = (SELECT auth.uid())
          AND p.membership_status IN ('pending', 'approved')
      )
    )
  )
);

CREATE POLICY "Avatar owners and admins can update avatar objects"
ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'avatars'
  AND (
    (SELECT private.is_admin())
    OR (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = (SELECT auth.uid())
          AND p.membership_status IN ('pending', 'approved')
      )
    )
  )
)
WITH CHECK (
  bucket_id = 'avatars'
  AND (
    (SELECT private.is_admin())
    OR (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = (SELECT auth.uid())
          AND p.membership_status IN ('pending', 'approved')
      )
    )
  )
);

CREATE POLICY "Avatar owners and admins can delete avatar objects"
ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'avatars'
  AND (
    (SELECT private.is_admin())
    OR (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = (SELECT auth.uid())
          AND p.membership_status IN ('pending', 'approved')
      )
    )
  )
);

UPDATE storage.buckets
SET file_size_limit = 2097152,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
WHERE id = 'avatars';
