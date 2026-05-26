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
  RiHeartLine,
  RiLightbulbLine,
  RiTeamLine,
  RiAwardLine,
  RiGlobalLine,
  RiRocketLine,
} from 'react-icons/ri';

const CEO = {
  name: 'Adeyemo Olatunbosun',
  role: 'Founder & CEO',
  title: 'Proven Profit Marketing Agency',
  bio: 'The visionary behind Proven Profit Marketing Agency. With 5 years of eCommerce experience, Adeyemo has helped 120+ brands across the US, Canada, Australia and Europe build profitable online presences from the ground up.',
  img: '/images/bosP.jpg',
  accent: '#7C3AED',
  socials: [
    { href: 'https://www.instagram.com/proven_profit_?igsh=YzljYTk1ODg3Zg==', icon: RiInstagramLine,      hover: 'hover:bg-pink-500'              },
    { href: 'https://www.tiktok.com/@provenprofit',                             icon: RiTiktokLine,        hover: 'hover:bg-white hover:text-black' },
    { href: 'https://wa.me/message/322ETXOWGEWVG1',                             icon: RiWhatsappLine,      hover: 'hover:bg-green-500'              },
    { href: 'https://www.facebook.com/profile.php?id=100090118610774&mibextid=ZbWKwL', icon: RiFacebookCircleLine, hover: 'hover:bg-blue-600' },
  ],
};

const TEAM = [
  {
    name: 'Apalowo Ayomide',
    role: 'P/A Developer',
    title: 'Program Developer and Application Integration Specialist',
    bio: 'Handles all technical development and application integrations that power seamless store and marketing workflows.',
    img: '/images/apab.jpeg',
    accent: '#7C3AED',
    icon: RiCodeSSlashLine,
  },
  {
    name: 'Taiwo Ganiyu',
    role: 'Content Creator',
    title: 'Brand Content and Visibility',
    bio: 'Creates bespoke content tailored to each brand voice, keeping audiences engaged and brands visible across every platform.',
    img: '/images/taib.jpeg',
    accent: '#F97316',
    icon: RiPencilLine,
  },
  {
    name: 'Lillian',
    role: 'Video Editor',
    title: 'Video Production and Post',
    bio: 'Edits and produces engaging videos that capture attention and drive results for brand campaigns.',
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
    title: 'Visual Design and Brand Communication',
    bio: 'Creates visually compelling designs that communicate brand messages clearly and capture the attention of target audiences.',
    img: '/images/chrb.jpeg',
    accent: '#16a34a',
    icon: RiBrushLine,
  },
];

/* ── About Us values ──────────────────────────────────────── */
const VALUES = [
  {
    icon: RiRocketLine,
    color: '#F97316',
    title: 'Results First',
    desc: 'Everything we do is measured against one thing — does it move the needle for your business. We do not believe in vanity metrics or work that looks good but earns nothing.',
  },
  {
    icon: RiHeartLine,
    color: '#E1306C',
    title: 'We Care Deeply',
    desc: 'Your brand is not a number in our spreadsheet. We treat every project like it is our own business. When you win, we feel it. That is not a slogan — that is just how we operate.',
  },
  {
    icon: RiLightbulbLine,
    color: '#7C3AED',
    title: 'Always Learning',
    desc: 'Digital marketing changes fast. We stay ahead of every algorithm update, platform change, and new trend so you never fall behind the curve.',
  },
  {
    icon: RiGlobalLine,
    color: '#0EA5E9',
    title: 'Global Reach',
    desc: 'We have built and scaled brands across Nigeria, the US, Canada, the UK, Australia, and Europe. We understand different markets, different buyers, and different platforms.',
  },
  {
    icon: RiAwardLine,
    color: '#10B981',
    title: 'Proven Track Record',
    desc: 'Over 120 stores built, 5 star ratings across the board, and a 98% client retention rate. The numbers speak before we do.',
  },
  {
    icon: RiTeamLine,
    color: '#FB923C',
    title: 'Full Team Behind You',
    desc: 'When you work with us you get a developer, content creator, video editor, SEO specialist, and designer all working on your brand at the same time.',
  },
];

/* ── CEO Card ─────────────────────────────────────────────── */
function CEOCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid rgba(124,58,237,0.2)', boxShadow: '0 8px 40px rgba(124,58,237,0.08)' }}
    >
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
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,16,35,0.85), transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-center gap-2.5">
              {CEO.socials.map(({ href, icon: Icon, hover }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/10 ${hover} transition-all duration-300 flex items-center justify-center text-white`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.3)' }}>
              <RiStarFill className="w-2.5 h-2.5" />
              Founder and CEO
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="h-[3px] w-10 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316)' }} />
          <h2 className="font-heading text-3xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>{CEO.name}</h2>
          <p className="text-sm font-semibold mb-5" style={{ color: '#7C3AED' }}>{CEO.title}</p>
          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{CEO.bio}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { v: '120+', l: 'Stores Built', c: '#7C3AED' },
              { v: '5yrs', l: 'Experience',   c: '#F97316' },
              { v: '98%',  l: 'Retention',    c: '#7C3AED' },
            ].map(({ v, l, c }) => (
              <div key={l} className="text-center rounded-xl py-3 px-2"
                style={{ background: 'var(--light)', border: '1px solid var(--dark-border)' }}>
                <div className="font-heading text-lg font-extrabold" style={{ color: c }}>{v}</div>
                <div className="text-[9px] font-body mt-0.5" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <Link to="/book-a-call" className="btn-primary text-sm py-3 group">
              Work With Us
              <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link to="/services" className="btn-secondary text-sm py-3">Our Services</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Team Member Card ─────────────────────────────────────── */
function TeamCard({ member, index }) {
  const { name, role, title, bio, img, accent, icon: Icon } = member;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 2px 12px rgba(124,58,237,0.04)', transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=`${accent}40`; e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,0.07), 0 0 0 1px ${accent}18`; e.currentTarget.style.transform='translateY(-5px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--dark-border)'; e.currentTarget.style.boxShadow='0 2px 12px rgba(124,58,237,0.04)'; e.currentTarget.style.transform='translateY(0)'; }}
    >
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }} />
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={img} alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.92)', border: `1px solid ${accent}35`, color: accent }}>
            <Icon className="w-2.5 h-2.5" />
            {role}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="h-[2px] w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-12" style={{ background: accent }} />
        <h3 className="font-heading text-base font-bold mb-0.5" style={{ color: 'var(--text)' }}>{name}</h3>
        <p className="text-[11px] font-semibold font-body mb-2" style={{ color: accent }}>{title}</p>
        <p className="text-xs font-body leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>{bio}</p>
      </div>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function Team() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-purple-600/6 blur-[90px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[220px] rounded-full bg-orange-500/6 blur-[90px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.07) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-5">
            <span className="section-tag">Our Team</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5" style={{ color: 'var(--text)' }}>
            The people behind{' '}
            <span className="text-gradient">your growth</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A dedicated team of specialists united by one goal: to build, grow, and scale your brand.
          </motion.p>
        </div>
      </section>

      {/* ── CEO ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <CEOCard />
      </section>

      {/* ── About Us ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: '#F1EEF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>

          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', color: '#F97316', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F97316', boxShadow: '0 0 6px #F97316', animation: 'pdot 2s ease-in-out infinite' }} />
              About Us
              <style>{`@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-heading text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Why brands choose Proven Profit
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="font-body text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              We are not a generic agency that takes your money and sends a monthly report.
              We are a hands on team that treats your brand like our own business and stays
              accountable to real results every single month.
            </motion.p>
          </div>

          {/* Mission statement */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ borderRadius: 24, padding: 'clamp(2rem,4vw,3rem)', marginBottom: 52, background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, borderRadius: '50%', background: 'rgba(249,115,22,0.15)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Our Mission</p>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 16, letterSpacing: '-0.02em' }}>
                To make serious digital marketing accessible to every brand that is ready to grow.
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)' }}>
                Too many great products fail because they cannot get seen online. We exist to change that.
                Whether you are just starting out or ready to scale past seven figures, we have the team,
                the tools, and the track record to make it happen.
              </p>
            </div>
          </motion.div>

          {/* Values grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{ borderRadius: 18, padding: '22px 22px 24px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${v.color}35`; e.currentTarget.style.boxShadow=`0 8px 32px ${v.color}14`; e.currentTarget.style.transform='translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${v.color}14`, border: `1px solid ${v.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon style={{ width: 20, height: 20, color: v.color }} />
                  </div>
                  <h4 className="font-heading font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>{v.title}</h4>
                  <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 52, borderRadius: 20, padding: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 24 }}>
            {[
              { v: '120+', l: 'Brands Served',      c: '#7C3AED' },
              { v: '5',    l: 'Years of Experience', c: '#F97316' },
              { v: '$2M+', l: 'Revenue Generated',   c: '#10B981' },
              { v: '98%',  l: 'Client Retention',    c: '#0EA5E9' },
              { v: '5★',   l: 'Average Rating',      c: '#F59E0B' },
            ].map(({ v, l, c }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: c, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontWeight: 600 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Team Members ─────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[90px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-heading text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)' }}>
              Meet the specialists
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="mt-2 text-sm font-body" style={{ color: 'var(--text-muted)' }}>
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

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="py-20 px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #FAF8FF, #F1EEF9)', border: '1px solid var(--dark-border)', boxShadow: '0 8px 40px rgba(124,58,237,0.08)' }}>
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
              <Link to="/services" className="btn-secondary text-sm px-7 py-3.5">View Our Services</Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}