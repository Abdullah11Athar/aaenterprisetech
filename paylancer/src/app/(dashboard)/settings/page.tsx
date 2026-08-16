'use client';

import { useState } from 'react';
import { Settings, Shield, CreditCard, User, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [whopOnboardingUrl, setWhopOnboardingUrl] = useState('');
  const [loadingWhop, setLoadingWhop] = useState(false);

  const handleWhopOnboarding = async () => {
    setLoadingWhop(true);
    try {
      const res = await fetch('/api/whop/onboard', { method: 'POST' });
      const data = await res.json();
      if (data.onboardingUrl) {
        setWhopOnboardingUrl(data.onboardingUrl);
        window.open(data.onboardingUrl, '_blank');
      }
    } catch (err) {
      console.error('Error initiating Whop onboarding:', err);
    } finally {
      setLoadingWhop(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Account Settings & Payment Gateways</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your profile, Stripe Express connected account, and Whop Merchant Store onboarding.</p>
      </div>

      {/* Profile */}
      <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <User className="w-5 h-5 text-blue-400" /> Freelancer Profile
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input type="text" defaultValue="Syed Hamza" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Business Name</label>
            <input type="text" defaultValue="DevStudio Digital" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
          </div>
        </div>
      </div>

      {/* Whop Merchant Store Connection */}
      <div className="p-8 rounded-2xl glass-panel border border-orange-500/40 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <ShoppingCart className="w-5 h-5 text-orange-400" /> Whop Merchant Store Connection
        </h2>

        <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-between">
          <div>
            <div className="font-semibold text-orange-300 text-sm">Whop Account Links & Checkout Configurations</div>
            <div className="text-xs text-slate-400">Create a sub-company under parent organization & receive payments via Whop.</div>
          </div>
          <button
            onClick={handleWhopOnboarding}
            disabled={loadingWhop}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition-all shadow-md"
          >
            {loadingWhop ? 'Creating Company...' : 'Start Whop Onboarding'}
          </button>
        </div>

        {whopOnboardingUrl && (
          <div className="p-3 rounded-xl bg-slate-900 border border-orange-500/30 text-xs text-orange-200">
            Onboarding link generated: <a href={whopOnboardingUrl} target="_blank" rel="noreferrer" className="underline font-mono">{whopOnboardingUrl}</a>
          </div>
        )}
      </div>

      {/* Stripe Connect Express */}
      <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <CreditCard className="w-5 h-5 text-emerald-400" /> Stripe Connect Express Status
        </h2>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="font-semibold text-emerald-300 text-sm">Account Active & Connected</div>
            <div className="text-xs text-slate-400">ID: acct_1NtwB2LkdIwHu7ix • Card Payments & Transfers Enabled</div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200">
            Open Stripe Express Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
