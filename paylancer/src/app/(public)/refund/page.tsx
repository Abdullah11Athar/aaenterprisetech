import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Refund Policy</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Service Refunds</h2>
        <p>Because PayLancer processes payments for freelance services rendered by independent contractors, refund requests are governed by the contract terms between the freelancer and client.</p>

        <h2 className="text-lg font-bold text-white">2. Merchant Initiated Refunds</h2>
        <p>Freelancers can issue full or partial refunds directly from their dashboard via Stripe Connect prior to payout settlement.</p>
      </div>
    </div>
  );
}
