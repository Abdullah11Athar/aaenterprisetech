import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const payload = {
      to: ['info@aaenterprisetech.com', 'abdullah.jet444@gmail.com'],
      from: 'inquiries@aaenterprisetech.com',
      subject: `🚀 New Client Inquiry from ${name} - AA Enterprise Tech`,
      text: `New Client Inquiry Details:
------------------------------------
Full Name: ${name}
Email Address: ${email}
Project Details / Requirements:
${message}
------------------------------------
Received via https://aaenterprisetech.com`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #020617; color: #f8fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #9333ea, #6366f1); padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">🚀 New Client Inquiry Received</h2>
            <p style="color: #e2e8f0; margin: 4px 0 0 0; font-size: 13px;">AA Enterprise Tech Lead Notification</p>
          </div>
          
          <div style="background-color: #0f172a; border: 1px solid #334155; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #c084fc;">Client Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #818cf8;">Client Email:</strong> <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #a855f7;">Project Requirements:</strong></p>
            <div style="background-color: #020617; border-left: 3px solid #9333ea; padding: 12px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${message}</div>
          </div>
          
          <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
            Sent automatically to <strong>info@aaenterprisetech.com</strong> & <strong>abdullah.jet444@gmail.com</strong> from AA Enterprise Tech Contact Portal.
          </p>
        </div>
      `
    };

    // 1. Dispatch to Web3Forms (Guaranteed instant inbox delivery to both Zoho & Personal email)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '64d2d4d8-7cf4-49c0-9fae-6dc3d3b76cf6', // public contact key fallback
          name,
          email,
          message,
          subject: `🚀 New Client Lead: ${name} (${email}) - AA Enterprise Tech`,
          from_name: 'AA Enterprise Tech Website Lead',
          to_email: 'info@aaenterprisetech.com',
          cc_email: 'abdullah.jet444@gmail.com'
        })
      });
    } catch (e) {
      console.error('Web3Forms dispatch error:', e);
    }

    // 2. Dispatch via FormSubmit.co
    try {
      await fetch('https://formsubmit.co/ajax/info@aaenterprisetech.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Client Lead: ${name} - AA Enterprise Tech`,
          _cc: 'abdullah.jet444@gmail.com',
          _template: 'table'
        })
      });
    } catch (e) {
      console.error('FormSubmit dispatch error:', e);
    }

    // 3. If Resend API Key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Resend dispatch error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry successfully received and routed to AA Enterprise Tech team.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or email info@aaenterprisetech.com directly.' },
      { status: 500 }
    );
  }
}
