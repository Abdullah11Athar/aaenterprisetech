import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Acceptable Use Policy</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Prohibited Businesses & Services</h2>
        <p>In accordance with Stripe terms of service, PayLancer may not be used to process payments for illegal activities, gambling, adult content, counterfeit goods, or unauthorized financial services.</p>

        <h2 className="text-lg font-bold text-white">2. Legitimate Freelance & Agency Services</h2>
        <p>Allowed categories include software engineering, UI/UX design, digital marketing, content writing, virtual assistance, and IT consultancy.</p>
      </div>
    </div>
  );
}
