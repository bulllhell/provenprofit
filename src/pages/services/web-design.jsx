import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  RiComputerLine, RiLayoutLine, RiBrushLine, RiCodeLine,
  RiSmartphoneLine, RiSpeedLine, RiShoppingBag3Line,
  RiCheckLine, RiArrowRightUpLine, RiFireLine, RiTimeLine,
  RiShieldCheckLine, RiStarFill, RiExternalLinkLine,
  RiEyeLine, RiCloseLine,
  RiCursorLine, RiWindowLine, RiGlobalLine, RiDeviceLine,
  RiPaletteLine, RiCalendarLine, RiMoneyDollarCircleLine,
  RiLock2Line, RiToolsLine, RiFlashlightLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ══════════════════════════════════════════════════════════
   INSPIRATION SITES — real websites we reference as proof
   of the calibre of work we produce
══════════════════════════════════════════════════════════ */
const INSPO = [
  {
    label: 'Fashion Store',
    url:   'https://dignitestore.com',
    desc:  'Clean editorial fashion with bold typography and immersive product pages.',
    color: '#E879A0',
    img:   'https://plus.unsplash.com/premium_photo-1661582261589-5ea03ada2c36?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag:   'Fashion',
  },
  {
    label: 'Gym and Fitness',
    url:   'https://gymshark.com',
    desc:  'Performance first layout with high energy visuals and fast product discovery.',
    color: '#3B82F6',
    img:   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
    tag:   'Fitness',
  },
  {
    label: 'Sport and Outdoor',
    url:   'https://us.oneill.com',
    desc:  "Lifestyle brand energy with surf culture, seasonal drops and collection storytelling.",
    color: '#F97316',
    img:   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    tag:   'Sport',
  },
  {
    label: 'Books and Stationery',
    url:   'https://lebenskompass.eu',
    desc:  'Warm editorial bookshop aesthetic with category browsing and community feel.',
    color: '#8B5CF6',
    img:   'https://plus.unsplash.com/premium_photo-1681843672359-f51f0cefe0ca?q=80&w=2539&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag:   'Lifestyle',
  },
  {
    label: 'Phone and Tech Accessories',
    url:   'https://eu.mous.co',
    desc:  'Premium product photography, interactive features and conversion focused layout.',
    color: '#6366F1',
    img:   'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
    tag:   'Tech',
  },
  {
    label: 'Beauty Store',
    url:   'https://glamnetic.com',
    desc:  'Feminine, vibrant brand world with before and after imagery and social proof.',
    color: '#EC4899',
    img:   'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    tag:   'Beauty',
  },
  {
    label: 'Travel Bags',
    url:   'https://calpaktravel.com',
    desc:  'Aspirational travel world with colour selector, lifestyle photography and bundles.',
    color: '#10B981',
    img:   'https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag:   'Travel',
  },
  {
    label: 'Eyewear and Sunglasses',
    url:   'https://blenderseyewear.com',
    desc:  'Bold colour forward design with try on features and sport lifestyle positioning.',
    color: '#F59E0B',
    img:   'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80',
    tag:   'Eyewear',
  },
];

/* ── Unsplash service explainer images ───────────────────── */
const IMG = {
  hero:    'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=80',
  design:  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80',
  mobile:  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
  speed:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  launch:  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
};

/* ── Packages ─────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'start', name: 'Start', price: 399,
    color: '#94A3B8', colorB: '#CBD5E1', badge: null,
    delivery: '5 to 7 days',
    tagline: 'A clean professional web presence from day one.',
    features: [
      '5 fully custom pages',
      'Mobile responsive design',
      'Contact and enquiry form',
      'Social media links connected',
      'Basic on page SEO setup',
      'Speed and performance optimisation',
      'Content upload and formatting',
      '2 rounds of revisions',
      '14 day post launch support',
    ],
    notIncluded: ['eCommerce functionality', 'Blog and CMS setup', 'Custom animations', 'Booking system'],
  },
  {
    id: 'standard', name: 'Standard', price: 899,
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular',
    delivery: '10 to 14 days',
    tagline: 'A full brand web experience built to convert.',
    features: [
      '8 fully custom pages',
      'Premium custom design system',
      'Blog or CMS setup',
      'Advanced contact and lead forms',
      'Email capture integration',
      'Google Analytics setup',
      'Full on page SEO',
      'Speed and Core Web Vitals tuning',
      'Social and review integrations',
      '3 rounds of revisions',
      '30 day post launch support',
    ],
    notIncluded: ['Full eCommerce store', 'Booking and scheduling system'],
  },
  {
    id: 'pro', name: 'Pro', price: 1499,
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Full Build',
    delivery: '18 to 25 days',
    tagline: 'The full digital flagship for serious brands.',
    features: [
      'Unlimited custom pages',
      'Bespoke UI and UX design',
      'Full eCommerce or booking system',
      'Custom animations and interactions',
      'Blog and CMS with training',
      'Full SEO strategy and setup',
      'Heatmap and analytics setup',
      'Conversion rate optimisation',
      'Social proof and review system',
      'Performance and lighthouse audit',
      'Unlimited revisions',
      '60 day post launch support',
    ],
    notIncluded: [],
  },
];

/* ── What we build ───────────────────────────────────────── */
const SERVICES = [
  {
    icon: RiPaletteLine, color: '#F97316',
    img: IMG.design,
    title: 'Custom Design',
    sub: 'No templates. No generic layouts.',
    desc: 'Every site we build starts from a blank canvas scoped to your brand. Colour system, typography, layout rhythm, spacing — all designed to match your market positioning and make visitors feel like they landed exactly where they belong.',
    tags: ['Brand aligned', 'Original layouts', 'Visual hierarchy', 'Typography system'],
  },
  {
    icon: RiSmartphoneLine, color: '#7C3AED',
    img: IMG.mobile,
    title: 'Mobile First',
    sub: 'Built for the screen in your customers pocket.',
    desc: 'More than 70% of web traffic is mobile. We design for the smallest screen first and scale up, which means your site does not just shrink to fit a phone — it is actually built around touch, thumb reach, and mobile browsing behaviour.',
    tags: ['Touch optimised', 'Responsive grids', 'Fast tap targets', 'No layout breaks'],
  },
  {
    icon: RiSpeedLine, color: '#0EA5E9',
    img: IMG.speed,
    title: 'Speed and Performance',
    sub: 'Every second costs you sales.',
    desc: 'A one second delay in page load drops conversions by 7%. We obsess over Core Web Vitals, image compression, lazy loading, and code efficiency so your site loads fast on every connection and every device.',
    tags: ['Core Web Vitals', 'Image optimisation', 'Lazy loading', 'Lighthouse score'],
  },
  {
    icon: RiToolsLine, color: '#10B981',
    img: IMG.launch,
    title: 'Built to Last',
    sub: 'Handoff that actually makes sense.',
    desc: 'We build on platforms you can manage yourself — Webflow, Shopify, WordPress, or custom code depending on what suits you best. You get a full walkthrough, documentation, and 30 to 60 days of post launch support so you are never stuck.',
    tags: ['CMS ready', 'Staff training', 'Documentation', 'Post launch care'],
  },
];

/* ── Process ─────────────────────────────────────────────── */
const PROCESS = [
  { n: '01', title: 'Discovery',       desc: 'We learn your brand, goals, audience, and competitors. You fill a brief and we ask the questions that surface what really matters.' },
  { n: '02', title: 'Design',          desc: 'Wireframes first, then full visuals. You approve the look before a single line of code is written.' },
  { n: '03', title: 'Build',           desc: 'We develop the full site, connect all integrations, upload content, and test across every major device and browser.' },
  { n: '04', title: 'Review',          desc: 'You go through everything. We revise until every detail is exactly right. Nothing launches until you say so.' },
  { n: '05', title: 'Launch',          desc: 'We handle the go live, domain connection, and final checks. Then hand over clean documentation and stay available for 30 to 60 days.' },
];

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Amara J.',  role: 'Fashion Brand Owner',  stars: 5, text: 'The site they built looks better than brands ten times our size. Customers genuinely comment on it. Sales went up 60% in the first month.' },
  { name: 'Kofi B.',   role: 'Fitness Coach',         stars: 5, text: 'I gave them three reference sites and they came back with something completely original that felt like ours. Not a single template in sight.' },
  { name: 'Yemi O.',   role: 'Beauty Founder',        stars: 5, text: 'Fast, responsive, and they actually pushed back when my idea was not working. That honesty is rare and the result speaks for itself.' },
];

/* ══════════════════════════════════════════════════════════
   SHARED HELPERS (same pattern as other service pages)
══════════════════════════════════════════════════════════ */
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
  return (
    <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, left: pos.x - 220, top: pos.y - 220, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)', opacity: vis ? 1 : 0, transition: 'opacity 0.3s' }} />
  );
}

function SectionTag({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.4 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: `${ACCENT}12`, border: `1px solid ${ACCENT}28`, color: ACCENT, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`, animation: 'pdot 2s ease-in-out infinite' }} />
      {children}
      <style>{`@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>
    </motion.span>
  );
}

function TiltCard({ children, style, intensity = 6, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
  const move = useCallback((e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }, [x, y]);
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', transformPerspective: 1000 }} {...rest}>{children}</motion.div>
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

function StatPill({ icon: Icon, label, target, suffix = '', prefix = '' }) {
  const [iv, setIv] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(target, 1700, iv);
  useEffect(() => { const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setIv(true); },{threshold:0.5}); if(ref.current) o.observe(ref.current); return ()=>o.disconnect(); }, []);
  return (
    <span ref={ref} style={{ display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text-muted)' }}>
      <Icon style={{ width:14,height:14,color:ACCENT }} />
      <strong style={{ color:ACCENT,fontWeight:700 }}>{prefix}{count}{suffix}</strong>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function WebDesignPage() {
  const [activeSite, setActiveSite] = useState(null);

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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  <RiComputerLine style={{ width: 14, height: 14 }} />
                  Web Design Service
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}
              >
                Websites that make people{' '}
                <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>
                  stop and stay.
                </span>
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}>
                We design and build websites for brands that want to look the part and actually
                convert. Every project is custom, every page is intentional, and every site
                is handed over fully documented and ready to grow.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  See Packages <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </a>
                <a href="#inspo" onClick={e => { e.preventDefault(); document.getElementById('inspo')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-secondary">
                  See the Standard We Hit
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <StatPill icon={RiWindowLine}  target={90}  suffix="+"  label=" sites delivered" />
                <StatPill icon={RiStarFill}    target={5}   suffix=""   label=" star rated" />
                <StatPill icon={RiTimeLine}    target={100} suffix="%"  label=" on time" />
              </motion.div>
            </div>

            {/* Right — hero image */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} style={{ position: 'relative' }}>
              <TiltCard intensity={4} style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 28px 70px rgba(249,115,22,0.18)`, border: `1px solid ${ACCENT}22` }}>
                <Img src={IMG.hero} alt="Web design workspace showing a custom website being built" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Project Status</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Ready for Launch</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#F97316','#7C3AED','#10B981'].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                    ))}
                  </div>
                </div>
              </TiltCard>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -18, right: -18, background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', minWidth: 150 }}>
                <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Lighthouse Score</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>98</span>
                  <span style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>/ 100</span>
                </div>
                <div style={{ marginTop: 8, height: 4, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ delay: 0.9, duration: 1.4 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB})`, borderRadius: 100 }} />
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', bottom: 80, right: -22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiSmartphoneLine style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Mobile Score</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Perfect</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ─────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Build</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Four things every great site needs
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              A website is not a brochure. It is a sales tool that works 24 hours a day.
              These are the four foundations we build into every project without exception.
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                      {s.tags.map(t => (
                        <span key={t} style={{ padding: '5px 12px', borderRadius: 100, background: `${s.color}12`, border: `1px solid ${s.color}28`, color: s.color, fontSize: 11, fontWeight: 700 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INSPIRATION / THE STANDARD WE HIT ────────────── */}
      <section id="inspo" style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>The Standard We Hit</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Sites we admire and build toward
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
              These are real brands at the top of their categories. We study what makes
              them work and bring that same level of craft to your project. Click any card
              to visit the live site.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
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
                  cursor: 'pointer',
                  border: `1px solid ${site.color}25`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.25s, border-color 0.25s',
                  background: '#fff',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 44px ${site.color}20`; e.currentTarget.style.borderColor = `${site.color}50`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = `${site.color}25`; }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <Img src={site.img} alt={`${site.label} website design inspiration`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)` }} />
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
                  {/* Colour accent bar */}
                  <div style={{ width: 28, height: 3, borderRadius: 100, background: site.color, marginBottom: 10 }} />
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6, lineHeight: 1.2 }}>{site.label}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: 12 }}>{site.desc}</p>
                  <a
                    href={site.url} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: site.color, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
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
              Your brand deserves a site that sits at this level.{' '}
              <span style={{ color: 'var(--text)', fontWeight: 700 }}>Let us build it.</span>
            </p>
            <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Start Your Project <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>How It Works</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              From brief to live in five clear steps
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {PROCESS.map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ position: 'relative', borderRadius: 18, padding: '22px 20px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}
              >
                <span style={{ position: 'absolute', top: -12, right: -4, fontSize: 84, fontWeight: 900, color: `${ACCENT}07`, lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none' }}>{p.n}</span>
                <div style={{ width: 34, height: 34, borderRadius: 9, marginBottom: 14, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 11, boxShadow: `0 4px 14px ${ACCENT}35` }}>{p.n}</div>
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
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Pick your build level
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 380, margin: '0 auto' }}>
              One time investment. All files yours forever. No monthly platform fees.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard key={pkg.id}
                intensity={pkg.badge === 'Most Popular' ? 4 : 6}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: pkg.badge === 'Most Popular' ? 'linear-gradient(145deg, #FFF7ED, #FFF3E6)' : '#fff', border: pkg.badge === 'Most Popular' ? `1.5px solid ${pkg.color}45` : '1px solid rgba(0,0,0,0.08)', boxShadow: pkg.badge === 'Most Popular' ? `0 8px 44px ${pkg.color}18` : '0 2px 14px rgba(0,0,0,0.05)' }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, ${pkg.color}, ${pkg.colorB})`, flexShrink: 0 }} />
                {pkg.badge === 'Most Popular' && <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 70, background: `radial-gradient(ellipse, ${pkg.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />}
                {pkg.badge && (
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <motion.span animate={pkg.badge === 'Most Popular' ? { scale: [1, 1.04, 1] } : {}} transition={{ duration: 2.5, repeat: Infinity }}
                      style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: `${pkg.color}18`, color: pkg.color, border: `1px solid ${pkg.color}35` }}>
                      {pkg.badge}
                    </motion.span>
                  </div>
                )}

                <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.color, marginBottom: 4 }}>{pkg.name}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{pkg.name} Website</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{pkg.tagline}</p>

                  <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 7 }}>$</span>
                      <motion.span initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: pkg.color }}>
                        {pkg.price.toLocaleString()}
                      </motion.span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>one time</span>
                    </div>
                    <p style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
                      <RiCalendarLine style={{ width: 12, height: 12, color: pkg.color }} />
                      Delivered in {pkg.delivery}
                    </p>
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: pkg.notIncluded.length > 0 ? 14 : 22, flex: 1 }}>
                    {pkg.features.map((f, fi) => (
                      <motion.li key={f} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + fi * 0.04 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                        <div style={{ width: 16, height: 16, borderRadius: 5, marginTop: 1, flexShrink: 0, background: `${pkg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                  <Link to="/book-a-call"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '13px 18px', borderRadius: 100, fontWeight: 700, fontSize: 13, color: '#fff', background: `linear-gradient(135deg, ${pkg.color}, ${pkg.colorB})`, boxShadow: `0 4px 20px ${pkg.color}30`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 8px 30px ${pkg.color}50`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${pkg.color}30`; }}
                  >
                    Get Started <RiArrowRightUpLine style={{ width: 13, height: 13 }} />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
            {[
              { icon: RiShieldCheckLine,       text: 'All source files included' },
              { icon: RiGlobalLine,            text: 'Domain and hosting guidance' },
              { icon: RiToolsLine,             text: 'Post launch support included' },
              { icon: RiCalendarLine,          text: 'Free discovery call included' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <Icon style={{ width: 14, height: 14, color: ACCENT }} />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Client Words</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Brands that now stand out
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ borderRadius: 18, padding: 24, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor = `${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; }}
              >
                <div style={{ position: 'absolute', top: 8, right: 14, fontSize: 70, lineHeight: 1, color: `${ACCENT}09`, fontFamily: 'Georgia, serif', fontWeight: 900, userSelect: 'none' }}>
                  {'"'}
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(stars)].map((_, j) => (
                    <motion.div key={j} initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + j * 0.06, type: 'spring', stiffness: 400 }}>
                      <RiStarFill style={{ width: 13, height: 13, color: '#F59E0B' }} />
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 18, position: 'relative', zIndex: 1 }}>
                  {'"'}{text}{'"'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                    {name[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 1 }}>{name}</p>
                    <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 1rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 760, margin: '0 auto', borderRadius: 28, padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #FFF7ED, #FFF3E6)', border: `1px solid ${ACCENT}20`, boxShadow: `0 12px 56px ${ACCENT}12` }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, borderRadius: '50%', background: `${ACCENT}14`, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag>Ready to Build?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Your site should be your best salesperson
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              Book a free discovery call. We will review your current web presence, show you
              exactly what is holding it back, and map out what a purpose built site looks
              like for your category. No slides, no fluff.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book a Free Call <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
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