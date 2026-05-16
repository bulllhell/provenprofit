import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiShoppingBag3Line,
  RiInstagramLine,
  RiPaletteLine,
  RiLineChartLine,
  RiArrowRightUpLine,
  RiArrowRightLine,
} from 'react-icons/ri';

const SERVICES = [
  {
    icon: RiShoppingBag3Line,
    accent: '#F97316',
    accentB: '#FB923C',
    tag: 'eCommerce',
    title: 'Store Design\n& Development',
    desc: 'Custom Shopify & WooCommerce stores designed to convert visitors into customers.',
  },
  {
    icon: RiInstagramLine,
    accent: '#E1306C',
    accentB: '#F97316',
    tag: 'Social Media',
    title: 'Social Media\nManagement',
    desc: 'Content, ads, and community management that keeps your brand active and growing.',
  },
  {
    icon: RiPaletteLine,
    accent: '#7C3AED',
    accentB: '#A78BFA',
    tag: 'Branding',
    title: 'Brand Identity\n& Design',
    desc: 'Modern visual identities that make your business memorable and trustworthy.',
  },
  {
    icon: RiLineChartLine,
    accent: '#16a34a',
    accentB: '#7C3AED',
    tag: 'Growth',
    title: 'Brand Scaling\n& Strategy',
    desc: 'Growth systems and marketing strategies built to scale revenue consistently.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden" style={{ background: 'var(--light)' }}>

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/6 blur-[90px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-orange-500/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">

          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex mb-4"
            >
              <span className="section-tag">What We Do</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
              style={{ color: 'var(--text)' }}
            >
              Everything your brand
              <br className="hidden sm:block" />
              <span className="text-gradient">needs to scale</span>
            </motion.h2>

            <p className="mt-4 max-w-2xl font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              From eCommerce stores to branding and growth strategy,
              we help businesses build, launch, and scale online.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-600"
              style={{ color: 'var(--text-muted)' }}
            >
              Explore All Services
              <span
                className="w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:border-purple-500/50 group-hover:bg-purple-500/10"
                style={{ borderColor: 'var(--dark-border)' }}
              >
                <RiArrowRightLine className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.tag} svc={svc} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-6 py-5"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--dark-border)',
            boxShadow: '0 4px 24px rgba(124,58,237,0.06)',
          }}
        >
          <div className="text-center sm:text-left">
            <p className="font-heading font-semibold text-base" style={{ color: 'var(--text)' }}>
              Need help choosing the right service?
            </p>
            <p className="text-sm font-body mt-1" style={{ color: 'var(--text-muted)' }}>
              Book a free strategy call and we'll map out the best growth plan for your brand.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/services" className="btn-secondary text-sm py-2.5 px-5">
              All Services
            </Link>
            <Link to="/book-a-call" className="btn-primary text-sm py-2.5 px-5 group">
              Book Free Call
              <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ServiceCard({ svc, index }) {
  const { icon: Icon, accent, accentB, tag, title, desc } = svc;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--dark-border)',
        boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}10, ${accentB}08)`,
          border: `1px solid ${accent}30`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentB})` }}
      />

      <div className="relative z-10 p-5 flex flex-col flex-1">

        {/* Icon + tag row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}25`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>

          <span
            className="text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${accent}10`,
              color: accent,
              border: `1px solid ${accent}20`,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-heading text-lg font-bold leading-snug mb-3 whitespace-pre-line"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm font-body leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-muted)' }}>
          {desc}
        </p>

        {/* CTA */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all"
          style={{ color: accent }}
        >
          Learn More
          <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </motion.div>
  );
}