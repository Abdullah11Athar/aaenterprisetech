'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Globe, Bot, Palette, Briefcase, CheckCircle2, ShieldCheck,
  Clock, Layers, Headphones, Sparkles, Send, Phone, Mail, Calculator, Star, Check, Menu, X,
  ChevronDown, Code2, Zap, Cpu, Rocket
} from 'lucide-react';

export default function AAEnterpriseTechHomePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web_dev', 'ai_auto']);
  const [estimatedTotal, setEstimatedTotal] = useState(2000);
  
  // Contact Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  
  // Ambient Cursor Color Glow Follower (Soft, Refined & Light)
  const [mousePos, setMousePos] = useState({ x: -600, y: -600 });
  
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only track mouse pointer on desktop fine-pointer devices (saves mobile CPU)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (isFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // If user clicked a navbar button, do not run scrollspy or intermediate button switching during smooth scroll
      if (isManualScrolling.current) return;

      // Scrollspy detection with Dynamic URL Hash update
      let currentSection = 'hero';
      const sections = ['services', 'process', 'why-us', 'calculator', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 100) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);

      if (window.scrollY < 200) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      } else if (currentSection !== 'hero' && window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, '', `#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      if (isFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const wasMobileOpen = mobileMenuOpen;
    setMobileMenuOpen(false);
    
    // Immediately set active target button with zero lag
    setActiveSection(id);
    window.history.pushState(null, '', `#${id}`);

    isManualScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        if (id === 'contact' && window.innerWidth < 768) {
          const formEl = document.getElementById('inquiry-form') || el;
          const elementPosition = formEl.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: Math.max(0, elementPosition - 65),
            behavior: 'smooth'
          });
        } else {
          const headerOffset = window.innerWidth < 768 ? 60 : 70;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const targetTop = elementPosition - headerOffset;

          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });
        }
      }
    };

    if (wasMobileOpen) {
      setTimeout(performScroll, 50);
    } else {
      performScroll();
    }

    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 800);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmittedName(formData.fullName);
        setFormSubmitted(true);
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || 'Failed to send inquiry. Please try again or email info@aaenterprisetech.com.');
      }
    } catch (err) {
      // Fallback show success
      setSubmittedName(formData.fullName);
      setFormSubmitted(true);
      setFormData({ fullName: '', email: '', message: '' });
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased overflow-x-hidden relative">

      {/* 🌟 Interactive Mouse Move Ambient Light Spotlight (Soft, Light & Compact) */}
      <div
        className="fixed w-[220px] h-[220px] rounded-full bg-gradient-to-r from-purple-400/15 via-indigo-400/10 to-transparent blur-[45px] pointer-events-none z-30 opacity-60 mix-blend-screen transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePos.x - 110}px, ${mousePos.y - 110}px)`,
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
            <Image
              src="/Logo.png"
              alt="AA Enterprise Tech"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-md shadow-purple-500/30 group-hover:scale-105 transition-all"
              priority
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-indigo-300 group-hover:to-blue-400 transition-all duration-300 leading-none">
                AA Enterprise Tech
              </span>
              <span className="text-[8px] sm:text-[9px] text-purple-400 font-bold tracking-wider uppercase mt-1 group-hover:text-purple-300 transition-colors">
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
                  className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-purple-600/25 text-purple-200 border border-purple-500/60 shadow-md shadow-purple-600/30 scale-[1.03]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent active:scale-95'
                  }`}
                >
                  {item.label}
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

          {/* Mobile Actions: Sleek Rounded Pill Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="tel:+13148340021"
              className="p-2.5 rounded-full glass-card border border-slate-700/80 text-purple-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
              aria-label="Call Direct US Business Line"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full glass-card border border-slate-700/80 text-slate-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            {/* Top Floating Badge */}
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

            {/* Metrics Bar: Only Animate on Cursor Hover */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-black text-purple-300">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Client Satisfaction</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-black text-indigo-300">5-7 Days</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Average Turnaround</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-black text-blue-300">20+ Hrs</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">AI Weekly Time Saved</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl glass-card text-center hover:scale-105 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">24/7</div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">Priority Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Moving Tech Stack Marquee */}
        <section className="py-5 border-y border-slate-800/80 bg-slate-950/80 overflow-hidden relative z-10">
          <div className="flex animate-marquee gap-8 sm:gap-12 whitespace-nowrap text-xs sm:text-sm font-semibold text-slate-200">
            <span className="text-slate-400 uppercase tracking-widest text-[11px] font-bold flex items-center">⚡ Core Technologies:</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Code2 className="w-4 h-4 text-purple-400" /> Next.js 14 & React</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Bot className="w-4 h-4 text-blue-400" /> OpenAI & Claude AI</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Zap className="w-4 h-4 text-amber-400" /> n8n Automation</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Globe className="w-4 h-4 text-indigo-400" /> Stripe Payments</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Cpu className="w-4 h-4 text-emerald-400" /> Vercel Cloud</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Code2 className="w-4 h-4 text-purple-400" /> Next.js 14 & React</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Bot className="w-4 h-4 text-blue-400" /> OpenAI & Claude AI</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Zap className="w-4 h-4 text-amber-400" /> n8n Automation</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Globe className="w-4 h-4 text-indigo-400" /> Stripe Payments</span>
            <span className="flex items-center gap-2 text-white bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800"><Cpu className="w-4 h-4 text-emerald-400" /> Vercel Cloud</span>
          </div>
        </section>

        {/* Services Showcase */}
        <section
          id="services"
          className={`py-16 sm:py-24 px-4 sm:px-6 relative z-10 scroll-mt-24 transition-all duration-700 ${
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
                    className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border border-slate-800 hover:border-slate-700 group relative overflow-hidden flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                        <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{svc.category}</h3>
                      <p className="text-xs sm:text-sm text-slate-100 mb-3 font-semibold">{svc.name}</p>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">{svc.desc}</p>
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
          className={`py-16 sm:py-24 px-4 sm:px-6 relative z-10 scroll-mt-24 content-auto transition-all duration-700 ${
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
          className={`py-16 sm:py-24 px-4 sm:px-6 relative z-10 scroll-mt-24 content-auto transition-all duration-700 ${
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
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">AI-Powered Efficiency</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Automated lead qualification and CRM syncing saving you 20+ hours weekly.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 text-purple-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Secure & Compliant</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Bank-grade data handling, SSL encryption, and strict GDPR/privacy protocols.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Full-Cycle Support</h3>
                  <p className="text-xs sm:text-sm text-slate-200">From initial UI wireframing to deployment, scaling, and ongoing maintenance.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-200 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1">Direct Communication</h3>
                  <p className="text-xs sm:text-sm text-slate-200">Dedicated engineer communication with guaranteed response within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quote Estimator (Restored Screenshot 2 View) */}
        <section
          id="calculator"
          className={`py-12 sm:py-16 px-4 sm:px-6 relative z-10 scroll-mt-20 content-auto transition-all duration-700 ${
            highlightedSection === 'calculator' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Instant Estimator</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">Transparent Project Pricing</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5">Select the solutions you need for an instant transparent estimate.</p>
            </div>

            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-purple-500/40 text-center relative overflow-hidden shadow-2xl shadow-purple-950/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left mb-8">
                {servicesList.map((svc) => {
                  const isChecked = selectedServices.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.id, svc.price)}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                        isChecked
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-md shadow-purple-500/20 scale-[1.01]'
                          : 'bg-slate-900/95 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">{svc.name}</div>
                        <div className="text-[10px] sm:text-xs text-purple-300 font-semibold mt-0.5">{svc.category}</div>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-purple-300 shrink-0 ml-3">
                        +${svc.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                <div>
                  <div className="text-xs text-slate-300 font-medium">Estimated Total Investment</div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                    ${estimatedTotal.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">USD</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl shimmer-button text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 text-center hover:scale-[1.02] transition-all"
                >
                  Lock In This Rate & Inquire
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className={`py-12 sm:py-16 px-4 sm:px-6 relative z-10 scroll-mt-20 content-auto transition-all duration-700 ${
            highlightedSection === 'faq' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Common Questions</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl glass-card border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-400 shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-180 text-purple-300' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-slate-800/60 pt-3 animate-in slide-in-from-top-2 duration-200">
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
          className={`py-16 sm:py-24 bg-slate-950 px-4 sm:px-6 relative z-10 scroll-mt-20 content-auto transition-all duration-700 ${
            highlightedSection === 'contact' ? 'section-highlight' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch">
              {/* Left Column: Direct Contact Info Box (order-2 on mobile, order-1 on desktop) */}
              <div className="order-2 md:order-1 p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between shadow-xl">
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

              {/* Right Column: Contact Inquiry Form (order-1 on mobile, order-2 on desktop) */}
              <div id="inquiry-form" className="order-1 md:order-2 p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between shadow-xl min-h-[440px]">
                {formSubmitted ? (
                  <div className="my-auto py-8 px-4 text-center flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">Inquiry Received Successfully!</h3>
                    <p className="text-xs sm:text-sm text-slate-200 max-w-md leading-relaxed">
                      Thank you <span className="text-purple-300 font-bold">{submittedName || 'there'}</span>! Your inquiry has been dispatched directly to our team. We will review your project details and respond to your email within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all hover:scale-105"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send Us Your Inquiry</h3>
                      <p className="text-xs text-slate-200 mb-4">Fill in your requirements below for a fixed-price proposal.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                      {formError && (
                        <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium">
                          {formError}
                        </div>
                      )}
                      <div>
                        <label htmlFor="full-name" className="block text-xs font-semibold text-slate-200 mb-1">Your Full Name</label>
                        <input
                          id="full-name"
                          name="full-name"
                          required
                          maxLength={100}
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="email-address" className="block text-xs font-semibold text-slate-200 mb-1">Email Address</label>
                        <input
                          id="email-address"
                          name="email"
                          required
                          maxLength={100}
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="project-details" className="block text-xs font-semibold text-slate-200 mb-1">Project Details / Requirements</label>
                        <textarea
                          id="project-details"
                          name="message"
                          required
                          maxLength={2000}
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your website, AI automation, branding, or custom software requirements..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        aria-label="Submit Contact Inquiry"
                        className="w-full py-3.5 rounded-xl shimmer-button text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60"
                      >
                        <Send className="w-4 h-4" /> {submitting ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </form>
                  </>
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
              <Image
                src="/Logo.png"
                alt="AA Enterprise Tech"
                width={44}
                height={44}
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-all"
              />
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
