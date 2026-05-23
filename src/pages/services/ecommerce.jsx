import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  RiShoppingBag3Line, RiCheckLine, RiArrowRightUpLine,
  RiSmartphoneLine, RiSpeedLine, RiShieldCheckLine,
  RiPaletteLine, RiBarChart2Line, RiSettings3Line,
  RiStarFill, RiTimeLine, RiTeamLine, RiGlobalLine,
  RiFireLine, RiExternalLinkLine, RiZoomInLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ── Animated counter hook ───────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Tilt card hook ──────────────────────────────────────── */
function TiltCard({ children, style, className, intensity = 8, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  const handleMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll progress bar ─────────────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      height: 3, background: 'transparent',
    }}>
      <motion.div style={{
        height: '100%', width: `${progress}%`,
        background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB}, #FCD34D)`,
        boxShadow: `0 0 10px ${ACCENT}80`,
        transition: 'width 0.1s linear',
      }} />
    </div>
  );
}

/* ── Cursor glow ─────────────────────────────────────────── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave); };
  }, []);
  return (
    <div style={{
      position: 'fixed', pointerEvents: 'none', zIndex: 9999,
      left: pos.x - 200, top: pos.y - 200,
      width: 400, height: 400, borderRadius: '50%',
      background: `radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)`,
      opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
      transform: 'translate(0,0)',
    }} />
  );
}

/* ── Floating orbs ───────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[
        { w: 500, h: 300, top: '5%',  left: '20%',  color: 'rgba(249,115,22,0.07)', dur: '8s'  },
        { w: 350, h: 220, top: '10%', right: '15%', color: 'rgba(124,58,237,0.05)', dur: '11s' },
        { w: 280, h: 180, top: '40%', left: '5%',   color: 'rgba(249,115,22,0.04)', dur: '14s' },
        { w: 200, h: 140, top: '60%', right: '10%', color: 'rgba(251,146,60,0.05)', dur: '9s'  },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.w, height: orb.h,
            top: orb.top, left: orb.left, right: orb.right,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(60px)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: parseFloat(orb.dur), repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ── Dot grid ────────────────────────────────────────────── */
function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `radial-gradient(circle, rgba(249,115,22,0.55) 1px, transparent 1px)`,
      backgroundSize: '40px 40px', opacity: 0.025,
      WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
    }} />
  );
}

/* ── Section tag ─────────────────────────────────────────── */
function SectionTag({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 14px', borderRadius: 100,
        background: `${ACCENT}12`, border: `1px solid ${ACCENT}28`,
        color: ACCENT,
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 16,
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: ACCENT,
        boxShadow: `0 0 6px ${ACCENT}`,
        animation: 'pulse-dot 2s ease-in-out infinite',
      }} />
      {children}
      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }`}</style>
    </motion.span>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const FEATURES = [
  { icon: RiPaletteLine,    title: 'Custom Store Design',  desc: 'Every store is designed from scratch around your brand — not a generic template. Clean, modern, built to impress.' },
  { icon: RiSmartphoneLine, title: 'Mobile First Build',   desc: 'Over 70% of shoppers browse on mobile. Every pixel is optimised for phones before desktop.' },
  { icon: RiSpeedLine,      title: 'Speed Optimised',      desc: 'Fast load times reduce bounce and boost conversions. We optimise every store for Core Web Vitals.' },
  { icon: RiBarChart2Line,  title: 'Conversion Focused',   desc: 'Strategic product page layouts, trust signals, upsells and checkout flows engineered to turn browsers into buyers.' },
  { icon: RiSettings3Line,  title: 'Full App & Plugin Setup', desc: 'Reviews, loyalty, email capture, upsells — we set up and configure every app you need.' },
  { icon: RiShieldCheckLine,'title': 'Payment Gateways',   desc: 'Stripe, PayPal, Shopify Payments and more — fully set up and tested before launch.' },
  { icon: RiGlobalLine,     title: 'SEO Foundation',       desc: 'Proper meta tags, sitemaps, schema markup and site structure so Google can find and rank your store.' },
  { icon: RiTeamLine,       title: 'Post Launch Support',  desc: 'We do not disappear after launch. Every package includes post launch support so you are never left stranded.' },
];

const PROCESS = [
  { step: '01', title: 'Discovery Call',     desc: 'We learn your brand, goals, products and audience in a 30 min call.' },
  { step: '02', title: 'Design & Wireframe', desc: 'We design the layout and present it for approval before building.' },
  { step: '03', title: 'Build & Develop',    desc: 'Full store build — design, functionality, apps, and content.' },
  { step: '04', title: 'Review & Revisions', desc: 'You review everything. We revise until you are 100% happy.' },
  { step: '05', title: 'Launch & Support',   desc: 'We launch your store and provide support through the handover period.' },
];

const PACKAGES = [
  {
    name: 'Starter', price: 499, tagline: 'Perfect for new brands',
    color: '#94A3B8', colorB: '#CBD5E1', badge: null, days: 14,
    features: ['5 page Shopify store','Mobile responsive design','Product upload (up to 20)','Payment gateway setup','Basic SEO setup','Speed optimisation','1 round of revisions','14 day post launch support'],
  },
  {
    name: 'Growth', price: 999, tagline: 'For brands ready to scale',
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular', days: 21,
    features: ['10 page Shopify store','Custom premium theme','Product upload (up to 50)','Payment gateway setup','Advanced SEO setup','Klaviyo email integration','Upsell & cross sell setup','Speed & CRO optimisation','3 rounds of revisions','30 day post launch support'],
  },
  {
    name: 'Pro', price: 1999, tagline: 'Full stack eCommerce build',
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Best Value', days: 30,
    features: ['Fully custom Shopify store','Custom UI/UX design','Unlimited product upload','All payment gateways','Full SEO + blog setup','Klaviyo flows (welcome, cart)','Review & loyalty app setup','Custom app integrations','Google Analytics + Meta Pixel','5 rounds of revisions','60 day post launch support'],
  },
  {
    name: 'Enterprise', price: null, tagline: 'For serious 6 figure brands',
    color: '#34D399', colorB: '#2563EB', badge: 'Custom', days: null,
    features: ['Everything in Pro','Multi currency and multi language','Custom checkout experience','Advanced funnel build','Full brand identity package','Dedicated project manager','Ongoing growth strategy','Priority 24h support','Quarterly strategy sessions'],
  },
];

const TESTIMONIALS = [
  { name: 'Kelvin A.', handle: 'Fitness Brand Owner',   stars: 5, text: 'They built our Shopify store in under 3 weeks and sales were up from day one. The design is clean, fast, and our customers love it.' },
  { name: 'Ella M.',   handle: 'Beauty Brand Founder',  stars: 5, text: 'Professional from start to finish. They understood exactly what we needed and delivered beyond expectations. Would 100% recommend.' },
  { name: 'Tosan B.',  handle: 'Clothing Store Owner',  stars: 5, text: 'Our conversion rate doubled after the redesign. The attention to detail on mobile is exceptional.' },
];
/* ── Store inspiration — real world eCommerce benchmarks ─── */
const INSPO = [
  {
    label: 'Fashion Store',
    url:   'https://dignitestore.com',
    desc:  'Clean editorial fashion with bold typography and immersive product storytelling.',
    color: '#E879A0',
    tag:   'Fashion',
    img:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Gym and Fitness',
    url:   'https://gymshark.com',
    desc:  'High energy visuals and fast product discovery built for performance brands.',
    color: '#3B82F6',
    tag:   'Fitness',
    img:   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Sport and Outdoor',
    url:   'https://us.oneill.com',
    desc:  'Lifestyle brand energy with surf culture, seasonal drops and collection storytelling.',
    color: '#F97316',
    tag:   'Sport',
    img:   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Books and Stationery',
    url:   'https://lebenskompass.eu',
    desc:  'Warm editorial bookshop aesthetic with category browsing and community feel.',
    color: '#8B5CF6',
    tag:   'Lifestyle',
    img:   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Phone and Tech',
    url:   'https://eu.mous.co',
    desc:  'Premium product photography, interactive features and conversion focused layout.',
    color: '#6366F1',
    tag:   'Tech',
    img:   'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Beauty Store',
    url:   'https://glamnetic.com',
    desc:  'Feminine, vibrant brand world with before and after imagery and social proof.',
    color: '#EC4899',
    tag:   'Beauty',
    img:   'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Travel Bags',
    url:   'https://calpaktravel.com',
    desc:  'Aspirational travel world with colour selector, lifestyle photography and bundles.',
    color: '#10B981',
    tag:   'Travel',
    img:   'https://images.unsplash.com/photo-1553531384-411a247ccd73?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Eyewear and Sunglasses',
    url:   'https://blenderseyewear.com',
    desc:  'Bold colour forward design with try on features and sport lifestyle positioning.',
    color: '#F59E0B',
    tag:   'Eyewear',
    img:   'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80',
  },
];



const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ── Stat counter pill ───────────────────────────────────── */
function StatPill({ icon: Icon, label, target, suffix = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(target, 1600, inView);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}
    >
      <Icon style={{ width: 14, height: 14, color: ACCENT }} />
      <strong style={{ color: ACCENT, fontWeight: 700 }}>{count}{suffix}</strong>
      {label}
    </motion.span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function EcommercePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <ScrollProgress />
      <CursorGlow />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <FloatingOrbs />
        <DotGrid />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-5">
            <motion.span
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 18px', borderRadius: 100,
                background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'default',
              }}
            >
              <RiFireLine style={{ width: 14, height: 14 }} />
              eCommerce Service
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.25rem', letterSpacing: '-0.025em', color: 'var(--text)' }}
          >
            eCommerce Store Design{' '}
            <span style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'shimmer-text 3s linear infinite',
            }}>
              That Converts
            </span>
            <style>{`@keyframes shimmer-text { 0%{background-position:0% center} 100%{background-position:200% center} }`}</style>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 2rem', color: 'var(--text-muted)' }}
          >
            We build high converting Shopify and WooCommerce stores from the ground up.
            Mobile first, blazing fast, and engineered to turn visitors into paying customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <Link to="/book-a-call" className="btn-primary group" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Get a Free Strategy Call
              <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
            </Link>
            <a
              href="#packages"
              onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary"
            >
              View Packages
            </a>
          </motion.div>

          {/* Animated stat strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 40 }}
          >
            <StatPill icon={RiShoppingBag3Line} target={120} suffix="+" label=" Stores Built" />
            <StatPill icon={RiStarFill}         target={5}   suffix=""  label=" Star Rated" />
            <StatPill icon={RiTimeLine}         target={100} suffix="%" label=" On Time" />
            <StatPill icon={RiShieldCheckLine}  target={60}  suffix=""  label=" Day Support" />
          </motion.div>
        </div>
      </section>

      {/* ── What We Build ─────────────────────────────────── */}
      <section className="py-20" style={{ background: '#F1EEF9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>What You Get</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Everything built into every store
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  borderRadius: 16, padding: '20px 22px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${ACCENT}35`;
                  e.currentTarget.style.boxShadow   = `0 8px 32px rgba(249,115,22,0.10)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
                  e.currentTarget.style.boxShadow   = '0 2px 12px rgba(124,58,237,0.04)';
                }}
              >
                {/* Shimmer top bar on hover via CSS variable trick */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)`, opacity: 0, transition: 'opacity 0.3s' }}
                  className="feature-bar" />

                <div style={{
                  width: 42, height: 42, borderRadius: 11, marginBottom: 14,
                  background: `${ACCENT}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, transform 0.2s',
                }}>
                  <Icon style={{ width: 20, height: 20, color: ACCENT }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{title}</h3>
                <p  style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ───────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>How It Works</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              From idea to live store
            </motion.h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Animated connector line */}
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              style={{
                position: 'absolute', left: 22, top: 22, bottom: 22, width: 2,
                background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENTB}50, transparent)`,
                transformOrigin: 'top', display: 'none',
              }}
              className="process-line"
            />
            <style>{`.process-line { display: block !important; }`}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {PROCESS.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{
                      width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13, color: '#fff', zIndex: 1,
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
                      boxShadow: `0 4px 18px ${ACCENT}40`,
                    }}
                  >
                    {step}
                  </motion.div>
                  <div style={{ paddingTop: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>{title}</h3>
                    <p  style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────── */}
      <section id="packages" className="py-20" style={{ background: '#F1EEF9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Pricing</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}
            >
              Choose your package
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto' }}>
              All prices in USD. One time payment. No hidden fees.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard
                key={pkg.name}
                intensity={pkg.badge === 'Most Popular' ? 5 : 7}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative', borderRadius: 20, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  background: pkg.badge === 'Most Popular' ? 'linear-gradient(145deg, #FFF7ED, #FFF3E6)' : '#FFFFFF',
                  border: pkg.badge === 'Most Popular' ? `1.5px solid ${pkg.color}45` : '1px solid rgba(0,0,0,0.08)',
                  boxShadow: pkg.badge === 'Most Popular' ? `0 8px 40px ${pkg.color}18` : '0 2px 14px rgba(0,0,0,0.05)',
                }}
              >
                {/* Top gradient line */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${pkg.color}, ${pkg.colorB})`, flexShrink: 0 }} />

                {/* Glow for popular */}
                {pkg.badge === 'Most Popular' && (
                  <div style={{
                    position: 'absolute', top: 0, left: '20%', right: '20%', height: 60,
                    background: `radial-gradient(ellipse, ${pkg.color}18 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {pkg.badge && (
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <motion.span
                      animate={pkg.badge === 'Most Popular' ? { scale: [1, 1.04, 1] } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
                        textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100,
                        background: `${pkg.color}18`, color: pkg.color, border: `1px solid ${pkg.color}35`,
                        display: 'inline-block',
                      }}
                    >
                      {pkg.badge}
                    </motion.span>
                  </div>
                )}

                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 3 }}>{pkg.name}</h3>
                    <p  style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pkg.tagline}</p>
                  </div>

                  <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    {pkg.price === null ? (
                      <span style={{ fontSize: 28, fontWeight: 800, color: pkg.color }}>Custom</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>$</span>
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                          style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, color: pkg.color, letterSpacing: '-0.03em' }}
                        >
                          {pkg.price.toLocaleString()}
                        </motion.span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 5 }}>USD</span>
                      </div>
                    )}
                    {pkg.days && (
                      <p style={{ fontSize: 11, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
                        <RiTimeLine style={{ width: 12, height: 12, color: pkg.color }} />
                        Delivered in {pkg.days} days
                      </p>
                    )}
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20, flex: 1 }}>
                    {pkg.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + fi * 0.04, duration: 0.35 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}
                      >
                        <RiCheckLine style={{ width: 13, height: 13, flexShrink: 0, marginTop: 2, color: pkg.color }} />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  {pkg.price === null ? (
                    <Link to="/book-a-call" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      width: '100%', padding: '12px 18px', borderRadius: 100,
                      fontWeight: 700, fontSize: 13, color: '#fff', textAlign: 'center',
                      background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`,
                      boxShadow: `0 4px 18px ${pkg.color}30`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 28px ${pkg.color}45`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 18px ${pkg.color}30`; }}
                    >
                      Book a Call <RiArrowRightUpLine style={{ width: 14, height: 14 }} />
                    </Link>
                  ) : (
                    <Link to="/book-a-call" style={{
                      display: 'block', width: '100%', padding: '12px 18px', borderRadius: 100,
                      fontWeight: 700, fontSize: 13, color: '#fff', textAlign: 'center',
                      background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`,
                      boxShadow: `0 4px 18px ${pkg.color}30`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 28px ${pkg.color}45`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 18px ${pkg.color}30`; }}
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Client Reviews</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              What our clients say
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, handle, text, stars }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  borderRadius: 18, padding: 24,
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor=`${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(124,58,237,0.04)'; e.currentTarget.style.borderColor='rgba(0,0,0,0.07)'; }}
              >
                {/* Big quote mark */}
                <div style={{
                  position: 'absolute', top: 10, right: 16,
                  fontSize: 72, lineHeight: 1, color: `${ACCENT}10`,
                  fontFamily: 'Georgia, serif', fontWeight: 900, userSelect: 'none',
                }}>
                  {'"'}
                </div>

                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(stars)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0, rotate: -30 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.06, type: 'spring', stiffness: 400 }}
                    >
                      <RiStarFill style={{ width: 14, height: 14, color: '#F59E0B' }} />
                    </motion.div>
                  ))}
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 18, color: 'var(--text-muted)', position: 'relative', zIndex: 1 }}>
                  "{text}"
                </p>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{name}</p>
                  <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{handle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Store Inspiration ─────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>The Standard We Build Toward</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Stores we study and build to match
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
              These are real brands at the top of their categories. We study what makes
              each one convert, then bring that same level of craft to your store.
              Click any card to visit the live site.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {INSPO.map((site, i) => (
              <motion.div
                key={site.label}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => window.open(site.url, '_blank', 'noopener')}
                style={{
                  position: 'relative', borderRadius: 18, overflow: 'hidden',
                  cursor: 'pointer', background: '#fff',
                  border: `1px solid ${site.color}25`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 44px ${site.color}22`; e.currentTarget.style.borderColor = `${site.color}50`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = `${site.color}25`; }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 176, overflow: 'hidden' }}>
                  <img
                    src={site.img}
                    alt={`${site.label} eCommerce store inspiration`}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)' }} />
                  {/* Tag pill */}
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: site.color }}>
                    {site.tag}
                  </div>
                  {/* External link icon */}
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RiExternalLinkLine style={{ width: 14, height: 14, color: site.color }} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '16px 18px 20px' }}>
                  <div style={{ width: 28, height: 3, borderRadius: 100, background: site.color, marginBottom: 10 }} />
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6, lineHeight: 1.2 }}>{site.label}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: 12 }}>{site.desc}</p>
                  <a
                    href={site.url} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: site.color, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Visit site <RiExternalLinkLine style={{ width: 11, height: 11 }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA below grid */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.65 }}>
              Your store deserves to sit at this level.{' '}
              <span style={{ color: 'var(--text)', fontWeight: 800 }}>Let us build it.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section style={{ paddingBottom: '6rem', padding: '0 1rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 700, margin: '0 auto', borderRadius: 28,
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(145deg, #FFF7ED, #FFF3E6)',
            border: `1px solid ${ACCENT}20`,
            boxShadow: `0 12px 56px ${ACCENT}12`,
          }}
        >
          {/* Animated bg blob */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
              width: 400, height: 200, borderRadius: '50%',
              background: `${ACCENT}14`, filter: 'blur(40px)', pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag>Ready to Start?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Let us build your store
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32, maxWidth: 440, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              Book a free 20 minute strategy call. We will review your brand and recommend
              the right package to get your store live and converting.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary group" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book a Free Strategy Call
                <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#packages"
                onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-secondary"
              >
                View Packages
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}