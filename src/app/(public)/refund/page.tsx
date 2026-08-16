import Link from 'next/link';
import { ArrowLeft, RefreshCw, Mail, Phone, Globe } from 'lucide-react';

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
            <span>Client Satisfaction & Refund Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-400">Effective Date: August 16, 2026 | Last Updated: 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">1. Service Quality Guarantee</h2>
            <p>
              At AA Enterprise Tech, we pride ourselves on exceptional craftsmanship, rapid turnaround, and open communication. We conduct milestone reviews at each phase of development to ensure complete alignment with your expectations before project finalization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">2. Project Cancellation Prior to Commencement</h2>
            <p>
              If a project is cancelled by the client before any design, code, or architecture work has begun, a full refund minus applicable payment processing fees will be issued within 5–7 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">3. In-Progress Milestones</h2>
            <p>
              Once project discovery, custom UI/UX design, or software coding has commenced, refunds are prorated based on completed milestones and deliverables handed over to the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">4. Post-Delivery Support & Revisions</h2>
            <p>
              Every custom website and AI automation deployment includes a complimentary 14-day warranty period for bug fixes, performance fine-tuning, and operational testing to ensure 100% satisfaction.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-white">5. Contact Billing Support</h2>
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
