import { NextResponse } from 'next/server';
import { createWhopCheckoutLink } from '@/lib/whop';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', title, description, invoiceId, linkId } = body;

    if (!amount || !title) {
      return NextResponse.json({ error: 'Missing required parameters: amount and title' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const redirectUrl = invoiceId ? `${origin}/pay/${invoiceId}?whop=success` : `${origin}/dashboard`;

    const whopCheckout = await createWhopCheckoutLink({
      amount: parseFloat(amount),
      currency,
      title,
      description,
      metadata: { invoiceId, linkId },
      redirectUrl,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: whopCheckout.purchase_url,
      checkoutId: whopCheckout.id,
    });
  } catch (error: any) {
    console.error('Whop Checkout API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
