import { Wallet, ArrowDownRight, CheckCircle2, Building2 } from 'lucide-react';

export default function PayoutsPage() {
  const payouts = [
    { id: 'po_101', bank: 'Meezan Bank Ltd (****3821)', amount: 2685.00, currency: 'USD', status: 'paid', arrival: '2026-07-29' },
    { id: 'po_102', bank: 'Meezan Bank Ltd (****3821)', amount: 1200.00, currency: 'USD', status: 'in_transit', arrival: '2026-07-31' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Payouts & Bank Transfers</h1>
        <p className="text-slate-400 text-sm mt-1">Automatic rolling settlements transferred directly to your connected bank account via Stripe Express.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Connected Payout Account</div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <Building2 className="w-6 h-6 text-blue-400" />
            <div>
              <div className="font-semibold text-white text-sm">Meezan Bank Limited</div>
              <div className="text-xs text-slate-400">Account ending in ****3821 (Stripe Express Connected)</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30">
          <div className="text-sm font-medium text-emerald-400 mb-2">Next Scheduled Payout</div>
          <div className="text-3xl font-extrabold text-emerald-300">$1,200.00 USD</div>
          <div className="text-xs text-slate-400 mt-2">Expected arrival: July 31, 2026</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4">Payout History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Payout ID</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Arrival Date</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-mono text-slate-400">{p.id}</td>
                  <td className="px-4 py-3 text-slate-200">{p.bank}</td>
                  <td className="px-4 py-3 font-bold text-white">${p.amount.toFixed(2)} {p.currency}</td>
                  <td className="px-4 py-3 text-slate-400">{p.arrival}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'
                    }`}>
                      {p.status.toUpperCase()}
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
