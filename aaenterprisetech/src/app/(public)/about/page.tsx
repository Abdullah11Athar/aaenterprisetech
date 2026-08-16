import Link from 'next/link';
import { ArrowLeft, Globe, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">About PayLancer</h1>
      <p className="text-slate-300 text-lg leading-relaxed">
        PayLancer Technologies LLC was founded with a single mission: to eliminate financial borders for global freelancers, agencies, and digital service providers.
      </p>

      <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Our Vision</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          We believe talent is distributed globally, but financial infrastructure has historically been fragmented. By combining Stripe Connect Express, Next.js, and Supabase RLS, we empower freelancers in emerging markets to bill global clients legally, securely, and seamlessly.
        </p>
      </div>

      <div className="text-xs text-slate-500 pt-8 border-t border-slate-800">
        Registered Office: PayLancer Technologies LLC, 160 Greentree Dr, Suite 101, Dover, DE 19904, USA.
      </div>
    </div>
  );
}
