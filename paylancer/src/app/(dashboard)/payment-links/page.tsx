'use client';

import { useState } from 'react';
import { Link2, Plus, Copy, ExternalLink, Check, ShoppingCart, Sparkles } from 'lucide-react';

export default function PaymentLinksPage() {
  const [links, setLinks] = useState([
    { id: 'lnk_1', name: 'Web Dev Retainer Deposit', amount: 500.00, currency: 'USD', url: 'https://paylancer.com/pay/lnk_1', provider: 'Stripe', uses: 4 },
    { id: 'lnk_2', name: 'UI/UX Hourly Consulting Rate', amount: 150.00, currency: 'USD', url: 'https://whop.com/checkout/whop_chk_99182?amount=150&currency=usd', provider: 'Whop', uses: 12 },
  ]);

  const [showWhopModal, setShowWhopModal] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [generatedWhopUrl, setGeneratedWhopUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateWhopLink = async () => {
    if (!title || !amount) return;

    try {
      const res = await fetch('/api/whop/checkout-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          currency: 'USD',
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        setGeneratedWhopUrl(data.checkoutUrl);
        setLinks([
          {
            id: `lnk_${Date.now()}`,
            name: title,
            amount: parseFloat(amount),
            currency: 'USD',
            url: data.checkoutUrl,
            provider: 'Whop',
            uses: 0,
          },
          ...links,
        ]);
      }
    } catch (err) {
      console.error('Error generating Whop link:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payment Links</h1>
          <p className="text-slate-400 text-sm mt-1">Create reusable Whop & Stripe checkout links to sell services or accept deposits anywhere.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWhopModal(true)}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/25 transition-all"
          >
            <ShoppingCart className="w-4 h-4" /> Create Whop Checkout Link
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25">
            <Plus className="w-4 h-4" /> Create Standard Link
          </button>
        </div>
      </div>

      {/* Whop Link Creator Modal */}
      {showWhopModal && (
        <div className="p-6 rounded-2xl glass-panel border border-orange-500/40 space-y-4 max-w-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" /> Generate Whop Checkout Link
            </h2>
            <button onClick={() => setShowWhopModal(false)} className="text-xs text-slate-400 hover:text-white">Close</button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Service / Package Title</label>
              <input
                type="text"
                placeholder="e.g. Website Redesign Package"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Amount ($ USD)</label>
              <input
                type="number"
                placeholder="250.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleCreateWhopLink}
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md"
          >
            Generate Whop Link via API
          </button>

          {generatedWhopUrl && (
            <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/30 space-y-2">
              <div className="text-xs font-semibold text-orange-300">Whop Checkout Link Ready!</div>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={generatedWhopUrl} className="flex-1 px-3 py-2 rounded-lg bg-slate-900 text-xs text-orange-200" />
                <button
                  onClick={() => copyToClipboard(generatedWhopUrl)}
                  className="px-3 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Links List */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        {links.map((link) => (
          <div key={link.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                link.provider === 'Whop' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {link.provider === 'Whop' ? <ShoppingCart className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-base">{link.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    link.provider === 'Whop' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {link.provider}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{link.url}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-bold text-white text-lg">${link.amount.toFixed(2)} {link.currency}</div>
                <div className="text-xs text-slate-400">{link.uses} payments received</div>
              </div>
              <button
                onClick={() => copyToClipboard(link.url)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
