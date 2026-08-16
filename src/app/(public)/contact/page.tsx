import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
      <p className="text-slate-300 text-lg leading-relaxed">
        Need assistance with your account, Stripe Connect onboarding, or compliance questions?
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-blue-400">
            <Mail className="w-5 h-5" />
            <span className="font-bold text-white">Email Support</span>
          </div>
          <p className="text-sm text-slate-400">support@paylancer.com</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <Phone className="w-5 h-5" />
            <span className="font-bold text-white">Phone</span>
          </div>
          <p className="text-sm text-slate-400">+1 (800) 555-PAYL</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
        <div className="flex items-center gap-3 text-indigo-400 mb-2">
          <MapPin className="w-5 h-5" />
          <span className="font-bold text-white">Registered Address</span>
        </div>
        <p className="text-sm text-slate-400">PayLancer Technologies LLC</p>
        <p className="text-sm text-slate-400">160 Greentree Dr, Suite 101, Dover, DE 19904, USA</p>
      </div>
    </div>
  );
}
