import { ArrowLeftRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function TransactionsPage() {
  const transactions = [
    { id: 'txn_901', client: 'Acme Corp USA', gross: 1500.00, fee: 15.00, net: 1485.00, status: 'succeeded', date: '2026-07-28' },
    { id: 'txn_902', client: 'DesignStudio London', gross: 1200.00, fee: 12.00, net: 1188.00, status: 'succeeded', date: '2026-07-29' },
    { id: 'txn_903', client: 'TechStart Berlin', gross: 750.00, fee: 7.50, net: 742.50, status: 'succeeded', date: '2026-07-25' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Transactions Ledger</h1>
        <p className="text-slate-400 text-sm mt-1">Audit log of all gross payments, platform fee deductions (1%), and net proceeds.</p>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Gross Amount</th>
                <th className="px-4 py-3">Platform Fee (1%)</th>
                <th className="px-4 py-3">Net Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-mono text-slate-400">{t.id}</td>
                  <td className="px-4 py-3 font-semibold text-white">{t.client}</td>
                  <td className="px-4 py-3 text-white font-bold">${t.gross.toFixed(2)}</td>
                  <td className="px-4 py-3 text-blue-400 font-semibold">-${t.fee.toFixed(2)}</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">${t.net.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-400">{t.date}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Succeeded
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
