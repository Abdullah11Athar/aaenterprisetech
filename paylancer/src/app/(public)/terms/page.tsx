import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Platform Services & Marketplace Model</h2>
        <p>PayLancer operates as a marketplace platform allowing verified freelancers to issue invoices and accept card payments from clients using Stripe Connect Express.</p>

        <h2 className="text-lg font-bold text-white">2. Platform Fee & Deductions</h2>
        <p>A flat 1% platform fee (or agreed custom rate) is automatically deducted from gross transaction amounts upon successful payment processing.</p>

        <h2 className="text-lg font-bold text-white">3. KYC Requirements</h2>
        <p>All freelancers must complete identity verification (KYC) prior to receiving automated payouts into their bank accounts.</p>
      </div>
    </div>
  );
}
