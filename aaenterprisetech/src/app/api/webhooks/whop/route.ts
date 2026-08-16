import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, data } = body;

    console.log('Whop Webhook event received:', action);

    if (action === 'payment.succeeded') {
      const metadata = data?.metadata || {};
      const invoiceId = metadata.invoiceId;

      if (invoiceId) {
        const supabase = createServerSupabaseClient();
        await supabase
          .from('invoices')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
          })
          .eq('id', invoiceId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Whop webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
