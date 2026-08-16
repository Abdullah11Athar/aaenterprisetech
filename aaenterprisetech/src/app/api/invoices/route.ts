import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('*, invoice_items(*)')
      .eq('freelancer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ invoices });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      client_name,
      client_email,
      client_company,
      currency = 'USD',
      due_date,
      items,
      notes,
      tax_rate = 0,
      discount_amount = 0,
    } = body;

    // Calculate subtotal
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.quantity * item.unit_price), 0);
    const tax_amount = (subtotal * tax_rate) / 100;
    const total_amount = subtotal + tax_amount - discount_amount;
    const platform_fee_amount = total_amount * 0.01; // 1%
    const freelancer_net_amount = total_amount - platform_fee_amount;

    // Generate unique invoice number (e.g. INV-2026-0001)
    const invoice_number = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number,
        freelancer_id: user.id,
        client_name,
        client_email,
        client_company,
        currency,
        subtotal,
        tax_rate,
        tax_amount,
        discount_amount,
        total_amount,
        platform_fee_rate: 1.00,
        platform_fee_amount,
        freelancer_net_amount,
        due_date,
        notes,
        status: 'issued',
      })
      .select()
      .single();

    if (error) throw error;

    // Insert itemized rows
    const formattedItems = items.map((item: any) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.quantity * item.unit_price,
    }));

    await supabase.from('invoice_items').insert(formattedItems);

    return NextResponse.json({ invoice, success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
