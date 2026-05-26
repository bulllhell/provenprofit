import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiAddLine, RiSubtractFill,
  RiArrowRightUpLine, RiQuestionLine,
  RiShoppingBag2Line, RiInstagramLine,
  RiPaletteLine, RiLineChartLine, RiMailLine,
  RiWhatsappLine,
} from 'react-icons/ri';

const CATEGORIES = [
  { id: 'all',     label: 'All',          icon: RiQuestionLine   },
  { id: 'ecom',    label: 'eCommerce',    icon: RiShoppingBag2Line },
  { id: 'social',  label: 'Social Media', icon: RiInstagramLine  },
  { id: 'brand',   label: 'Branding',     icon: RiPaletteLine    },
  { id: 'growth',  label: 'Growth',       icon: RiLineChartLine  },
  { id: 'general', label: 'General',      icon: RiMailLine       },
];

const FAQS = [
  {
    cat: 'ecom',
    q: 'How long does it take to build my store?',
    a: 'Timelines depend on your chosen package and project scope. Starter stores typically take 7 to 10 business days, while custom builds with advanced features take 2 to 4 weeks. You will receive a clear timeline during onboarding so you always know what to expect.',
  },
  {
    cat: 'ecom',
    q: 'Do you only build eCommerce stores?',
    a: 'No. eCommerce store development is just one part of what we do. We are a full-service digital marketing agency. Alongside building high-converting Shopify and WooCommerce stores, we run paid advertising campaigns, manage social media, develop brand identities, create content, handle email marketing, and build long-term growth strategies. We work with your brand at every stage, from launch to scale.',
  },
  {
    cat: 'ecom',
    q: 'Will my store be mobile friendly?',
    a: 'Absolutely. Every store we build is designed mobile-first from day one. We test across all screen sizes and optimise for speed, usability, and conversions on mobile devices, since the majority of eCommerce traffic now comes from phones.',
  },
  {
    cat: 'ecom',
    q: 'Can you take over and improve my existing store?',
    a: 'Yes. We offer full store audits, redesigns, and performance optimisation for existing Shopify and WooCommerce stores. Whether your store needs a fresh look, faster load times, or better conversion rates, we can step in and turn things around.',
  },
  {
    cat: 'social',
    q: 'What platforms do you manage?',
    a: 'We manage Instagram, TikTok, Facebook, LinkedIn, and Pinterest depending on your niche and target audience. Every plan is tailored around the platforms where your customers actually spend their time.',
  },
  {
    cat: 'social',
    q: 'Do you create the content or do I need to provide it?',
    a: 'We handle everything. Our content team creates graphics, captions, reels, and scheduling on your behalf. You simply review and approve. We also have a dedicated video editor and graphics designer on the team to ensure every post looks premium and on-brand.',
  },
  {
    cat: 'social',
    q: 'Can I cancel my social media plan anytime?',
    a: 'Yes. All social media management plans are billed monthly and can be cancelled at any time with no hidden fees or penalties. We believe in earning your trust every month, not locking you in.',
  },
  {
    cat: 'social',
    q: 'Do your social media plans include paid ads?',
    a: 'Premium plans include Meta and TikTok ads management. We handle the full campaign setup, audience targeting, ad creative, and ongoing optimisation to make sure every dollar you spend works as hard as possible.',
  },
  {
    cat: 'brand',
    q: 'What is included in a brand identity package?',
    a: 'Our brand identity packages include logo design and variations, a full brand style guide, typography and colour system, brand voice and messaging guidelines, social media templates, and business card or print asset design. The goal is to give you a complete, professional identity you can use across every channel.',
  },
  {
    cat: 'brand',
    q: 'How many logo concepts do I get?',
    a: 'You receive 3 distinct initial concepts to choose from. Once you select your preferred direction, we refine it through up to 2 rounds of revisions until it is exactly right. Strong branding sets the tone for everything else, so we take this process seriously.',
  },
  {
    cat: 'brand',
    q: 'Do you handle marketing as well as branding?',
    a: 'Yes, and this is where we are different from a traditional design agency. We do not just hand you a logo and walk away. We combine brand identity with a full marketing strategy, including paid advertising, social media management, content creation, email marketing, and SEO. Your brand looks great and it gets seen by the right people.',
  },
  {
    cat: 'growth',
    q: 'What does brand scaling actually mean?',
    a: 'Brand scaling is a full growth partnership where we take responsibility for growing your revenue across multiple channels. It includes eCommerce management, paid acquisition, email marketing, content strategy, and monthly reporting. We function as your dedicated growth team, not just a vendor.',
  },
  {
    cat: 'growth',
    q: 'Do you offer email marketing as a standalone service?',
    a: 'Yes. We set up and manage Klaviyo and Mailchimp accounts, build welcome sequences, abandoned cart flows, and promotional campaigns. Email marketing consistently delivers the highest return on investment of any channel and we make sure your list is working for you around the clock.',
  },
  {
    cat: 'general',
    q: 'Which countries do you work with?',
    a: 'We work with brands globally. Our current client base includes businesses in the United States, United Kingdom, Canada, Australia, and across Europe. We are fully remote so location is never a barrier.',
  },
  {
    cat: 'general',
    q: 'How do payments work?',
    a: 'We process payments securely via Flutterwave. For one-time projects we typically split payments 50 percent upfront and 50 percent on completion. Monthly retainer services are billed at the start of each billing cycle.',
  },
  {
    cat: 'general',
    q: 'What happens after I pay for a package?',
    a: 'Within 24 hours of payment you will receive a welcome email with your onboarding questionnaire and a link to book your kickoff call. From there we gather everything we need and get to work. You will always know where your project stands.',
  },
  {
    cat: 'general',
    q: 'Do you offer refunds?',
    a: 'Refunds are handled on a case-by-case basis depending on the stage of the project. We stand behind our work and if something is not right we will work with you to make it right. Our 98 percent client retention rate reflects how seriously we take client satisfaction.',
  },
];

function FAQItem({ item, isOpen, onToggle, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: `1px solid ${isOpen ? accent + '40' : 'var(--dark-border)'}`,
        boxShadow: isOpen ? `0 4px 24px ${accent}12` : '0 1px 4px rgba(124,58,237,0.04)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 text-left"
      >
        <span className="font-heading text-sm sm:text-base font-semibold leading-snug" style={{ color: 'var(--text)' }}>
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-200"
          style={{
            background: isOpen ? accent : 'rgba(124,58,237,0.08)',
            color: isOpen ? '#fff' : accent,
          }}
        >
          {isOpen ? <RiSubtractFill className="w-3.5 h-3.5" /> : <RiAddLine className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px mb-4" style={{ background: 'var(--dark-border)' }} />
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ACCENT_MAP = {
  all:     '#7C3AED',
  ecom:    '#F97316',
  social:  '#E1306C',
  brand:   '#7C3AED',
  growth:  '#16a34a',
  general: '#0081FB',
};

export default function FAQ() {
  const [openQ, setOpenQ]               = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.cat === activeCategory);

  const accent = ACCENT_MAP[activeCategory];

  const toggle = q => setOpenQ(prev => (prev === q ? null : q));

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--light)' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full bg-purple-600/5 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-orange-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="section-tag">FAQs</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: 'var(--text)' }}
          >
            Got questions?{' '}
            <span className="text-gradient">We have answers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-sm font-body leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Everything you need to know about working with Proven Profit Marketing Agency Marketing.
            Still have a question? Reach out anytime.
          </motion.p>
        </div>

        {/* Category filter — scrollable on mobile, wrapped on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const catAccent = ACCENT_MAP[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenQ(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wide transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: catAccent,
                          color: '#fff',
                          boxShadow: `0 2px 12px ${catAccent}35`,
                        }
                      : {
                          background: '#FFFFFF',
                          border: '1px solid var(--dark-border)',
                          color: 'var(--text-muted)',
                        }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filtered.map(item => (
              <FAQItem
                key={item.q}
                item={item}
                isOpen={openQ === item.q}
                onToggle={() => toggle(item.q)}
                accent={accent}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(249,115,22,0.06))',
            border: '1px solid rgba(124,58,237,0.15)',
          }}
        >
          <div className="text-center sm:text-left">
            <p className="font-heading font-semibold text-base" style={{ color: 'var(--text)' }}>
              Still have questions?
            </p>
            <p className="text-sm font-body mt-1" style={{ color: 'var(--text-muted)' }}>
              Reach out on WhatsApp or book a free call and we will answer everything.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/message/322ETXOWGEWVG1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              }}
            >
              <RiWhatsappLine className="w-4 h-4" />
              WhatsApp Us
            </a>

            <Link
              to="/book-a-call"
              className="btn-primary text-sm py-2.5 px-5 group"
            >
              Book a Free Call
              <RiArrowRightUpLine className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}