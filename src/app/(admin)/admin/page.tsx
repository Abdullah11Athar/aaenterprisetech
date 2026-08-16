'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, DollarSign, ShieldAlert, CheckCircle, XCircle, Settings, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  const [kycQueue, setKycQueue] = useState([
    { id: 'usr-901', name: 'Zeeshan Ali', country: 'Pakistan', cnic: '35202-*****-1', submitted: '2026-07-30' },
    { id: 'usr-902', name: 'Fatima Noor', country: 'Pakistan', cnic: '42101-*****-4', submitted: '2026-07-29' },
  ]);

  const [platformFeeRate, setPlatformFeeRate] = useState(1.0);
  const [showFeeConfig, setShowFeeConfig] = useState(false);

  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    setKycQueue(kycQueue.filter((user) => user.id !== id));
    alert(`User ${id} has been ${decision}!`);
  };

  const adminStats = {
    totalFreelancers: 1420,
    totalVolumeProcessed: 4850000.00,
    platformFeeEarned: 48500.00,
    pendingKYC: kycQueue.length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Super Admin Console
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Platform Administration</h1>
          </div>
          <button
            onClick={() => setShowFeeConfig(!showFeeConfig)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Platform Fee Config ({platformFeeRate}%)
          </button>
        </div>

        {/* Fee Config Panel */}
        {showFeeConfig && (
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 space-y-3 max-w-md">
            <h3 className="text-sm font-bold text-white">Configurable Platform Fee</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={platformFeeRate}
                onChange={(e) => setPlatformFeeRate(parseFloat(e.target.value) || 0)}
                className="w-28 px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-sm border border-slate-800 text-center"
              />
              <span className="text-xs text-slate-400">% Platform fee rate per transaction</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="text-sm font-medium text-slate-400 mb-2">Total Volume Processed</div>
            <div className="text-3xl font-extrabold text-white">${adminStats.totalVolumeProcessed.toLocaleString()}</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-purple-500/30">
            <div className="text-sm font-medium text-purple-400 mb-2">Platform Revenue ({platformFeeRate}%)</div>
            <div className="text-3xl font-extrabold text-purple-300">${(adminStats.totalVolumeProcessed * (platformFeeRate / 100)).toLocaleString()}</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="text-sm font-medium text-slate-400 mb-2">Active Freelancers</div>
            <div className="text-3xl font-extrabold text-white">{adminStats.totalFreelancers}</div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/30">
            <div className="text-sm font-medium text-amber-400 mb-2">Pending KYC Reviews</div>
            <div className="text-3xl font-extrabold text-amber-300">{adminStats.pendingKYC}</div>
          </div>
        </div>

        {/* KYC Verification Queue */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" /> Pending KYC Approvals
          </h2>

          {kycQueue.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No pending KYC reviews in the queue! All freelancers approved.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">Freelancer Name</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Tax / Identity ID</th>
                    <th className="px-4 py-3">Submitted Date</th>
                    <th className="px-4 py-3 text-right">Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {kycQueue.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-mono text-slate-400">{user.id}</td>
                      <td className="px-4 py-3 font-semibold text-white">{user.name}</td>
                      <td className="px-4 py-3 text-slate-300">{user.country}</td>
                      <td className="px-4 py-3 text-slate-300">{user.cnic}</td>
                      <td className="px-4 py-3 text-slate-400">{user.submitted}</td>
                      <td className="px-4 py-3 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleDecision(user.id, 'approved')}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleDecision(user.id, 'rejected')}
                          className="px-3 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold flex items-center gap-1 border border-red-500/20"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
