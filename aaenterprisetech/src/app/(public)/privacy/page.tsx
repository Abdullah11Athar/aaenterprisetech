import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Phone, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 selection:bg-purple-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to AA Enterprise Tech Home
        </Link>

        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-[11px] font-bold text-purple-300">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>GDPR & CCPA Compliant Privacy Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Effective Date: August 16, 2026 | Last Updated: 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">1. Overview & Commitment</h2>
            <p>
              AA Enterprise Tech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal and business information when you visit our website (<Link href="https://aaenterprisetech.com" className="text-purple-400 underline">https://aaenterprisetech.com</Link>) or engage our digital, AI automation, website development, and branding services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We may collect information you provide directly to us through project inquiry forms, consultation requests, or invoice payments, including:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li><strong className="text-slate-200">Contact Information:</strong> Full name, business email address, phone number, and physical or business address.</li>
              <li><strong className="text-slate-200">Project Data:</strong> Business requirements, scope documents, technical specifications, and design assets.</li>
              <li><strong className="text-slate-200">Payment Information:</strong> Billing details for processing invoices securely via PCI-DSS compliant gateways (Stripe). We do not store raw card numbers on our servers.</li>
              <li><strong className="text-slate-200">Technical Analytics:</strong> Device type, browser user-agent, IP address, and anonymized website navigation telemetry.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">3. How We Use Your Information</h2>
            <p>We utilize the collected information strictly for legitimate commercial purposes:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li>Delivering bespoke website development, custom software engineering, and AI automation workflows.</li>
              <li>Communicating project milestones, scope adjustments, and technical support inquiries.</li>
              <li>Generating electronic invoices, quotes, and payment transaction receipts.</li>
              <li>Preventing unauthorized access, security anomalies, and fraudulent inquiries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">4. Data Security & Storage</h2>
            <p>
              We implement industry-standard 256-bit SSL encryption, restricted access controls, and zero-trust cloud infrastructure to protect all client intellectual property and sensitive datasets.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">5. Third-Party Service Providers</h2>
            <p>
              We may utilize trusted third-party cloud infrastructure providers (Vercel, Supabase, Stripe, Zoho Mail) strictly to facilitate operations. These entities are bound by confidentiality obligations and are prohibited from using your information for other purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">6. Your Rights (GDPR & CCPA)</h2>
            <p>
              Depending on your jurisdiction, you have the right to request access to, correction of, or permanent deletion of your personal data stored with AA Enterprise Tech. You may exercise these rights at any time by contacting our Privacy Office.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-white">7. Contact Information</h2>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-purple-400" /> AA Enterprise Tech | Missouri, USA & Worldwide Remote Services
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400" /> <a href="mailto:info@aaenterprisetech.com" className="text-purple-300 hover:underline">info@aaenterprisetech.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-purple-400" /> <a href="tel:+13148340021" className="text-purple-300 hover:underline">+1 (314) 834-0021</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
