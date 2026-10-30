import { getSupabaseClient } from '../lib/supabase.ts';
import { MemberData } from '../components/MembershipCardModal.tsx';

export type UserRole = 'member' | 'organizer' | 'admin';

export interface ClubRoleProfile {
  id: string;
  role: UserRole;
  roleLabel: string;
  name: string;
  email: string;
  phone: string;
  membershipNumber: string;
  avatar: string;
  city: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'pending' | 'expired';
}

export interface SignUpMemberParams {
  email: string;
  password?: string;
  fullName: string;
  phone: string;
  age: number;
  interest?: string;
  motivation?: string;
  avatar?: string;
  city?: string;
}

export interface SignUpMemberResult {
  success: boolean;
  user?: any;
  userId?: string;
  session?: any;
  needsEmailConfirmation?: boolean;
  error?: string;
  errorCode?: string;
  arabicMessage: string;
}

function translateSupabaseAuthError(errMessage: string, status?: number): string {
  const msg = (errMessage || '').toLowerCase();

  if (msg.includes('user already registered') || msg.includes('user_already_exists') || msg.includes('already exists')) {
    return 'هذا البريد الإلكتروني مسجل مسبقاً في النادي. إذا كنت مسجلاً من قبل يمكنك تسجيل الدخول أو استخدام بريد آخر.';
  }
  if (msg.includes('password should be at least') || msg.includes('weak_password')) {
    return 'كلمة المرور ضعيفة. يجب أن تتكون من 6 أحرف أو أرقام على الأقل.';
  }
  if (msg.includes('signup requires a valid password') || msg.includes('missing password')) {
    return 'يرجى إدخال كلمة مرور صالحة (6 خانات على الأقل) لإنشاء حساب العضوية.';
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) {
    return 'صيغة البريد الإلكتروني غير صالحة. يرجى إدخال عنوان بريد إلكتروني صحيح.';
  }
  if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit')) {
    return 'تم تجاوز الحد الأقصى لمحاولات التسجيل مؤقتاً. يرجى الانتظار بضع دقائق والمحاولة مجدداً.';
  }
  if (msg.includes('signups not allowed') || msg.includes('signup_disabled')) {
    return 'التسجيل الذاتي مغلق حالياً في إعدادات Supabase Auth (Signups are disabled).';
  }
  if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('cors')) {
    return `تعذر الاتصال بخوادم Supabase (${errMessage}). يرجى التحقق من اتصال الإنترنت وصلاحية رابط المشروع.`;
  }
  if (msg.includes('invalid api key') || msg.includes('jwt') || msg.includes('api key')) {
    return `مفتاح Supabase غير معتمد من الخادم ("${errMessage}"). يرجى التأكد من نسخ المفتاح العام الكامل (الذي يبدأ بـ sb_publishable_ أو eyJ...) من لوحة تحكم Supabase > Project Settings > API.`;
  }

  return `حدث خطأ أثناء الاتصال بـ Supabase: "${errMessage}"`;
}

/**
 * Service for interacting with Supabase tables without altering schemas or RLS
 */
export const SupabaseClubService = {
  /**
   * Search member by membership number (used in VerificationPage and QR Code scanner)
   */
  async verifyMember(membershipNumber: string): Promise<{
    found: boolean;
    member?: MemberData;
    source: 'supabase' | 'local';
    error?: string;
  }> {
    const client = getSupabaseClient();
    const cleanNumber = (membershipNumber || '').trim();
    if (!client || !cleanNumber) return { found: false, source: 'local', error: 'تعذر الاتصال بقاعدة البيانات.' };

    // The current profiles schema uses the authenticated user UUID as its stable identifier.
    // Do not query a non-existent demo `members` table or accept hard-coded sample members.
    const { data, error } = await client
      .from('profiles')
      .select('id,membership_number,full_name,phone,role,membership_status,created_at')
      .or(`membership_number.eq.${cleanNumber},id.eq.${cleanNumber}`)
      .maybeSingle();

    if (error) return { found: false, source: 'supabase', error: error.message };
    if (!data || data.membership_status !== 'approved') return { found: false, source: 'supabase' };

    const role = (['member', 'organizer', 'admin'].includes(data.role) ? data.role : 'member') as UserRole;
    return {
      found: true,
      source: 'supabase',
      member: {
        id: data.id,
        membershipNumber: data.membership_number || data.id,
        name: data.full_name || 'عضو معتمد',
        role,
        roleLabel: role === 'admin' ? 'مدير الموقع' : role === 'organizer' ? 'مشرف نشاط' : 'عضو',
        age: 0,
        phone: data.phone || '',
        email: '',
        city: '',
        avatar: '',
        issueDate: data.created_at?.slice(0, 10).replace(/-/g, '/') || '',
        expiryDate: '',
        status: 'active',
      },
    };
  },

  /**
   * Register a new member using Supabase Authentication
   * Passes full name, motivation, and details in raw_user_meta_data for handle_new_user trigger
   */
  async signUpClubMember(params: SignUpMemberParams): Promise<SignUpMemberResult> {
    const client = getSupabaseClient();
    if (!client) {
      return {
        success: false,
        errorCode: 'MISSING_SUPABASE_KEY',
        arabicMessage: 'لم يتم العثور على المفتاح العام لـ Supabase (VITE_SUPABASE_ANON_KEY أو VITE_SUPABASE_PUBLISHABLE_KEY). يرجى وضع المفتاح العام (الذي يبدأ بـ sb_publishable_ أو eyJ...) في ملف .env.local أو في نافذة إعدادات Supabase.',
      };
    }

    const cleanEmail = (params.email || '').trim().toLowerCase();
    const cleanPassword = (params.password || '').trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return {
        success: false,
        errorCode: 'INVALID_EMAIL',
        arabicMessage: 'يرجى إدخال بريد إلكتروني صالح (مثال: user@example.com).',
      };
    }

    if (cleanPassword.length < 6) {
      return {
        success: false,
        errorCode: 'WEAK_PASSWORD',
        arabicMessage: 'يجب أن تتكون كلمة المرور من 6 خانات أو أحرف على الأقل لحماية حسابك.',
      };
    }

    try {
      // Strictly prevent any Base64 strings or binary data from bloating the Auth request payload
      // Supabase Auth enforces a 1MB max body limit
      const rawAvatar = typeof params.avatar === 'string' ? params.avatar.trim() : '';
      const safeAvatar = rawAvatar.startsWith('data:') ? '' : rawAvatar;

      const { data, error } = await client.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
          data: {
            full_name: params.fullName.trim(),
            name: params.fullName.trim(),
            phone: params.phone.trim(),
            age: params.age,
            interest: params.interest || 'technological',
            motivation: (params.motivation || '').trim(),
            bio: (params.motivation || '').trim(),
            city: params.city || 'سوق أهراس، الجزائر',
            avatar: safeAvatar,
            role: 'member' as UserRole, // دور العضو
            role_label: 'عضو جديد',
            status: 'pending', // حالة طلب الانضمام المعلق للمراجعة
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
          errorCode: error.code || 'AUTH_ERROR',
          arabicMessage: translateSupabaseAuthError(error.message, error.status),
        };
      }

      if (!data || !data.user) {
        return {
          success: false,
          errorCode: 'NO_USER_RETURNED',
          arabicMessage: 'تعذر استلام بيانات المستخدم من Supabase Auth، يرجى المحاولة مرة أخرى.',
        };
      }

      const needsEmailConfirmation = !data.session;

      // Note: per requirement 5, we do NOT execute a secondary manual insert into 'members'
      // because database trigger 'handle_new_user' automatically provisions the member record from raw_user_meta_data!

      return {
        success: true,
        user: data.user,
        userId: data.user.id,
        session: data.session,
        needsEmailConfirmation,
        arabicMessage: needsEmailConfirmation
          ? 'تم إنشاء الحساب بنجاح! تم إرسال رابط تأكيد إلى بريدك الإلكتروني، وطلبك قيد المراجعة لدى إدارة النادي.'
          : 'تم تسجيل حسابك بنجاح! طلب الانضمام معلّق حالياً وهو قيد المراجعة والاعتماد من قبل إدارة النادي.',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
        errorCode: 'NETWORK_OR_CLIENT_ERROR',
        arabicMessage: translateSupabaseAuthError(err.message || 'Network error'),
      };
    }
  },

  /**
   * Upload user photo separately to Supabase Storage after account creation
   * Uses an isolated, secure path scoped to the user ID: avatars/{userId}/avatar-{timestamp}.{ext}
   */
  async uploadUserAvatar(userId: string, file: File): Promise<{
    success: boolean;
    publicUrl?: string;
    error?: string;
  }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: false, error: 'عميل Supabase غير مهيأ' };
    }

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
      const filePath = `${userId}/avatar-${Date.now()}.${cleanExt}`;

      const { data, error } = await client.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn('[SupabaseClubService] Storage upload notice:', error.message);
        return { success: false, error: error.message };
      }

      const { data: urlData } = client.storage.from('avatars').getPublicUrl(filePath);
      return {
        success: true,
        publicUrl: urlData?.publicUrl,
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'تعذر رفع الصورة إلى التخزين' };
    }
  },

  /**
   * Save a newly registered member into Supabase (if table exists and permitted)
   */
  async registerMember(_member: MemberData): Promise<{
    success: boolean;
    savedToSupabase: boolean;
    error?: string;
  }> {
    // Account creation and profile provisioning are handled by Supabase Auth +
    // the database trigger. The current schema has no public.members table.
    return {
      success: false,
      savedToSupabase: false,
      error: 'يتم حفظ الحساب عبر Supabase Auth وملف profiles؛ لا يوجد جدول members في المخطط الحالي.',
    };
  },

  /**
   * Fetch club stats for Admin / Organizer dashboards
   */
  async getDashboardStats(): Promise<{
    totalMembers: number;
    activeActivities: number;
    pendingRequests: number;
    source: 'supabase' | 'demo';
  }> {
    const client = getSupabaseClient();
    if (!client) return { totalMembers: 0, activeActivities: 0, pendingRequests: 0, source: 'demo' };

    const [members, activities, requests] = await Promise.all([
      client.from('profiles').select('*', { count: 'exact', head: true }).eq('membership_status', 'approved'),
      client.from('activities').select('*', { count: 'exact', head: true }).eq('published', true),
      client.from('membership_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);
    if (members.error || activities.error || requests.error) {
      console.warn('[SupabaseClubService] Dashboard count query failed:', members.error || activities.error || requests.error);
      return { totalMembers: 0, activeActivities: 0, pendingRequests: 0, source: 'demo' };
    }
    return {
      totalMembers: members.count || 0,
      activeActivities: activities.count || 0,
      pendingRequests: requests.count || 0,
      source: 'supabase',
    };
  },
};
