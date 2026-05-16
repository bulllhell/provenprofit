import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiShoppingBag3Line, RiInstagramLine, RiPaletteLine,
  RiLineChartLine, RiMailLine, RiSearchLine,
  RiMegaphoneLine, RiFilter3Line, RiCheckLine,
  RiArrowRightUpLine, RiArrowRightLine, RiAddLine, RiIndeterminateCircleLine,
} from 'react-icons/ri';

const SERVICES = [
  {
    id: 'store-design',
    tag: 'eCommerce',
    icon: RiShoppingBag3Line,
    accent: '#F97316',
    accentB: '#FB923C',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85',
    imgAlt: 'eCommerce store on laptop',
    name: 'Store Design & Development',
    tagline: 'Beautiful stores built to convert',
    description: 'We build high-converting Shopify and WooCommerce stores from the ground up. Every pixel is crafted with conversion in mind — fast, mobile-first, and optimised to turn browsers into buyers.',
    features: [
      'Custom Shopify & WooCommerce builds',
      'Mobile-first responsive design',
      'Speed & Core Web Vitals optimisation',
      'Payment gateway integration',
      'Product page & checkout optimisation',
      'App & plugin setup',
    ],
    stat: { value: '120+', label: 'Stores launched' },
    cta: 'Get Your Store Built',
  },
  {
    id: 'social-media',
    tag: 'Social Media',
    icon: RiInstagramLine,
    accent: '#E1306C',
    accentB: '#F97316',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85',
    imgAlt: 'Social media management',
    name: 'Social Media Management',
    tagline: 'Content that stops the scroll',
    description: 'Full-service social media across Instagram, TikTok, Facebook and more. We handle content creation, scheduling, community management and paid advertising — so you focus on running your business.',
    features: [
      'Instagram & TikTok content',
      'Facebook & LinkedIn management',
      'Community management & DMs',
      'Meta & TikTok paid ads',
      'Monthly analytics reports',
      'Hashtag & growth strategy',
    ],
    stat: { value: '40+', label: 'Brands managed' },
    cta: 'Grow My Socials',
  },
  {
    id: 'brand-identity',
    tag: 'Branding',
    icon: RiPaletteLine,
    accent: '#7C3AED',
    accentB: '#A78BFA',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=85',
    imgAlt: 'Brand identity design',
    name: 'Brand Identity & Design',
    tagline: 'A brand people remember and trust',
    description: 'Your brand is more than a logo — it is the entire feeling people get when they interact with your business. We craft complete visual identities that position you as premium and trustworthy.',
    features: [
      'Logo design & variations',
      'Full brand style guide',
      'Typography & colour system',
      'Brand voice & messaging',
      'Social media templates',
      'Business card & print assets',
    ],
    stat: { value: '98%', label: 'Client satisfaction' },
    cta: 'Build My Brand',
  },
  {
    id: 'paid-ads',
    tag: 'Paid Ads',
    icon: RiMegaphoneLine,
    accent: '#0081FB',
    accentB: '#60A5FA',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85',
    imgAlt: 'Paid advertising analytics',
    name: 'Paid Advertising',
    tagline: 'Every dollar tracked, every campaign optimised',
    description: 'High-ROI paid campaigns on Meta, Google and TikTok. From ad creative to audience targeting to daily optimisation — we manage every detail so your ad spend turns into trackable revenue.',
    features: [
      'Meta (Facebook & Instagram) Ads',
      'Google Search & Shopping Ads',
      'TikTok Ads management',
      'Ad creative design & copy',
      'A/B testing & optimisation',
      'Weekly performance reports',
    ],
    stat: { value: '$2M+', label: 'Ad spend managed' },
    cta: 'Run My Ads',
  },
  {
    id: 'email-marketing',
    tag: 'Email',
    icon: RiMailLine,
    accent: '#16a34a',
    accentB: '#34D399',
    img: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=900&q=85',
    imgAlt: 'Email marketing campaigns',
    name: 'Email Marketing',
    tagline: 'Automated flows that sell while you sleep',
    description: 'Email is still the highest-ROI channel — when done right. We set up Klaviyo and Mailchimp automations, write compelling campaigns and build flows that nurture your list and recover abandoned carts.',
    features: [
      'Klaviyo & Mailchimp setup',
      'Welcome & nurture sequences',
      'Abandoned cart recovery',
      'Campaign design & copywriting',
      'List segmentation & growth',
      'Monthly performance analysis',
    ],
    stat: { value: '42%', label: 'Avg. open rate' },
    cta: 'Set Up My Emails',
  },
  {
    id: 'seo',
    tag: 'SEO',
    icon: RiSearchLine,
    accent: '#4285F4',
    accentB: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=85',
    imgAlt: 'SEO analytics and keyword rankings',
    name: 'SEO & Organic Growth',
    tagline: 'Rank higher. Get found. Grow for free.',
    description: 'Long-term organic growth through technical SEO, content strategy and link building. We optimise your store to rank for the exact keywords your customers are searching — driving free, compounding traffic.',
    features: [
      'Technical SEO audit & fixes',
      'Keyword research & mapping',
      'On-page & product SEO',
      'Blog & content strategy',
      'Link building & outreach',
      'Monthly ranking reports',
    ],
    stat: { value: '3x', label: 'Avg. traffic growth' },
    cta: 'Grow My Traffic',
  },
  {
    id: 'funnels',
    tag: 'Funnels',
    icon: RiFilter3Line,
    accent: '#D97706',
    accentB: '#F97316',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
    imgAlt: 'Conversion funnel strategy',
    name: 'Conversion Funnels',
    tagline: 'Turn traffic into customers on autopilot',
    description: "We design and build sales funnels that guide visitors from awareness to purchase. Landing pages, upsells and automated follow-up sequences engineered to maximise every visitor's value.",
    features: [
      'Landing page design & copy',
      'Lead magnet & opt-in funnels',
      'Sales page & checkout flow',
      'Upsell & cross-sell sequences',
      'Funnel analytics & optimisation',
      'CRM & automation integration',
    ],
    stat: { value: '2.8x', label: 'Avg. conversion lift' },
    cta: 'Build My Funnel',
  },
  {
    id: 'brand-scaling',
    tag: 'Growth',
    icon: RiLineChartLine,
    accent: '#16a34a',
    accentB: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=85',
    imgAlt: 'Brand growth and scaling strategy',
    name: 'Brand Scaling & Strategy',
    tagline: 'From 5 figures to 6 — and beyond',
    description: 'A complete growth strategy combining eCommerce management, paid acquisition and retention marketing. We partner with ambitious brands as a dedicated growth team — not just another agency.',
    features: [
      'Full eCommerce management',
      'Revenue growth roadmap',
      'Multi-channel acquisition',
      'Retention & LTV strategy',
      'Monthly strategy sessions',
      'KPI tracking & reporting',
    ],
    stat: { value: '6-fig', label: 'Brands scaled to' },
    cta: 'Scale My Brand',
  },
];

// ── Card component ──────────────────────────────────────────
function ServiceCard({ svc, index }) {
  const [expanded, setExpanded] = useState(false);
  const { icon: Icon, accent, accentB, img, imgAlt, name, tagline,
          tag, description, features, stat, cta, id } = svc;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--dark-border)',
        boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.08), 0 0 24px ${accent}12`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--dark-border)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.04)';
      }}
    >
      {/* ── IMAGE ────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden group-hover:scale-105 transition-transform duration-700"
        style={{
          aspectRatio: '16/9',
          minHeight: '200px',
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: accent + '22',
        }}
      >
        {/* Subtle overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Accent hover tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ zIndex: 3, background: `linear-gradient(135deg, ${accent}18 0%, transparent 60%)` }}
        />

        {/* Tag badge */}
        <div className="absolute top-3 left-3" style={{ zIndex: 4 }}>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest backdrop-blur-md"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: `1px solid ${accent}40`,
              color: accent,
            }}
          >
            <Icon className="w-3 h-3" />
            {tag}
          </span>
        </div>

        {/* Stat badge */}
        <div className="absolute bottom-3 right-3" style={{ zIndex: 4 }}>
          <div
            className="px-3 py-2 rounded-xl backdrop-blur-md text-center"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: `1px solid ${accent}30`,
            }}
          >
            <div className="font-heading text-base font-extrabold leading-none" style={{ color: accent }}>
              {stat.value}
            </div>
            <div className="text-[9px] font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {stat.label}
            </div>
          </div>
        </div>
      </div>

      {/* ── NAME ─────────────────────────────────── */}
      <div className="px-5 pt-5 pb-0">
        <div
          className="h-[2px] w-10 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accentB})` }}
        />
        <h3 className="font-heading text-lg sm:text-xl font-bold leading-tight mb-1" style={{ color: 'var(--text)' }}>
          {name}
        </h3>
        <p className="text-xs font-body font-medium mb-0" style={{ color: accent }}>
          {tagline}
        </p>
      </div>

      {/* ── BODY ─────────────────────────────────── */}
      <div className="px-5 pt-3 pb-5 flex flex-col flex-1">
        <p className="text-sm font-body leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-body font-semibold mb-3 transition-colors duration-200"
          style={{ color: expanded ? accent : 'var(--text-muted)' }}
        >
          {expanded
            ? <RiIndeterminateCircleLine className="w-3.5 h-3.5" />
            : <RiAddLine className="w-3.5 h-3.5" />}
          {expanded ? 'Hide details' : "What's included"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden space-y-2 mb-4"
            >
              {features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs font-body" style={{ color: 'var(--text-muted)' }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${accent}15` }}
                  >
                    <RiCheckLine className="w-2.5 h-2.5" style={{ color: accent }} />
                  </span>
                  {f}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--dark-border)' }}>
          <Link
            to="/book-a-call"
            className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-300 group/btn"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}25`,
              color: accent,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${accent}, ${accentB})`;
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = `0 4px 20px ${accent}35`;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${accent}10`;
              e.currentTarget.style.borderColor = `${accent}25`;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.color = accent;
            }}
          >
            {cta}
            <RiArrowRightUpLine className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Filter tabs ─────────────────────────────────────────────
const FILTERS = ['All', 'eCommerce', 'Social Media', 'Branding', 'Paid Ads', 'Email', 'SEO', 'Funnels', 'Growth'];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.tag === activeFilter);

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* ── Page hero ────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[280px] rounded-full bg-purple-600/6 blur-[80px]" />
          <div className="absolute top-0 right-1/3 w-[400px] h-[220px] rounded-full bg-orange-500/6 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-5"
          >
            <span className="section-tag">Everything We Do</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
            style={{ color: 'var(--text)' }}
          >
            Services built to{' '}
            <span className="text-gradient">grow your revenue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            From store builds to social media, paid ads to brand identity —
            every service is delivered by specialists focused on one thing: growing your revenue.
          </motion.p>
        </div>
      </section>

      {/* ── Filter tabs ──────────────────────────── */}
      <div
        className="sticky top-[68px] z-30 backdrop-blur-md border-b"
        style={{
          background: 'rgba(248,247,255,0.9)',
          borderColor: 'var(--dark-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200"
                style={
                  activeFilter === f
                    ? {
                        background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                        color: '#fff',
                        boxShadow: '0 2px 12px rgba(124,58,237,0.35)',
                      }
                    : {
                        background: 'rgba(124,58,237,0.06)',
                        color: 'var(--text-muted)',
                        border: '1px solid rgba(124,58,237,0.12)',
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards grid ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Bottom CTA ───────────────────────────── */}
      <section className="pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FAF8FF, #F1EEF9)',
            border: '1px solid var(--dark-border)',
            boxShadow: '0 8px 40px rgba(124,58,237,0.08)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-28 bg-purple-600/8 blur-[50px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-28 bg-orange-500/6 blur-[50px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Free Strategy Call</span>
            </div>

            <h2
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4"
              style={{ color: 'var(--text)' }}
            >
              Not sure where to begin?
            </h2>

            <p
              className="font-body text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Book a free 20-minute strategy call. We will review your brand, identify
              the biggest growth opportunities, and recommend exactly which services
              will move the needle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book-a-call" className="btn-primary text-sm px-7 py-3.5 group">
                Book a Free Strategy Call
                <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link to="/" className="btn-secondary text-sm px-7 py-3.5 group">
                View Packages & Pricing
                <RiArrowRightLine className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}