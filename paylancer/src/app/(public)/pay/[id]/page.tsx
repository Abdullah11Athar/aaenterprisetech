'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ShoppingCart, Sparkles, Check } from 'lucide-react';

export default function ClientCheckoutPage({ params }: { params: { id: string } }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const invoice = {
    id: params.id || 'demo_123',
    number: 'INV-2026-9481',
    freelancerName: 'Syed Hamza',
    freelancerEmail: 'hamza@devstudio.pk',
    clientName: 'Acme Corp International',
    clientEmail: 'billing@acmecorp.com',
    amount: 1500.00,
    currency: 'USD',
    dueDate: '2026-08-15',
    items: [
      { description: 'Full-Stack Next.js & Supabase SaaS Platform Development', qty: 1, price: 1500.00 },
    ],
  };

  const handleStripePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaidSuccess(true);
    }, 2000);
  };

  const handleWhopPay = () => {
    window.open(`https://whop.com/checkout/whop_chk_demo?amount=${invoice.amount}&currency=usd`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
              P
            </div>
            <span className="font-bold text-white tracking-tight">PayLancer Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encryption
          </div>
        </div>

        {/* Invoice Card */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Invoice To</span>
              <h1 className="text-xl font-bold text-white mt-1">{invoice.clientName}</h1>
              <p className="text-xs text-slate-400">{invoice.clientEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoice #{invoice.number}</span>
              <div className="text-2xl font-extrabold text-white mt-1">${invoice.amount.toFixed(2)} {invoice.currency}</div>
              <p className="text-xs text-slate-400">Due: {invoice.dueDate}</p>
            </div>
          </div>

          {/* Freelancer Profile */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30">
                SH
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{invoice.freelancerName}</div>
                <div className="text-xs text-slate-400">{invoice.freelancerEmail}</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Verified Freelancer
            </span>
          </div>

          {/* Line Items */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Service Details</h2>
            <div className="space-y-2">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-sm border-b border-slate-800/60">
                  <span className="text-slate-200">{item.description}</span>
                  <span className="font-semibold text-white">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Paid Success Confirmation */}
          {paidSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Payment Completed Successfully! 🎉</h3>
              <p className="text-xs text-emerald-200">Receipt and payment confirmation emailed to {invoice.clientEmail}.</p>
            </div>
          ) : (
            /* Payment Action Buttons */
            <div className="pt-4 space-y-3">
              <button
                onClick={handleStripePay}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <CreditCard className="w-5 h-5" />
                {isProcessing ? 'Processing Payment via Stripe...' : `Pay $${invoice.amount.toFixed(2)} USD via Credit Card`}
              </button>

              <button
                onClick={handleWhopPay}
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                Pay via Whop Checkout Link
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Powered by Stripe Connect & Whop</span>
                <span>•</span>
                <span>Visa, Mastercard, AMEX, Apple Pay, Google Pay</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
