'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, CheckCircle2, AlertCircle, DollarSign, Wallet, FileText, CreditCard, Copy, Check } from 'lucide-react';

export default function FreelancerDashboard() {
  const [stripeStatus, setStripeStatus] = useState('active'); // 'pending_onboarding' | 'active'
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mockUser = {
    name: 'Syed Hamza',
    kycStatus: 'approved',
    balanceAvailable: 3450.00,
    pendingPayout: 1200.00,
    totalEarned: 18450.00,
  };

  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-9481', client: 'Acme Corp USA', amount: 1500.00, status: 'paid', date: '2026-07-28', token: 'demo_token_1' },
    { id: 'INV-2026-8812', client: 'DesignStudio London', amount: 1200.00, status: 'issued', date: '2026-07-29', token: 'demo_token_2' },
    { id: 'INV-2026-7734', client: 'TechStart Berlin', amount: 750.00, status: 'paid', date: '2026-07-25', token: 'demo_token_3' },
  ]);

  const copyPaymentLink = (token: string, id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    navigator.clipboard.writeText(`${origin}/pay/${token}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStartStripeOnboarding = async () => {
    try {
      const res = await fetch('/api/connect/onboard', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        alert('Initiating Stripe Connect Express onboarding...');
      }
    } catch (err) {
      alert('Initiating Stripe Connect Express onboarding...');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">P</span>
            PayLancer
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-medium">Freelancer Workspace</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            KYC Verified
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-sm font-semibold text-blue-300">
            SH
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Welcome Header & Quick Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {mockUser.name} 👋</h1>
            <p className="text-slate-400 mt-1">Here is an overview of your international earnings and invoice activity.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/invoices"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Invoice
            </Link>
          </div>
        </div>

        {/* Status Banners */}
        {stripeStatus === 'active' ? (
          <div className="p-4 rounded-xl glass-panel border border-emerald-500/30 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-sm font-semibold text-white">Stripe Connect Account Active</span>
                <p className="text-xs text-slate-400">Ready to accept credit cards & automatic payouts directly to your account.</p>
              </div>
            </div>
            <button onClick={() => setStripeStatus('pending_onboarding')} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20">
              Active
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl glass-panel border border-amber-500/30 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-sm font-semibold text-white">Stripe Express Onboarding Required</span>
                <p className="text-xs text-slate-400">Complete setup to enable international client checkout and automatic payouts.</p>
              </div>
            </div>
            <button onClick={handleStartStripeOnboarding} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all">
              Complete Onboarding
            </button>
          </div>
        )}

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400">Available Balance</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">${mockUser.balanceAvailable.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-xs text-slate-400 mt-2">Ready for automated payout</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400">Pending Payouts</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">${mockUser.pendingPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-xs text-slate-400 mt-2">Processing via Stripe Connect</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400">Lifetime Earnings</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">${mockUser.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-xs text-emerald-400 mt-2">+18.5% from last month</div>
          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Recent Invoices
            </h2>
            <Link href="/invoices" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">View All →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Invoice ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-semibold text-white">{inv.id}</td>
                    <td className="px-4 py-3 text-slate-300">{inv.client}</td>
                    <td className="px-4 py-3 font-bold text-white">${inv.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{inv.date}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => copyPaymentLink(inv.token, inv.id)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                      >
                        {copiedId === inv.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === inv.id ? 'Copied!' : 'Copy Link'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
