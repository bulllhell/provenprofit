import { motion } from 'framer-motion';
import {
  RiMailLine,
  RiBarChart2Line,
  RiInstagramLine,
  RiSearchLine,
  RiShoppingBag3Line,
  RiPaletteLine,
  RiMegaphoneLine,
  RiLineChartLine,
  RiMailSendLine,
  RiSmartphoneLine,
  RiGlobalLine,
} from 'react-icons/ri';

// ── Row 1: Platforms & tools they BUILD on ─────────────────
const ROW_1 = [
  { name: 'Shopify',       icon: RiShoppingBag3Line, accent: '#96BF48' },
  { name: 'WooCommerce',   icon: RiGlobalLine,       accent: '#7F54B3' },
  { name: 'Klaviyo',       icon: RiMailLine,         accent: '#F97316' },
  { name: 'Mailchimp',     icon: RiMailSendLine,     accent: '#D4A000' },
  { name: 'Meta Ads',      icon: RiInstagramLine,    accent: '#0081FB' },
  { name: 'Google Ads',    icon: RiSearchLine,       accent: '#4285F4' },
  { name: 'BigCommerce',   icon: RiShoppingBag3Line, accent: '#7C3AED' },
  { name: 'TikTok Ads',    icon: RiSmartphoneLine,   accent: '#EE1D52' },
  { name: 'Analytics',     icon: RiBarChart2Line,    accent: '#7C3AED' },
];

// ── Row 2: Services they OFFER ─────────────────────────────
const ROW_2 = [
  { name: 'Brand Identity',       icon: RiPaletteLine,      accent: '#F97316' },
  { name: 'Social Media Mgmt',    icon: RiInstagramLine,    accent: '#E1306C' },
  { name: 'Email Marketing',      icon: RiMailLine,         accent: '#96BF48' },
  { name: 'Paid Advertising',     icon: RiMegaphoneLine,    accent: '#0081FB' },
  { name: 'Store Design',         icon: RiShoppingBag3Line, accent: '#7C3AED' },
  { name: 'Brand Scaling',        icon: RiLineChartLine,    accent: '#16a34a' },
  { name: 'Content Creation',     icon: RiInstagramLine,    accent: '#EE1D52' },
  { name: 'SEO & Growth',         icon: RiSearchLine,       accent: '#4285F4' },
  { name: 'eCommerce Strategy',   icon: RiBarChart2Line,    accent: '#7C3AED' },
];

const TRACK_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const TRACK_2 = [...ROW_2, ...ROW_2, ...ROW_2];

const STATS = [
  { value: '120+', label: 'Stores Built'      },
  { value: '98%',  label: 'Client Retention'  },
  { value: '$2M+', label: 'Revenue Generated' },
  { value: '5★',   label: 'Avg. Rating'       },
  { value: '40+',  label: 'Active Brands'     },
  { value: '5yrs', label: 'In the Industry'   },
];

function ToolChip({ name, icon: Icon, accent }) {
  return (
    <div
      className="inline-flex items-center gap-2 mx-2.5 px-4 py-2 rounded-full flex-shrink-0 select-none"
      style={{
        background: accent + '14',
        border: '1px solid ' + accent + '35',
      }}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
      <span
        className="text-xs font-body font-semibold whitespace-nowrap tracking-wide"
        style={{ color: 'var(--text-muted)' }}
      >
        {name}
      </span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section
      id="trustbar"
      className="relative py-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #F1EEF9 50%, #F8F7FF 100%)' }}
    >
      {/* Accent border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F8F7FF, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F8F7FF, transparent)' }}
      />

      {/* Label */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 text-center">
        <span
          className="text-[10px] font-body font-semibold uppercase tracking-[0.25em]"
          style={{ color: 'var(--text-muted)', opacity: 0.6 }}
        >
          Platforms · Tools · Services
        </span>
      </div>

      {/* Row 1 — left */}
      <div className="overflow-hidden mb-3">
        <div
          className="flex"
          style={{ animation: 'ticker 40s linear infinite', width: 'max-content' }}
        >
          {TRACK_1.map((item, i) => <ToolChip key={'r1-' + i} {...item} />)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div className="overflow-hidden mb-10">
        <div
          className="flex"
          style={{ animation: 'ticker 50s linear infinite reverse', width: 'max-content' }}
        >
          {TRACK_2.map((item, i) => <ToolChip key={'r2-' + i} {...item} />)}
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--dark-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(124,58,237,0.06)',
          }}
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex-1 min-w-[33.33%] sm:min-w-0 flex flex-col items-center justify-center py-4 px-3 sm:py-5 sm:px-6 relative"
            >
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/4 bottom-1/4 w-px"
                  style={{ background: 'var(--dark-border)' }}
                />
              )}
              <span
                className="font-heading font-extrabold text-xl sm:text-2xl leading-none"
                style={{ color: i % 2 === 0 ? '#7C3AED' : '#F97316' }}
              >
                {value}
              </span>
              <span
                className="text-[10px] sm:text-xs font-body mt-1 text-center whitespace-nowrap"
                style={{ color: 'var(--text-muted)', opacity: 0.7 }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust avatars */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2.5 mt-5"
        >
          <div className="flex -space-x-1.5">
            {['#7C3AED', '#F97316', '#16a34a', '#E1306C', '#D4A000'].map((bg, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-[1.5px] border-white flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: bg, zIndex: 5 - i }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>
            Trusted by{' '}
            <span className="font-semibold" style={{ color: 'var(--purple)' }}>120+ brands</span>
            {' '}across the US, Canada, Australia & Europe
          </span>
        </motion.div>
      </div>
    </section>
  );
}