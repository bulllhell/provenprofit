import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/povG.png';
import { motion } from 'framer-motion';
import {
  RiInstagramLine, RiTwitterLine, RiFacebookCircleLine,
  RiLinkedinBoxLine, RiWhatsappLine, RiArrowRightUpLine,
  RiMailLine, RiCheckLine, RiLoader4Line,
} from 'react-icons/ri';
import { SiTiktok } from 'react-icons/si';
import { useNewsletter } from '../../hooks/useNewsletter';

const LINKS_COMPANY = [
  { label: 'About Us',  to: '/#about'    },
  { label: 'Services',  to: '/services'  },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Packages',  to: '/#packages' },
];

const LINKS_SERVICES = [
  { label: 'Shopify Store Design',    to: '/services' },
  { label: 'eCommerce Management',    to: '/services' },
  { label: 'Social Media Management', to: '/services' },
  { label: 'Digital Marketing',       to: '/services' },
  { label: 'Brand Identity',          to: '/services' },
];

const LINKS_LEGAL = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Use',   to: '#' },
  { label: 'Refund Policy',  to: '#' },
];

const SOCIALS = [
  { icon: RiInstagramLine,      label: 'Instagram', href: 'https://www.instagram.com/proven_profit_' },
  { icon: RiTwitterLine,        label: 'X',         href: 'https://x.com/proven__profit' },
  { icon: RiFacebookCircleLine, label: 'Facebook',  href: 'https://www.facebook.com/provenprofit001' },
  { icon: RiLinkedinBoxLine,    label: 'LinkedIn',  href: 'https://www.linkedin.com/in/olatunbosun-adeyemo-b09b84378' },
  { icon: SiTiktok,             label: 'TikTok',    href: 'https://www.tiktok.com/@provenprofit?_r=1&_t=ZS-96OEk5dRsBD' },
  { icon: RiWhatsappLine,       label: 'WhatsApp',  href: 'https://wa.me/message/322ETXOWGEWVG1' },
];

function FooterLink({ to, label }) {
  const handleClick = (e) => {
    if (to.includes('/#')) {
      e.preventDefault();
      const id = to.split('/#')[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <li>
      <Link
        to={to}
        onClick={handleClick}
        className="group flex items-center gap-1.5 text-sm transition-colors duration-200 font-body"
        style={{ color: 'rgba(255,255,255,0.5)' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
      >
        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 flex-shrink-0">
          <RiArrowRightUpLine className="w-3 h-3" />
        </span>
        {label}
      </Link>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const { subscribe, status, message } = useNewsletter();

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribe(email);
  };

  if (status === 'success' || status === 'duplicate') {
    return (
      <div
        className="rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs font-body"
        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}
      >
        <RiCheckLine className="w-4 h-4 flex-shrink-0" style={{ color: '#34D399' }} />
        <span style={{ color: '#34D399' }}>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
      {status === 'error' && (
        <p className="text-[11px] font-body" style={{ color: '#F87171' }}>{message}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-xl text-xs font-heading font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
          boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
        }}
      >
        {status === 'loading'
          ? <><RiLoader4Line className="w-3.5 h-3.5 animate-spin" /> Subscribing...</>
          : 'Subscribe Free'
        }
      </button>
    </form>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#1A1023' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[80px]"
          style={{ background: 'rgba(249,115,22,0.05)' }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[80px]"
          style={{ background: 'rgba(124,58,237,0.06)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Proven Profit Marketing Agency" className="h-9 w-auto object-contain" loading="lazy" />
            </Link>
            <p className="text-sm leading-relaxed font-body" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A results-driven digital agency specialising in Shopify stores, eCommerce growth, and social media management for brands across the US, Canada, Australia, and Europe.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F97316';
                    e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)';
                    e.currentTarget.style.background = 'rgba(249,115,22,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'transparent';
                  }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Contact */}
            <div className="space-y-2.5 pt-1">
              <a href="mailto:info@provenprofitmarketing.com"
                className="flex items-center gap-2 text-xs font-body transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                <RiMailLine className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span className="break-all">support@provenprofitbrand.com</span>
              </a>
              <a href="https://wa.me/message/322ETXOWGEWVG1" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-body transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                <RiWhatsappLine className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Company</h4>
            <ul className="space-y-3">
              {LINKS_COMPANY.map(l => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Services</h4>
            <ul className="space-y-3">
              {LINKS_SERVICES.map(l => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Legal</h4>
            <ul className="space-y-3">
              {LINKS_LEGAL.map(l => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.6)' }}>Stay in the Loop</h4>
            <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Get weekly eCommerce tips, case studies, and exclusive offers straight to your inbox.
            </p>
            <NewsletterForm />
            <p className="text-[10px] font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-body text-center sm:text-left"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            {year} Proven Profit Marketing Agency. All rights reserved. Built with{' '}
            <span className="text-orange-500">&#9829;</span> for brands that mean business.
          </p>
          <div className="flex items-center gap-5">
            {LINKS_LEGAL.map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-xs font-body transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
