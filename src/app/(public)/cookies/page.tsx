import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Cookie Policy</h1>
      <p className="text-xs text-slate-400">Last Updated: July 30, 2026</p>

      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Essential Cookies</h2>
        <p>We use essential HTTP-only authentication session cookies powered by Supabase Auth to maintain login state securely.</p>

        <h2 className="text-lg font-bold text-white">2. Analytics Cookies</h2>
        <p>PostHog and Google Analytics 4 cookies measure product usage metrics anonymously to improve dashboard performance.</p>
      </div>
    </div>
  );
}
