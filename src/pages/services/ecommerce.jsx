import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  RiShoppingBag3Line, RiCheckLine, RiArrowRightUpLine,
  RiSmartphoneLine, RiSpeedLine, RiShieldCheckLine,
  RiPaletteLine, RiBarChart2Line, RiSettings3Line,
  RiStarFill, RiTimeLine, RiTeamLine, RiGlobalLine,
  RiFireLine, RiExternalLinkLine, RiStoreLine,
  RiTruckLine, RiSecurePaymentLine, RiLineChartLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ── Images ──────────────────────────────────────────────── */
const IMG = {
  hero:     'https://images.unsplash.com/photo-1733503747506-773e56e4078f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  design:   'https://images.unsplash.com/photo-1648134859177-66e35b61e106?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  mobile:   'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  speed:    'https://images.unsplash.com/photo-1625296276188-1d149bdaf560?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  checkout: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

/* ── INSPO ────────────────────────────────────────────────── */
const INSPO = [
  {
    label: 'Fashion Store',
    url:   'https://dignitestore.com',
    desc:  'Clean editorial fashion with bold typography and immersive product storytelling.',
    color: '#E879A0', tag: 'Fashion',
    img:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Gym and Fitness',
    url:   'https://gymshark.com',
    desc:  'High energy visuals and fast product discovery built for performance brands.',
    color: '#3B82F6', tag: 'Fitness',
    img:   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Sport and Outdoor',
    url:   'https://us.oneill.com',
    desc:  'Lifestyle brand energy with surf culture, seasonal drops and collection storytelling.',
    color: '#F97316', tag: 'Sport',
    img:   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Books and Stationery',
    url:   'https://lebenskompass.eu',
    desc:  'Warm editorial bookshop aesthetic with category browsing and community feel.',
    color: '#8B5CF6', tag: 'Lifestyle',
    img:   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Phone and Tech',
    url:   'https://eu.mous.co',
    desc:  'Premium product photography, interactive features and conversion focused layout.',
    color: '#6366F1', tag: 'Tech',
    img:   'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Beauty Store',
    url:   'https://glamnetic.com',
    desc:  'Feminine, vibrant brand world with before and after imagery and social proof.',
    color: '#EC4899', tag: 'Beauty',
    img:   'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Travel Bags',
    url:   'https://calpaktravel.com',
    desc:  'Aspirational travel world with colour selector, lifestyle photography and bundles.',
    color: '#10B981', tag: 'Travel',
    img:   'https://images.unsplash.com/photo-1553531384-411a247ccd73?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Eyewear and Sunglasses',
    url:   'https://blenderseyewear.com',
    desc:  'Bold colour forward design with try on features and sport lifestyle positioning.',
    color: '#F59E0B', tag: 'Eyewear',
    img:   'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80',
  },
];

/* ── What we build — 4 service pillars with images ──────── */
const SERVICES = [
  {
    icon: RiPaletteLine, color: '#F97316',
    img: IMG.design,
    title: 'Custom Store Design',
    sub: 'No templates. Built around your brand.',
    desc: 'Every store starts from a blank canvas. We design the colour system, typography, layout, and product page structure around your brand identity so visitors feel like they landed exactly where they belong — not on a Shopify template they have seen a hundred times.',
    tags: ['Brand aligned', 'Original layouts', 'Product page design', 'Visual hierarchy'],
  },
  {
    icon: RiSmartphoneLine, color: '#7C3AED',
    img: IMG.mobile,
    title: 'Mobile First Build',
    sub: 'Built for the screen in your buyers pocket.',
    desc: 'Over 70% of eCommerce traffic is mobile. We design for the smallest screen first and scale up — your store is actually built around touch, thumb reach, and mobile browsing so it converts on phones, not just looks good on a desktop preview.',
    tags: ['Touch optimised', 'Responsive grids', 'Fast tap targets', 'No layout breaks'],
  },
  {
    icon: RiSpeedLine, color: '#0EA5E9',
    img: IMG.speed,
    title: 'Speed and Performance',
    sub: 'Every second of delay costs you sales.',
    desc: 'A one second delay drops conversions by 7%. We obsess over Core Web Vitals, image compression, lazy loading, and app bloat so your store loads fast on every device and every connection. Fast stores rank higher and convert better.',
    tags: ['Core Web Vitals', 'Image optimisation', 'App audit', 'Lighthouse score'],
  },
  {
    icon: RiLineChartLine, color: '#10B981',
    img: IMG.checkout,
    title: 'Conversion Optimisation',
    sub: 'Engineered to turn browsers into buyers.',
    desc: 'Strategic product page layouts, trust signals, urgency elements, upsell flows, and checkout optimisation. Every element on your store is placed where data says it converts — not where it looks interesting on a mood board.',
    tags: ['Checkout flow', 'Trust signals', 'Upsell setup', 'A/B ready builds'],
  },
];

/* ── Packages ────────────────────────────────────────────── */
const PACKAGES = [
  {
    name: 'Starter', price: 499, tagline: 'Perfect for new brands',
    color: '#94A3B8', colorB: '#CBD5E1', badge: null, days: 14,
    features: [
      '5 page Shopify store',
      'Mobile responsive design',
      'Product upload (up to 20)',
      'Payment gateway setup',
      'Basic SEO setup',
      'Speed optimisation',
      '1 round of revisions',
      '14 day post launch support',
    ],
    notIncluded: ['Klaviyo integration', 'Upsell and cross sell setup', 'Custom app integrations'],
  },
  {
    name: 'Growth', price: 999, tagline: 'For brands ready to scale',
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular', days: 21,
    features: [
      '10 page Shopify store',
      'Custom premium theme',
      'Product upload (up to 50)',
      'Payment gateway setup',
      'Advanced SEO setup',
      'Klaviyo email integration',
      'Upsell and cross sell setup',
      'Speed and CRO optimisation',
      '3 rounds of revisions',
      '30 day post launch support',
    ],
    notIncluded: ['Custom app integrations', 'Google Analytics and Meta Pixel'],
  },
  {
    name: 'Pro', price: 1999, tagline: 'Full stack eCommerce build',
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Best Value', days: 30,
    features: [
      'Fully custom Shopify store',
      'Custom UI and UX design',
      'Unlimited product upload',
      'All payment gateways',
      'Full SEO and blog setup',
      'Klaviyo flows (welcome, cart)',
      'Review and loyalty app setup',
      'Custom app integrations',
      'Google Analytics and Meta Pixel',
      '5 rounds of revisions',
      '60 day post launch support',
    ],
    notIncluded: [],
  },
  {
    name: 'Enterprise', price: null, tagline: 'For serious 6 figure brands',
    color: '#34D399', colorB: '#2563EB', badge: 'Custom', days: null,
    features: [
      'Everything in Pro',
      'Multi currency and language',
      'Custom checkout experience',
      'Advanced funnel build',
      'Full brand identity package',
      'Dedicated project manager',
      'Ongoing growth strategy',
      'Priority 24 hour support',
      'Quarterly strategy sessions',
    ],
    notIncluded: [],
  },
];

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Kelvin A.', handle: 'Fitness Brand Owner',  stars: 5, text: 'They built our Shopify store in under 3 weeks and sales were up from day one. The design is clean, fast, and our customers love it.' },
  { name: 'Ella M.',   handle: 'Beauty Brand Founder', stars: 5, text: 'Professional from start to finish. They understood exactly what we needed and delivered beyond expectations. Would 100% recommend.' },
  { name: 'Tosan B.',  handle: 'Clothing Store Owner', stars: 5, text: 'Our conversion rate doubled after the redesign. The attention to detail on mobile is exceptional.' },
];

/* ── Process ─────────────────────────────────────────────── */
const PROCESS = [
  { n: '01', title: 'Discovery Call',    desc: 'We learn your brand, goals, products and audience in a 30 minute call.' },
  { n: '02', title: 'Design',            desc: 'We design the layout and present it for approval before building anything.' },
  { n: '03', title: 'Build',             desc: 'Full store build — design, functionality, apps, and content all done.' },
  { n: '04', title: 'Review',            desc: 'You go through everything. We revise until you are 100% happy.' },
  { n: '05', title: 'Launch',            desc: 'We launch your store and stay available through the handover period.' },
];

/* ── Shared helpers ──────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
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

function TiltCard({ children, style, intensity = 6, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
  const move = useCallback((e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }, [x, y]);
  return <motion.div ref={ref} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', transformPerspective: 1000 }} {...rest}>{children}</motion.div>;
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const u = () => { const el = document.documentElement; setP((el.scrollTop || document.body.scrollTop) / (el.scrollHeight - el.clientHeight) * 100); };
    window.addEventListener('scroll', u, { passive: true });
    return () => window.removeEventListener('scroll', u);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, height: 3 }}>
      <div style={{ height: '100%', width: `${p}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB}, #FCD34D)`, boxShadow: `0 0 10px ${ACCENT}80`, transition: 'width 0.1s linear' }} />
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const m = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVis(true); };
    const l = () => setVis(false);
    window.addEventListener('mousemove', m); window.addEventListener('mouseleave', l);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseleave', l); };
  }, []);
  return <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, left: pos.x - 220, top: pos.y - 220, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)', opacity: vis ? 1 : 0, transition: 'opacity 0.3s' }} />;
}

function SectionTag({ children }) {
  return (
    <motion.span initial={{ opacity: 1, scale: 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: `${ACCENT}12`, border: `1px solid ${ACCENT}28`, color: ACCENT, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`, animation: 'pdot 2s ease-in-out infinite' }} />
      {children}
      <style>{`@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>
    </motion.span>
  );
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[{ w:500,h:300,top:'5%',left:'15%',c:'rgba(249,115,22,0.08)',d:8 },{ w:360,h:220,top:'20%',right:'8%',c:'rgba(124,58,237,0.05)',d:11 },{ w:260,h:160,top:'55%',left:'5%',c:'rgba(249,115,22,0.05)',d:14 }].map((o,i)=>(
        <motion.div key={i} style={{ position:'absolute',width:o.w,height:o.h,top:o.top,left:o.left,right:o.right,borderRadius:'50%',background:o.c,filter:'blur(60px)' }} animate={{ y:[0,-28,0],x:[0,16,0],scale:[1,1.07,1] }} transition={{ duration:o.d,repeat:Infinity,ease:'easeInOut',delay:i*1.4 }} />
      ))}
    </div>
  );
}

function DotGrid() {
  return <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:0.025,backgroundImage:'radial-gradient(circle, rgba(249,115,22,0.55) 1px, transparent 1px)',backgroundSize:'40px 40px',WebkitMaskImage:'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',maskImage:'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)' }} />;
}

function StatPill({ icon: Icon, label, target, suffix = '' }) {
  const [iv, setIv] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(target, 1600, iv);
  useEffect(() => { const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setIv(true); },{threshold:0.5}); if(ref.current) o.observe(ref.current); return ()=>o.disconnect(); }, []);
  return (
    <span ref={ref} style={{ display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text-muted)' }}>
      <Icon style={{ width:14,height:14,color:ACCENT }} />
      <strong style={{ color:ACCENT,fontWeight:700 }}>{count}{suffix}</strong>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function EcommercePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <ScrollProgress />
      <CursorGlow />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '9rem', paddingBottom: '5rem', overflow: 'hidden' }}>
        <FloatingOrbs />
        <DotGrid />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 52, alignItems: 'center' }}>

            <div>
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  <RiShoppingBag3Line style={{ width: 14, height: 14 }} /> eCommerce Service
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}>
                eCommerce stores that{' '}
                <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>
                  actually convert.
                </span>
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}>
                We build high converting Shopify and WooCommerce stores from the ground up.
                Mobile first, blazing fast, and engineered to turn visitors into paying customers
                from the very first day you go live.
              </motion.p>

              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Get a Free Strategy Call <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </Link>
                <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
                  View Packages
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <StatPill icon={RiShoppingBag3Line} target={120} suffix="+" label=" stores built" />
                <StatPill icon={RiStarFill}         target={5}   suffix=""  label=" star rated" />
                <StatPill icon={RiTimeLine}         target={100} suffix="%" label=" on time" />
                <StatPill icon={RiShieldCheckLine}  target={60}  suffix=""  label=" day support" />
              </motion.div>
            </div>

            {/* Hero image with floating cards */}
            <motion.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} style={{ position: 'relative' }}>
              <TiltCard intensity={4} style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 28px 70px rgba(249,115,22,0.18)`, border: `1px solid ${ACCENT}22` }}>
                <Img src={IMG.hero} alt="eCommerce store dashboard showing sales and orders" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Store Status</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Live and Converting</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#F97316','#7C3AED','#10B981'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                  </div>
                </div>
              </TiltCard>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -18, right: -18, background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', minWidth: 148 }}>
                <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Revenue Today</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>$2,840</span>
                </div>
                <div style={{ marginTop: 8, height: 4, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ delay: 0.9, duration: 1.4 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB})`, borderRadius: 100 }} />
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', bottom: 80, right: -22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiTruckLine style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Orders Today</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>24 new orders</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT WE BUILD — 4 service pillars with images
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Build</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Four things every great store needs
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              A store is not just a website. It is a sales machine that runs 24 hours a day.
              These are the four foundations we build into every project without exception.
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 44, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}
                >
                  <div style={{ direction: 'ltr' }}>
                    <TiltCard intensity={4} style={{ borderRadius: 20, overflow: 'hidden', boxShadow: `0 20px 50px ${s.color}22`, border: `1px solid ${s.color}25`, position: 'relative' }}>
                      <Img src={s.img} alt={`Visual for ${s.title}`} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${s.color}15, transparent 60%)`, pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon style={{ width: 14, height: 14, color: s.color }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.title}</span>
                      </div>
                    </TiltCard>
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.sub}</p>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {s.tags.map(t => <span key={t} style={{ padding: '5px 12px', borderRadius: 100, background: `${s.color}12`, border: `1px solid ${s.color}28`, color: s.color, fontSize: 11, fontWeight: 700 }}>{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>How It Works</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              From idea to live store
            </motion.h2>
          </div>

          <div style={{ position: 'relative' }}>
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              style={{ position: 'absolute', left: 22, top: 22, bottom: 22, width: 2, background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENTB}50, transparent)`, transformOrigin: 'top', display: 'none' }}
              className="process-line" />
            <style>{`.process-line { display: block !important; }`}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {PROCESS.map(({ n, title, desc }, i) => (
                <motion.div key={n}
                  initial={{ opacity: 1, x: 0 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.12, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}
                    style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff', zIndex: 1, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, boxShadow: `0 4px 18px ${ACCENT}40` }}>
                    {n}
                  </motion.div>
                  <div style={{ paddingTop: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>{title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PACKAGES
      ══════════════════════════════════════════════════ */}
      <section id="packages" style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Pricing</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Choose your package
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto' }}>
              All prices in USD. One time payment. No hidden fees.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard key={pkg.name} intensity={pkg.badge === 'Most Popular' ? 5 : 7}
                initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: pkg.badge === 'Most Popular' ? 'linear-gradient(145deg, #FFF7ED, #FFF3E6)' : '#fff', border: pkg.badge === 'Most Popular' ? `1.5px solid ${pkg.color}45` : '1px solid rgba(0,0,0,0.08)', boxShadow: pkg.badge === 'Most Popular' ? `0 8px 40px ${pkg.color}18` : '0 2px 14px rgba(0,0,0,0.05)' }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, ${pkg.color}, ${pkg.colorB})`, flexShrink: 0 }} />
                {pkg.badge === 'Most Popular' && <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 60, background: `radial-gradient(ellipse, ${pkg.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />}
                {pkg.badge && (
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <motion.span animate={pkg.badge === 'Most Popular' ? { scale: [1, 1.04, 1] } : {}} transition={{ duration: 2.5, repeat: Infinity }}
                      style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: `${pkg.color}18`, color: pkg.color, border: `1px solid ${pkg.color}35`, display: 'inline-block' }}>
                      {pkg.badge}
                    </motion.span>
                  </div>
                )}

                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 3 }}>{pkg.name}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pkg.tagline}</p>
                  </div>

                  <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    {pkg.price === null ? (
                      <span style={{ fontSize: 28, fontWeight: 800, color: pkg.color }}>Custom</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>$</span>
                        <motion.span initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                          style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, color: pkg.color, letterSpacing: '-0.03em' }}>
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

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: pkg.notIncluded.length > 0 ? 14 : 20, flex: 1 }}>
                    {pkg.features.map((f, fi) => (
                      <motion.li key={f} initial={{ opacity: 1, x: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + fi * 0.04 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                        <RiCheckLine style={{ width: 13, height: 13, flexShrink: 0, marginTop: 2, color: pkg.color }} />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  {pkg.notIncluded.length > 0 && (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20, opacity: 0.35 }}>
                      {pkg.notIncluded.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                          <span style={{ width: 13, height: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, lineHeight: 1 }}>×</span>
                          <span style={{ textDecoration: 'line-through' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {pkg.price === null ? (
                    <Link to="/book-a-call"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '12px 18px', borderRadius: 100, fontWeight: 700, fontSize: 13, color: '#fff', background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`, boxShadow: `0 4px 18px ${pkg.color}30`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 28px ${pkg.color}45`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 18px ${pkg.color}30`; }}>
                      Book a Call <RiArrowRightUpLine style={{ width: 14, height: 14 }} />
                    </Link>
                  ) : (
                    <Link to="/book-a-call"
                      style={{ display: 'block', width: '100%', padding: '12px 18px', borderRadius: 100, fontWeight: 700, fontSize: 13, color: '#fff', textAlign: 'center', background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`, boxShadow: `0 4px 18px ${pkg.color}30`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 28px ${pkg.color}45`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 18px ${pkg.color}30`; }}>
                      Get Started
                    </Link>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Client Reviews</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              What our clients say
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, handle, text, stars }, i) => (
              <motion.div key={name}
                initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{ borderRadius: 18, padding: 24, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor=`${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(0,0,0,0.07)'; }}
              >
                <div style={{ position: 'absolute', top: 10, right: 16, fontSize: 72, lineHeight: 1, color: `${ACCENT}10`, fontFamily: 'Georgia, serif', fontWeight: 900, userSelect: 'none' }}>{'"'}</div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(stars)].map((_,j) => (
                    <motion.div key={j} initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1+j*0.06, type: 'spring', stiffness: 400 }}>
                      <RiStarFill style={{ width: 14, height: 14, color: '#F59E0B' }} />
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 18, color: 'var(--text-muted)', position: 'relative', zIndex: 1 }}>"{text}"</p>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{name}</p>
                  <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{handle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STORE INSPIRATION
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>The Standard We Build Toward</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Stores we study and build to match
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
              These are real brands at the top of their categories. We study what makes
              each one convert and bring that same level of craft to your store.
              Click any card to visit the live site.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {INSPO.map((site, i) => (
              <motion.div key={site.label}
                initial={{ opacity: 1, y: 0, scale: 1 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => window.open(site.url, '_blank', 'noopener')}
                style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', background: '#fff', border: `1px solid ${site.color}25`, boxShadow: '0 4px 18px rgba(0,0,0,0.06)', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 16px 44px ${site.color}22`; e.currentTarget.style.borderColor=`${site.color}50`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='0 4px 18px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor=`${site.color}25`; }}
              >
                <div style={{ position: 'relative', height: 176, overflow: 'hidden' }}>
                  <img src={site.img} alt={`${site.label} eCommerce store`} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: site.color }}>{site.tag}</div>
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RiExternalLinkLine style={{ width: 14, height: 14, color: site.color }} />
                  </div>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <div style={{ width: 28, height: 3, borderRadius: 100, background: site.color, marginBottom: 10 }} />
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6, lineHeight: 1.2 }}>{site.label}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: 12 }}>{site.desc}</p>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: site.color, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.opacity='0.7'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                    Visit site <RiExternalLinkLine style={{ width: 11, height: 11 }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.65 }}>
              Your store deserves to sit at this level.{' '}
              <span style={{ color: 'var(--text)', fontWeight: 800 }}>Let us build it.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 1rem 6rem' }}>
        <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 700, margin: '0 auto', borderRadius: 28, padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #FFF7ED, #FFF3E6)', border: `1px solid ${ACCENT}20`, boxShadow: `0 12px 56px ${ACCENT}12` }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, borderRadius: '50%', background: `${ACCENT}14`, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag>Ready to Start?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Let us build your store
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              Book a free 20 minute strategy call. We will review your brand and recommend
              the right package to get your store live and converting.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book a Free Strategy Call <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
                View Packages
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}