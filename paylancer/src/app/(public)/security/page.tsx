import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Server } from 'lucide-react';

export default function SecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Security Policy & Infrastructure</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <div className="flex items-center gap-3 text-blue-400">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">PCI-DSS SAQ A Compliance</h2>
          </div>
          <p className="text-slate-400">
            PayLancer never directly handles, transmits, or stores primary account numbers (PAN) or credit card security codes. All card inputs are securely handled by Stripe Level 1 PCI-DSS compliant elements.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <div className="flex items-center gap-3 text-emerald-400">
            <Server className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Row Level Security (RLS) & Encryption</h2>
          </div>
          <p className="text-slate-400">
            All database tables enforce Supabase PostgreSQL Row Level Security (RLS) policies. Data in transit is encrypted using TLS 1.3, and data at rest is secured via AES-256 encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
