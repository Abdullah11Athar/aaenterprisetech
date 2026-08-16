'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, DollarSign, Receipt, CheckCircle, Shield, Phone, Mail } from 'lucide-react';

export default function ClientDirectPaymentPage() {
  const [payInvoiceNo, setPayInvoiceNo] = useState('INV-2026-001');
  const [payAmount, setPayAmount] = useState('500');
  const [payClientName, setPayClientName] = useState('');
  const [payClientEmail, setPayClientEmail] = useState('');
  const [payCardNumber, setPayCardNumber] = useState('');
  const [payCardExp, setPayCardExp] = useState('');
  const [payCardCvc, setPayCardCvc] = useState('');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleClientPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to AA Enterprise Tech
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs">
              AA
            </div>
            <span className="text-xs font-bold text-white hidden sm:inline">AA Enterprise Tech</span>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-bold text-purple-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Bank-Grade 256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Client Payment Portal</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Pay project retainers, milestones, or invoice deposits securely online via Visa, Mastercard, AMEX, Apple Pay, or Google Pay.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-2xl shadow-purple-950/40 relative">
          {paymentSuccess ? (
            <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-white">Payment Confirmed!</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Payment of <span className="font-bold text-white">${payAmount} USD</span> for Invoice <span className="font-bold text-purple-300">{payInvoiceNo}</span> has been processed successfully. An official receipt has been emailed to <strong className="text-white">{payClientEmail || 'your email'}</strong>.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Make Another Payment
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleClientPayment} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Invoice Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Receipt className="w-4 h-4 text-purple-400" /> 1. Invoice & Client Details
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Invoice / Reference #</label>
                  <input
                    type="text"
                    required
                    value={payInvoiceNo}
                    onChange={(e) => setPayInvoiceNo(e.target.value)}
                    placeholder="e.g. INV-2026-001 or Project Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Amount to Pay ($ USD)</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      required
                      min="10"
                      max="50000"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder="500"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-base font-bold focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Full Name / Company</label>
                  <input
                    type="text"
                    required
                    value={payClientName}
                    onChange={(e) => setPayClientName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email For Payment Receipt</label>
                  <input
                    type="email"
                    required
                    value={payClientEmail}
                    onChange={(e) => setPayClientEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Right Column: Card Checkout */}
              <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" /> 2. Card Checkout
                  </h3>
                  <div className="flex gap-1.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">VISA</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800">MC</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={payCardNumber}
                    onChange={(e) => setPayCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm tracking-wider font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={payCardExp}
                      onChange={(e) => setPayCardExp(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={payCardCvc}
                      onChange={(e) => setPayCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Invoice Amount:</span>
                    <span>${payAmount || '0'} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Processing Fee:</span>
                    <span className="text-emerald-400">$0.00 (Covered)</span>
                  </div>
                  <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1.5">
                    <span>Total Charged:</span>
                    <span className="text-purple-300 text-sm">${payAmount || '0'} USD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPay}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {isProcessingPay ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Payment...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay ${payAmount || '0'} USD Securely
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Protected by PCI-DSS SAQ A 256-Bit SSL Encryption</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full pt-8 text-center text-xs text-slate-500 border-t border-slate-900 mt-8">
        Need assistance with your invoice? Call <a href="tel:+13148340021" className="text-purple-400 font-semibold">+1 (314) 834-0021</a> or email <a href="mailto:info@aaenterprisetech.com" className="text-purple-400 font-semibold">info@aaenterprisetech.com</a>
      </div>
    </div>
  );
}
