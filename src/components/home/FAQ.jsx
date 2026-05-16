import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiAddLine, RiSubtractFill,
  RiArrowRightUpLine, RiQuestionLine,
  RiShoppingBag2Line, RiInstagramLine,
  RiPaletteLine, RiLineChartLine, RiMailLine,
} from 'react-icons/ri';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: RiQuestionLine },
  { id: 'ecom', label: 'eCommerce', icon: RiShoppingBag2Line },
  { id: 'social', label: 'Social Media', icon: RiInstagramLine },
  { id: 'brand', label: 'Branding', icon: RiPaletteLine },
  { id: 'growth', label: 'Growth', icon: RiLineChartLine },
  { id: 'general', label: 'General', icon: RiMailLine },
];

const FAQS = [
  { cat: 'ecom', q: 'How long does it take to build my Shopify store?', a: 'Timelines depend on the package...' },
  { cat: 'ecom', q: 'Do you only build Shopify stores or other platforms too?', a: 'We specialise in Shopify and WooCommerce...' },
  { cat: 'ecom', q: 'Will my store be mobile-friendly?', a: 'Absolutely — every store we build is mobile-first...' },
  { cat: 'ecom', q: 'Can you take over and improve my existing store?', a: 'Yes. We do store audits, redesigns...' },

  { cat: 'social', q: 'What platforms do you manage?', a: 'We manage Instagram, TikTok, Facebook...' },
  { cat: 'social', q: 'Do you create the content or do I need to provide it?', a: 'We handle everything...' },
  { cat: 'social', q: 'Can I cancel my social media plan anytime?', a: 'Yes. Monthly billing, cancel anytime...' },
  { cat: 'social', q: 'Do your social media plans include paid ads?', a: 'Premium plans include ads management...' },

  { cat: 'brand', q: 'What is included in a brand identity package?', a: 'Logo, typography, color system...' },
  { cat: 'brand', q: 'How many logo concepts do I get?', a: 'You receive 3 initial concepts...' },

  { cat: 'growth', q: 'What does "brand scaling" actually mean?', a: 'It is a full growth partnership...' },
  { cat: 'growth', q: 'Do you offer email marketing as a standalone service?', a: 'Yes — Klaviyo and Mailchimp setups...' },

  { cat: 'general', q: 'Which countries do you work with?', a: 'We work globally — US, UK, Canada...' },
  { cat: 'general', q: 'How do payments work?', a: 'We use Flutterwave, 50/50 for projects...' },
  { cat: 'general', q: 'What happens after I pay for a package?', a: 'You receive onboarding within 24 hours...' },
  { cat: 'general', q: 'Do you offer refunds?', a: 'Refunds depend on project stage...' },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between p-5 text-left"
      >
        <span>{item.q}</span>
        <span>
          {isOpen ? <RiSubtractFill /> : <RiAddLine />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0">
              <p className="text-sm text-gray-400">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openQ, setOpenQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? FAQS
      : FAQS.filter(f => f.cat === activeCategory);

  const toggle = (q) => {
    setOpenQ(prev => (prev === q ? null : q));
  };

  return (
    <section className="section-pad">
      <div className="max-w-4xl mx-auto">

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 overflow-x-auto mb-6">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenQ(null);
                }}
                className="px-3 py-1 rounded-full bg-gray-800 text-white flex items-center gap-1"
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ LIST */}
        <div className="space-y-3">
          {filtered.map(item => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openQ === item.q}
              onToggle={() => toggle(item.q)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex gap-3">
          <a href="https://wa.me/message/PROVENPROFIT">WhatsApp</a>
          <Link to="/book-a-call">Book a Call</Link>
        </div>

      </div>
    </section>
  );
}