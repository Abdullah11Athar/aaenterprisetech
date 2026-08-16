import { NextResponse } from 'next/server';
import { createWhopCompany, createWhopAccountLink } from '@/lib/whop';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const email = user?.email || 'merchant@example.com';
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // 1. Create Whop Merchant Store Company
    const company = await createWhopCompany({
      email,
      title: `Freelancer Store (${email.split('@')[0]})`,
      metadata: {
        internal_user_id: user?.id || 'usr_demo',
        platform: 'paylancer_saas',
      },
    });

    // 2. Generate Account Onboarding Link
    const accountLink = await createWhopAccountLink({
      companyId: company.id,
      returnUrl: `${origin}/settings?whop_onboarding=complete`,
      refreshUrl: `${origin}/settings?whop_onboarding=refresh`,
    });

    return NextResponse.json({
      companyId: company.id,
      onboardingUrl: accountLink.url,
    });
  } catch (error: any) {
    console.error('Whop Account Onboarding error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
