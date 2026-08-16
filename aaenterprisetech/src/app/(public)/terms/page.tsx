import Link from 'next/link';
import { ArrowLeft, Scale, Mail, Phone, Globe } from 'lucide-react';

export default function TermsOfServicePage() {
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
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>Commercial Terms & Service Level Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-400">Effective Date: August 16, 2026 | Last Updated: 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the services of AA Enterprise Tech (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), including website development, AI workflow automation, custom software development, and graphic design, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">2. Scope of Work & Deliverables</h2>
            <p>
              All professional engagements are executed according to a mutually agreed project proposal or statement of work (SOW). Any features, adjustments, or revisions outside the initial agreed scope may be subject to additional estimates and timeline extensions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">3. Client Intellectual Property Rights</h2>
            <p>
              Upon receipt of full payment for completed projects, all custom source code, design assets, and workflows created specifically for the client transfer to the client, excluding pre-existing frameworks, open-source libraries, or proprietary agency utility tooling.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">4. Payment Terms & Billing</h2>
            <p>
              Unless otherwise specified, projects require a 50% upfront deposit to commence work, with the remaining 50% due upon final project sign-off and deployment. Invoices are payable via our secure online portal (Visa, Mastercard, AMEX, Apple Pay, Google Pay).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">5. Limitation of Liability</h2>
            <p>
              AA Enterprise Tech shall not be liable for indirect, incidental, special, or consequential damages resulting from third-party hosting outages, third-party API rate limits (e.g. OpenAI/Claude), or unauthorized modifications made by external parties after project handover.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-white">6. Inquiries & Legal Notice</h2>
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
