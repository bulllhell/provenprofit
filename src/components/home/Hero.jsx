import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  RiArrowRightUpLine,
  RiPlayCircleLine,
  RiShieldCheckLine,
  RiStarSLine,
  RiFlashlightLine,
} from 'react-icons/ri';

// ── Floating Stat Pill ─────────────────────────────────────
function StatPill({ icon: Icon, value, label, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5, ease: 'backOut' },
        y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card ${className}`}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(249,115,22,0.15))' }}
      >
        <Icon className="w-4 h-4 text-purple-600" />
      </div>
      <div>
        <div className="font-heading text-sm font-bold leading-none" style={{ color: 'var(--text)' }}>{value}</div>
        <div className="text-[10px] mt-0.5 font-body" style={{ color: 'var(--light-dim)' }}>{label}</div>
      </div>
    </motion.div>
  );
}

// ── Typewriter words ───────────────────────────────────────
const WORDS = ['eCommerce Store', 'Social Media', 'Brand Identity', 'Online Business'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { scrollYProgress } = useScroll();
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // ── Typewriter effect ──────────────────────────────────
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 40);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  // ── Scroll to section ──────────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--light)' }}
    >
      {/* ── Layered background ──────────────────────────── */}
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />

      {/* Geometric ring decorations */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {/* Large purple ring */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full border border-purple-600/10" />
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full border border-purple-600/6 translate-x-16 translate-y-16" />
        {/* Orange ring bottom left */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border border-orange-500/10" />
        {/* Center glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/4 blur-[80px]" />
      </motion.div>

      {/* Animated dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(124,58,237,0.10) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-tag mb-8 group cursor-default"
          >
            <RiFlashlightLine className="w-3.5 h-3.5" />
            eCommerce · Social Media · Brand Scaling
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-heading text-4xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold max-w-5xl leading-[1.0] tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            We Build Your{' '}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="text-gradient">{displayed}</span>
              <span className="inline-block w-0.5 h-[0.85em] bg-purple-600 ml-1 align-middle animate-pulse" />
            </span>
            <br />
            <span className="relative">
              That
              <span className="relative mx-3 italic">
                Converts
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-brand-gradient" />
              </span>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-sm sm:text-base font-body max-w-xl leading-relaxed px-2 sm:px-0"
            style={{ color: 'var(--text-muted)' }}
          >
            eCommerce stores, social media management, and brand scaling —
            built for serious brands across the{' '}
            <span className="font-semibold" style={{ color: 'var(--text)' }}>
              US, Canada, Australia & Europe
            </span>.{' '}
            120+ stores. Real results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <Link to="/book-a-call" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 group">
              Book a Free Call
              <RiArrowRightUpLine className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <button
              onClick={() => scrollTo('portfolio')}
              className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 group"
            >
              <RiPlayCircleLine className="w-5 h-5 group-hover:scale-110 transition-transform text-orange-500" />
              See Our Work
            </button>
          </motion.div>

          {/* Trust micro-row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8"
          >
            {[
              { icon: RiShieldCheckLine, text: 'Verified Results' },
              { icon: RiStarSLine,       text: '5-Star Rated Agency' },
              { icon: RiFlashlightLine,  text: 'Fast Turnaround' },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs font-body"
                style={{ color: 'var(--text-muted)' }}
              >
                <Icon className="w-3.5 h-3.5 text-orange-500" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* ── Hero visual card ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mt-10 sm:mt-16 w-full max-w-4xl"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-brand-gradient opacity-10 blur-xl" />

            {/* Main card */}
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #F5F3FF 100%)',
                borderColor: 'var(--dark-border)',
              }}
            >
              {/* Fake browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: 'var(--dark-border)', background: 'rgba(124,58,237,0.04)' }}
              >
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
                <div
                  className="flex-1 mx-4 h-6 rounded-md flex items-center px-3 text-xs font-body"
                  style={{ background: 'rgba(124,58,237,0.06)', color: 'var(--text-muted)' }}
                >
                  provenprofitmarketing.com
                </div>
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.1)' }}
                >
                  <RiShieldCheckLine className="w-3 h-3 text-purple-600" />
                </div>
              </div>

              {/* Dashboard preview mockup */}
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-h-[160px] sm:min-h-[280px]">
                {/* Sidebar */}
                <div className="hidden sm:block col-span-1 space-y-2">
                  {['Dashboard', 'Stores', 'Analytics', 'Campaigns', 'Settings'].map((item, i) => (
                    <div
                      key={item}
                      className="h-8 rounded-lg flex items-center px-3 text-xs font-body transition-colors"
                      style={{
                        background: i === 0 ? 'rgba(124,58,237,0.1)' : 'transparent',
                        color: i === 0 ? 'var(--purple)' : 'var(--text-muted)',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="col-span-2 space-y-3">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: '$4.2M', l: 'Revenue', color: 'var(--orange)'  },
                      { v: '1,847', l: 'Orders',  color: 'var(--purple)'  },
                      { v: '+34%',  l: 'Growth',  color: '#16a34a'        },
                    ].map(({ v, l, color }) => (
                      <div
                        key={l}
                        className="rounded-lg p-3 text-center"
                        style={{ background: 'rgba(124,58,237,0.05)' }}
                      >
                        <div className="font-heading text-sm font-bold" style={{ color }}>{v}</div>
                        <div className="text-[9px] font-body" style={{ color: 'var(--text-muted)' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart bars */}
                  <div className="rounded-lg p-3" style={{ background: 'rgba(124,58,237,0.04)' }}>
                    <div className="flex items-end gap-1.5 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.8 + i * 0.04, duration: 0.4, ease: 'backOut' }}
                          className="flex-1 rounded-sm"
                          style={{
                            background:
                              i === 11
                                ? 'linear-gradient(to top, #7C3AED, #A78BFA)'
                                : i % 2 === 0
                                ? 'rgba(124,58,237,0.35)'
                                : 'rgba(249,115,22,0.3)',
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="text-[9px] font-body mt-1.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Monthly Revenue Growth
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating stat pills ─────────────────── */}
            <StatPill
              icon={RiStarSLine}
              value="120+"
              label="Stores Built"
              delay={0.9}
              className="absolute -left-4 sm:-left-8 top-8 hidden sm:flex"
            />
            <StatPill
              icon={RiShieldCheckLine}
              value="98%"
              label="Satisfaction"
              delay={1.1}
              className="absolute -right-4 sm:-right-8 bottom-8 hidden sm:flex"
            />
          </motion.div>

          {/* ── Scroll indicator ──────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            onClick={() => scrollTo('trustbar')}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-2 hover:text-purple-600 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="text-xs font-body tracking-wider uppercase">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-current"
              />
            </div>
          </motion.button>

        </div>
      </div>
    </section>
  );
}