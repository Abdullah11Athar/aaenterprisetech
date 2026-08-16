import { Users, Mail, Plus, Building } from 'lucide-react';

export default function CustomersPage() {
  const customers = [
    { id: 'cus_1', name: 'Acme Corp USA', email: 'billing@acmecorp.com', company: 'Acme Inc', totalSpent: 4500.00 },
    { id: 'cus_2', name: 'DesignStudio London', email: 'finance@designstudio.uk', company: 'DesignStudio Ltd', totalSpent: 1200.00 },
    { id: 'cus_3', name: 'TechStart Berlin', email: 'accounting@techstart.de', company: 'TechStart GmbH', totalSpent: 750.00 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Management (CRM)</h1>
          <p className="text-slate-400 text-sm mt-1">Directory of international clients who have received invoices or paid via payment links.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Total Paid</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-semibold text-white">{c.name}</td>
                  <td className="px-4 py-3 text-slate-300">{c.company}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{c.email}</td>
                  <td className="px-4 py-3 font-bold text-emerald-400">${c.totalSpent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-semibold">Create Invoice</button>
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
