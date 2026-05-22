import Img from '../../components/Img';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  RiPaletteLine, RiCheckLine, RiArrowRightUpLine,
  RiMagicLine, RiLightbulbLine, RiStackLine,
  RiEyeLine, RiFileTextLine, RiSmartphoneLine,
  RiStarFill, RiFireLine, RiCloseLine,
  RiArrowLeftSLine, RiArrowRightSLine, RiExpandDiagonalLine,
  RiLock2Line, RiCalendarLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ══════════════════════════════════════════════════════════
   PORTFOLIO IMAGES (Cloudinary)
══════════════════════════════════════════════════════════ */
const PORTFOLIO = [
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/v1779404931/WhatsApp_Image_2026-05-21_at_13.10.17_kmescl.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/w_600,c_fill/v1779404931/WhatsApp_Image_2026-05-21_at_13.10.17_kmescl.jpg',
    label: 'Brand Identity',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/v1779404939/WhatsApp_Image_2026-05-21_at_13.10.16_n22uff.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/w_600,c_fill/v1779404939/WhatsApp_Image_2026-05-21_at_13.10.16_n22uff.jpg',
    label: 'Logo Design',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404925/WhatsApp_Image_2026-05-21_at_13.10.17_1_gficvh.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404925/WhatsApp_Image_2026-05-21_at_13.10.17_1_gficvh.jpg',
    label: 'Visual System',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404887/WhatsApp_Image_2026-05-21_at_13.10.17_3_jlgvc6.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404887/WhatsApp_Image_2026-05-21_at_13.10.17_3_jlgvc6.jpg',
    label: 'Brand Guidelines',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404851/WhatsApp_Image_2026-05-21_at_13.10.17_4_n7pewe.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404851/WhatsApp_Image_2026-05-21_at_13.10.17_4_n7pewe.jpg',
    label: 'Brand Collateral',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404840/WhatsApp_Image_2026-05-21_at_13.10.18_vgv3qr.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404840/WhatsApp_Image_2026-05-21_at_13.10.18_vgv3qr.jpg',
    label: 'Social Media Kit',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404830/WhatsApp_Image_2026-05-21_at_13.10.18_1_sojthm.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404830/WhatsApp_Image_2026-05-21_at_13.10.18_1_sojthm.jpg',
    label: 'Packaging Design',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779404541/WhatsApp_Image_2026-05-21_at_13.10.18_2_r76pjp.jpg',
    thumb: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto,f_auto,w_600,c_fill/v1779404541/WhatsApp_Image_2026-05-21_at_13.10.18_2_r76pjp.jpg',
    label: 'Brand Mockup',
  },
];

/* ══════════════════════════════════════════════════════════
   UNSPLASH SERVICE EXPLAINER IMAGES
══════════════════════════════════════════════════════════ */
const UNSPLASH = {
  hero:     'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
  strategy: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
  logo:     'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=900&q=80',
  colors:   'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80',
  mockups:  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
};

/* ── Packages data ───────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'start', name: 'Start', price: 259, color: '#94A3B8', colorB: '#CBD5E1',
    badge: null, delivery: '5 to 7 days',
    tagline: 'Everything you need to exist with confidence.',
    features: [
      'Primary logo design (3 concepts)',
      'One final logo with variations',
      'Black, white and colour versions',
      'Logo usage guidelines (1 page)',
      'High res files (PNG, SVG, PDF)',
      '2 rounds of revisions',
    ],
    notIncluded: ['Brand colour palette', 'Typography system', 'Brand collateral', 'Social media kit'],
  },
  {
    id: 'standard', name: 'Standard', price: 599, color: '#F97316', colorB: '#FB923C',
    badge: 'Most Popular', delivery: '10 to 14 days',
    tagline: 'A complete visual identity that holds together.',
    features: [
      'Everything in Start',
      'Full brand colour palette',
      'Typography system (2 typefaces)',
      'Brand pattern or texture',
      'Business card design',
      'Email signature design',
      'Brand style guide (8 pages)',
      '3 rounds of revisions',
    ],
    notIncluded: ['Social media kit', 'Packaging design'],
  },
  {
    id: 'pro', name: 'Pro', price: 1199, color: '#7C3AED', colorB: '#A78BFA',
    badge: 'Full Brand', delivery: '18 to 25 days',
    tagline: 'A brand built to own its market.',
    features: [
      'Everything in Standard',
      'Social media kit (12 templates)',
      'Stationery suite (letterhead, envelope)',
      'Brand photography moodboard',
      'Packaging design concept',
      'Brand presentation deck',
      'Full brand book (20+ pages)',
      'Unlimited revisions',
      '30 day post delivery support',
    ],
    notIncluded: [],
  },
];

/* ── What branding actually is ───────────────────────────── */
const SERVICES = [
  {
    icon: RiLightbulbLine, color: '#F97316',
    img: UNSPLASH.strategy,
    title: 'Brand Strategy',
    sub: 'Before a single pixel gets drawn',
    desc: 'We dig into who you are, who you serve, and what space you want to own. Your positioning, tone of voice, brand personality, and competitive landscape all get mapped before we touch a design tool. This is the thinking that makes everything else make sense.',
    tags: ['Positioning', 'Tone of voice', 'Personality', 'Market mapping'],
  },
  {
    icon: RiPaletteLine, color: '#7C3AED',
    img: UNSPLASH.logo,
    title: 'Logo and Identity',
    sub: 'The face of your brand',
    desc: 'Not a logo slapped together in Canva. A mark built with intention — geometry, weight, proportion, and meaning behind every curve. We present three distinct directions so you see genuine options, not variations of the same idea.',
    tags: ['Logo design', 'Icon mark', 'Wordmark', 'Brand variations'],
  },
  {
    icon: RiEyeLine, color: '#0EA5E9',
    img: UNSPLASH.colors,
    title: 'Colour and Typography',
    sub: 'The emotion before the words',
    desc: 'Colour is the fastest thing a brain processes. We build palettes with psychological intention, then pair typefaces that carry the right weight for your category. The system has to work across a billboard, a phone screen, and a business card at the same time.',
    tags: ['Primary palette', 'Secondary tones', 'Type pairing', 'Accessibility check'],
  },
  {
    icon: RiStackLine, color: '#10B981',
    img: UNSPLASH.mockups,
    title: 'Collateral and Rollout',
    sub: 'The brand alive in the real world',
    desc: 'Brand guidelines, business cards, stationery, social media kits, packaging concepts. We show your brand working on the surfaces that matter to your customers so you leave with assets you can actually use on day one.',
    tags: ['Style guide', 'Stationery', 'Social kit', 'Packaging'],
  },
];

const PROCESS = [
  { n: '01', title: 'Discovery Brief',   desc: 'You fill a detailed questionnaire about your vision, audience, competitors, and non negotiables. No call needed to start.' },
  { n: '02', title: 'Moodboard Review',  desc: 'We present a visual direction before any design work. You sign off on the feel before we commit to execution.' },
  { n: '03', title: 'Concept Delivery',  desc: 'Three distinct logo concepts land in your inbox. Each comes with rationale explaining the thinking behind it.' },
  { n: '04', title: 'Refine and Lock',   desc: 'You choose a direction. We refine, adjust, and push it until you love it. Revisions are built into every package.' },
  { n: '05', title: 'Files and Handoff', desc: 'All source files, exports, and guidelines packaged cleanly. You own everything and can use it anywhere, forever.' },
];

const TESTIMONIALS = [
  { name: 'Adaeze O.', role: 'Wellness Brand Founder', stars: 5, text: 'The team absolutely nailed our brand. I kept saying more premium and they kept delivering. The logo alone has stopped people mid scroll.' },
  { name: 'Chidi M.',  role: 'Tech Startup CEO',       stars: 5, text: 'We pitched investors two weeks after our rebrand. Three of them commented on how polished and serious the visual identity looked. Worth every cent.' },
  { name: 'Fatima K.', role: 'Fashion Label Owner',    stars: 5, text: 'I have used three design agencies before this one. None of them did brand strategy first. The difference in the final result is night and day.' },
];

/* ── Shared components ───────────────────────────────────── */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const u = () => {
      const el = document.documentElement;
      const s = el.scrollTop || document.body.scrollTop;
      const t = el.scrollHeight - el.clientHeight;
      setP(t > 0 ? (s / t) * 100 : 0);
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
      background: `radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)`,
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
        { w: 520, h: 320, top: '5%',  left: '15%',  c: 'rgba(249,115,22,0.08)', d: 8  },
        { w: 380, h: 240, top: '20%', right: '8%',  c: 'rgba(124,58,237,0.05)', d: 11 },
        { w: 280, h: 160, top: '55%', left: '5%',   c: 'rgba(249,115,22,0.05)', d: 14 },
      ].map((o, i) => (
        <motion.div key={i}
          style={{
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
      backgroundImage: `radial-gradient(circle, rgba(249,115,22,0.55) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
    }} />
  );
}

/* ══════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════ */
function Lightbox({ images, initial, onClose }) {
  const [idx, setIdx] = useState(initial);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [images.length, onClose]);

  const cur = images[idx];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1001,
          width: 40, height: 40, borderRadius: 10,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 18,
        }}
      >
        <RiCloseLine />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
        style={{
          position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001,
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 22,
        }}
      >
        <RiArrowLeftSLine />
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
        style={{
          position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001,
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 22,
        }}
      >
        <RiArrowRightSLine />
      </button>

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: 900, width: '100%',
          borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        <Img
          src={cur.src}
          alt={cur.label}
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block', background: '#111' }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px 18px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{cur.label}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
            {idx + 1} / {images.length}
          </span>
        </div>
      </motion.div>

      {/* Thumbnail strip */}
      <div style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, zIndex: 1001,
      }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{
              width: 48, height: 36, borderRadius: 6, overflow: 'hidden',
              border: i === idx ? `2px solid ${ACCENT}` : '2px solid transparent',
              cursor: 'pointer', padding: 0, flexShrink: 0,
              opacity: i === idx ? 1 : 0.5, transition: 'opacity 0.2s, border-color 0.2s',
            }}
          >
            <Img src={img.thumb} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function BrandingPage() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

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
                  <RiFireLine style={{ width: 14, height: 14 }} />
                  Branding Service
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}
              >
                Your brand is{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`,
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  the first impression
                </span>{' '}
                you never get back.
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 460 }}
              >
                We design brand identities that stop the scroll, hold attention, and make customers
                feel they have found the right place. Strategy first. Visuals second. Results always.
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
                <a href="#portfolio"
                  onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-secondary">
                  View Our Work
                </a>
              </motion.div>

              {/* Trust row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {[
                  { label: '80+ brands built' },
                  { label: '5 star rated' },
                  { label: 'Files yours forever' },
                ].map(({ label }) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                    <RiCheckLine style={{ width: 13, height: 13, color: ACCENT }} />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — hero image collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              {/* Main big image */}
              <TiltCard
                intensity={4}
                style={{
                  borderRadius: 24, overflow: 'hidden',
                  boxShadow: `0 28px 70px rgba(249,115,22,0.18)`,
                  border: `1px solid ${ACCENT}22`,
                }}
              >
                <Img
                  src={UNSPLASH.hero}
                  alt="Brand identity design process showing colour swatches and logo concepts"
                  style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
                />
                {/* Overlay badge */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20,
                  background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
                  borderRadius: 14, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
                }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                      Latest Project
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
                      Brand Identity Complete
                    </p>
                  </div>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <RiPaletteLine style={{ width: 18, height: 18, color: ACCENT }} />
                  </div>
                </div>
              </TiltCard>

              {/* Floating small card top right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -18, right: -18,
                  background: '#fff', borderRadius: 14, padding: '10px 14px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', gap: 10, minWidth: 150,
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', gap: 4 }}>
                  {['#F97316','#7C3AED','#0EA5E9','#10B981'].map(c => (
                    <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>Colour palette</span>
              </motion.div>

              {/* Floating revision badge bottom right */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  position: 'absolute', bottom: 80, right: -22,
                  background: '#fff', borderRadius: 14, padding: '10px 14px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Delivery</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>5 days</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT BRANDING IS ──────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Build</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}
            >
              Branding is not a logo.<br />It is a feeling you engineer.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}
            >
              When people see your brand and immediately feel "this is exactly for me" — that is
              not an accident. That is architecture. Here is how we build it.
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
                  {/* Image */}
                  <div style={{ direction: 'ltr' }}>
                    <TiltCard
                      intensity={4}
                      style={{
                        borderRadius: 20, overflow: 'hidden',
                        boxShadow: `0 20px 50px ${s.color}22`,
                        border: `1px solid ${s.color}25`,
                        position: 'relative',
                      }}
                    >
                      <Img
                        src={s.img}
                        alt={`Visual for ${s.title}`}
                        style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
                        loading="lazy"
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

                  {/* Text */}
                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>
                      {s.sub}
                    </p>
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800,
                      color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.2,
                    }}>
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
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GALLERY ─────────────────────────────── */}
      <section id="portfolio" style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Our Work</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}
            >
              Brands we have built
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}
            >
              Click any piece to see it full size. Every project here started with a brief and
              became something the client was proud to put on everything.
            </motion.p>
          </div>

          {/* Masonry-style grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 14,
          }}>
            {PORTFOLIO.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                onClick={() => setLightboxIdx(i)}
                style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  cursor: 'pointer',
                  /* Give every 3rd card extra height for visual interest */
                  gridRow: (i === 1 || i === 5) ? 'span 2' : 'span 1',
                  aspectRatio: (i === 1 || i === 5) ? undefined : '4/3',
                  minHeight: (i === 1 || i === 5) ? 360 : undefined,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Img
                  src={img.thumb}
                  alt={img.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0)',
                  transition: 'background 0.25s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
                >
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    opacity: 0, transition: 'opacity 0.25s',
                    pointerEvents: 'none',
                  }}
                  ref={el => {
                    if (!el) return;
                    el.parentElement.onmouseenter = () => { el.parentElement.style.background = 'rgba(0,0,0,0.45)'; el.style.opacity = '1'; };
                    el.parentElement.onmouseleave = () => { el.parentElement.style.background = 'rgba(0,0,0,0)'; el.style.opacity = '0'; };
                  }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(255,255,255,0.95)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <RiExpandDiagonalLine style={{ width: 20, height: 20, color: ACCENT }} />
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
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>The Process</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Zero confusion from brief to files
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
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
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                  overflow: 'hidden',
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
              Pick your brand level
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 380, margin: '0 auto' }}
            >
              One time investment. You own every file, every source, forever.
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
                {/* Gradient top bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${pkg.color}, ${pkg.colorB})`, flexShrink: 0 }} />

                {/* Glow for popular */}
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
                        display: 'inline-block',
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
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
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{pkg.name} Brand</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{pkg.tagline}</p>

                  {/* Price */}
                  <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 5 }}>$</span>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ fontSize: 38, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: pkg.color }}
                      >
                        {pkg.price.toLocaleString()}
                      </motion.span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>USD</span>
                    </div>
                    <p style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
                      <RiCalendarLine style={{ width: 12, height: 12, color: pkg.color }} />
                      Delivered in {pkg.delivery}
                    </p>
                  </div>

                  {/* Included */}
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

                  {/* Not included */}
                  {pkg.notIncluded.length > 0 && (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22, opacity: 0.4 }}>
                      {pkg.notIncluded.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                          <RiCloseLine style={{ width: 13, height: 13, flexShrink: 0 }} />
                          <span style={{ textDecoration: 'line-through' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
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
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 30px ${pkg.color}50`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 20px ${pkg.color}30`; }}
                  >
                    <RiLock2Line style={{ width: 13, height: 13 }} />
                    Get Started — ${pkg.price.toLocaleString()}
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
              { icon: RiLock2Line,    text: 'Secure payment via Flutterwave' },
              { icon: RiFileTextLine, text: 'All source files included' },
              { icon: RiMagicLine,    text: 'Revisions until you love it' },
              { icon: RiCalendarLine, text: 'Free discovery call included' },
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
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Brands that now own their space
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  borderRadius: 18, padding: 24,
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor=`${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(0,0,0,0.07)'; }}
              >
                <div style={{
                  position: 'absolute', top: 8, right: 14,
                  fontSize: 70, lineHeight: 1, color: `${ACCENT}09`,
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
                      <RiStarFill style={{ width: 13, height: 13, color: '#F59E0B' }} />
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 18, position: 'relative', zIndex: 1 }}>
                  "{text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0,
                  }}>
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
            <SectionTag>Ready to Build?</SectionTag>
            <h2 style={{
              fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800,
              color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14,
            }}>
              Let us make your brand unforgettable
            </h2>
            <p style={{
              fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480,
              margin: '0 auto 2rem', color: 'var(--text-muted)',
            }}>
              Start with a free discovery call. We will look at your category, your competitors,
              and tell you exactly what your brand needs to win. No pressure, no pitch deck.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book a Free Call
                <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#portfolio"
                onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-secondary">
                View the Work
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={PORTFOLIO}
            initial={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}