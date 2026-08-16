'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Globe, Bot, Palette, Briefcase, CheckCircle2, ShieldCheck,
  Zap, Clock, Layers, Headphones, Sparkles, Send, Phone, Mail, MapPin, Calculator, Star
} from 'lucide-react';

export default function AAEnterprisesAgencyPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const servicesList = [
    { id: 'web_dev', category: 'Website Development', name: 'Business Website / E-commerce', price: 800 },
    { id: 'ai_auto', category: 'AI Automation', name: 'AI Chatbot & Workflow Automation', price: 1200 },
    { id: 'branding', category: 'Design & Branding', name: 'Brand Identity & Logo Design', price: 500 },
    { id: 'it_consulting', category: 'IT Services', name: 'Technical Strategy & System Integration', price: 600 },
  ];

  const toggleService = (id: string, price: number) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
      setEstimatedTotal(estimatedTotal - price);
    } else {
      setSelectedServices([...selectedServices, id]);
      setEstimatedTotal(estimatedTotal + price);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-500/20">
              AA
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">AA Enterprises</span>
              <span className="block text-[10px] text-purple-400 font-semibold tracking-wider uppercase">Digital Solutions Agency</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <Link href="#services" className="hover:text-purple-400 transition-colors">Services</Link>
            <Link href="#why-us" className="hover:text-purple-400 transition-colors">Why Choose Us</Link>
            <Link href="#calculator" className="hover:text-purple-400 transition-colors">Quote Estimator</Link>
            <Link href="#contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-bold text-purple-300 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Empowering Startups, Entrepreneurs & Global Businesses
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Accelerate Your Business With <span className="gradient-text">Modern Tech & AI</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            AA Enterprises is a premier digital solutions agency. We specialize in creating high-performance websites, AI automation systems, custom business solutions, and professional brand identities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group transition-all"
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5 text-purple-400" /> Instant Quote Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Comprehensive Digital Solutions</h2>
            <p className="text-slate-400 mt-3">Tailored services designed to drive measurable growth for your brand.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 🌐 Website Development */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Website Development</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Business Websites</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> High-Converting Landing Pages</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> E-commerce Stores</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Portfolio Websites</li>
              </ul>
            </div>

            {/* 🤖 AI Automation */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Automation</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Workflow Automation (n8n/Make)</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> AI Conversational Chatbots</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Business Process Automation</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Custom AI Integrations</li>
              </ul>
            </div>

            {/* 🎨 Design & Branding */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 hover:border-pink-500/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Design & Branding</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" /> Logo Design & Vector Identity</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" /> Full Brand Guidelines</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" /> UI/UX App & Web Design</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" /> Social Media Kits</li>
              </ul>
            </div>

            {/* 💼 IT Services */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">IT Services</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Technical Consulting</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Digital Strategy Roadmap</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> System Integration & APIs</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 24/7 Ongoing Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AA Enterprises */}
      <section id="why-us" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Our Commitments</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Why Choose AA Enterprises?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Professional Quality</h4>
                <p className="text-sm text-slate-400">Enterprise-grade standards across code, design, and architecture.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Fast Turnaround</h4>
                <p className="text-sm text-slate-400">Rapid deployment and agile sprints to get you to market quickly.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Custom Solutions</h4>
                <p className="text-sm text-slate-400">Tailored tech stacks and workflows tailored to your specific goals.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Secure & Reliable</h4>
                <p className="text-sm text-slate-400">Bank-grade data encryption, SSL, and rigorous security practices.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Worldwide Remote Service</h4>
                <p className="text-sm text-slate-400">Serving clients in North America, Europe, UAE, and Asia.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">Dedicated Client Support</h4>
                <p className="text-sm text-slate-400">Direct Slack/WhatsApp channels and post-launch SLA support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="calculator" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-10 rounded-3xl glass-panel border border-purple-500/30 text-center relative overflow-hidden">
            <h2 className="text-3xl font-extrabold text-white mb-3">Instant Project Quote Estimator</h2>
            <p className="text-slate-400 mb-8">Select the services you need for an instant estimated budget.</p>

            <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
              {servicesList.map((svc) => {
                const isSelected = selectedServices.includes(svc.id);
                return (
                  <div
                    key={svc.id}
                    onClick={() => toggleService(svc.id, svc.price)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/50 border-purple-500 text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-purple-400 uppercase">{svc.category}</span>
                      <span className="text-sm font-bold text-white">+${svc.price}</span>
                    </div>
                    <div className="text-sm font-semibold">{svc.name}</div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-purple-300 font-semibold uppercase">Estimated Investment</span>
                <div className="text-3xl font-black text-white">${estimatedTotal} USD</div>
              </div>
              <Link
                href="#contact"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Ready to Grow Your Business?</span>
              <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">Let's Build Something Great Together.</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Contact us today for a custom solution tailored to your exact needs. Our team responds within 24 hours.
              </p>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>contact@aaenterprises.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-indigo-400" />
                  <span>+1 (800) 555-AA-ENT</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span>Worldwide Remote Agency Services</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Send Us Your Inquiry</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
                <input type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Project Details / Requirements</label>
                <textarea rows={4} placeholder="Describe your website, AI automation, branding, or IT service requirements..." className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white text-xs">AA</div>
            <span className="font-bold text-white">AA Enterprises</span>
          </div>
          <div className="text-xs text-slate-500">© 2026 AA Enterprises Digital Solutions. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
