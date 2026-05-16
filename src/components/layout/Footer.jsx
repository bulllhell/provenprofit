import { Link } from 'react-router-dom';
import logo from '../../assets/povG.png';
import { motion } from 'framer-motion';
import {
  RiInstagramLine,
  RiTwitterXLine,
  RiFacebookCircleLine,
  RiLinkedinBoxLine,
  RiWhatsappLine,
  RiArrowRightUpLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiTiktokLine,
} from 'react-icons/ri';

const LINKS_COMPANY = [
  { label: 'About Us',   to: '/#about' },
  { label: 'Services',   to: '/services' },
  { label: 'Portfolio',  to: '/portfolio' },
  { label: 'Packages',   to: '/#packages' },
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
  { icon: RiTwitterXLine,       label: 'X', href: 'https://x.com/proven__profit' },
  { icon: RiFacebookCircleLine, label: 'Facebook',  href: 'https://www.facebook.com/provenprofit001' },
  { icon: RiLinkedinBoxLine,    label: 'LinkedIn',  href: 'https://www.linkedin.com/in/olatunbosun-adeyemo-b09b84378?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { icon: RiTiktokLine,         label: 'TikTok',    href: 'https://www.tiktok.com/@provenprofit?_r=1&_t=ZS-96OEk5dRsBD' },
  { icon: RiWhatsappLine,       label: 'WhatsApp',  href: 'https://wa.me/message/322ETXOWGEWVG1' },
];

function FooterLink({ to, label }) {
  const isHash = to.startsWith('#') || to.includes('/#');
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
        className="group flex items-center gap-1.5 text-sm text-light-dim hover:text-orange-500 transition-colors duration-200 font-body"
      >
        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
          <RiArrowRightUpLine className="w-3 h-3 flex-shrink-0" />
        </span>
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark border-t border-dark-border overflow-hidden">

      {/* ── Background mesh ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-orange-500/5 blur-[80px]" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/5 blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid ────────────────────────── */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Proven Profit" className="h-9 w-auto object-contain" loading="lazy" />
            </Link>

            <p className="text-sm text-light-dim leading-relaxed font-body">
              A results-driven digital agency specialising in Shopify stores, eCommerce growth, and social media management for brands across the US, Canada, Australia, and Europe.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-1 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-light-dim border border-dark-border hover:border-orange-500/40 hover:text-orange-500 hover:bg-orange-500/8 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2.5 pt-1">
              <a href="mailto:info@provenprofitmarketing.com"
                className="flex items-center gap-2 text-xs text-light-dim hover:text-white transition-colors font-body">
                <RiMailLine className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span className="break-all">info@provenprofitmarketing.com</span>
              </a>
              <a href="https://wa.me/message/322ETXOWGEWVG1" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-light-dim hover:text-white transition-colors font-body">
                <RiWhatsappLine className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-black uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {LINKS_COMPANY.map((l) => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-black uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {LINKS_SERVICES.map((l) => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-black uppercase tracking-widest mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {LINKS_LEGAL.map((l) => <FooterLink key={l.label} {...l} />)}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="font-heading text-sm font-semibold text-black uppercase tracking-widest">
              Stay in the Loop
            </h4>
            <p className="text-xs text-light-dim font-body leading-relaxed">
              Get weekly eCommerce tips, case studies, and exclusive offers — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2.5"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="input-base text-xs"
                required
              />
              <button type="submit" className="btn-primary w-full justify-center text-xs py-3">
                Subscribe — It's Free
              </button>
            </form>
            <p className="text-[10px] text-light-dim/60 font-body">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────── */}
        <div className="py-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-light-dim font-body text-center sm:text-left">
            © {year} Proven Profit Marketing. All rights reserved. Built with{' '}
            <span className="text-orange-500">♥</span> for brands that mean business.
          </p>
          <div className="flex items-center gap-5">
            {LINKS_LEGAL.map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-xs text-light-dim hover:text-white transition-colors font-body">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}