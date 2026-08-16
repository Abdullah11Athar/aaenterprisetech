import { BarChart3, TrendingUp, DollarSign, CreditCard } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Revenue & Payment Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time performance metrics, client payment methods, and monthly volume breakdowns.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Monthly Gross Revenue</div>
          <div className="text-3xl font-extrabold text-white">$6,450.00</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24.2% from last month
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Average Invoice Size</div>
          <div className="text-3xl font-extrabold text-white">$1,150.00</div>
          <div className="text-xs text-slate-400 mt-2">Across 6 active clients</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="text-sm font-medium text-slate-400 mb-2">Payment Completion Rate</div>
          <div className="text-3xl font-extrabold text-emerald-400">94.8%</div>
          <div className="text-xs text-slate-400 mt-2">2-day average settlement speed</div>
        </div>
      </div>

      <div className="p-8 rounded-2xl glass-panel border border-slate-800 text-center py-16">
        <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-white mb-2">Interactive Volume Charts</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Chart visualizations powered by Recharts render monthly volume trajectories, card brand breakdowns, and country origin heatmaps.
        </p>
      </div>
    </div>
  );
}
