import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  RiSearchEyeLine, RiCheckLine, RiArrowRightUpLine,
  RiLineChartLine, RiSpeedLine, RiBarChart2Line,
  RiKey2Line, RiLinksLine, RiArticleLine, RiCodeSSlashLine,
  RiGlobalLine, RiStarFill, RiTimeLine, RiShieldCheckLine,
  RiFireLine, RiAwardLine, RiMagicLine, RiCompassDiscoverLine,
  RiRadarLine, RiRocketLine, RiTrophyLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ══════════════════════════════════════════════════════════
   UNSPLASH IMAGES
   Stable hosted URLs from photo IDs. All free for use under
   the Unsplash License with attribution shown via alt text.
══════════════════════════════════════════════════════════ */
const IMG = {
  hero:        'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  keywords:    'https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  technical:   'https://images.unsplash.com/photo-1686061593213-98dad7c599b9?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  content:     'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',  // writing notebook, Christin Hume
  authority:   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',     // graph trend up, Lukas Blazek
  proof1:      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&q=80',  // SEO Galaxy
  proof2:      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=80',  // analytics graphs, Stephen Phillips
  proof3:      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',     // marketing meeting
  ranking:     'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80', // Myriam Jessier
};

/* ── Animated counter hook ───────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Tilt card wrapper ───────────────────────────────────── */
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
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll progress bar ─────────────────────────────────── */
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

/* ── Cursor glow ─────────────────────────────────────────── */
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
      background: `radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)`,
      opacity: vis ? 1 : 0, transition: 'opacity 0.3s',
    }} />
  );
}

/* ── Section tag with live dot ───────────────────────────── */
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
        letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: 16,
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`,
        animation: 'pulse-dot 2s ease-in-out infinite',
      }} />
      {children}
      <style>{`@keyframes pulse-dot {0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)}}`}</style>
    </motion.span>
  );
}

/* ── Counter pill ────────────────────────────────────────── */
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

/* ── Floating orbs background ────────────────────────────── */
function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[
        { w: 520, h: 320, top: '5%',  left: '15%',  c: 'rgba(249,115,22,0.08)', d: 8  },
        { w: 380, h: 240, top: '20%', right: '10%', c: 'rgba(124,58,237,0.05)', d: 11 },
        { w: 280, h: 180, top: '55%', left: '8%',   c: 'rgba(249,115,22,0.05)', d: 14 },
      ].map((o, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute', width: o.w, height: o.h,
            top: o.top, left: o.left, right: o.right,
            borderRadius: '50%', background: o.c, filter: 'blur(60px)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 1.4 }}
        />
      ))}
    </div>
  );
}

/* ── Dot grid ────────────────────────────────────────────── */
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
   DATA
══════════════════════════════════════════════════════════ */
const PILLARS = [
  {
    n: '01', icon: RiKey2Line, title: 'Keyword Research',
    img: IMG.keywords,
    desc: 'We hunt for the exact phrases your buyers type into Google when they are ready to spend. Not vanity keywords. Money keywords with real commercial intent and reachable difficulty.',
    bullets: ['Search intent mapping', 'Competitor gap analysis', 'Long tail goldmines', 'Monthly volume validation'],
    color: '#F97316',
  },
  {
    n: '02', icon: RiCodeSSlashLine, title: 'Technical SEO',
    img: IMG.technical,
    desc: 'The invisible work that makes Google fall in love with your site. Crawlability, indexation, schema, Core Web Vitals. We fix the engine before we worry about the paint job.',
    bullets: ['Site speed optimisation', 'Schema markup', 'Mobile crawl fixes', 'Sitemap and robots tuning'],
    color: '#7C3AED',
  },
  {
    n: '03', icon: RiArticleLine, title: 'Content Strategy',
    img: IMG.content,
    desc: 'Content that ranks because it actually answers the question better than anyone else on page one. We map topic clusters, build pillar pages, and produce work that earns links naturally.',
    bullets: ['Topic cluster maps', 'Pillar page builds', 'Internal link strategy', 'Content refresh cycles'],
    color: '#0EA5E9',
  },
  {
    n: '04', icon: RiLinksLine, title: 'Authority Building',
    img: IMG.authority,
    desc: 'White hat link acquisition through digital PR, partnerships, and outreach. We earn placements on sites Google actually trusts, not spammy directories that tank your reputation.',
    bullets: ['Digital PR outreach', 'Guest placements', 'Broken link reclaim', 'Brand mention chasing'],
    color: '#10B981',
  },
];

const PROCESS = [
  { step: '01', title: 'Audit and Discovery', desc: 'Forty point technical audit, competitor teardown, keyword universe map. We come back with a one page document showing exactly where you bleed traffic.' },
  { step: '02', title: 'Strategy Blueprint',  desc: 'Custom 90 day roadmap with priorities ranked by impact and effort. You see what we will ship, when, and what we expect each move to return.' },
  { step: '03', title: 'Execution Sprint',    desc: 'Two week sprints. Technical fixes, content production, link earning, on page optimisation. We move fast because Google rewards momentum.' },
  { step: '04', title: 'Track and Refine',    desc: 'Weekly ranking reports, monthly traffic reviews, quarterly strategy resets. We double down on what works and kill what does not.' },
];

const CASE_STUDIES = [
  { brand: 'Beauty Brand',  metric: '+412%', label: 'organic traffic', period: '6 months', img: IMG.proof1, quote: 'Went from 800 to 4,100 monthly visitors. Sales followed.' },
  { brand: 'B2B SaaS',      metric: '+89',   label: 'top 3 rankings',   period: '4 months', img: IMG.proof2, quote: 'They put us on page one for our top 12 buying keywords.' },
  { brand: 'Local Service', metric: '×7',    label: 'lead volume',      period: '5 months', img: IMG.proof3, quote: 'We stopped paying for ads. Organic does all the lifting.' },
];

const FAQS = [
  { q: 'How long until I see results?',
    a: 'SEO is a compound game. You will see technical wins in the first 30 days, ranking movement by month two, and meaningful traffic growth between months three and six. Anyone promising faster is selling smoke.' },
  { q: 'Do you guarantee rankings?',
    a: 'No reputable SEO does. Google updates its algorithm thousands of times a year. What we do guarantee is methodology, transparency, and a steady climb in qualified traffic when our work is followed.' },
  { q: 'What if I already have an SEO?',
    a: 'We will audit their work for free. If they are doing well, we will tell you. If gaps exist, we will show you exactly what is missing and how we would fix it.' },
  { q: 'Do you do local SEO?',
    a: 'Yes. Google Business Profile optimisation, local citations, review strategy, and geo targeted content. Local SEO is some of the highest ROI work we do.' },
];

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function SeoPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <ScrollProgress />
      <CursorGlow />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingTop: '9rem', paddingBottom: '5rem', overflow: 'hidden' }}>
        <FloatingOrbs />
        <DotGrid />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>

            {/* Left text */}
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '7px 18px', borderRadius: 100,
                  background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>
                  <RiSearchEyeLine style={{ width: 14, height: 14 }} />
                  SEO Service
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}
              >
                Rank where your{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`,
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer-text 3s linear infinite',
                }}>
                  buyers are searching
                </span>
                <style>{`@keyframes shimmer-text {0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}
              >
                We engineer organic search growth that compounds. No tricks, no fluff. Just the
                technical, content, and authority work that puts your brand in front of buyers
                with their wallet already open.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}
              >
                <Link to="/book-a-call" className="btn-primary group" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Get a Free SEO Audit
                  <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </Link>
                <a href="#pillars"
                  onClick={e => { e.preventDefault(); document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-secondary">
                  How It Works
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <StatPill icon={RiLineChartLine} target={312} suffix="%" label=" avg traffic lift" prefix="+" />
                <StatPill icon={RiTrophyLine}    target={94}  suffix=""  label=" page one rankings" />
                <StatPill icon={RiAwardLine}     target={5}   suffix=""  label=" star rated" />
              </motion.div>
            </div>

            {/* Right image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              <TiltCard
                intensity={5}
                style={{
                  position: 'relative', borderRadius: 24, overflow: 'hidden',
                  border: `1px solid ${ACCENT}25`,
                  boxShadow: `0 24px 60px rgba(249,115,22,0.18), 0 0 0 1px rgba(0,0,0,0.04)`,
                  background: '#fff',
                }}
              >
                <Img
                  src={IMG.hero}
                  alt="Analytics dashboard showing organic search growth"
                  style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
                  loading="eager"
                />
                {/* Floating ranking badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', top: 22, left: 22,
                    background: '#fff', borderRadius: 14, padding: '10px 14px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <RiRocketLine style={{ width: 18, height: 18, color: ACCENT }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Position</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>
                      <span style={{ color: '#94A3B8', textDecoration: 'line-through', fontSize: 12, marginRight: 6 }}>#47</span>
                      #3
                    </p>
                  </div>
                </motion.div>

                {/* Floating CTR card */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  style={{
                    position: 'absolute', bottom: 22, right: 22,
                    background: '#fff', borderRadius: 14, padding: '12px 16px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    minWidth: 140,
                  }}
                >
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Click Through Rate
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>8.2%</span>
                    <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>↑ 3.1×</span>
                  </div>
                  <div style={{ marginTop: 8, height: 4, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ delay: 0.8, duration: 1.2 }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENTB})`, borderRadius: 100 }}
                    />
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── LOGO STRIP / TRUST ────────────────────────────── */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{
              textAlign: 'center', fontSize: 11, letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 24,
            }}
          >
            Tools we wield daily
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px, 5vw, 56px)', opacity: 0.7 }}>
            {['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'Surfer', 'Clearscope'].map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '-0.01em' }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FOUR PILLARS ──────────────────────────────── */}
      <section id="pillars" style={{ padding: '5rem 0', background: '#F1EEF9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>The Four Pillars</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}
            >
              How real SEO actually works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}
            >
              SEO is not a single trick or a hidden button. It is four disciplines working in concert.
              Drop one and the whole engine stalls. Here is what we ship.
            </motion.p>
          </div>

          {/* Alternating pillar rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {PILLARS.map((p, i) => {
              const reverse = i % 2 === 1;
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 40, alignItems: 'center',
                    direction: reverse ? 'rtl' : 'ltr',
                  }}
                >
                  {/* Image */}
                  <div style={{ direction: 'ltr', position: 'relative' }}>
                    <TiltCard
                      intensity={4}
                      style={{
                        position: 'relative', borderRadius: 20, overflow: 'hidden',
                        boxShadow: `0 20px 50px ${p.color}25`,
                        border: `1px solid ${p.color}25`,
                      }}
                    >
                      <Img
                        src={p.img}
                        alt={`Visual illustration for ${p.title}`}
                        style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                      {/* Pillar number watermark */}
                      <div style={{
                        position: 'absolute', top: 16, left: 16,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        borderRadius: 12, padding: '6px 12px',
                        fontSize: 11, fontWeight: 800, color: p.color,
                        letterSpacing: '0.14em',
                      }}>
                        PILLAR {p.n}
                      </div>
                      {/* Color overlay tint */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${p.color}10, transparent 50%)`,
                        pointerEvents: 'none',
                      }} />
                    </TiltCard>
                  </div>

                  {/* Text */}
                  <div style={{ direction: 'ltr' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14,
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: `${p.color}15`, border: `1px solid ${p.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon style={{ width: 20, height: 20, color: p.color }} />
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: p.color,
                      }}>
                        {p.title}
                      </span>
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800,
                      color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.2,
                    }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 18 }}>
                      {p.desc}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {p.bullets.map((b, bi) => (
                        <motion.li
                          key={b}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: bi * 0.06 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text)' }}
                        >
                          <div style={{
                            width: 18, height: 18, borderRadius: 6,
                            background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <RiCheckLine style={{ width: 12, height: 12, color: p.color }} />
                          </div>
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ──────────────────────────────── */}
      <section style={{ padding: '5rem 0', position: 'relative' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>The Process</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Ninety days from audit to ascent
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  position: 'relative', borderRadius: 18, padding: '24px 22px',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                {/* Big faded number */}
                <span style={{
                  position: 'absolute', top: -10, right: -4,
                  fontSize: 90, fontWeight: 900, lineHeight: 1,
                  color: `${ACCENT}08`, letterSpacing: '-0.05em',
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  {p.step}
                </span>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, marginBottom: 14,
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 12,
                    boxShadow: `0 4px 14px ${ACCENT}35`,
                  }}>
                    {p.step}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Real Results</SectionTag>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Receipts, not promises
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={cs.brand}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                style={{
                  borderRadius: 20, overflow: 'hidden',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 44px rgba(249,115,22,0.15)`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.05)'}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <Img
                    src={cs.img}
                    alt={`Case study visual for ${cs.brand}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)',
                  }} />
                  {/* Metric overlay */}
                  <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {cs.brand}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
                        textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      }}>
                        {cs.metric}
                      </span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                        {cs.label}
                      </span>
                    </div>
                  </div>
                  {/* Period badge */}
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                    borderRadius: 100, padding: '4px 12px',
                    fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.08em',
                  }}>
                    in {cs.period}
                  </div>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    "{cs.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG VISUAL / RANKING JOURNEY ──────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative', borderRadius: 28, overflow: 'hidden',
              minHeight: 360,
              boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
            }}
          >
            <Img
              src={IMG.ranking}
              alt="Search ranking strategy planning on a whiteboard"
              style={{ width: '100%', height: '100%', minHeight: 360, objectFit: 'cover', position: 'absolute', inset: 0 }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(95deg, rgba(10,5,2,0.88) 0%, rgba(10,5,2,0.65) 55%, rgba(10,5,2,0.2) 100%)',
            }} />
            <div style={{
              position: 'relative', zIndex: 1,
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              minHeight: 360, maxWidth: 620,
            }}>
              <motion.span
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start',
                  padding: '5px 14px', borderRadius: 100, marginBottom: 18,
                  background: `${ACCENT}25`, border: `1px solid ${ACCENT}50`,
                  color: '#FED7AA', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}
              >
                <RiCompassDiscoverLine style={{ width: 12, height: 12 }} />
                Why It Compounds
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', fontWeight: 800,
                color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16,
              }}>
                Paid ads stop the second you stop paying.{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENTB}, #FCD34D)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  SEO keeps working while you sleep.
                </span>
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: 24 }}>
                A page that ranks number one today will still pull traffic next month, next year,
                and five years from now. Every hour you invest in SEO is an asset on the balance
                sheet, not an expense on the invoice.
              </p>
              <Link to="/book-a-call"
                style={{
                  display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: 100, fontWeight: 700, fontSize: 13,
                  color: '#fff', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
                  boxShadow: `0 8px 28px ${ACCENT}55`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow=`0 12px 36px ${ACCENT}70`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 8px 28px ${ACCENT}55`; }}
              >
                <RiRadarLine style={{ width: 16, height: 16 }} />
                Start Your SEO Audit
                <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
            </div>
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
              Things people ask before signing
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
                      width: '100%', textAlign: 'left',
                      padding: '18px 22px',
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
                        fontSize: 16, fontWeight: 300,
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
      <section style={{ paddingBottom: '6rem', padding: '5rem 1rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <SectionTag>Ready to Climb?</SectionTag>
            <h2 style={{
              fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800,
              color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14,
            }}>
              Find out where you bleed traffic
            </h2>
            <p style={{
              fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 28,
              maxWidth: 480, margin: '0 auto 1.75rem', color: 'var(--text-muted)',
            }}>
              Book a free 30 minute audit call. We will pull your live data, point at the
              biggest opportunities, and show you what page one actually looks like for your
              category. No slide deck, no pitch. Just the truth.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary group" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book My Free Audit
                <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#pillars"
                onClick={e => { e.preventDefault(); document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-secondary">
                See the Pillars
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}