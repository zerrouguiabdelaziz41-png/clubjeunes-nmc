import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default Supabase Project URL provided by the user
export const DEFAULT_SUPABASE_URL = 'https://geniskumuwdedhckkexn.supabase.co';

/**
 * Get current configured Supabase URL
 */
export function getSupabaseUrl(): string {
  const metaEnvUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : '';
  const processEnvUrl = typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : '';
  const envUrl = ((metaEnvUrl || processEnvUrl || '') as string).trim();
  if (envUrl && envUrl.length > 5) {
    return envUrl;
  }
  return DEFAULT_SUPABASE_URL;
}

/**
 * Check if the provided key is a dummy placeholder rather than a real key
 */
export function isPlaceholderKey(key: string): boolean {
  if (!key) return true;
  const lower = key.trim().toLowerCase();
  return (
    lower.length < 15 ||
    lower.includes('ضع_المفتاح') ||
    lower.includes('your_anon') ||
    lower.includes('your_publishable') ||
    lower.includes('your_key') ||
    lower.includes('placeholder') ||
    lower.includes('...') ||
    lower === 'null' ||
    lower === 'undefined'
  );
}

/**
 * Check if the key is a privileged secret key that must never be exposed to the browser
 */
export function isSecretKey(key: string): boolean {
  const lower = key.trim().toLowerCase();
  return (
    lower.includes('service_role') ||
    lower.includes('service-role') ||
    lower.startsWith('sb_sec_') ||
    lower.startsWith('sb_secret_') ||
    lower.startsWith('sbs_')
  );
}

/**
 * Get current Publishable / Anon Key
 * Fully supports modern sb_publishable_ keys and classic anon JWT keys (eyJ...)
 * Note: We never expose or accept service_role keys here.
 */
export function getSupabaseAnonKey(): string {
  // Check Vite environment variable and Node process.env across all standard aliases
  const metaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : ({} as any);
  const procEnv = typeof process !== 'undefined' && process.env ? process.env : ({} as any);

  const envKey = (
    metaEnv.VITE_SUPABASE_ANON_KEY ||
    metaEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
    metaEnv.VITE_SUPABASE_KEY ||
    procEnv.VITE_SUPABASE_ANON_KEY ||
    procEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
    procEnv.VITE_SUPABASE_KEY ||
    ''
  ).trim();

  if (envKey && !isPlaceholderKey(envKey)) {
    return envKey;
  }

  // Check localStorage for runtime testing in browser
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      const storedKey = (
        window.localStorage.getItem('supabase_anon_key') ||
        window.localStorage.getItem('supabase_publishable_key') ||
        ''
      ).trim();
      if (storedKey && !isPlaceholderKey(storedKey)) {
        return storedKey;
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  return '';
}

/**
 * Save custom anon / publishable key to localStorage for immediate testing without dev server restart
 */
export function setLocalSupabaseAnonKey(key: string): void {
  if (typeof window !== 'undefined') {
    try {
      if (!key) {
        window.localStorage.removeItem('supabase_anon_key');
        window.localStorage.removeItem('supabase_publishable_key');
      } else {
        window.localStorage.setItem('supabase_anon_key', key.trim());
        window.localStorage.setItem('supabase_publishable_key', key.trim());
      }
    } catch {
      // Ignore
    }
  }
}

/**
 * Create or reuse the Supabase client instance
 */
let cachedClient: SupabaseClient | null = null;
let cachedKeyUsed = '';

export function getSupabaseClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!anonKey || isPlaceholderKey(anonKey)) {
    return null;
  }

  if (cachedClient && cachedKeyUsed === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    cachedKeyUsed = anonKey;
    return cachedClient;
  } catch (error) {
    console.warn('[Supabase] Failed to initialize client:', error);
    return null;
  }
}

/**
 * Safe proxy export of the supabase client.
 * Calls won't throw uncaught exceptions if the key isn't provided yet.
 */
export const supabase = getSupabaseClient();

/**
 * Connection diagnosis result
 */
export interface ConnectionTestResult {
  success: boolean;
  code: 'OK' | 'MISSING_KEY' | 'INVALID_KEY' | 'NETWORK_ERROR' | 'SECURITY_WARNING';
  message: string;
  url: string;
  latencyMs?: number;
  details?: string;
  hasEnvKey: boolean;
  hasLocalKey: boolean;
  keyType?: 'sb_publishable' | 'classic_anon_jwt' | 'custom';
  tablesDiscovered?: string[];
}

/**
 * Test connectivity with Supabase project using the configured or provided key
 * Accepts both modern sb_publishable_ keys and classic anon JWT keys
 */
export async function testSupabaseConnection(overrideKey?: string): Promise<ConnectionTestResult> {
  const url = getSupabaseUrl();
  const rawKey = overrideKey !== undefined ? overrideKey : getSupabaseAnonKey();
  const testKey = (rawKey || '').trim();

  const metaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : ({} as any);
  const procEnv = typeof process !== 'undefined' && process.env ? process.env : ({} as any);
  const hasEnvKey = Boolean(
    metaEnv.VITE_SUPABASE_ANON_KEY ||
    metaEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
    procEnv.VITE_SUPABASE_ANON_KEY ||
    procEnv.VITE_SUPABASE_PUBLISHABLE_KEY
  );
  const hasLocalKey =
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
      ? Boolean(window.localStorage.getItem('supabase_anon_key'))
      : false;

  // 1. Check if key is provided and not a placeholder
  if (!testKey || isPlaceholderKey(testKey)) {
    return {
      success: false,
      code: 'MISSING_KEY',
      url,
      hasEnvKey,
      hasLocalKey,
      message: 'لم يتم إدخال المفتاح العام (Publishable / Anon Key) حتى الآن.',
      details: 'يرجى وضع المفتاح العام (الذي يبدأ بـ sb_publishable_ أو eyJ...) في ملف .env.local أو لصقه في النافذة.',
    };
  }

  // 2. Security Check: Block secret keys to protect the database!
  if (isSecretKey(testKey)) {
    return {
      success: false,
      code: 'SECURITY_WARNING',
      url,
      hasEnvKey,
      hasLocalKey,
      message: 'تحذير أمني: يمنع استخدام المفتاح السري (service_role / sb_secret_) في الواجهة الأمامية!',
      details: 'استخدم فقط المفتاح العام (sb_publishable_ أو anon) المتوفر في Supabase > Project Settings > API.',
    };
  }

  const keyType: 'sb_publishable' | 'classic_anon_jwt' | 'custom' = testKey.startsWith('sb_publishable_') || testKey.startsWith('sbp_')
    ? 'sb_publishable'
    : testKey.startsWith('eyJ')
    ? 'classic_anon_jwt'
    : 'custom';

  // 3. Test Auth settings endpoint with latency measurement
  const startTime = performance.now();
  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      method: 'GET',
      headers: {
        apikey: testKey,
      },
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (res.status === 401 || res.status === 403) {
      let realError = 'Invalid API key';
      let realHint = '';
      try {
        const errJson = await res.json();
        realError = errJson.message || errJson.error_description || realError;
        realHint = errJson.hint || '';
      } catch {
        // ignore json parse error
      }

      return {
        success: false,
        code: 'INVALID_KEY',
        url,
        keyType,
        latencyMs,
        hasEnvKey,
        hasLocalKey,
        message: `خادم Supabase رفض المفتاح: "${realError}"`,
        details: realHint ? `${realHint} (مشروع: ${url})` : `تأكد من نسخ المفتاح العام الكامل التابع لهذا المشروع: ${url}`,
      };
    }

    // Try checking accessible tables using the official SDK
    let tables: string[] = [];
    try {
      const restRes = await fetch(`${url}/rest/v1/`, {
        method: 'GET',
        headers: {
          apikey: testKey,
          ...(testKey.startsWith('eyJ') ? { Authorization: `Bearer ${testKey}` } : {}),
        },
      });
      if (restRes.ok) {
        const openApiData = await restRes.json();
        if (openApiData && openApiData.definitions) {
          tables = Object.keys(openApiData.definitions);
        }
      }
    } catch {
      // Non-critical if schema lookup fails
    }

    return {
      success: true,
      code: 'OK',
      url,
      keyType,
      latencyMs,
      hasEnvKey,
      hasLocalKey,
      message: 'تم الاتصال بقاعدة بيانات وخدمة Supabase Auth بنجاح! 🚀',
      details: `استجابة سريعة (${latencyMs}ms) – نوع المفتاح: ${keyType === 'sb_publishable' ? 'sb_publishable_ الحديث' : 'anon JWT'}`,
      tablesDiscovered: tables,
    };
  } catch (error: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      code: 'NETWORK_ERROR',
      url,
      latencyMs,
      hasEnvKey,
      hasLocalKey,
      message: `تعذر الاتصال بخوادم Supabase (${error?.message || 'Network error'})`,
      details: 'يرجى التحقق من اتصال الإنترنت وصلاحية رابط المشروع وعنوان CORS.',
    };
  }
}
