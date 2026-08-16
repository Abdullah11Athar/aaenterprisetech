import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: any;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // Webhook Idempotency Check
  const { data: existingEvent } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('event_id', event.id)
    .single();

  if (existingEvent) {
    return NextResponse.json({ received: true, idempotent: true });
  }

  // Record incoming event
  await supabase.from('webhook_events').insert({
    event_id: event.id,
    event_type: event.type,
    payload: event,
    processed: false,
  });

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const invoiceId = session.payment_intent_data?.metadata?.invoiceId;

        if (invoiceId) {
          // Mark invoice as paid
          await supabase
            .from('invoices')
            .update({
              status: 'paid',
              paid_at: new Date().toISOString(),
            })
            .eq('id', invoiceId);

          // Get invoice details
          const { data: invoice } = await supabase
            .from('invoices')
            .select('*')
            .eq('id', invoiceId)
            .single();

          if (invoice) {
            // Record payment ledger
            await supabase.from('payments').insert({
              invoice_id: invoice.id,
              freelancer_id: invoice.freelancer_id,
              stripe_payment_intent_id: session.payment_intent as string,
              amount: invoice.total_amount,
              currency: invoice.currency,
              status: 'succeeded',
              platform_fee_deducted: invoice.platform_fee_amount,
              net_payout_amount: invoice.freelancer_net_amount,
            });

            // Create notification for freelancer
            await supabase.from('notifications').insert({
              user_id: invoice.freelancer_id,
              title: 'Payment Received! 🎉',
              message: `Client ${invoice.client_name} paid invoice #${invoice.invoice_number} ($${invoice.total_amount.toFixed(2)}).`,
              type: 'success',
            });
          }
        }
        break;
      }

      case 'account.updated': {
        const account = event.data.object;
        await supabase
          .from('stripe_accounts')
          .update({
            details_submitted: account.details_submitted,
            charges_enabled: account.charges_enabled,
            payouts_enabled: account.payouts_enabled,
            status: account.charges_enabled ? 'active' : 'pending_onboarding',
          })
          .eq('stripe_account_id', account.id);
        break;
      }
    }

    // Mark event as processed
    await supabase
      .from('webhook_events')
      .update({ processed: true })
      .eq('event_id', event.id);

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    await supabase
      .from('webhook_events')
      .update({ processing_error: error.message })
      .eq('event_id', event.id);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
