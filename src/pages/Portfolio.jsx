import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiExternalLinkLine,
  RiInstagramLine,
  RiShoppingBag3Line,
  RiArrowRightUpLine,
  RiStarFill,
  RiCheckLine,
  RiPlayCircleLine,
  RiPauseLine,
  RiBarChart2Line,
  RiLineChartLine,
  RiMegaphoneLine,
  RiSearchLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const STORES = [
  {
    id: 'dignite',
    name: 'Dignite Store',
    tag: 'Gym & Fitness',
    niche: 'Fitness Equipment',
    url: 'https://Dignitestore.com',
    desc: 'Premium gym and fitness store with a bold performance-first design. Built for high-ticket equipment sales with trust-optimised checkout flows.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=85',
    accent: '#F97316',
    result: '3x conversion rate uplift',
    features: ['Custom Shopify build', 'Mobile-first design', 'Checkout optimisation'],
  },
  {
    id: 'gymshark',
    name: 'Gymshark',
    tag: 'Sports Clothing',
    niche: 'Athletic Apparel',
    url: 'https://gymshark.com',
    desc: 'World-class sports clothing brand with a high-energy storefront. Engineered for scale with deep product filtering and influencer-ready landing pages.',
    img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=900&q=85',
    accent: '#1a1a1a',
    result: '120K+ monthly visitors',
    features: ['Performance optimisation', 'Custom collections', 'Social commerce'],
  },
  {
    id: 'oneill',
    name: "O'Neill",
    tag: 'Books & Lifestyle',
    niche: 'Books, Pens & Accessories',
    url: 'https://us.oneill.com',
    desc: 'Editorial lifestyle store carrying books, pens, bags and curated accessories. Designed with a magazine-style layout that makes browsing feel like reading.',
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=85',
    accent: '#7C3AED',
    result: '42% longer session time',
    features: ['Editorial layout', 'Category architecture', 'Lifestyle photography'],
  },
  {
    id: 'lebenskompass',
    name: 'Lebenskompass',
    tag: 'Phone & Tech',
    niche: 'Tech Accessories',
    url: 'https://lebenskompass.eu',
    desc: 'Clean, minimal tech accessories store for the European market. Precision-designed product pages with detailed spec displays and fast load times.',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85',
    accent: '#0081FB',
    result: '58% add-to-cart rate',
    features: ['EU market localisation', 'Tech spec layouts', 'Trust badge system'],
  },
  {
    id: 'mous',
    name: 'Mous',
    tag: 'Beauty',
    niche: 'Beauty & Skincare',
    url: 'https://eu.mous.co',
    desc: 'Luxury beauty and skincare storefront with an immersive, editorial feel. Structured to guide customers through product education and drive repeat purchase.',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85',
    accent: '#E1306C',
    result: '2.4x repeat purchase rate',
    features: ['Beauty-first UX', 'Ingredient storytelling', 'Upsell flows'],
  },
  {
    id: 'glamnetic',
    name: 'Glamnetic',
    tag: 'Beauty Store',
    niche: 'Beauty & Cosmetics',
    url: 'https://glamnetic.com',
    desc: 'High-converting beauty brand store with vibrant, social-first design. Built for viral product launches with influencer landing pages and bundle builders.',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=85',
    accent: '#F97316',
    result: '$500K+ revenue in 90 days',
    features: ['Bundle builder', 'Influencer pages', 'Social proof system'],
  },
  {
    id: 'calpak',
    name: 'CALPAK Travel',
    tag: 'Travel Bags',
    niche: 'Luggage & Travel',
    url: 'https://calpaktravel.com',
    desc: 'Premium travel bag store with aspirational lifestyle photography and intuitive product configurators. Designed to sell the dream before selling the bag.',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85',
    accent: '#16a34a',
    result: '4.8★ average store rating',
    features: ['Product configurator', 'Lifestyle UX', 'Cross-sell engine'],
  },
  {
    id: 'blenders',
    name: 'Blenders Eyewear',
    tag: 'Glasses & Eyewear',
    niche: 'Sunglasses & Eyewear',
    url: 'https://blenderseyewear.com',
    desc: 'Bold eyewear brand with an energetic, colour-forward storefront. Virtual try-on integration and an immersive product experience built for Gen Z shoppers.',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    accent: '#7C3AED',
    result: '67% mobile conversion rate',
    features: ['Virtual try-on UX', 'Gen-Z design language', 'Speed optimisation'],
  },
];

const FILTERS = ['All', 'Gym & Fitness', 'Sports Clothing', 'Books & Lifestyle', 'Phone & Tech', 'Beauty', 'Travel Bags', 'Glasses & Eyewear'];

// ── Results data ─────────────────────────────────────────────
const RESULTS = [
  {
    id: 'fb-before',
    type: 'image',
    src: '/images/bosfb.jpeg',
    icon: RiBarChart2Line,
    label: 'Facebook Content',
    badge: 'Before',
    badgeColor: '#94A3B8',
    title: 'Facebook Before',
    desc: 'Organic content statistics — reach, views and engagement before our social media management strategy was applied.',
    accent: '#0081FB',
  },
  {
    id: 'fb-after',
    type: 'image',
    src: '/images/bosfa.jpeg',
    icon: RiLineChartLine,
    label: 'Facebook Content',
    badge: 'After',
    badgeColor: '#16a34a',
    title: 'Facebook After',
    desc: 'The same account after 60 days under our management — viral reach, exponential engagement growth and audience growth.',
    accent: '#16a34a',
  },
  {
    id: 'meta-ads',
    type: 'image',
    src: '/images/metac.jpeg',
    icon: RiMegaphoneLine,
    label: 'Meta Ads',
    badge: 'Results',
    badgeColor: '#E1306C',
    title: 'Meta Ads Campaign',
    desc: 'Successful Meta advertising campaign results — ROAS, impressions, click-through rates and revenue driven for a client brand.',
    accent: '#E1306C',
  },
  {
    id: 'google-ads',
    type: 'video',
    src: '/videos/bosgoo.mp4',
    icon: RiSearchLine,
    label: 'Google Ads',
    badge: 'Results',
    badgeColor: '#7C3AED',
    title: 'Google Ads Success',
    desc: 'Live screen recording showing Google Ads dashboard — campaign performance, keyword rankings and revenue attribution.',
    accent: '#7C3AED',
  },
];

// ── Result Media Card ─────────────────────────────────────────
function ResultCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { type, src, icon: Icon, label, badge, badgeColor, title, desc, accent } = item;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--dark-border)',
        boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${accent}18`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--dark-border)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Media area */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: '16/10', background: accent + '0e' }}
      >
        {type === 'image' ? (
          <>
            <img
              src={src}
              alt={title}
              loading="lazy"
              onLoad={e => { e.currentTarget.style.opacity = 1; }}
              style={{
                opacity: 0,
                transition: 'opacity 0.4s ease',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                zIndex: 1,
              }}
              className="group-hover:scale-105 transition-transform duration-700"
            />
            {/* subtle overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)',
                zIndex: 2,
              }}
            />
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              playsInline
              preload="auto"
              loop
              onLoadedData={() => setLoaded(true)}
              onEnded={() => setPlaying(false)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                zIndex: 1,
              }}
            />
            {/* Play button overlay */}
            <AnimatePresence>
              {!playing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{ background: 'rgba(0,0,0,0.25)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{ background: accent, boxShadow: `0 4px 20px ${accent}50` }}
                  >
                    <RiPlayCircleLine className="w-7 h-7 text-white" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
            {/* Pause button */}
            {playing && (
              <button
                onClick={togglePlay}
                className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 z-20"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <RiPauseLine className="w-4 h-4 text-white" />
              </button>
            )}
          </>
        )}

        {/* Badge pill — top left */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            <Icon className="w-2.5 h-2.5" />
            {label}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-heading font-bold uppercase tracking-wider text-white"
            style={{ background: badgeColor }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="p-5">
        <div
          className="h-[2px] w-8 rounded-full mb-3 group-hover:w-12 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }}
        />
        <h3 className="font-heading text-base font-bold mb-1.5" style={{ color: 'var(--text)' }}>
          {title}
        </h3>
        <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── Store Card ────────────────────────────────────────────────
function StoreCard({ store, index }) {
  const { name, tag, niche, url, desc, img, accent, result, features } = store;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.09, duration: 0.5 }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--dark-border)',
        boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}45`;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px ${accent}20`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--dark-border)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '16/9', background: accent + '15' }}
      >
        <img
          src={img}
          alt={name}
          loading="lazy"
          onLoad={e => { e.currentTarget.style.opacity = 1; }}
          style={{
            opacity: 0,
            transition: 'opacity 0.4s ease, transform 0.7s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          className="group-hover:scale-105"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.45) 100%)' }}
        />
        {/* Hover tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}18, transparent 60%)` }}
        />
        {/* Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: `1px solid ${accent}35`,
              color: accent,
            }}
          >
            <RiShoppingBag3Line className="w-2.5 h-2.5" />
            {tag}
          </span>
        </div>
        {/* Result badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <div
            className="px-3 py-1.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.92)', border: `1px solid ${accent}30` }}
          >
            <div className="flex items-center gap-1">
              <RiStarFill className="w-3 h-3" style={{ color: accent }} />
              <span className="font-heading text-[11px] font-bold" style={{ color: accent }}>
                {result}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="h-[2px] w-8 rounded-full mb-4 group-hover:w-14 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }}
        />
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-heading text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
            {name}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: `${accent}10`, border: `1px solid ${accent}25`, color: accent }}
            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.style.color = accent; }}
            onClick={e => e.stopPropagation()}
          >
            <RiExternalLinkLine className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-xs font-body font-medium mb-3" style={{ color: accent }}>{niche}</p>
        <p className="text-sm font-body leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>
          {desc}
        </p>
        <ul className="space-y-1.5 mb-4">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2 text-xs font-body" style={{ color: 'var(--text-muted)' }}>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}12` }}
              >
                <RiCheckLine className="w-2.5 h-2.5" style={{ color: accent }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-300"
          style={{ background: `${accent}10`, border: `1px solid ${accent}25`, color: accent }}
          onMouseEnter={e => {
            e.currentTarget.style.background = accent;
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = `0 4px 20px ${accent}35`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${accent}10`;
            e.currentTarget.style.borderColor = `${accent}25`;
            e.currentTarget.style.color = accent;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Visit Live Store <RiExternalLinkLine className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? STORES
    : STORES.filter(s => s.tag === activeFilter);

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[90px]"
            style={{ background: 'rgba(124,58,237,0.06)' }}
          />
          <div
            className="absolute top-0 right-1/4 w-[400px] h-[220px] rounded-full blur-[90px]"
            style={{ background: 'rgba(249,115,22,0.06)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-5">
            <span className="section-tag">Our Work</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
            style={{ color: 'var(--text)' }}
          >
            Stores that{' '}
            <span className="text-gradient">actually convert</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Real stores. Real results. Browse our portfolio of 120+ brands we have built,
            launched and scaled across the US, Canada, Australia and Europe.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-8"
          >
            {[
              { v: '120+', l: 'Stores Built',       c: '#7C3AED' },
              { v: '$2M+', l: 'Revenue Generated',  c: '#F97316' },
              { v: '98%',  l: 'Client Retention',   c: '#7C3AED' },
            ].map(({ v, l, c }) => (
              <div key={l} className="text-center">
                <div className="font-heading text-2xl font-extrabold leading-none" style={{ color: c }}>{v}</div>
                <div className="text-xs font-body mt-1" style={{ color: 'var(--text-muted)' }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Instagram CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <a
              href="https://www.instagram.com/proven_profit_?igsh=NjRmN3ZkdnphdWI="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(135deg, #E1306C, #F97316)',
                boxShadow: '0 4px 20px rgba(225,48,108,0.3)',
              }}
            >
              <RiInstagramLine className="w-4 h-4" />
              See More Proof on Instagram
              <RiArrowRightUpLine className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Results section ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex mb-3">
                <span className="section-tag">Proven Results</span>
              </div>
              <h2
                className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ color: 'var(--text)' }}
              >
                The numbers don't lie —{' '}
                <span className="text-gradient">real campaign data</span>
              </h2>
            </div>
            <p className="text-sm font-body max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Actual screenshots and recordings from live client campaigns. Facebook, Meta Ads, and Google Ads.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESULTS.map((item, i) => (
            <ResultCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Filter bar ─────────────────────────────────── */}
      <div
        className="sticky top-[68px] z-30 backdrop-blur-md border-b mt-10"
        style={{ background: 'rgba(248,247,255,0.92)', borderColor: 'var(--dark-border)' }}
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
                    ? { background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: '#fff', boxShadow: '0 2px 12px rgba(124,58,237,0.35)' }
                    : { background: 'rgba(124,58,237,0.06)', color: 'var(--text-muted)', border: '1px solid rgba(124,58,237,0.12)' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Store cards grid ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((store, i) => (
              <StoreCard key={store.id} store={store} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Instagram proof strip ──────────────────────── */}
      <section className="pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(225,48,108,0.05), rgba(249,115,22,0.05))',
            border: '1px solid rgba(225,48,108,0.15)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #E1306C, #F97316)' }}
          >
            <RiInstagramLine className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
              Want more proof? Follow us on Instagram
            </h3>
            <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>
              Behind-the-scenes store builds, client results and live case studies — all on our Instagram.
            </p>
          </div>
          <a
            href="https://www.instagram.com/proven_profit_?igsh=NjRmN3ZkdnphdWI="
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #E1306C, #F97316)', boxShadow: '0 4px 16px rgba(225,48,108,0.3)' }}
          >
            @proven_profit_
            <RiArrowRightUpLine className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}
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
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 pointer-events-none blur-[50px]"
            style={{ background: 'rgba(124,58,237,0.08)' }}
          />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Ready to Join Them?</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              Let's build your store next
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
              Book a free strategy call and we'll map out exactly how to build, launch
              and scale your brand — just like the stores above.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book-a-call" className="btn-primary text-sm px-7 py-3.5 group">
                Book a Free Strategy Call
                <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary text-sm px-7 py-3.5">
                View Our Services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}