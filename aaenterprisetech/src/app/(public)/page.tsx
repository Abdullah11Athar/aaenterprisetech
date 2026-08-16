'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Globe, Bot, Palette, Briefcase, CheckCircle2, ShieldCheck,
  Clock, Layers, Headphones, Sparkles, Send, Phone, Mail, Calculator, Star, Check, Menu, X,
  ChevronDown, Code2, Zap, Cpu, Rocket
} from 'lucide-react';

export default function AAEnterpriseTechHomePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web_dev', 'ai_auto']);
  const [estimatedTotal, setEstimatedTotal] = useState(2000);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  
  // Ambient Cursor Color Glow Follower (Soft, Refined Diameter)
  const [mousePos, setMousePos] = useState({ x: -600, y: -600 });
  
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (isManualScrolling.current) return;

      // Scrollspy detection
      const sections = ['services', 'process', 'why-us', 'calculator', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const wasMobileOpen = mobileMenuOpen;
    setMobileMenuOpen(false);
    setActiveSection(id);
    setHighlightedSection(id);

    isManualScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 75 : 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    };

    if (wasMobileOpen) {
      setTimeout(performScroll, 50);
    } else {
      performScroll();
    }

    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    setTimeout(() => {
      setHighlightedSection(null);
    }, 2200);
  };

  const servicesList = [
    {
      id: 'web_dev',
      category: 'Website Development',
      name: 'Custom High-Performance Websites & Web Apps',
      desc: 'Next.js 14, React & Tailwind CSS web apps built for lightning speed and maximum lead conversion.',
      price: 800,
      icon: Globe,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'hover:border-blue-500/60',
      glow: 'group-hover:shadow-blue-500/20'
    },
    {
      id: 'ai_auto',
      category: 'AI Automation & Chatbots',
      name: 'Autonomous AI Workflows & Intelligent Agents',
      desc: 'Save 20+ hours weekly with customized n8n workflows, CRM automations, and conversational GPT chatbots.',
      price: 1200,
      icon: Bot,
      color: 'from-purple-500/20 to-pink-500/10',
      border: 'hover:border-purple-500/60',
      glow: 'group-hover:shadow-purple-500/20'
    },
    {
      id: 'branding',
      category: 'Design & UI/UX Branding',
      name: 'Modern Logo, Vector Identity & Figma Systems',
      desc: 'World-class brand guidelines, bespoke vector logos, UI/UX systems, and high-impact pitch decks.',
      price: 500,
      icon: Palette,
      color: 'from-pink-500/20 to-rose-500/10',
      border: 'hover:border-pink-500/60',
      glow: 'group-hover:shadow-pink-500/20'
    },
    {
      id: 'it_consulting',
      category: 'IT & Cloud Architecture',
      name: 'Custom Software, API Integrations & Cloud Ops',
      desc: 'Scalable cloud infrastructure, secure REST/GraphQL API development, Stripe payments, and ongoing maintenance.',
      price: 900,
      icon: Briefcase,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'hover:border-emerald-500/60',
      glow: 'group-hover:shadow-emerald-500/20'
    },
  ];

  const steps = [
    { step: '01', title: 'Discovery & Scope', desc: 'We align on your specific business goals, target audience, and feature roadmap.', icon: Sparkles },
    { step: '02', title: 'UI/UX Architecture', desc: 'We craft high-converting wireframes, interactive prototypes, and modern visuals.', icon: Layers },
    { step: '03', title: 'Agile Development', desc: 'We engineer lightning-fast Next.js code and deploy secure automated AI workflows.', icon: Code2 },
    { step: '04', title: 'Launch & Scale', desc: 'Comprehensive QA, SEO audit, and 24/7 dedicated support for exponential growth.', icon: Rocket },
  ];

  const faqs = [
    {
      q: 'What services does AA Enterprise Tech provide?',
      a: 'We specialize in custom web development, AI workflow automation (n8n/Make/Zapier), conversational AI chatbots, full brand identity design, and scalable custom software architecture.'
    },
    {
      q: 'What is the typical turnaround time for a project?',
      a: 'Custom landing pages and business websites are typically delivered within 5–7 business days. Complex AI automations and custom SaaS platforms take 2–3 weeks depending on scope.'
    },
    {
      q: 'Do you offer ongoing maintenance and support after launch?',
      a: 'Yes, we provide dedicated ongoing support packages including server monitoring, security updates, feature additions, and direct priority communication via Slack or WhatsApp.'
    },
    {
      q: 'How can I get an exact quote for my project?',
      a: 'You can use our interactive Quote Estimator on this page or submit an inquiry below. Our team analyzes your requirements and provides a fixed-price proposal within 24 hours.'
    }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased overflow-x-hidden relative">

      {/* 🌟 Interactive Mouse Move Ambient Light Spotlight (Soft, Refined Diameter) */}
      <div
        className="fixed w-[320px] h-[320px] rounded-full bg-gradient-to-r from-purple-500/12 via-indigo-400/08 to-transparent blur-[70px] pointer-events-none z-0 transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePos.x - 160}px, ${mousePos.y - 160}px)`,
        }}
      />

      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-[40%] -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[70%] -right-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      {/* Header: Streamlined & Non-Redundant */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-purple-950/20 py-2.5 sm:py-3'
            : 'bg-transparent border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('hero');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-md shadow-purple-500/30 group-hover:scale-105 group-hover:rotate-2 transition-all">
              AA
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white group-hover:text-purple-300 transition-colors leading-none">
                AA Enterprise Tech
              </span>
              <span className="text-[8px] sm:text-[9px] text-purple-400 font-bold tracking-wider uppercase mt-1">
                Digital Solutions & AI Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Clean & Centered) */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2 text-xs sm:text-sm font-semibold">
            {[
              { id: 'services', label: 'Services' },
              { id: 'process', label: 'How It Works' },
              { id: 'why-us', label: 'Why Us' },
              { id: 'calculator', label: 'Quote Estimator' },
              { id: 'faq', label: 'FAQ' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-purple-600/25 text-purple-200 border border-purple-500/50 shadow-md shadow-purple-600/30 scale-[1.03]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent active:scale-95'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full shadow-sm shadow-purple-400" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Sleek Phone Icon + Single Primary CTA */}
          <div className="hidden sm:flex items-center space-x-3.5 shrink-0">
            <a
              href="tel:+13148340021"
              title="Call Us: +1 (314) 834-0021"
              aria-label="Call Direct US Business Line +1 (314) 834-0021"
              className="p-2.5 rounded-xl glass-card border border-slate-800 text-purple-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/40 transition-all shadow-md group flex items-center justify-center"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-5 py-2.5 rounded-xl shimmer-button text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.03]"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="tel:+13148340021"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-purple-400"
              aria-label="Call Direct US Business Line"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-6 py-5 space-y-3 animate-in slide-in-from-top duration-200">
            {[
              { id: 'services', label: 'Services' },
              { id: 'process', label: 'How It Works' },
              { id: 'why-us', label: 'Why Us' },
              { id: 'calculator', label: 'Quote Estimator' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact Us' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                    : 'text-slate-200 hover:text-purple-400'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-3">
              <a
                href="tel:+13148340021"
                className="flex items-center gap-2 text-xs font-semibold text-purple-300"
              >
                <Phone className="w-4 h-4 text-purple-400" /> +1 (314) 834-0021
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/30"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Semantic Landmark */}
      <main id="main-content" className="flex-1">
        {/* Hero Section with Shimmering Headline & Ambient Lights */}
        <section className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 overflow-hidden px-4 sm:px-6 z-10">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/50 text-xs font-bold text-purple-200 mb-6 sm:mb-8 shadow-lg shadow-purple-950/40 animate-float">
              <Sparkles className="w-4 h-4 text-purple-300 shrink-0" />
              <span>Next-Generation Digital Solutions & AI Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-[1.12] transition-transform duration-500 hover:scale-[1.01]">
              Accelerate Your Business With{' '}
              <span className="animated-gradient-text inline-block drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                Modern Tech & AI
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
              AA Enterprise Tech helps founders, brands, and enterprises dominate their market with high-converting websites, automated AI workflows, bespoke software, and elite branding.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto mb-12 sm:mb-16">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group transition-all hover:scale-[1.03]"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#calculator"
                onClick={(e) => scrollToSection(e, 'calculator')}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-xl glass-card hover:bg-purple-950/30 text-slate-200 border border-slate-700 transition-all text-center flex items-center justify-center gap-2 hover:border-purple-500/50"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" /> Instant Quote Calculator
              </a>
            </div>

            {/* Glowing Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 scroll-reveal">
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 transition-transform">
                <div className="text-xl sm:text-2xl font-black text-purple-300">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Client Satisfaction</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 transition-transform">
                <div className="text-xl sm:text-2xl font-black text-indigo-300">5-7 Days</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Average Turnaround</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 transition-transform">
                <div className="text-xl sm:text-2xl font-black text-blue-300">20+ Hrs</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">AI Weekly Time Saved</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 transition-transform">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">24/7</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Priority Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="py-6 border-y border-slate-800/80 bg-slate-950/60 overflow-hidden relative z-10 scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm font-semibold text-slate-200">
            <span className="text-slate-300 uppercase tracking-widest text-[11px] font-bold">Powered By Modern Tech:</span>
            <span className="flex items-center gap-1.5 text-slate-100"><Code2 className="w-4 h-4 text-purple-300" /> Next.js 14</span>
            <span className="flex items-center gap-1.5 text-slate-100"><Bot className="w-4 h-4 text-blue-300" /> OpenAI & Claude</span>
            <span className="flex items-center gap-1.5 text-slate-100"><Zap className="w-4 h-4 text-amber-300" /> n8n Automation</span>
            <span className="flex items-center gap-1.5 text-slate-100"><Globe className="w-4 h-4 text-indigo-300" /> Stripe Payments</span>
            <span className="flex items-center gap-1.5 text-slate-100"><Cpu className="w-4 h-4 text-emerald-300" /> Vercel Cloud</span>
          </div>
        </section>

        {/* Services Showcase */}
        <section
          id="services"
          className={`py-16 sm:py-24 bg-slate-900/40 border-b border-slate-800/80 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'services' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Our Expertise</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">Comprehensive Digital Solutions</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 sm:mt-3">Tailored services engineered to deliver real-world business results.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {servicesList.map((svc) => {
                const IconComp = svc.icon;
                return (
                  <div
                    key={svc.id}
                    className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border border-slate-800 ${svc.border} ${svc.glow} group relative overflow-hidden flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                        <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{svc.category}</h3>
                      <p className="text-xs sm:text-sm text-slate-100 mb-3 font-semibold">{svc.name}</p>
                      <p className="text-xs text-slate-200 leading-relaxed mb-4">{svc.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300">From ${svc.price} USD</span>
                      <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, 'contact')}
                        className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Inquire <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section
          id="process"
          className={`py-16 sm:py-24 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'process' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Streamlined Workflow</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">How We Bring Your Vision To Life</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 sm:mt-3">A transparent, agile process designed for rapid execution and flawless delivery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, idx) => {
                const StepIcon = s.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/50 transition-all relative group hover:-translate-y-1">
                    <div aria-hidden="true" className="text-3xl font-black text-slate-500 group-hover:text-purple-300 transition-colors mb-3">
                      {s.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-200 flex items-center justify-center mb-3">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1.5">{s.title}</h3>
                    <p className="text-xs text-slate-200 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          id="why-us"
          className={`py-16 sm:py-24 bg-slate-900/40 border-y border-slate-800/80 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'why-us' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Our Commitments</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">Why Choose AA Enterprise Tech?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 text-purple-200 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Professional Quality</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Enterprise-grade standards across code, visual design, and software reliability.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Fast Turnaround</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Agile sprints and rapid delivery to help you launch ahead of competitors.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-200 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Custom Solutions</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Tailored software stacks and workflows engineered for your exact business goals.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Secure & Reliable</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Bank-grade SSL encryption, secure API protocols, and robust infrastructure.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-500/20 text-pink-200 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Worldwide Remote Service</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Serving enterprise clients, startups, and founders across the USA, UK, UAE, and worldwide.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 text-amber-200 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Dedicated Support</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Direct communication via Slack/WhatsApp and responsive post-launch maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Project Quote Estimator */}
        <section
          id="calculator"
          className={`py-16 sm:py-24 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'calculator' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-purple-500/40 text-center relative overflow-hidden shadow-2xl shadow-purple-950/40">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Instant Project Quote Estimator</h2>
              <p className="text-xs sm:text-sm text-slate-200 mb-6 sm:mb-8">Select the services you need for an instant estimated investment figure.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left mb-6 sm:mb-8">
                {servicesList.map((svc) => {
                  const isSelected = selectedServices.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.id, svc.price)}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-md shadow-purple-500/20 scale-[1.01]'
                          : 'bg-slate-900/95 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] sm:text-xs font-bold text-purple-300 uppercase tracking-wider">{svc.category}</span>
                        <span className="text-xs sm:text-sm font-bold text-white">+${svc.price} USD</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">{svc.name}</div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-purple-950/70 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] sm:text-xs text-purple-200 font-semibold uppercase tracking-wider">Estimated Project Total</span>
                  <div className="text-2xl sm:text-3xl font-black text-white">${estimatedTotal} USD</div>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl shimmer-button text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 text-center transition-all hover:scale-[1.02]"
                >
                  Request Exact Proposal
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className={`py-16 sm:py-24 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'faq' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Questions & Answers</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full p-5 sm:p-6 text-left font-semibold text-white flex justify-between items-center hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-purple-300 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div id={`faq-answer-${idx}`} className="px-5 sm:px-6 pb-6 text-slate-200 text-xs sm:text-sm border-t border-slate-800/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-16 sm:py-24 bg-slate-950 border-t border-slate-800/80 px-4 sm:px-6 relative z-10 transition-all duration-700 scroll-reveal ${
            highlightedSection === 'contact' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch">
              {/* Left Column: Direct Contact Info Box */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Ready to Grow Your Business?</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3 sm:mb-4">Let's Build Something Great Together.</h2>
                  <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed">
                    Contact AA Enterprise Tech today for a custom solution tailored to your exact specifications. Our team responds within 24 hours.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-200 mt-2">
                  <a
                    href="tel:+13148340021"
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs text-slate-300">Direct US Business Line</div>
                      <div className="text-sm sm:text-base font-bold text-white">+1 (314) 834-0021</div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@aaenterprisetech.com"
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs text-slate-300">Official Business Email</div>
                      <div className="text-sm sm:text-base font-bold text-white">info@aaenterprisetech.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-800">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs text-slate-300">Headquarters & Global Presence</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">Missouri, USA & Worldwide Remote Services</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send Us Your Inquiry</h3>
                  <p className="text-xs text-slate-200 mb-4">Fill in your requirements below for a fixed-price proposal.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-semibold text-slate-200 mb-1">Your Full Name</label>
                    <input id="full-name" name="full-name" required maxLength={100} type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="block text-xs font-semibold text-slate-200 mb-1">Email Address</label>
                    <input id="email-address" name="email" required maxLength={100} type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label htmlFor="project-details" className="block text-xs font-semibold text-slate-200 mb-1">Project Details / Requirements</label>
                    <textarea id="project-details" name="message" required maxLength={2000} rows={4} placeholder="Describe your website, AI automation, branding, or custom software requirements..." className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400" />
                  </div>
                  <button type="submit" aria-label="Submit Contact Inquiry" className="w-full py-3.5 rounded-xl shimmer-button text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                    <Send className="w-4 h-4" /> Send Inquiry
                  </button>
                </form>

                {formSubmitted && (
                  <div className="mt-3 p-3.5 sm:p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold animate-in zoom-in-95">
                    <Check className="w-4 h-4" /> Thank you! Your inquiry has been received. We will contact you within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Legal & Portal Links */}
      <footer className="border-t border-slate-800/80 py-10 sm:py-14 bg-slate-950 text-slate-200 text-xs sm:text-sm px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link
              href="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('hero');
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-[20px] sm:rounded-[24px] bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-lg shadow-purple-600/30 group-hover:scale-105 group-hover:rotate-3 transition-all border border-purple-400/30">
                AA
              </div>
              <div>
                <span className="font-bold text-white group-hover:text-purple-300 transition-colors">AA Enterprise Tech</span>
                <span className="block text-[10px] sm:text-[11px] text-slate-300">Digital Solutions & AI Automation Agency</span>
              </div>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-200">
              <a href="tel:+13148340021" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-300" /> +1 (314) 834-0021
              </a>
              <a href="mailto:info@aaenterprisetech.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-300" /> info@aaenterprisetech.com
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div>© 2026 AA Enterprise Tech. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund" className="text-slate-300 hover:text-white transition-colors">Refund Policy</Link>
              <Link href="/pay" className="text-purple-300 hover:text-white font-semibold transition-colors">Client Payment Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
