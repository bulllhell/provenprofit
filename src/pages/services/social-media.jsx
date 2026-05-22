import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  RiInstagramLine, RiFacebookLine, RiTiktokLine,
  RiCheckLine, RiArrowRightUpLine, RiFireLine, RiTimeLine,
  RiShieldCheckLine, RiStarFill, RiEyeLine, RiCloseLine,
  RiBarChart2Line, RiLineChartLine, RiVideoLine, RiImageLine,
  RiMegaphoneLine, RiGroupLine, RiHeartLine,
  RiCalendarLine, RiPaletteLine,  RiMoneyDollarCircleLine,
  RiCameraLine, RiFilmLine, RiHashtag, RiNotificationLine,
  RiUserFollowLine, RiThumbUpLine, RiQuillPenLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ── Proof images (Cloudinary) ───────────────────────────── */
const PROOF = [
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483647/WhatsApp_Image_2026-05-21_at_19.49.59_1_nnu71e.jpg',  label: 'Campaign Results'     },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483641/WhatsApp_Image_2026-05-21_at_19.49.59_gflq1v.jpg',    label: 'Meta Ads Dashboard'   },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483635/WhatsApp_Image_2026-05-21_at_19.49.59_2_jo5blj.jpg',  label: 'Ad Performance'       },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483610/WhatsApp_Image_2026-05-21_at_19.50.01_n0ioyt.jpg',    label: 'Audience Reach'       },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483549/WhatsApp_Image_2026-05-21_at_19.50.01_1_sefhcj.jpg',  label: 'Engagement Stats'     },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483539/WhatsApp_Image_2026-05-21_at_19.50.02_horbm3.jpg',    label: 'Content Performance'  },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483530/WhatsApp_Image_2026-05-21_at_19.50.03_dcoywk.jpg',    label: 'Growth Analytics'     },
  { src: 'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779483492/WhatsApp_Image_2026-05-21_at_19.51.27_t3xnwj.jpg',    label: 'Social Strategy'      },
];

/* ── Unsplash service images ─────────────────────────────── */
const IMG = {
  hero:    'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1400&q=80',
  ads:     'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80',
  content: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80',
  growth:  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
};

/* ── Packages — Meta Ads, Content and Management bundles ─── */
const PACKAGES = [
  {
    id: 'starter', name: 'Starter', price: 299, period: 'mo',
    color: '#94A3B8', colorB: '#CBD5E1', badge: null,
    tagline: 'Get your brand visible and growing on social.',
    note: 'Ad budget paid directly to Meta by you.',
    features: [
      '8 posts per month (feed and stories)',
      'Basic content calendar',
      'Caption writing and hashtag research',
      'Profile and bio optimisation',
      'Community management (comments and DMs)',
      'Monthly performance report',
      '1 platform (Instagram or Facebook)',
    ],
    notIncluded: ['Meta paid ads management', 'Reels and video content', 'Multi platform management'],
  },
  {
    id: 'growth', name: 'Growth', price: 599, period: 'mo',
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular',
    tagline: 'Organic content plus paid ads working together.',
    note: 'Ad budget paid directly to Meta by you.',
    features: [
      '16 posts per month across 2 platforms',
      'Reels and short video content (4 per month)',
      'Full content calendar and scheduling',
      'Caption writing and hashtag strategy',
      'Meta Ads management (up to 3 campaigns)',
      'Audience targeting and retargeting setup',
      'A/B ad creative testing',
      'Community management',
      'Bi weekly performance reports',
    ],
    notIncluded: ['TikTok management', 'Influencer outreach'],
  },
  {
    id: 'pro', name: 'Pro', price: 999, period: 'mo',
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Full Service',
    tagline: 'Complete social media dominance across all channels.',
    note: 'Ad budget paid directly to Meta by you.',
    features: [
      '24 posts per month across 3 platforms',
      'Reels and TikTok videos (8 per month)',
      'Full content production and editing',
      'Meta Ads management (unlimited campaigns)',
      'TikTok Ads management',
      'Full funnel ad strategy',
      'Influencer outreach coordination',
      'Weekly analytics and reporting',
      'Monthly strategy review call',
      'Priority response within 12 hours',
    ],
    notIncluded: [],
  },
];

/* ── Three core services explained ──────────────────────── */
const SERVICES = [
  {
    icon: RiMegaphoneLine, color: '#F97316',
    img: IMG.ads,
    title: 'Meta Ads Management',
    sub: 'Your budget. Our strategy. Real returns.',
    desc: 'We build and manage Facebook and Instagram ad campaigns that put your brand in front of the exact people most likely to buy. Audience research, creative strategy, campaign structure, bid optimisation and ROAS tracking — all handled while you focus on your business. Your ad budget goes straight to Meta. We charge only for the management.',
    tags: ['Facebook Ads', 'Instagram Ads', 'Retargeting', 'ROAS tracking', 'Audience research'],
  },
  {
    icon: RiImageLine, color: '#EC4899',
    img: IMG.content,
    title: 'Content Creation',
    sub: 'Scroll stopping content built around your brand.',
    desc: 'We plan, write, design and schedule content that consistently represents your brand at its best. Feed posts, stories, reels, carousels — every piece is crafted with a clear purpose: to grow your audience, build trust, and drive people toward buying. No generic stock images. No recycled captions.',
    tags: ['Reels and video', 'Feed design', 'Caption writing', 'Hashtag strategy', 'Scheduling'],
  },
  {
    icon: RiLineChartLine, color: '#7C3AED',
    img: IMG.growth,
    title: 'Social Media Management',
    sub: 'Your social presence handled end to end.',
    desc: 'We manage your entire social media presence so you never have to think about it. Community management, DM responses, comment engagement, profile optimisation, and regular reporting. You stay focused on your business while your social channels keep growing and converting.',
    tags: ['Community management', 'DM handling', 'Profile growth', 'Monthly reports', 'Strategy'],
  },
];

/* ── Stats that animate in ───────────────────────────────── */
const STATS = [
  { icon: RiUserFollowLine, value: 2400000, suffix: '+',  label: 'total reach generated',     display: '2.4M+' },
  { icon: RiThumbUpLine,    value: 340,     suffix: '%',  label: 'avg engagement increase',   display: '340%'  },
  { icon: RiMoneyDollarCircleLine, value: 4, suffix: 'x', label: 'average ROAS on Meta Ads',  display: '4x'    },
  { icon: RiHeartLine,      value: 50,      suffix: '+',  label: 'brands managed',            display: '50+'   },
];

/* ── Process ─────────────────────────────────────────────── */
const PROCESS = [
  { n: '01', title: 'Brand Audit',      desc: 'We review your existing presence, competitors, audience behaviour, and what content your category responds to before writing a single caption.' },
  { n: '02', title: 'Strategy Build',   desc: 'Full content strategy and ad plan. Platforms, content pillars, posting cadence, ad objectives, and audience maps — all in a shared doc you can see.' },
  { n: '03', title: 'Content Creation', desc: 'We produce the content, schedule it, and manage all ad campaigns. You approve the plan each month before anything goes live.' },
  { n: '04', title: 'Optimise',         desc: 'We track everything, cut what underperforms, double down on what works, and bring you a clear report showing exactly what your investment returned.' },
];

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Sade A.',  role: 'Beauty Brand Owner',   stars: 5, text: 'They took our Instagram from 800 to 12,000 followers in four months. Sales from social went from almost nothing to 40% of our revenue.' },
  { name: 'Emeka T.', role: 'Fitness Studio Owner', stars: 5, text: 'Our Meta Ads were burning money before this team. They rebuilt everything and we are now getting leads at a third of what we used to pay.' },
  { name: 'Zara K.',  role: 'Fashion Label Founder', stars: 5, text: 'The content quality alone is worth every penny. Our feed went from random to genuinely beautiful and people notice.' },
];

/* ── Shared helpers ──────────────────────────────────────── */
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
  return <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, left: pos.x - 220, top: pos.y - 220, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)', opacity: vis ? 1 : 0, transition: 'opacity 0.3s' }} />;
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
  return <motion.div ref={ref} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', transformPerspective: 1000 }} {...rest}>{children}</motion.div>;
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[{ w:500,h:300,top:'5%',left:'15%',c:'rgba(249,115,22,0.08)',d:8 },{ w:360,h:220,top:'20%',right:'8%',c:'rgba(236,72,153,0.05)',d:11 },{ w:260,h:160,top:'55%',left:'5%',c:'rgba(124,58,237,0.05)',d:14 }].map((o,i)=>(
        <motion.div key={i} style={{ position:'absolute',width:o.w,height:o.h,top:o.top,left:o.left,right:o.right,borderRadius:'50%',background:o.c,filter:'blur(60px)' }} animate={{ y:[0,-28,0],x:[0,16,0],scale:[1,1.07,1] }} transition={{ duration:o.d,repeat:Infinity,ease:'easeInOut',delay:i*1.4 }} />
      ))}
    </div>
  );
}

function DotGrid() {
  return <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:0.025,backgroundImage:'radial-gradient(circle, rgba(249,115,22,0.55) 1px, transparent 1px)',backgroundSize:'40px 40px',WebkitMaskImage:'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',maskImage:'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)' }} />;
}

/* ── Animated stat card ──────────────────────────────────── */
function StatCard({ icon: Icon, display, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ borderRadius: 16, padding: '22px 20px', background: '#fff', border: `1px solid ${color}20`, textAlign: 'center', boxShadow: `0 4px 20px ${color}10` }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <Icon style={{ width: 20, height: 20, color }} />
      </div>
      <p style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 6 }}>{display}</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function SocialMediaPage() {
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

            {/* Left text */}
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  <RiFireLine style={{ width: 14, height: 14 }} />
                  Social Media Service
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}
              >
                Social media that{' '}
                <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #EC4899 55%, #7C3AED 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3.5s linear infinite' }}>
                  builds, converts
                </span>{' '}
                and scales.
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}>
                We run your Meta Ads, create your content, and manage your social presence
                end to end. Three disciplines working together so your brand grows its
                audience, earns trust, and turns followers into paying customers.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  See Packages <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </a>
                <Link to="/book-a-call" className="btn-secondary">Free Strategy Call</Link>
              </motion.div>

              {/* Platform icons */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { icon: RiInstagramLine, label: 'Instagram', color: '#E1306C' },
                  { icon: RiFacebookLine,  label: 'Facebook',  color: '#1877F2' },
                  { icon: RiTiktokLine,    label: 'TikTok',    color: '#010101' },
                ].map(({ icon: Icon, label, color }) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: `${color}10`, border: `1px solid ${color}22`, fontSize: 12, fontWeight: 700, color }}>
                    <Icon style={{ width: 14, height: 14 }} /> {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right hero image */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} style={{ position: 'relative' }}>
              <TiltCard intensity={4} style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 28px 70px rgba(236,72,153,0.18)', border: '1px solid rgba(236,72,153,0.2)' }}>
                <Img src={IMG.hero} alt="Social media analytics dashboard showing engagement and follower growth" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>This Month</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Reach up 340%</p>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[...Array(5)].map((_,j) => <RiStarFill key={j} style={{ width: 12, height: 12, color: '#F59E0B' }} />)}
                  </div>
                </div>
              </TiltCard>

              {/* Floating follower badge */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -18, right: -18, background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', minWidth: 148 }}>
                <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>New Followers</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#E1306C', lineHeight: 1 }}>+4.2K</span>
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>this month</span>
                </div>
              </motion.div>

              {/* Floating ROAS badge */}
              <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', bottom: 80, right: -22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiMoneyDollarCircleLine style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Ad Return</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>4.8x ROAS</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ─────────────────────────────────────── */}
      <section style={{ padding: '3rem 0 4rem', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {STATS.map((s, i) => (
              <StatCard key={s.label} icon={s.icon} display={s.display} label={s.label} color={[ACCENT,'#EC4899','#7C3AED','#10B981'][i]} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AD BUDGET NOTICE ──────────────────────────────── */}
      <section style={{ padding: '2rem 1.5rem', background: `${ACCENT}08`, borderTop: `1px solid ${ACCENT}18`, borderBottom: `1px solid ${ACCENT}18` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
            <RiMoneyDollarCircleLine style={{ width: 20, height: 20, color: ACCENT, flexShrink: 0 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', maxWidth: 660, lineHeight: 1.65 }}>
              <span style={{ color: ACCENT, fontWeight: 800 }}>Your ad budget goes directly to Meta — never through us.</span>
              {' '}Management fees cover strategy, creative and optimisation only. You stay in full control of your spend.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THREE SERVICES ────────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Do</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Three disciplines. One strategy.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              Most agencies do one of these. We do all three and make them work together —
              because paid ads, organic content, and community management compound when they
              are driven by the same strategy.
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

      {/* ── PROOF GALLERY ─────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Real Results</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Numbers from live campaigns
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              Real dashboards, real accounts, real returns. Click any image to view it full size.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
            {PROOF.map((img, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                onClick={() => setLightbox(i)}
                style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  gridRow: (i === 1 || i === 5) ? 'span 2' : 'span 1',
                  aspectRatio: (i === 1 || i === 5) ? undefined : '4/3',
                  minHeight: (i === 1 || i === 5) ? 360 : undefined,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.querySelector('.reveal').style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('.reveal').style.opacity = '0'; }}
                >
                  <div className="reveal" style={{ opacity: 0, transition: 'opacity 0.25s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <RiEyeLine style={{ width: 20, height: 20, color: ACCENT }} />
                    </div>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{img.label}</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: 'var(--text)' }}>
                  {img.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>How We Work</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Strategy before a single post goes live
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {PROCESS.map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ position: 'relative', borderRadius: 18, padding: '22px 20px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}
              >
                <span style={{ position: 'absolute', top: -12, right: -4, fontSize: 84, fontWeight: 900, color: `${ACCENT}07`, lineHeight: 1, userSelect: 'none' }}>{p.n}</span>
                <div style={{ width: 34, height: 34, borderRadius: 9, marginBottom: 14, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 11, boxShadow: `0 4px 14px ${ACCENT}35` }}>{p.n}</div>
                <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 7, color: 'var(--text)' }}>{p.title}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────── */}
      <section id="packages" style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1050, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Pricing</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Pick your social level
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              Monthly retainer. Cancel with 30 days notice. Ad budget is always separate and goes directly to Meta.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard key={pkg.id} intensity={pkg.badge === 'Most Popular' ? 4 : 6}
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
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{pkg.name} Plan</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{pkg.tagline}</p>

                  <div style={{ marginBottom: 6, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 7 }}>$</span>
                      <motion.span initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: pkg.color }}>
                        {pkg.price}
                      </motion.span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>/mo</span>
                    </div>
                    <p style={{ fontSize: 11, color: `${pkg.color}cc`, fontWeight: 600, fontStyle: 'italic' }}>{pkg.note}</p>
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
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=`0 8px 30px ${pkg.color}50`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 4px 20px ${pkg.color}30`; }}
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
              { icon: RiShieldCheckLine,       text: 'No lock in contracts' },
              { icon: RiMoneyDollarCircleLine, text: 'Ad budget stays with you' },
              { icon: RiCalendarLine,          text: 'Cancel with 30 days notice' },
              { icon: RiBarChart2Line,         text: 'Monthly reports included' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <Icon style={{ width: 14, height: 14, color: ACCENT }} /> {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Client Words</SectionTag>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Brands that now own their feed
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ borderRadius: 18, padding: 24, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor=`${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(0,0,0,0.07)'; }}
              >
                <div style={{ position: 'absolute', top: 8, right: 14, fontSize: 70, lineHeight: 1, color: `${ACCENT}09`, fontFamily: 'Georgia, serif', fontWeight: 900, userSelect: 'none' }}>{'"'}</div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(stars)].map((_,j) => (
                    <motion.div key={j} initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + j * 0.06, type: 'spring', stiffness: 400 }}>
                      <RiStarFill style={{ width: 13, height: 13, color: '#F59E0B' }} />
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 18, position: 'relative', zIndex: 1 }}>{'"'}{text}{'"'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{name[0]}</div>
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
            <SectionTag>Ready to Grow?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Turn your social channels into a revenue engine
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              Book a free strategy call. We will audit your current social presence, review
              your competitors, and show you exactly what a well run social strategy looks
              like for your brand. No obligation, no pitch deck.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book My Free Call <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
                View Packages
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} style={{ position: 'fixed', top: 20, right: 20, zIndex: 1001, width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>
              <RiCloseLine />
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PROOF.length) % PROOF.length); }}
              style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 24 }}>
              {'‹'}
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PROOF.length); }}
              style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 24 }}>
              {'›'}
            </button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 900, width: '100%', borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <Img src={PROOF[lightbox].src} alt={PROOF[lightbox].label} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 18px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{PROOF[lightbox].label}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{lightbox + 1} / {PROOF.length}</span>
              </div>
            </motion.div>
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