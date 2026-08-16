'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Link2, RefreshCw, ArrowLeftRight, Wallet, Users, BarChart3, Settings, LogOut
} from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Payment Links', href: '/payment-links', icon: Link2 },
    { name: 'Subscriptions', href: '/subscriptions', icon: RefreshCw },
    { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
    { name: 'Payouts', href: '/payouts', icon: Wallet },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 min-h-screen flex flex-col justify-between p-4">
      <div>
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 px-3 py-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">P</div>
          <span className="text-lg font-bold text-white tracking-tight">PayLancer</span>
        </Link>

        {/* Menu Items */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-500/30">
            SH
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Syed Hamza</div>
            <div className="text-[10px] text-slate-400">Freelancer Account</div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
