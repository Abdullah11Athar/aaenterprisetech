import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createStripeExpressAccount, generateAccountOnboardingLink } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Stripe account already exists
    const { data: existingAccount } = await supabase
      .from('stripe_accounts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    let accountId = existingAccount?.stripe_account_id;

    if (!accountId) {
      // Create new Stripe Express account
      const stripeAccount = await createStripeExpressAccount(user.email!);
      accountId = stripeAccount.id;

      // Save to database
      await supabase.from('stripe_accounts').insert({
        user_id: user.id,
        stripe_account_id: accountId,
        account_type: 'express',
        status: 'pending_onboarding',
      });
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const returnUrl = `${origin}/settings?stripe=success`;
    const refreshUrl = `${origin}/settings?stripe=refresh`;

    const accountLink = await generateAccountOnboardingLink(accountId, returnUrl, refreshUrl);

    return NextResponse.json({ url: accountLink.url });
  } catch (error: any) {
    console.error('Stripe Connect onboarding error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
