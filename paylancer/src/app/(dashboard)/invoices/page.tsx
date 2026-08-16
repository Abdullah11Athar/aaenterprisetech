'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, ArrowLeft, Copy, Check, Sparkles, ShoppingCart } from 'lucide-react';

export default function InvoiceBuilderPage() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [dueDate, setDueDate] = useState('2026-08-15');
  const [taxRate, setTaxRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [generatedLink, setGeneratedLink] = useState('');
  const [whopCheckoutUrl, setWhopCheckoutUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const [items, setItems] = useState([
    { id: 1, description: 'Full-Stack SaaS Web Development', quantity: 1, unitPrice: 1500 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const totalAmount = subtotal + taxAmount - discountAmount;
  const platformFee = totalAmount * 0.01; // 1%
  const netPayout = totalAmount - platformFee;

  const handleGenerateInvoice = async () => {
    const token = Math.random().toString(36).substring(2, 15);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    setGeneratedLink(`${origin}/pay/${token}`);

    // Call Whop API to generate Whop checkout link as well
    try {
      const res = await fetch('/api/whop/checkout-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Invoice #${token.substring(0, 6).toUpperCase()} for ${clientName || 'Client'}`,
          amount: totalAmount,
          currency,
          invoiceId: token,
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        setWhopCheckoutUrl(data.checkoutUrl);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Create International Invoice</h1>
            <p className="text-slate-400 text-sm mt-1">Generate a professional invoice with direct Stripe & Whop Checkout Links.</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-8">
          {/* Client Details */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">Client Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Email *</label>
                <input
                  type="email"
                  placeholder="john@clientcorp.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company (Optional)</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-slate-800/80 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">Line Items</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    placeholder="Description of work"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-20 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm text-center"
                    />
                    <input
                      type="number"
                      placeholder="Unit Price"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-32 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm text-right"
                    />
                    <button onClick={() => removeItem(item.id)} className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addItem} className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>

          {/* Action */}
          <div className="pt-4">
            <button
              onClick={handleGenerateInvoice}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate Client Payment & Whop Links
            </button>
          </div>

          {/* Generated Links */}
          {generatedLink && (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Check className="w-4 h-4" /> Invoice & Whop Checkout Link Generated!
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-400">1. Standard Payment Page Link:</div>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={generatedLink} className="flex-1 px-4 py-2 rounded-xl bg-slate-900 text-emerald-300 text-sm" />
                  <button onClick={() => copyToClipboard(generatedLink)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold">
                    Copy Link
                  </button>
                </div>
              </div>

              {whopCheckoutUrl && (
                <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                  <div className="text-xs text-orange-300 flex items-center gap-1 font-semibold">
                    <ShoppingCart className="w-3.5 h-3.5" /> 2. Direct Whop Checkout Link:
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" readOnly value={whopCheckoutUrl} className="flex-1 px-4 py-2 rounded-xl bg-slate-900 text-orange-200 text-sm font-mono" />
                    <button onClick={() => copyToClipboard(whopCheckoutUrl)} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold">
                      Copy Whop Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
