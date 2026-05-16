import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiStarLine,
  RiDoubleQuotesL,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiWhatsappLine,
  RiTiktokLine,
  RiCodeSSlashLine,
  RiPencilLine,
  RiVideoLine,
  RiSearchEyeLine,
  RiBrushLine,
} from 'react-icons/ri';

// ── Data ────────────────────────────────────────────────────
const STATS = [
  { value: '120+', label: 'Stores Launched'     },
  { value: '$2M+', label: 'Revenue Generated'   },
  { value: '5yrs', label: 'Industry Experience' },
  { value: '98%',  label: 'Client Retention'    },
];

const HIGHLIGHTS = [
  { icon: RiShieldCheckLine, text: 'Certified Shopify Partner'     },
  { icon: RiLineChartLine,   text: 'eCommerce Growth Strategist'   },
  { icon: RiStarLine,        text: '5-Star Rated on All Platforms' },
];

const TEAM = [
  {
    name: 'Apalowo Ayomide',
    role: 'P/A Developer',
    title: 'Program Developer & Application Integration Specialist',
    img: '/images/apab.jpeg',
    accent: '#7C3AED',
    icon: RiCodeSSlashLine,
  },
  {
    name: 'Taiwo Ganiyu',
    role: 'Content Creator',
    title: 'Creating bespoke content for brand visibility',
    img: '/images/taib.jpeg',
    accent: '#F97316',
    icon: RiPencilLine,
  },
  {
    name: 'Lillian',
    role: 'Video Editor',
    title: 'Editing and producing engaging videos',
    img: '/images/lilb.jpeg',
    accent: '#E1306C',
    icon: RiVideoLine,
  },
  {
    name: 'AntonioMark',
    role: 'SEO Specialist',
    title: 'Optimizing websites to improve search engine rankings',
    img: '/images/antb.jpeg',
    accent: '#0081FB',
    icon: RiSearchEyeLine,
  },
  {
    name: 'Christianah',
    role: 'Graphics Designer',
    title: 'Visually appealing designs that communicate brand message',
    img: '/images/chrb.jpeg',
    accent: '#16a34a',
    icon: RiBrushLine,
  },
];

// ── Team Card ───────────────────────────────────────────────
function TeamCard({ member, index }) {
  const { name, role, title, img, accent, icon: Icon } = member;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--dark-border)',
        boxShadow: '0 2px 12px rgba(124,58,237,0.04)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.07), 0 0 0 1px ${accent}18`;
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--dark-border)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }} />

      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)' }}
        />
        {/* Role badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: `1px solid ${accent}35`,
              color: accent,
            }}
          >
            <Icon className="w-2.5 h-2.5" />
            {role}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div
          className="h-[2px] w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-12"
          style={{ background: accent }}
        />
        <h3 className="font-heading text-base font-bold mb-1" style={{ color: 'var(--text)' }}>
          {name}
        </h3>
        <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────
export default function AboutCEO() {
  return (
    <>
      {/* ══ CEO SECTION ══════════════════════════════════════ */}
      <section
        id="about"
        className="section-pad relative overflow-hidden"
        style={{ background: 'var(--light)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[100px]" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* LEFT — Image */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(249,115,22,0.07))',
                  filter: 'blur(24px)',
                }}
              />

              {/* Floating Revenue Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="absolute -left-4 sm:-left-8 top-8 z-30 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 4px 20px rgba(124,58,237,0.1)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
                  <RiLineChartLine className="w-4 h-4" style={{ color: '#7C3AED' }} />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold leading-none" style={{ color: 'var(--text)' }}>$2M+</div>
                  <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Revenue Generated</div>
                </div>
              </motion.div>

              {/* Floating Stores Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -right-4 sm:-right-8 bottom-16 z-30 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 4px 20px rgba(249,115,22,0.1)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.12)' }}>
                  <RiShieldCheckLine className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold leading-none" style={{ color: 'var(--text)' }}>120+</div>
                  <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Stores Launched</div>
                </div>
              </motion.div>

              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden h-[620px] w-full" style={{ border: '1px solid rgba(124,58,237,0.2)' }}>
                <img src="/images/bosP.jpg" alt="Proven Profit CEO" className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(26,16,35,0.92), transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="font-heading text-2xl font-bold text-white">Adeyemo</div>
                  <div className="text-sm text-orange-400 mt-1">Founder & CEO, Proven Profit Marketing</div>
                  <div className="flex items-center gap-3 mt-5">
                    <a href="https://www.instagram.com/proven_profit_?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/10 hover:bg-pink-500 transition-all duration-300 flex items-center justify-center text-white">
                      <RiInstagramLine className="w-5 h-5" />
                    </a>
                    <a href="https://www.tiktok.com/@provenprofit" target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center text-white">
                      <RiTiktokLine className="w-5 h-5" />
                    </a>
                    <a href="https://wa.me/message/322ETXOWGEWVG1" target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/10 hover:bg-green-500 transition-all duration-300 flex items-center justify-center text-white">
                      <RiWhatsappLine className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100090118610774&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/10 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center text-white">
                      <RiFacebookCircleLine className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-5 left-6 z-30"
              >
                <div className="px-4 py-2 rounded-full font-heading text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}>
                  5+ Years in eCommerce
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Content */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pt-8 lg:pt-0"
            >
              <div className="flex mb-5">
                <span className="section-tag">Who We Are</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-tight mb-5" style={{ color: 'var(--text)' }}>
                Built by someone who{' '}
                <span className="text-gradient">lives and breathes</span>{' '}
                eCommerce
              </h2>

              <div className="relative mb-6 pl-5" style={{ borderLeft: '2px solid rgba(124,58,237,0.35)' }}>
                <RiDoubleQuotesL className="absolute -top-1 -left-1 w-4 h-4" style={{ color: 'rgba(124,58,237,0.35)' }} />
                <p className="font-body text-sm sm:text-base leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                  "I started Proven Profit because I was tired of seeing great brands fail online not because of their
                  products, but because of poor execution. Every store we build, every campaign we run — it's personal."
                </p>
              </div>

              <p className="text-sm sm:text-base font-body leading-relaxed mb-7" style={{ color: 'var(--text-muted)' }}>
                Proven Profit Marketing was founded with one mission — to help ambitious brands across the US, Canada,
                Australia and Europe build a real, profitable online presence. From Shopify store builds to full-scale
                social media management and brand identity, we deliver end-to-end digital growth strategies that move the needle.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-body font-medium"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: '#7C3AED' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: '#7C3AED' }} />
                    {text}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {STATS.map(({ value, label }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="text-center rounded-xl py-3 px-2"
                    style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 2px 8px rgba(124,58,237,0.05)' }}
                  >
                    <div className="font-heading text-xl font-extrabold leading-none"
                      style={{ color: i % 2 === 0 ? '#7C3AED' : '#F97316' }}>
                      {value}
                    </div>
                    <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>{label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/book-a-call" className="btn-primary group">
                  Work With Us
                  <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link to="/services" className="btn-secondary">See Our Services</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ TEAM SECTION ═════════════════════════════════════ */}
      <section
        id="team"
        className="section-pad relative overflow-hidden"
        style={{ background: '#F1EEF9' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
          <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <span className="section-tag">The Team</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
              style={{ color: 'var(--text)' }}
            >
              The people behind{' '}
              <span className="text-gradient">your growth</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 max-w-xl mx-auto text-sm font-body leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              A dedicated team of specialists working together to build, grow, and scale your brand.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14 text-center"
          >
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl"
              style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 4px 24px rgba(124,58,237,0.06)' }}
            >
              <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>
                Ready to put this team to work for your brand?
              </p>
              <Link to="/book-a-call" className="btn-primary text-sm py-2.5 px-6 group">
                Book a Free Call
                <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}