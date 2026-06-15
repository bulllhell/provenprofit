import { useState, useEffect, useCallback, useRef } from 'react';
import logo from '../../assets/newbos.png';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiMenuLine, RiCloseLine, RiArrowRightUpLine,
  RiArrowDownSLine, RiShoppingBag3Line, RiPaletteLine,
  RiInstagramLine, RiSearchLine, RiMailLine,
  RiAdvertisementLine, RiGlobalLine,
} from 'react-icons/ri';

// ── Service dropdown items ────────────────────────────────────
const SERVICE_ITEMS = [
  {
    icon: RiShoppingBag3Line,
    label: 'eCommerce Store Design',
    sub:   'Shopify & WooCommerce',
    to:    '/services/ecommerce',
    accent: '#F97316',
  },
  {
    icon: RiPaletteLine,
    label: 'Branding',
    sub:   'Identity, logo & brand system',
    to:    '/services/branding',
    accent: '#7C3AED',
  },
  {
    icon: RiInstagramLine,
    label: 'Social Media Management & Ads',
    sub:   'Instagram, TikTok, Meta Ads',
    to:    '/services/social-media',
    accent: '#E1306C',
  },
  {
    icon: RiSearchLine,
    label: 'SEO',
    sub:   'Organic growth & rankings',
    to:    '/services/seo',
    accent: '#4285F4',
  },
  {
    icon: RiMailLine,
    label: 'Email Marketing & Klaviyo Flows',
    sub:   'Automations, campaigns & flows',
    to:    '/services/email-marketing',
    accent: '#96BF48',
  },
  {
    icon: RiAdvertisementLine,
    label: 'Google Ads & Google My Business',
    sub:   'Paid search & local visibility',
    to:    '/services/google-ads',
    accent: '#FBBC05',
  },
  {
    icon: RiGlobalLine,
    label: 'Web Design',
    sub:   'Custom websites & landing pages',
    to:    '/services/web-design',
    accent: '#0081FB',
  },
];

const WHATSAPP_URL = 'https://wa.me/2348059846912';

// ── Services Dropdown (desktop) ───────────────────────────────
function ServicesDropdown({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] rounded-2xl overflow-hidden z-50"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--dark-border)',
            boxShadow: '0 20px 60px rgba(124,58,237,0.12), 0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div className="px-5 py-3.5 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--dark-border)', background: 'var(--light)' }}>
            <p className="text-xs font-heading font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}>
              Our Services
            </p>
          </div>

          {/* Grid */}
          <div className="p-3 grid grid-cols-2 gap-1">
            {/* All Services : always first */}
            <Link
              to="/services"
              className="col-span-2 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 mb-1"
              style={{
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                color: '#7C3AED',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)' }}>
                <RiGlobalLine className="w-4 h-4" style={{ color: '#7C3AED' }} />
              </div>
              <div>
                <p className="text-xs font-heading font-bold" style={{ color: '#7C3AED' }}>All Services</p>
                <p className="text-[10px] font-body mt-0.5" style={{ color: 'rgba(124,58,237,0.7)' }}>
                  Browse everything we offer
                </p>
              </div>
              <RiArrowRightUpLine className="w-3.5 h-3.5 ml-auto" style={{ color: '#7C3AED' }} />
            </Link>
            {SERVICE_ITEMS.map(({ icon: Icon, label, sub, to, accent }) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-150 group"
                style={{ color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.background = accent + '0e'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: accent + '15' }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-heading font-semibold leading-snug"
                    style={{ color: 'var(--text)' }}>
                    {label}
                  </p>
                  <p className="text-[10px] font-body mt-0.5 leading-snug"
                    style={{ color: 'var(--text-muted)' }}>
                    {sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-5 py-3 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--dark-border)', background: 'rgba(124,58,237,0.03)' }}>
            <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>
              Not sure which service you need?
            </p>
            <Link to="/book-a-call"
              className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
              }}>
              Book a free call
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ───────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [servicesOpen,   setServicesOpen]   = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const servicesRef = useRef(null);
  const hoverTimer  = useRef(null);
  const location    = useLocation();

  // Close everything on route change
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Hover open / close with small delay so dropdown doesn't flicker
  const handleServicesMouseEnter = () => {
    clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F7FF]/92 backdrop-blur-xl border-b shadow-[0_2px_20px_rgba(124,58,237,0.08)]'
            : 'bg-[#F8F7FF]/80 backdrop-blur-md'
        }`}
        style={{ borderColor: 'var(--dark-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"
            style={{ height: 'clamp(70px, 12vw, 100px)' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={logo}
                alt="Proven Profit"
                className="h-auto w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
                style={{ maxHeight: 'clamp(70px, 12vw, 120px)' }}
                loading="eager"
              />
            </Link>

            {/* ── Desktop nav ──────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Home */}
              <NavLink
                to="/"
                style={{ position: 'relative', fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)', padding: 'clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)' }}
                className={({ isActive }) =>
                  `font-body font-medium tracking-wide rounded-lg transition-all duration-200 ${
                    isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#7C3AED]"
                        style={{ position: 'absolute', width: 'clamp(8px, 1.5vw, 20px)' }} />
                    )}
                  </>
                )}
              </NavLink>

              {/* ── Services : click toggles dropdown listing all services ── */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  onClick={() => setServicesOpen(o => !o)}
                  className="flex items-center gap-1 font-body font-medium tracking-wide rounded-lg transition-all duration-200"
                  style={{
                    fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)',
                    color: isServicesActive || servicesOpen ? '#7C3AED' : '#4B4669',
                    background: isServicesActive || servicesOpen ? 'rgba(124,58,237,0.06)' : 'transparent',
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Services
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <RiArrowDownSLine className="w-4 h-4" />
                  </motion.span>
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#7C3AED]"
                      style={{ position: 'absolute', width: 'clamp(8px, 1.5vw, 20px)' }} />
                  )}
                </button>

                <ServicesDropdown open={servicesOpen} />
              </div>

              {/* Portfolio */}
              <NavLink
                to="/portfolio"
                style={{ position: 'relative', fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)', padding: 'clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)' }}
                className={({ isActive }) =>
                  `font-body font-medium tracking-wide rounded-lg transition-all duration-200 ${
                    isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Portfolio
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#7C3AED]"
                        style={{ position: 'absolute', width: 'clamp(8px, 1.5vw, 20px)' }} />
                    )}
                  </>
                )}
              </NavLink>

              {/* About Us */}
              <NavLink
                to="/about-us"
                style={{ position: 'relative', fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)', padding: 'clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)' }}
                className={({ isActive }) =>
                  `font-body font-medium tracking-wide rounded-lg transition-all duration-200 ${
                    isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About Us
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#7C3AED]"
                        style={{ position: 'absolute', width: 'clamp(8px, 1.5vw, 20px)' }} />
                    )}
                  </>
                )}
              </NavLink>

            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Link to="/book-a-call" className="btn-secondary"
                style={{ fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)', padding: 'clamp(0.5rem, 0.8vw, 0.75rem) clamp(1rem, 2vw, 1.25rem)' }}>
                Book a Call
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary group"
                style={{ fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)', padding: 'clamp(0.5rem, 0.8vw, 0.75rem) clamp(1rem, 2vw, 1.25rem)' }}>
                Get Started
                <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
              style={{ color: '#4B4669' }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: 0, opacity: 1 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <RiCloseLine className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 0, opacity: 1 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <RiMenuLine className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
              style={{ background: 'rgba(26,16,35,0.4)' }}
            />

            <motion.div key="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] flex flex-col lg:hidden"
              style={{ background: '#F8F7FF', borderLeft: '1px solid var(--dark-border)', boxShadow: '-8px 0 32px rgba(124,58,237,0.1)' }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--dark-border)' }}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo} alt="Proven Profit" className="h-12 w-auto object-contain" loading="eager" />
                </Link>
                <button onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{ color: '#4B4669' }}>
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">

                {/* Home */}
                <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 }}>
                  <NavLink to="/" onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                        isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                      }`
                    }>
                    Home <RiArrowRightUpLine className="w-4 h-4 opacity-40" />
                  </NavLink>
                </motion.div>

                {/* ── Services : link to /services + accordion for sub pages ── */}
                <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                  <button
                    onClick={() => setMobileServOpen(o => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all"
                    style={{
                      color: isServicesActive || mobileServOpen ? '#7C3AED' : '#4B4669',
                      background: isServicesActive || mobileServOpen ? 'rgba(124,58,237,0.06)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Services
                    <motion.span animate={{ rotate: mobileServOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <RiArrowDownSLine className="w-4 h-4" />
                    </motion.span>
                  </button>

                  {/* Expandable sub-list */}
                  <AnimatePresence initial={false}>
                    {mobileServOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pr-2 pb-2 space-y-0.5 mt-1">
                          {/* All Services first */}
                          <Link
                            to="/services"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-body font-bold transition-all"
                            style={{ color: '#7C3AED', background: 'rgba(124,58,237,0.06)' }}
                          >
                            <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(124,58,237,0.15)' }}>
                              <RiGlobalLine className="w-3 h-3" style={{ color: '#7C3AED' }} />
                            </span>
                            All Services
                            <RiArrowRightUpLine className="w-3 h-3 ml-auto" style={{ color: '#7C3AED' }} />
                          </Link>
                          {SERVICE_ITEMS.map(({ icon: Icon, label, to, accent }) => (
                            <Link
                              key={to}
                              to={to}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-body font-medium transition-all"
                              style={{ color: '#4B4669' }}
                              onMouseEnter={e => { e.currentTarget.style.background = accent + '0e'; e.currentTarget.style.color = accent; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B4669'; }}
                            >
                              <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: accent + '15' }}>
                                <Icon className="w-3 h-3" style={{ color: accent }} />
                              </span>
                              {label}
                            </Link>
                          ))}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Portfolio */}
                <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
                  <NavLink to="/portfolio" onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                        isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                      }`
                    }>
                    Portfolio <RiArrowRightUpLine className="w-4 h-4 opacity-40" />
                  </NavLink>
                </motion.div>

                {/* About Us */}
                <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
                  <NavLink to="/about-us" onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                        isActive ? 'text-[#7C3AED] bg-purple-50' : 'text-[#4B4669] hover:text-[#1E1B2E] hover:bg-purple-50'
                      }`
                    }>
                    About Us <RiArrowRightUpLine className="w-4 h-4 opacity-40" />
                  </NavLink>
                </motion.div>

              </nav>

              {/* Drawer footer */}
              <div className="p-4 space-y-3 border-t" style={{ borderColor: 'var(--dark-border)' }}>
                <Link to="/book-a-call" onClick={() => setMenuOpen(false)}
                  className="btn-secondary w-full justify-center flex">
                  Book a Call
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full justify-center flex">
                  Get Started <RiArrowRightUpLine className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}