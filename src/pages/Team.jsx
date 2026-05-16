import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  RiArrowRightUpLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiWhatsappLine,
  RiTiktokLine,
  RiCodeSSlashLine,
  RiPencilLine,
  RiVideoLine,
  RiSearchEyeLine,
  RiBrushLine,
  RiStarFill,
} from 'react-icons/ri';

const CEO = {
  name: 'Adeyemo',
  role: 'Founder & CEO',
  title: 'Proven Profit Marketing',
  bio: 'The visionary behind Proven Profit. With 5 years of hands-on eCommerce experience, Adeyemo has helped 120+ brands across the US, Canada, Australia and Europe build profitable online presences from the ground up.',
  img: '/images/bosP.jpg',
  accent: '#7C3AED',
  socials: [
    { href: 'https://www.instagram.com/proven_profit_?igsh=YzljYTk1ODg3Zg==', icon: RiInstagramLine, hover: 'hover:bg-pink-500'  },
    { href: 'https://www.tiktok.com/@provenprofit',                             icon: RiTiktokLine,    hover: 'hover:bg-white hover:text-black' },
    { href: 'https://wa.me/message/322ETXOWGEWVG1',                             icon: RiWhatsappLine,  hover: 'hover:bg-green-500' },
    { href: 'https://www.facebook.com/profile.php?id=100090118610774&mibextid=ZbWKwL', icon: RiFacebookCircleLine, hover: 'hover:bg-blue-600' },
  ],
};

const TEAM = [
  {
    name: 'Apalowo Ayomide',
    role: 'P/A Developer',
    title: 'Program Developer & Application Integration Specialist',
    bio: 'Handles all technical development and application integrations that power seamless store and marketing workflows.',
    img: '/images/apab.jpeg',
    accent: '#7C3AED',
    icon: RiCodeSSlashLine,
  },
  {
    name: 'Taiwo Ganiyu',
    role: 'Content Creator',
    title: 'Brand Content & Visibility',
    bio: 'Creates bespoke content tailored to each brand voice, keeping audiences engaged and brands visible across every platform.',
    img: '/images/taib.jpeg',
    accent: '#F97316',
    icon: RiPencilLine,
  },
  {
    name: 'Lillian',
    role: 'Video Editor',
    title: 'Video Production & Post',
    bio: 'Edits and produces high-quality, engaging videos that capture attention and drive results for brand campaigns.',
    img: '/images/lilb.jpeg',
    accent: '#E1306C',
    icon: RiVideoLine,
  },
  {
    name: 'AntonioMark',
    role: 'SEO Specialist',
    title: 'Search Engine Optimisation',
    bio: 'Optimizes websites and content to rank higher on search engines, driving consistent organic traffic to client stores.',
    img: '/images/antb.jpeg',
    accent: '#0081FB',
    icon: RiSearchEyeLine,
  },
  {
    name: 'Christianah',
    role: 'Graphics Designer',
    title: 'Visual Design & Brand Communication',
    bio: 'Creates visually compelling designs that communicate brand messages clearly and capture the attention of target audiences.',
    img: '/images/chrb.jpeg',
    accent: '#16a34a',
    icon: RiBrushLine,
  },
];

// ── CEO Card ────────────────────────────────────────────────
function CEOCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(124,58,237,0.2)',
        boxShadow: '0 8px 40px rgba(124,58,237,0.08)',
      }}
    >
      {/* Top gradient bar */}
      <div className="h-[4px]" style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316)' }} />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Photo */}
        <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
          <img
            src={CEO.img}
            alt={CEO.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            style={{ minHeight: '420px' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,16,35,0.85), transparent 55%)' }}
          />
          {/* Socials over image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-center gap-2.5">
              {CEO.socials.map(({ href, icon: Icon, hover }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/10 ${hover} transition-all duration-300 flex items-center justify-center text-white`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {/* Founder badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.3)' }}
            >
              <RiStarFill className="w-2.5 h-2.5" />
              Founder & CEO
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="h-[3px] w-10 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316)' }} />

          <h2 className="font-heading text-3xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
            {CEO.name}
          </h2>
          <p className="text-sm font-semibold mb-5" style={{ color: '#7C3AED' }}>{CEO.title}</p>

          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            {CEO.bio}
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { v: '120+', l: 'Stores Built'  },
              { v: '5yrs', l: 'Experience'    },
              { v: '98%',  l: 'Retention'     },
            ].map(({ v, l }, i) => (
              <div
                key={l}
                className="text-center rounded-xl py-3 px-2"
                style={{ background: 'var(--light)', border: '1px solid var(--dark-border)' }}
              >
                <div className="font-heading text-lg font-extrabold" style={{ color: i % 2 === 0 ? '#7C3AED' : '#F97316' }}>{v}</div>
                <div className="text-[9px] font-body mt-0.5" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <Link to="/book-a-call" className="btn-primary text-sm py-3 group">
              Work With Us
              <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link to="/services" className="btn-secondary text-sm py-3">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Team Member Card ────────────────────────────────────────
function TeamCard({ member, index }) {
  const { name, role, title, bio, img, accent, icon: Icon } = member;

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
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }} />

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
            style={{ background: 'rgba(255,255,255,0.92)', border: `1px solid ${accent}35`, color: accent }}
          >
            <Icon className="w-2.5 h-2.5" />
            {role}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="h-[2px] w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-12"
          style={{ background: accent }}
        />
        <h3 className="font-heading text-base font-bold mb-0.5" style={{ color: 'var(--text)' }}>{name}</h3>
        <p className="text-[11px] font-semibold font-body mb-2" style={{ color: accent }}>{title}</p>
        <p className="text-xs font-body leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>{bio}</p>
      </div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────
export default function Team() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-purple-600/6 blur-[90px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[220px] rounded-full bg-orange-500/6 blur-[90px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.07) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-5"
          >
            <span className="section-tag">Our Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
            style={{ color: 'var(--text)' }}
          >
            The people behind{' '}
            <span className="text-gradient">your growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            A dedicated team of specialists united by one goal — to build, grow, and scale your brand.
          </motion.p>
        </div>
      </section>

      {/* CEO featured card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <CEOCard />
      </section>

      {/* Team members */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: '#F1EEF9' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[90px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-2xl sm:text-3xl font-extrabold"
              style={{ color: 'var(--text)' }}
            >
              Meet the specialists
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-sm font-body"
              style={{ color: 'var(--text-muted)' }}
            >
              Every member of this team is a dedicated expert in their craft.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-purple-600/8 blur-[50px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-orange-500/6 blur-[50px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Ready to Start?</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              Put this team to work for your brand
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
              Book a free strategy call and we will show you exactly how our team will grow your brand.
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