'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, Zap, Globe, CreditCard, DollarSign, CheckCircle2,
  ChevronDown, Mail, Phone, MapPin, Bot, Code, BarChart3, Lock, Star, Users, HelpCircle, X, Check, Send
} from 'lucide-react';

export default function PayLancerHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const platformFee = calcAmount * 0.01;
  const netPayout = calcAmount - platformFee;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  const faqs = [
    {
      q: 'How do payments work?',
      a: 'When you generate an invoice or payment link, your client opens a secure Stripe-powered checkout page to pay via Visa, Mastercard, Apple Pay, or Google Pay. PayLancer automatically deducts a 1% platform fee and routes the net balance to your connected account.'
    },
    {
      q: 'Which cards are accepted?',
      a: 'We support all major international credit and debit cards including Visa, Mastercard, American Express, Discover, Diners Club, as well as digital wallets like Apple Pay and Google Pay.'
    },
    {
      q: 'How long do payouts take?',
      a: 'Standard payouts are processed on a rolling 2-business-day schedule directly into your connected local bank account or USD wallet.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. PayLancer uses 256-bit SSL encryption, Supabase Row-Level Security, and complies with PCI-DSS SAQ A standards. Zero sensitive card data ever touches our servers.'
    }
  ];

  const testimonials = [
    {
      name: 'Syed Hamza',
      role: 'Full-Stack Developer, Lahore',
      quote: 'PayLancer solved my biggest hassle—receiving USD card payments from US clients without losing 8% in conversion markups. Payouts hit my bank smoothly.',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'UI/UX Agency Founder, Berlin',
      quote: 'The n8n automation and instant invoice payment links transformed how we bill overseas clients. Extremely fast and professional.',
      rating: 5
    },
    {
      name: 'Tariq Mansoor',
      role: 'DevOps & Cloud Consultant, Karachi',
      quote: 'State Bank compliance and clean R-Form reporting make this the only legal and stress-free payment solution for Pakistani tech exporters.',
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-white">PayLancer</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <Link href="#services" className="hover:text-blue-400 transition-colors">Services</Link>
            <Link href="#calculator" className="hover:text-blue-400 transition-colors">Calculator</Link>
            <Link href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link>
            <Link href="#faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
            <Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-500/30 text-xs font-semibold text-blue-400 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Global Financial Infrastructure for Freelancers & Agencies
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Accept International Payments Without Borders.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            We help freelancers, agencies, and online businesses accept global card payments, generate invoices, automate workflows, and grow internationally.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl glass-panel hover:bg-slate-800/60 text-slate-200 border border-slate-700 transition-all text-center"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Book a Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-8 rounded-3xl glass-panel border border-blue-500/40 max-w-md w-full relative space-y-4">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white">Book a Live 1-on-1 Demo</h3>
            <p className="text-xs text-slate-400">Schedule a 15-minute walkthrough with our solution architect.</p>

            <form onSubmit={(e) => { e.preventDefault(); setShowDemoModal(false); alert('Demo request submitted! We will email you a calendar invite.'); }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                <input type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Work Email</label>
                <input type="email" required placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Estimated Monthly Volume</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm">
                  <option>$1,000 - $5,000 / mo</option>
                  <option>$5,000 - $25,000 / mo</option>
                  <option>$25,000+ / mo</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Comprehensive Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">End-to-End Financial Services</h2>
            <p className="text-slate-400 mt-3">Multi-currency card processing, automated invoices, and seamless bank payouts.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Payment Solutions</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Payment Links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Invoice System</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Stripe Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Subscription Billing</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Automation</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> n8n Automation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> AI Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> CRM Automation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> WhatsApp Automation</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Integrations</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> REST API Access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Webhook Events</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Whop SDK Connect</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Dashboard</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Analytics & Tax</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> SBP R-Form Exports</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 0.25% Tax Compliance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Real-time Revenue Charts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Monthly Payout Reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Fee Calculator Section */}
      <section id="calculator" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-10 rounded-3xl glass-panel border border-blue-500/30 text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold text-white mb-2">Interactive Fee & Payout Calculator</h2>
            <p className="text-slate-400 mb-8 text-sm">Drag the slider or enter your invoice amount to see your exact net payout.</p>

            <div className="mb-8 max-w-md mx-auto">
              <label className="block text-xs font-semibold text-slate-400 mb-2">Invoice Amount ($ USD)</label>
              <input
                type="number"
                min="50"
                max="50000"
                step="50"
                value={calcAmount}
                onChange={(e) => setCalcAmount(parseFloat(e.target.value) || 0)}
                className="w-full text-center px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-3xl font-extrabold text-white mb-4 focus:outline-none focus:border-blue-500"
              />
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={calcAmount}
                onChange={(e) => setCalcAmount(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-medium text-slate-400 mb-1">Invoice Total</div>
                <div className="text-2xl font-bold text-white">${calcAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-medium text-blue-400 mb-1">Platform Fee (1%)</div>
                <div className="text-2xl font-bold text-blue-400">-${platformFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-xs font-medium text-emerald-400 mb-1">Your Net Payout</div>
                <div className="text-2xl font-bold text-emerald-300">${netPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Simple 5-Step Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">How PayLancer Works</h2>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Create your account', desc: 'Sign up in under 60 seconds with email or OAuth.' },
              { num: '02', title: 'Verify your identity', desc: 'Complete rapid KYC verification and connect your bank payout method.' },
              { num: '03', title: 'Generate an invoice', desc: 'Build an itemized invoice in USD, EUR, or GBP with tax & discount calculation.' },
              { num: '04', title: 'Share the payment link', desc: 'Send direct, branded payment link to your global client via email or chat.' },
              { num: '05', title: 'Get paid', desc: 'Funds settle into your bank account after automated 1% fee deduction.' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 rounded-2xl glass-panel border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 font-extrabold flex items-center justify-center text-lg border border-blue-500/30">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Trusted by Freelancers Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <HelpCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-semibold text-white flex justify-between items-center hover:bg-slate-900/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-400 text-sm border-t border-slate-800/60 pt-4 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Contact PayLancer Global Team</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Have questions about custom enterprise billing, Stripe Connect onboarding, or API integrations? Drop us a message.
              </p>

              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Support</div>
                    <div className="font-semibold text-white">support@paylancer.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Business Phone</div>
                    <div className="font-semibold text-white">+1 (800) 555-PAYL</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Registered Business Address</div>
                    <div className="font-semibold text-white">PayLancer Technologies LLC, 160 Greentree Dr, Suite 101, Dover, DE 19904, USA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form with State Feedback */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                  <textarea required rows={4} placeholder="Tell us how we can help..." className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>

              {contactSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4" /> Thank you! Your message has been sent successfully.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-16 bg-slate-950 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">P</div>
              <span className="text-lg font-bold text-white">PayLancer</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              Empowering freelancers and agencies globally to accept international card payments securely and legally.
            </p>
            <div className="text-xs text-slate-500">© 2026 PayLancer Technologies LLC. All rights reserved.</div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#services" className="hover:text-white">Services</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="#calculator" className="hover:text-white">Fee Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
              <li><Link href="/security" className="hover:text-white">Security Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
