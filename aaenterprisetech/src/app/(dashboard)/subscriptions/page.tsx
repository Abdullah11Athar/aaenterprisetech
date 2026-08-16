'use client';

import { useState } from 'react';
import { RefreshCw, Plus, CheckCircle2, DollarSign, Calendar, Sparkles } from 'lucide-react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 'sub_101', client: 'Acme Corp USA', plan: 'Monthly Software Maintenance', amount: 300.00, billingCycle: 'Monthly', status: 'active', nextBilling: '2026-08-28' },
    { id: 'sub_102', client: 'DesignStudio London', plan: 'UI/UX Design Retainer', amount: 1200.00, billingCycle: 'Monthly', status: 'active', nextBilling: '2026-08-15' },
  ]);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recurring Subscriptions</h1>
          <p className="text-slate-400 text-sm mt-1">Automated recurring billing for retainers, monthly maintenance, and subscription plans.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25">
          <Plus className="w-4 h-4" /> Create Subscription Plan
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Monthly Recurring Revenue (MRR)</div>
          <div className="text-3xl font-extrabold text-white">$1,500.00</div>
          <div className="text-xs text-emerald-400 mt-2">Active automated retainers</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Active Subscribers</div>
          <div className="text-3xl font-extrabold text-white">2 Clients</div>
          <div className="text-xs text-slate-400 mt-2">100% automated collection</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30">
          <div className="text-sm font-medium text-emerald-400 mb-2">Platform Fee (1% MRR)</div>
          <div className="text-3xl font-extrabold text-emerald-300">$15.00 / mo</div>
          <div className="text-xs text-slate-400 mt-2">Automated fee deduction</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4">Active Subscription Contracts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Subscription ID</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Plan Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Cycle</th>
                <th className="px-4 py-3">Next Renewal</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-mono text-slate-400">{sub.id}</td>
                  <td className="px-4 py-3 font-semibold text-white">{sub.client}</td>
                  <td className="px-4 py-3 text-slate-300">{sub.plan}</td>
                  <td className="px-4 py-3 font-bold text-white">${sub.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-400">{sub.billingCycle}</td>
                  <td className="px-4 py-3 text-slate-400">{sub.nextBilling}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
