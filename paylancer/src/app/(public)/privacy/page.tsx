import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p>We collect identity verification metadata (CNIC/Passport copies for KYC), billing address, email address, and IP address for compliance and fraud detection purposes.</p>

        <h2 className="text-lg font-bold text-white">2. Financial Data Protection</h2>
        <p>PayLancer does not collect, store, or touch credit card numbers or CVVs. All payment transactions are securely tokenized and processed via Stripe Connect.</p>

        <h2 className="text-lg font-bold text-white">3. Data Retention & GDPR Compliance</h2>
        <p>Users have the right to access, rectify, or request deletion of personal data subject to mandatory financial audit retention laws.</p>
      </div>
    </div>
  );
}
