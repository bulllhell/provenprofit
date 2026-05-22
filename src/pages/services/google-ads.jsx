import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  RiGoogleLine, RiMapPinLine, RiBarChart2Line, RiSearchLine,
  RiCursorLine, RiMoneyDollarCircleLine, RiPieChartLine,
  RiPhoneLine, RiMapLine, RiStarFill,
  RiCheckLine, RiArrowRightUpLine, RiFireLine, RiTimeLine,
  RiShieldCheckLine, RiLineChartLine, RiCrosshairLine,
  RiMegaphoneLine, RiDashboardLine, RiSettings3Line,
  RiRefreshLine, RiEyeLine, RiCalendarLine, RiCloseLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ── Portfolio proof images (Cloudinary) ────────────────── */
const PROOF = [
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407953/WhatsApp_Image_2026-05-21_at_20.20.45_bcbzbe.jpg',  label: 'Ad Campaign Results'   },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407957/WhatsApp_Image_2026-05-21_at_20.20.44_2_oxqjzx.jpg', label: 'Google Ads Dashboard'  },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407963/WhatsApp_Image_2026-05-21_at_20.20.44_1_xkitvh.jpg', label: 'ROI Breakdown'          },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407969/WhatsApp_Image_2026-05-21_at_20.20.44_mvt6b7.jpg',   label: 'Local Visibility'       },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407975/WhatsApp_Image_2026-05-21_at_20.20.43_1_angoz6.jpg', label: 'Google Business Profile' },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779407980/WhatsApp_Image_2026-05-21_at_20.20.43_jhxvh8.jpg',   label: 'Search Performance'     },
];

/* ── Unsplash explainer images ───────────────────────────── */
const IMG = {
  hero:    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80',
  search:  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80',
  local:   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  results: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
};

/* ── Packages ─────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'start', name: 'Start', price: 99, period: 'mo',
    color: '#94A3B8', colorB: '#CBD5E1', badge: null,
    tagline: 'Get your ads live and spending smart.',
    note: 'Ad budget paid separately by you directly to Google.',
    features: [
      'Google Ads account setup',
      'Up to 1 active campaign',
      'Keyword research and selection',
      'Ad copy writing (2 variations)',
      'Conversion tracking setup',
      'Monthly performance report',
      'Budget recommendations',
    ],
    notIncluded: ['Google My Business management', 'Remarketing campaigns', 'A/B split testing'],
  },
  {
    id: 'standard', name: 'Standard', price: 299, period: 'mo',
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular',
    tagline: 'Full campaign management with local dominance.',
    note: 'Ad budget paid separately by you directly to Google.',
    features: [
      'Everything in Start',
      'Up to 3 active campaigns',
      'Google My Business optimisation',
      'GMB post schedule (4 per month)',
      'Review response management',
      'Remarketing audience setup',
      'A/B ad copy testing',
      'Bi weekly performance reports',
      'Competitor ad analysis',
    ],
    notIncluded: ['Shopping campaigns', 'Video ad creative'],
  },
  {
    id: 'pro', name: 'Pro', price: 599, period: 'mo',
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Full Service',
    tagline: 'Aggressive growth with every lever pulled.',
    note: 'Ad budget paid separately by you directly to Google.',
    features: [
      'Everything in Standard',
      'Unlimited active campaigns',
      'Google Shopping campaigns',
      'YouTube pre roll ad management',
      'Full GMB strategy and optimisation',
      'Local Services Ads setup',
      'Weekly strategy calls',
      'Custom landing page recommendations',
      'Weekly detailed reports',
      'Priority response within 24 hours',
    ],
    notIncluded: [],
  },
];

/* ── What we manage ─────────────────────────────────────── */
const SERVICES = [
  {
    icon: RiSearchLine, color: '#F97316',
    img: IMG.search,
    title: 'Google Search Ads',
    sub: 'Show up when people are ready to buy',
    desc: 'We build campaigns that put your business at the top of Google the moment someone searches for exactly what you sell. Every keyword, every bid, every ad is engineered around one goal — profitable clicks from people with buying intent.',
    tags: ['Keyword targeting', 'Bid management', 'Ad copywriting', 'Quality score'],
  },
  {
    icon: RiMapPinLine, color: '#10B981',
    img: IMG.local,
    title: 'Google My Business',
    sub: 'Own the map pack in your area',
    desc: 'Your Google Business Profile is the most valuable free real estate on the internet and most businesses leave it half empty. We optimise every field, manage your reviews, post weekly updates, and push your listing into the map pack so local customers find you first.',
    tags: ['Profile optimisation', 'Review strategy', 'Weekly posts', 'Map pack ranking'],
  },
  {
    icon: RiLineChartLine, color: '#0EA5E9',
    img: IMG.results,
    title: 'Performance Tracking',
    sub: 'Every dollar accounted for',
    desc: 'We set up conversion tracking so you know exactly which clicks turned into calls, form fills, and sales. No vanity metrics. You get clear reports showing cost per lead, return on ad spend, and what we are doing next to improve both.',
    tags: ['Conversion tracking', 'ROAS reporting', 'Cost per lead', 'Monthly reviews'],
  },
];

/* ── How it works ───────────────────────────────────────── */
const PROCESS = [
  { n: '01', title: 'Audit and Setup',      desc: 'We audit your existing account or build it from scratch. Tracking, billing, structure — all done right before a single penny is spent.' },
  { n: '02', title: 'Research and Build',   desc: 'Keyword research, competitor analysis, audience mapping, ad copy. We build campaigns that match how your buyers actually search.' },
  { n: '03', title: 'Launch and Monitor',   desc: 'Campaigns go live. We watch performance daily, cut what wastes budget, and scale what converts.' },
  { n: '04', title: 'Report and Optimise',  desc: 'Regular reports show exactly where every dollar went. We adjust bids, test new angles, and compound the results every month.' },
];

/* ── FAQ ──────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Do I pay for the ad budget on top of your fee?',
    a: 'Yes. Your management fee pays us to run the campaigns. Your ad budget goes directly to Google — we never touch it. This keeps things transparent and means every dollar you spend on ads actually goes to ads.',
  },
  {
    q: 'How much should I spend on ads?',
    a: 'For most local businesses we recommend starting at $500 to $1,000 per month in ad spend. For eCommerce, $1,000 to $3,000 gives enough data to optimise properly. We will give you a specific recommendation based on your category and goals.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Google Search Ads can generate leads from day one. The first two weeks are a learning phase where Google optimises delivery. By week three you usually have enough data to start making meaningful improvements.',
  },
  {
    q: 'What is Google My Business management?',
    a: 'GMB is your free listing on Google Maps and Search. We optimise your profile, respond to reviews, add weekly posts, upload photos, and manage your Q&A so Google ranks you higher in local results.',
  },
  {
    q: 'Can you take over an existing account?',
    a: 'Absolutely. We audit what is already there, identify wasted spend and missed opportunities, and rebuild or clean up the account structure before taking over management.',
  },
];

/* ── Shared helpers ─────────────────────────────────────── */
function useCountUp(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const u = () => {
      const el = document.documentElement;
      setP((el.scrollTop || document.body.scrollTop) / (el.scrollHeight - el.clientHeight) * 100);
    };
    window.addEventListener('scroll', u, { passive: true });
    return () => window.removeEventListener('scroll', u);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, height: 3 }}>
      <div style={{
        height: '100%', width: `${p}%`,
        background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB}, #FCD34D)`,
        boxShadow: `0 0 10px ${ACCENT}80`, transition: 'width 0.1s linear',
      }} />
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const m = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVis(true); };
    const l = () => setVis(false);
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseleave', l);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseleave', l); };
  }, []);
  return (
    <div style={{
      position: 'fixed', pointerEvents: 'none', zIndex: 9999,
      left: pos.x - 220, top: pos.y - 220,
      width: 440, height: 440, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)',
      opacity: vis ? 1 : 0, transition: 'opacity 0.3s',
    }} />
  );
}

function SectionTag({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '5px 14px', borderRadius: 100,
        background: `${ACCENT}12`, border: `1px solid ${ACCENT}28`,
        color: ACCENT, fontSize: 10, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16,
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`,
        animation: 'pdot 2s ease-in-out infinite',
      }} />
      {children}
      <style>{`@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>
    </motion.span>
  );
}

function TiltCard({ children, style, intensity = 6, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
  const move = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }, [x, y]);
  return (
    <motion.div
      ref={ref} onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      {...rest}
    >{children}</motion.div>
  );
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[
        { w: 500, h: 300, top: '5%',  left: '15%',  c: 'rgba(249,115,22,0.08)', d: 8  },
        { w: 360, h: 220, top: '20%', right: '8%',  c: 'rgba(124,58,237,0.05)', d: 11 },
        { w: 260, h: 160, top: '55%', left: '5%',   c: 'rgba(249,115,22,0.05)', d: 14 },
      ].map((o, i) => (
        <motion.div key={i} style={{
          position: 'absolute', width: o.w, height: o.h,
          top: o.top, left: o.left, right: o.right,
          borderRadius: '50%', background: o.c, filter: 'blur(60px)',
        }}
          animate={{ y: [0, -28, 0], x: [0, 16, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 1.4 }}
        />
      ))}
    </div>
  );
}

function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
      backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.55) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
    }} />
  );
}

function StatPill({ icon: Icon, label, target, suffix = '', prefix = '' }) {
  const [iv, setIv] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(target, 1700, iv);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIv(true); }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <span ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
      <Icon style={{ width: 14, height: 14, color: ACCENT }} />
      <strong style={{ color: ACCENT, fontWeight: 700 }}>{prefix}{count}{suffix}</strong>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function GoogleAdsPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <ScrollProgress />
      <CursorGlow />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingTop: '9rem', paddingBottom: '5rem', overflow: 'hidden' }}>
        <FloatingOrbs />
        <DotGrid />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 52, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '7px 18px', borderRadius: 100,
                  background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>
                  <RiGoogleLine style={{ width: 14, height: 14 }} />
                  Google Ads and GMB
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}
              >
                Be at the top of Google{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`,
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  before your competitors wake up.
                </span>
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}
              >
                We manage your Google Ads and Google My Business so your business
                shows up first — in search results, on Google Maps, and in front of
                buyers who are ready to spend right now. You keep your ad budget.
                We make every dollar of it work harder.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}
              >
                <a href="#packages"
                  onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  See Packages
                  <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </a>
                <Link to="/book-a-call" className="btn-secondary">
                  Free Audit Call
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <StatPill icon={RiCursorLine}  target={4}   suffix="x"  label=" avg ROAS" prefix="" />
                <StatPill icon={RiMapPinLine}  target={100} suffix="+"  label=" local businesses ranked" />
                <StatPill icon={RiStarFill}    target={5}   suffix=""   label=" star rated" />
              </motion.div>
            </div>

            {/* Right — hero image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <TiltCard intensity={4} style={{
                borderRadius: 24, overflow: 'hidden',
                boxShadow: `0 28px 70px rgba(249,115,22,0.18)`,
                border: `1px solid ${ACCENT}22`,
              }}>
                <Img
                  src={IMG.hero}
                  alt="Google Ads dashboard showing campaign performance and click data"
                  style={{ width: '100%', height: 380, objectFit: 'cover' }}
                />
                {/* Live campaign badge */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20,
                  background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
                  borderRadius: 14, padding: '12px 16px',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', gap: 10,
                  border: '1px solid rgba(0,0,0,0.05)',
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#10B981',
                    boxShadow: '0 0 8px #10B981', animation: 'pdot 2s ease-in-out infinite',
                  }} />
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Campaign Status</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Live and Converting</p>
                  </div>
                </div>
              </TiltCard>

              {/* Floating ROAS card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -18, right: -18,
                  background: '#fff', borderRadius: 14, padding: '12px 16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.05)', minWidth: 148,
                }}
              >
                <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Return on Ad Spend</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>4.2x</span>
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>this month</span>
                </div>
                <div style={{ marginTop: 8, height: 4, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: '78%' }}
                    transition={{ delay: 0.9, duration: 1.2 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB})`, borderRadius: 100 }}
                  />
                </div>
              </motion.div>

              {/* Floating GMB badge */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                style={{
                  position: 'absolute', bottom: 80, right: -22,
                  background: '#fff', borderRadius: 14, padding: '10px 14px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <RiMapPinLine style={{ width: 16, height: 16, color: '#10B981', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Map Pack</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Position #1</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── KEY DIFFERENCE BANNER ─────────────────────────── */}
      <section style={{ padding: '2.5rem 1.5rem', background: `${ACCENT}08`, borderTop: `1px solid ${ACCENT}18`, borderBottom: `1px solid ${ACCENT}18` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}
          >
            <RiMoneyDollarCircleLine style={{ width: 20, height: 20, color: ACCENT, flexShrink: 0 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', maxWidth: 680, lineHeight: 1.65 }}>
              <span style={{ color: ACCENT, fontWeight: 800 }}>Your ad budget goes directly to Google — not through us.</span>
              {' '}Our fee covers the management, strategy, and optimisation only.
              You stay in full control of your spend at all times.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Manage</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}
            >
              Three ways we put you in front of buyers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}
            >
              Google owns the top of the funnel. Search ads, the map pack, and local listings
              are where your buyers look first. We make sure they find you — not your competitor.
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 44, alignItems: 'center',
                    direction: reverse ? 'rtl' : 'ltr',
                  }}
                >
                  <div style={{ direction: 'ltr' }}>
                    <TiltCard intensity={4} style={{
                      borderRadius: 20, overflow: 'hidden',
                      boxShadow: `0 20px 50px ${s.color}22`,
                      border: `1px solid ${s.color}25`, position: 'relative',
                    }}>
                      <Img
                        src={s.img}
                        alt={`Visual for ${s.title}`}
                        style={{ width: '100%', height: 300, objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${s.color}15, transparent 60%)`,
                        pointerEvents: 'none',
                      }} />
                      <div style={{
                        position: 'absolute', top: 14, left: 14,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        borderRadius: 10, padding: '6px 12px',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}>
                        <Icon style={{ width: 14, height: 14, color: s.color }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          {s.title}
                        </span>
                      </div>
                    </TiltCard>
                  </div>

                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>
                      {s.sub}
                    </p>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}>
                      {s.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {s.tags.map(t => (
                        <span key={t} style={{
                          padding: '5px 12px', borderRadius: 100,
                          background: `${s.color}12`, border: `1px solid ${s.color}28`,
                          color: s.color, fontSize: 11, fontWeight: 700,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROOF GALLERY ─────────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Real Results</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}
            >
              Campaigns we have run
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}
            >
              Real dashboards, real numbers. Click any image to view it full size.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {PROOF.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                onClick={() => setLightbox(i)}
                style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  cursor: 'pointer', aspectRatio: '4/3',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Img
                  src={img.src}
                  alt={img.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Hover overlay */}
                <div
                  style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
                >
                  <div style={{ opacity: 0, transition: 'opacity 0.25s' }}
                    ref={el => {
                      if (!el) return;
                      el.parentElement.onmouseenter = () => { el.parentElement.style.background = 'rgba(0,0,0,0.45)'; el.style.opacity = '1'; };
                      el.parentElement.onmouseleave = () => { el.parentElement.style.background = 'rgba(0,0,0,0)'; el.style.opacity = '0'; };
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                      <RiEyeLine style={{ width: 20, height: 20, color: ACCENT }} />
                    </div>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{img.label}</span>
                  </div>
                </div>
                {/* Label pill */}
                <div style={{
                  position: 'absolute', bottom: 10, left: 10,
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)',
                  borderRadius: 100, padding: '3px 10px',
                  fontSize: 10, fontWeight: 700, color: 'var(--text)',
                }}>
                  {img.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>How It Works</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              From zero to converting in days
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  position: 'relative', borderRadius: 18, padding: '22px 20px',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden',
                }}
              >
                <span style={{
                  position: 'absolute', top: -12, right: -4,
                  fontSize: 84, fontWeight: 900, color: `${ACCENT}07`,
                  lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none',
                }}>
                  {p.n}
                </span>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, marginBottom: 14,
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 11,
                  boxShadow: `0 4px 14px ${ACCENT}35`,
                }}>
                  {p.n}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 7, color: 'var(--text)' }}>{p.title}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────── */}
      <section id="packages" style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1050, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Pricing</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}
            >
              Pick your management level
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}
            >
              Monthly management fee only. Your ad budget is separate and goes straight to Google.
              Cancel any time with 30 days notice.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard
                key={pkg.id}
                intensity={pkg.badge === 'Most Popular' ? 4 : 6}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{
                  position: 'relative', borderRadius: 22, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  background: pkg.badge === 'Most Popular' ? 'linear-gradient(145deg, #FFF7ED, #FFF3E6)' : '#fff',
                  border: pkg.badge === 'Most Popular' ? `1.5px solid ${pkg.color}45` : '1px solid rgba(0,0,0,0.08)',
                  boxShadow: pkg.badge === 'Most Popular' ? `0 8px 44px ${pkg.color}18` : '0 2px 14px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, ${pkg.color}, ${pkg.colorB})`, flexShrink: 0 }} />

                {pkg.badge === 'Most Popular' && (
                  <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 70,
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
                        display: 'inline-block', fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        padding: '4px 10px', borderRadius: 100,
                        background: `${pkg.color}18`, color: pkg.color, border: `1px solid ${pkg.color}35`,
                      }}
                    >
                      {pkg.badge}
                    </motion.span>
                  </div>
                )}

                <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.color, marginBottom: 4 }}>
                    {pkg.name}
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{pkg.name} Plan</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{pkg.tagline}</p>

                  {/* Price */}
                  <div style={{ marginBottom: 6, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 7 }}>$</span>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: pkg.color }}
                      >
                        {pkg.price}
                      </motion.span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>/mo</span>
                    </div>
                    <p style={{ fontSize: 11, color: `${pkg.color}cc`, fontWeight: 600, fontStyle: 'italic' }}>
                      {pkg.note}
                    </p>
                  </div>

                  {/* Features */}
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: pkg.notIncluded.length > 0 ? 14 : 22, flex: 1 }}>
                    {pkg.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + fi * 0.04 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}
                      >
                        <div style={{
                          width: 16, height: 16, borderRadius: 5, marginTop: 1, flexShrink: 0,
                          background: `${pkg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <RiCheckLine style={{ width: 11, height: 11, color: pkg.color }} />
                        </div>
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  {pkg.notIncluded.length > 0 && (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22, opacity: 0.38 }}>
                      {pkg.notIncluded.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                          <RiCloseLine style={{ width: 13, height: 13, flexShrink: 0 }} />
                          <span style={{ textDecoration: 'line-through' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to="/book-a-call"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      width: '100%', padding: '13px 18px', borderRadius: 100,
                      fontWeight: 700, fontSize: 13, color: '#fff',
                      background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`,
                      boxShadow: `0 4px 20px ${pkg.color}30`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 8px 30px ${pkg.color}50`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${pkg.color}30`; }}
                  >
                    Get Started
                    <RiArrowRightUpLine style={{ width: 13, height: 13 }} />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}
          >
            {[
              { icon: RiShieldCheckLine,       text: 'No lock in contracts' },
              { icon: RiMoneyDollarCircleLine, text: 'Your ad budget stays with you' },
              { icon: RiRefreshLine,           text: 'Cancel with 30 days notice' },
              { icon: RiCalendarLine,          text: 'Free setup call included' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <Icon style={{ width: 14, height: 14, color: ACCENT }} />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionTag>FAQ</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Questions we get every week
            </motion.h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    borderRadius: 14, overflow: 'hidden',
                    background: '#fff',
                    border: open ? `1px solid ${ACCENT}40` : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: open ? `0 8px 32px ${ACCENT}12` : '0 1px 4px rgba(0,0,0,0.03)',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '18px 22px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontSize: 14, fontWeight: 700, color: 'var(--text)',
                    }}
                  >
                    <span>{f.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        flexShrink: 0, width: 26, height: 26, borderRadius: 8,
                        background: open ? ACCENT : `${ACCENT}15`,
                        color: open ? '#fff' : ACCENT,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, fontWeight: 300,
                      }}
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 22px 20px', fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)' }}>
                      {f.a}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 1rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 760, margin: '0 auto', borderRadius: 28,
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(145deg, #FFF7ED, #FFF3E6)',
            border: `1px solid ${ACCENT}20`,
            boxShadow: `0 12px 56px ${ACCENT}12`,
          }}
        >
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
            <SectionTag>Ready to Dominate?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Get your free Google Ads audit
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              We will review your current ads account or your competitors, show you where
              money is being wasted, and map out exactly what a well run campaign looks like
              for your category. Free, no obligation, no pitch deck.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book My Free Audit
                <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#packages"
                onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-secondary">
                View Packages
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} style={{
              position: 'fixed', top: 20, right: 20, zIndex: 1001,
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 18,
            }}>
              <RiCloseLine />
            </button>

            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PROOF.length) % PROOF.length); }}
              style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 22 }}>
              ‹
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PROOF.length); }}
              style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 22 }}>
              ›
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 900, width: '100%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <Img
                src={PROOF[lightbox].src}
                alt={PROOF[lightbox].label}
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '12px 18px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{PROOF[lightbox].label}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{lightbox + 1} / {PROOF.length}</span>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 1001 }}>
              {PROOF.map((img, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i); }}
                  style={{ width: 48, height: 36, borderRadius: 6, overflow: 'hidden', border: i === lightbox ? `2px solid ${ACCENT}` : '2px solid transparent', cursor: 'pointer', padding: 0, flexShrink: 0, opacity: i === lightbox ? 1 : 0.5, transition: 'opacity 0.2s, border-color 0.2s' }}>
                  <Img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}