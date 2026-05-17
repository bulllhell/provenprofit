import { useState, useEffect, useCallback } from 'react';
import logo from '../../assets/newbos.png';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiArrowRightUpLine } from 'react-icons/ri';

const NAV_LINKS = [
  { label: 'Home',      to: '/' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Team',      to: '/Team' },
];

const WHATSAPP_URL = 'https://wa.me/2348059846912';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleHashLink = (e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);
      const id = to.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-dark-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between"
            style={{ height: 'clamp(60px, 10vw, 80px)' }}
          >

            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={logo}
                alt="Proven Profit"
                className="h-auto w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
                style={{ maxHeight: 'clamp(48px, 8vw, 72px)' }}
                loading="eager"
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={(e) => handleHashLink(e, to)}
                  style={{
                    position: 'relative',
                    fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)',
                  }}
                  className={({ isActive }) =>
                    `font-body font-medium tracking-wide rounded-lg transition-all duration-200
                    ${isActive && !to.includes('#')
                      ? 'text-orange-500 bg-orange-500/8'
                      : 'text-light-dim hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && !to.includes('#') && (
                        <span
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-orange-500"
                          style={{ position: 'absolute', width: 'clamp(8px, 1.5vw, 20px)' }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Link
                to="/book-a-call"
                className="btn-secondary"
                style={{
                  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                  padding: 'clamp(0.5rem, 0.8vw, 0.75rem) clamp(1rem, 2vw, 1.25rem)',
                }}
              >
                Book a Call
              </Link>

              {/* Get Started → WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
                style={{
                  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                  padding: 'clamp(0.5rem, 0.8vw, 0.75rem) clamp(1rem, 2vw, 1.25rem)',
                }}
              >
                Get Started
                <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-light-dim hover:text-white hover:bg-white/5 transition-colors"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <RiCloseLine className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <RiMenuLine className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] glass border-l border-dark-border flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-dark-border">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                  <img
                    src={logo}
                    alt="Proven Profit"
                    className="h-12 w-auto object-contain"
                    loading="eager"
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-light-dim hover:text-white hover:bg-white/5"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV_LINKS.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <NavLink
                      to={to}
                      onClick={(e) => handleHashLink(e, to)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-body font-medium transition-all duration-200
                        ${isActive && !to.includes('#')
                          ? 'text-orange-500 bg-orange-500/10'
                          : 'text-light-dim hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {label}
                      <RiArrowRightUpLine className="w-4 h-4 opacity-40" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-dark-border space-y-3">
                <Link
                  to="/book-a-call"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary w-full justify-center flex"
                >
                  Book a Call
                </Link>

                {/* Mobile Get Started → WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full justify-center flex"
                >
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