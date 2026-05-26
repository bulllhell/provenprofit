import Img from '../../components/Img';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  RiMailLine, RiMailSendLine, RiInboxLine, RiNotificationLine,
  RiCheckLine, RiArrowRightUpLine, RiFireLine, RiTimeLine,
  RiShieldCheckLine, RiStarFill, RiEyeLine, RiCloseLine,
  RiBarChart2Line, RiLineChartLine, RiUserFollowLine,
  RiMoneyDollarCircleLine, RiCalendarLine, RiFlowChart,
  RiRepeatLine, RiShoppingCartLine, RiHeartLine,
  RiGroupLine, RiTestTubeLine, RiDashboardLine,
  RiZoomInLine, RiSettings3Line, RiEditLine,
} from 'react-icons/ri';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

/* ── Proof images ────────────────────────────────────────── */
const PROOF = [
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779557157/WhatsApp_Image_2026-05-22_at_22.42.03_5_obha3s.jpg',
    label: 'Klaviyo Flow Setup',
    tag:   'Automation',
    color: '#7C3AED',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779557157/WhatsApp_Image_2026-05-22_at_22.42.03_6_qxwdud.jpg',
    label: 'Campaign Performance',
    tag:   'Analytics',
    color: '#F97316',
  },
  {
    src:   'https://res.cloudinary.com/dm2zp4jb1/image/upload/q_auto/f_auto/v1779557136/WhatsApp_Image_2026-05-22_at_23.42.33_x9cil8.jpg',
    label: 'Email Revenue Report',
    tag:   'Revenue',
    color: '#10B981',
  },
];

/* ── Unsplash explainer images ───────────────────────────── */
const IMG = {
  hero:      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1400&q=80',
  flows:     'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=900&q=80',
  campaigns: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  segments:  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
};

/* ── Packages ────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'starter', name: 'Starter', price: 249, period: 'setup',
    color: '#94A3B8', colorB: '#CBD5E1', badge: null,
    tagline: 'Get your list working for you from day one.',
    features: [
      'Welcome series (3 emails)',
      'Abandoned cart flow (2 emails)',
      'Platform setup (Klaviyo or Mailchimp)',
      'List import and cleaning',
      'Basic segmentation setup',
      'Email template design (1 template)',
      'Monthly send management (4 campaigns)',
    ],
    notIncluded: ['Advanced flows', 'A/B testing', 'SMS setup', 'Win back and browse flows'],
  },
  {
    id: 'growth', name: 'Growth', price: 499, period: 'setup',
    color: '#F97316', colorB: '#FB923C', badge: 'Most Popular',
    tagline: 'Full automation engine that earns while you sleep.',
    features: [
      'Everything in Starter',
      'Welcome series (5 emails)',
      'Abandoned cart flow (4 emails)',
      'Browse abandonment flow',
      'Post purchase series',
      'Win back flow',
      'Advanced segmentation (5 segments)',
      'Email template design (3 templates)',
      'A/B subject line testing',
      'Monthly send management (8 campaigns)',
      'Monthly performance report',
    ],
    notIncluded: ['SMS flows', 'Loyalty program setup'],
  },
  {
    id: 'pro', name: 'Pro', price: 899, period: 'setup',
    color: '#7C3AED', colorB: '#A78BFA', badge: 'Full Service',
    tagline: 'Complete email revenue system built to compound.',
    features: [
      'Everything in Growth',
      'Full flow library (10 plus flows)',
      'SMS flow setup and management',
      'VIP and loyalty segment flows',
      'Review request automation',
      'Cross sell and upsell flows',
      'Full brand email template system',
      'Advanced A/B testing strategy',
      'Unlimited segmentation',
      'Bi weekly performance calls',
      'Monthly send management (unlimited)',
      'Revenue attribution dashboard',
    ],
    notIncluded: [],
  },
];

/* ── Flows we build ──────────────────────────────────────── */
const FLOWS = [
  {
    icon: RiUserFollowLine, color: '#F97316',
    title: 'Welcome Series',
    desc: 'Your first impression on every new subscriber. We build a sequence that introduces your brand, sets expectations, delivers value, and nudges toward a first purchase — without being pushy.',
    stat: '45% avg open rate',
  },
  {
    icon: RiShoppingCartLine, color: '#7C3AED',
    title: 'Abandoned Cart',
    desc: 'Recover the revenue that walks away. Timed reminders, social proof, and a perfectly placed incentive bring browsers back to complete what they started.',
    stat: 'Up to 15% recovery rate',
  },
  {
    icon: RiEyeLine, color: '#0EA5E9',
    title: 'Browse Abandonment',
    desc: 'Someone looked at a product but did not add to cart. We catch them with a personalised follow up that puts exactly what they were eyeing back in front of them.',
    stat: '8x return on investment',
  },
  {
    icon: RiHeartLine, color: '#EC4899',
    title: 'Post Purchase',
    desc: 'The sale is not the finish line. A great post purchase sequence builds loyalty, encourages reviews, introduces complementary products, and turns one time buyers into repeat customers.',
    stat: '60% repeat purchase lift',
  },
  {
    icon: RiRepeatLine, color: '#10B981',
    title: 'Win Back',
    desc: 'Inactive subscribers are a gold mine most brands ignore. We build re engagement flows that wake them up, and sunset the ones who will never return to protect your deliverability.',
    stat: '22% reactivation rate',
  },
  {
    icon: RiTestTubeLine, color: '#F59E0B',
    title: 'A/B Testing',
    desc: 'Subject lines, send times, copy angles, CTA buttons — we test systematically so every campaign performs better than the last. No guessing. Only data.',
    stat: '30% avg open rate lift',
  },
];

/* ── Services ─────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: RiFlowChart, color: '#7C3AED',
    img: IMG.flows,
    title: 'Flow and Automation Setup',
    sub: 'Revenue that runs while you sleep.',
    desc: 'Klaviyo and Mailchimp flows are the most reliable revenue in email marketing because they send the right message at the exact moment a subscriber takes an action. We map your full customer journey and build automations that trigger on behaviour — browse, cart, purchase, lapse — so no opportunity ever gets missed.',
    tags: ['Klaviyo', 'Mailchimp', 'Triggered flows', 'Behaviour based', 'Revenue tracking'],
  },
  {
    icon: RiMailSendLine, color: '#F97316',
    img: IMG.campaigns,
    title: 'Campaign Management',
    sub: 'Consistent, brand aligned emails your list looks forward to.',
    desc: 'Weekly and monthly campaigns keep your brand top of mind, drive repeat purchases, and build the kind of trust that paid ads can never buy. We handle strategy, copywriting, design, scheduling, and reporting so you never have to think about your next send.',
    tags: ['Campaign strategy', 'Copywriting', 'Template design', 'Scheduling', 'Reporting'],
  },
  {
    icon: RiGroupLine, color: '#0EA5E9',
    img: IMG.segments,
    title: 'Segmentation and List Health',
    sub: 'The right email to the right person every time.',
    desc: 'Sending the same email to your whole list is how brands end up in spam. We segment by purchase behaviour, engagement, product interest, and lifecycle stage so every send is relevant. We also clean your list regularly to protect deliverability and ensure your best emails actually land in the inbox.',
    tags: ['Behaviour segments', 'List cleaning', 'Deliverability', 'VIP tiers', 'Suppression lists'],
  },
];

/* ── Process ─────────────────────────────────────────────── */
const PROCESS = [
  { n: '01', icon: RiInboxLine,      title: 'List Audit',      desc: 'We review your current setup, list health, deliverability, existing flows, and past campaign performance to find every gap and opportunity.' },
  { n: '02', icon: RiSettings3Line,  title: 'Platform Setup',  desc: 'Account configuration, DNS and deliverability setup, integrations, and list import. Everything built correctly from the foundation.' },
  { n: '03', icon: RiFlowChart,      title: 'Flow Build',      desc: 'We build your automation library: welcome, abandoned cart, post purchase, win back and more — all mapped to your customer journey.' },
  { n: '04', icon: RiEditLine,       title: 'Campaign Launch', desc: 'Monthly campaigns planned, written, designed and sent. You approve the schedule before anything goes out.' },
  { n: '05', icon: RiBarChart2Line,  title: 'Optimise',        desc: 'We track open rates, click rates, revenue per email, and unsubscribes. Everything gets tested and improved every month.' },
];

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Tolu F.',  role: 'eCommerce Brand Owner',  stars: 5, text: 'Email went from 4% of our revenue to over 30% in three months. The abandoned cart flow alone paid for the entire setup in the first week.' },
  { name: 'Ife D.',   role: 'Beauty Store Founder',   stars: 5, text: 'Our Klaviyo was collecting dust. They came in, rebuilt the whole thing, and now it generates sales every single day without us touching it.' },
  { name: 'Chuka M.', role: 'Fitness Brand Owner',    stars: 5, text: 'The welcome series converted 18% of new subscribers into buyers within 7 days. I did not think email could do that until I saw the numbers.' },
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
  const count = useCountUp(target, 1700, iv);
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
export default function EmailMarketingPage() {
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const FAQS = [
    { q: 'Klaviyo or Mailchimp — which is better?', a: 'Klaviyo is the industry standard for eCommerce. It integrates directly with Shopify, has superior segmentation, and the revenue attribution is far more accurate. Mailchimp is a better fit for service businesses, content creators, or anyone not running an online store. We work with both and will recommend the right one for your setup.' },
    { q: 'What is the difference between a flow and a campaign?', a: 'A flow is automated — it sends automatically when a subscriber takes a specific action, like signing up or abandoning a cart. A campaign is a manual send to a segment of your list, like a product launch or a seasonal promotion. Flows earn revenue every day without you touching them. Campaigns drive spikes when you need them.' },
    { q: 'How long does setup take?', a: 'The Starter package takes 7 to 10 days. Growth takes 14 days. Pro takes 18 to 21 days. These include platform configuration, flow builds, template design, and list setup. Campaign management begins the month after setup is complete.' },
    { q: 'Do I need a big list?', a: 'No. We have seen brands with 400 subscribers generate significant revenue from well built flows. The quality of your setup matters far more than the size of your list. That said, we will also show you how to grow your list as part of the strategy.' },
    { q: 'What platforms do you work with?', a: 'Klaviyo and Mailchimp are our primary platforms. We also work with ActiveCampaign and Omnisend. If you are on a different platform, reach out and we will let you know if we can help.' },
  ];

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
                  <RiMailLine style={{ width: 14, height: 14 }} /> Email Marketing Service
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 18, color: 'var(--text)' }}>
                Email that earns{' '}
                <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENTB} 50%, #FCD34D 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>
                  revenue every day
                </span>{' '}without extra ad spend.
                <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
              </motion.h1>

              <motion.p initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28, color: 'var(--text-muted)', maxWidth: 480 }}>
                We build and manage Klaviyo and Mailchimp flows, campaigns, and automations
                that turn your email list into a reliable, compounding revenue channel.
                Set up once. Earn forever.
              </motion.p>

              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  See Packages <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
                </a>
                <Link to="/book-a-call" className="btn-secondary">Free List Audit</Link>
              </motion.div>

              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <StatPill icon={RiMailSendLine}         target={30}  suffix="%"  label=" avg email revenue share" />
                <StatPill icon={RiMoneyDollarCircleLine} target={42}  suffix="x"  label=" avg ROI on email" />
                <StatPill icon={RiUserFollowLine}        target={45}  suffix="%"  label=" avg welcome open rate" />
              </motion.div>

              {/* Platform badges */}
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                {[
                  { name: 'Klaviyo',     color: '#7C3AED', bg: 'rgba(124,58,237,0.1)'  },
                  { name: 'Mailchimp',   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'  },
                  { name: 'ActiveCampaign', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
                  { name: 'Omnisend',    color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
                ].map(({ name, color, bg }) => (
                  <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 100, background: bg, border: `1px solid ${color}25`, fontSize: 11, fontWeight: 700, color }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                    {name}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — hero image with floating stats */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} style={{ position: 'relative' }}>
              <TiltCard intensity={4} style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 28px 70px rgba(249,115,22,0.18)`, border: `1px solid ${ACCENT}22` }}>
                <Img src={IMG.hero} alt="Email marketing dashboard showing flow performance and revenue" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Abandoned Cart Flow</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Revenue recovered today</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>$1,240</p>
                    <p style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>automated</p>
                  </div>
                </div>
              </TiltCard>

              {/* Floating open rate badge */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -18, right: -18, background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', minWidth: 148 }}>
                <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Open Rate</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#7C3AED', lineHeight: 1 }}>47%</span>
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>vs 20% avg</span>
                </div>
                <div style={{ marginTop: 8, height: 4, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '47%' }} transition={{ delay: 0.9, duration: 1.2 }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #7C3AED, #A78BFA)', borderRadius: 100 }} />
                </div>
              </motion.div>

              {/* Floating ROI badge */}
              <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{ position: 'absolute', bottom: 80, right: -22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiMoneyDollarCircleLine style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 1 }}>Email ROI</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>$42 per $1 spent</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STAT STRIP
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '2.5rem 1.5rem', background: `${ACCENT}08`, borderTop: `1px solid ${ACCENT}18`, borderBottom: `1px solid ${ACCENT}18` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
            <RiFireLine style={{ width: 20, height: 20, color: ACCENT, flexShrink: 0 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', maxWidth: 680, lineHeight: 1.65 }}>
              <span style={{ color: ACCENT, fontWeight: 800 }}>Email marketing returns $42 for every $1 spent</span>
              {' '}— the highest ROI of any marketing channel. Yet most brands have a broken setup, a neglected list, or no automation at all. We fix that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THREE SERVICES — alternating layout
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>What We Build</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Three systems that compound over time
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              Flows earn passively. Campaigns drive spikes. Segmentation makes both more
              effective. Together they turn your list into the most reliable revenue source in your business.
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
                      <Img src={s.img} alt={s.title} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
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
          FLOWS GRID — six flow types
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Flows We Build</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Six automations that earn every day
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
              Every flow triggers automatically based on what your customer does.
              Once live, they work around the clock without you lifting a finger.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {FLOWS.map((flow, i) => {
              const Icon = flow.icon;
              return (
                <motion.div key={flow.title}
                  initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  style={{
                    borderRadius: 18, padding: '24px 22px',
                    background: '#fff', border: `1px solid ${flow.color}18`,
                    position: 'relative', overflow: 'hidden',
                    transition: 'box-shadow 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px ${flow.color}18`; e.currentTarget.style.borderColor = `${flow.color}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${flow.color}18`; }}
                >
                  {/* Subtle top bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${flow.color}, transparent)` }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${flow.color}14`, border: `1px solid ${flow.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon style={{ width: 20, height: 20, color: flow.color }} />
                    </div>
                    <span style={{ background: `${flow.color}12`, border: `1px solid ${flow.color}25`, color: flow.color, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 100 }}>
                      {flow.stat}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{flow.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>{flow.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROOF GALLERY — three Cloudinary images
          Large editorial showcase with lightbox
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: `radial-gradient(ellipse, ${ACCENT}05 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Real Results</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Inside our client accounts
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              Real flows, real dashboards, real revenue numbers. Click any image to expand it.
            </motion.p>
          </div>

          {/* Three column showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {PROOF.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.12, duration: 0.55 }}
                onClick={() => setLightbox(i)}
                style={{
                  position: 'relative', borderRadius: 20, overflow: 'hidden',
                  cursor: 'pointer',
                  height: i === 1 ? 420 : 340,
                  border: `1px solid ${item.color}22`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
                }}
              >
                <Img src={item.src} alt={item.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                {/* Dark gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.68) 100%)' }} />

                {/* Glow border on hover */}
                <div style={{ position: 'absolute', inset: 0, border: `2px solid ${item.color}`, borderRadius: 20, opacity: 0, transition: 'opacity 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                />

                {/* Top badges */}
                <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: item.color }}>{item.tag}</span>
                </div>
                <div style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: 10, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <RiZoomInLine style={{ width: 16, height: 16, color: '#fff' }} />
                </div>

                {/* Bottom label */}
                <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                  <div style={{ width: 24, height: 3, borderRadius: 100, background: item.color, marginBottom: 8 }} />
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>How We Work</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              From audit to automated in five steps
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.n}
                  initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{ position: 'relative', borderRadius: 20, padding: '28px 20px 24px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', textAlign: 'center', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}35`; e.currentTarget.style.boxShadow = `0 12px 32px ${ACCENT}14`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span style={{ position: 'absolute', top: -14, right: -4, fontSize: 88, fontWeight: 900, color: `${ACCENT}07`, lineHeight: 1, userSelect: 'none' }}>{p.n}</span>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px', background: `linear-gradient(135deg, ${ACCENT}18, ${ACCENTB}10)`, border: `1px solid ${ACCENT}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ width: 22, height: 22, color: ACCENT }} />
                  </div>
                  <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100, background: `${ACCENT}12`, color: ACCENT, marginBottom: 10 }}>Step {p.n}</span>
                  <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>{p.title}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-muted)' }}>{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PACKAGES
      ══════════════════════════════════════════════════ */}
      <section id="packages" style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1050, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionTag>Pricing</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Pick your email setup
            </motion.h2>
            <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              One time setup fee covers the full build. Monthly campaign management is available as an add on.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {PACKAGES.map((pkg, i) => (
              <TiltCard key={pkg.id} intensity={pkg.badge === 'Most Popular' ? 4 : 6}
                initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }}
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
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{pkg.name} Setup</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{pkg.tagline}</p>

                  <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 7 }}>$</span>
                      <motion.span initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: pkg.color }}>
                        {pkg.price}
                      </motion.span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>one time</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Campaign management available as a monthly add on
                    </p>
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: pkg.notIncluded.length > 0 ? 14 : 22, flex: 1 }}>
                    {pkg.features.map((f, fi) => (
                      <motion.li key={f} initial={{ opacity: 1, x: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + fi * 0.04 }}
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

          <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
            {[
              { icon: RiShieldCheckLine,        text: 'Platform agnostic — we work with your stack' },
              { icon: RiMoneyDollarCircleLine,  text: 'Revenue attribution included' },
              { icon: RiTimeLine,               text: 'Live in 7 to 21 days' },
              { icon: RiCalendarLine,           text: 'Free audit call included' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <Icon style={{ width: 14, height: 14, color: ACCENT }} /> {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag>Client Words</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Lists that now earn daily
            </motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <motion.div key={name}
                initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ borderRadius: 18, padding: 24, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s, border-color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 36px rgba(249,115,22,0.10)`; e.currentTarget.style.borderColor = `${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; }}
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

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionTag>FAQ</SectionTag>
            <motion.h2 initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Questions we get every week
            </motion.h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'Klaviyo or Mailchimp — which is better?', a: 'Klaviyo is the industry standard for eCommerce. It integrates directly with Shopify, has superior segmentation, and the revenue attribution is far more accurate. Mailchimp is a better fit for service businesses, content creators, or anyone not running an online store. We work with both and will recommend the right one for your setup.' },
              { q: 'What is the difference between a flow and a campaign?', a: 'A flow is automated — it sends automatically when a subscriber takes a specific action, like signing up or abandoning a cart. A campaign is a manual send to a segment of your list, like a product launch or a seasonal promotion. Flows earn revenue every day without you touching them. Campaigns drive spikes when you need them.' },
              { q: 'How long does setup take?', a: 'The Starter package takes 7 to 10 days. Growth takes 14 days. Pro takes 18 to 21 days. These include platform configuration, flow builds, template design, and list setup. Campaign management begins the month after setup is complete.' },
              { q: 'Do I need a big list?', a: 'No. We have seen brands with 400 subscribers generate significant revenue from well built flows. The quality of your setup matters far more than the size of your list. That said, we will also show you how to grow your list as part of the strategy.' },
              { q: 'What platforms do you work with?', a: 'Klaviyo and Mailchimp are our primary platforms. We also work with ActiveCampaign and Omnisend. If you are on a different platform, reach out and we will let you know if we can help.' },
            ].map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div key={f.q}
                  initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', border: open ? `1px solid ${ACCENT}40` : '1px solid rgba(0,0,0,0.08)', boxShadow: open ? `0 8px 32px ${ACCENT}12` : '0 1px 4px rgba(0,0,0,0.03)', transition: 'border-color 0.25s, box-shadow 0.25s' }}
                >
                  <button onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: '100%', textAlign: 'left', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                    <span>{f.q}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                      style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: open ? ACCENT : `${ACCENT}15`, color: open ? '#fff' : ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 300 }}>
                      +
                    </motion.span>
                  </button>
                  <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <p style={{ padding: '0 22px 20px', fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)' }}>{f.a}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 1rem 6rem' }}>
        <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 760, margin: '0 auto', borderRadius: 28, padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #FFF7ED, #FFF3E6)', border: `1px solid ${ACCENT}20`, boxShadow: `0 12px 56px ${ACCENT}12` }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, borderRadius: '50%', background: `${ACCENT}14`, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag>Ready to Earn More?</SectionTag>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Your email list should earn every day
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
              Book a free audit call. We will review your current setup, show you exactly what
              revenue you are leaving on the table, and tell you what it would take to fix it.
              No obligation, no pitch deck.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link to="/book-a-call" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Book My Free Audit <RiArrowRightUpLine style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#packages" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
                View Packages
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} style={{ position: 'fixed', top: 20, right: 20, zIndex: 1001, width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <RiCloseLine style={{ width: 18, height: 18 }} />
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PROOF.length) % PROOF.length); }}
              style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 26 }}>
              {'‹'}
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PROOF.length); }}
              style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001, width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 26 }}>
              {'›'}
            </button>

            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 960, width: '100%', borderRadius: 20, overflow: 'hidden', boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${PROOF[lightbox].color}30` }}
            >
              <Img src={PROOF[lightbox].src} alt={PROOF[lightbox].label} style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', background: '#0a0808' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 22px', background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: `${PROOF[lightbox].color}25`, border: `1px solid ${PROOF[lightbox].color}40`, color: PROOF[lightbox].color, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100 }}>{PROOF[lightbox].tag}</span>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{PROOF[lightbox].label}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{lightbox + 1} / {PROOF.length}</span>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 1001 }}>
              {PROOF.map((img, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i); }}
                  style={{ width: 56, height: 40, borderRadius: 8, overflow: 'hidden', border: i === lightbox ? `2px solid ${img.color}` : '2px solid transparent', cursor: 'pointer', padding: 0, opacity: i === lightbox ? 1 : 0.45, transition: 'all 0.2s', flexShrink: 0 }}>
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