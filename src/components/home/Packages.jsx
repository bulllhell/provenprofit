import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiCheckLine, RiCloseLine, RiArrowRightUpLine, RiLockLine,
  RiShoppingBag3Line, RiInstagramLine,
} from 'react-icons/ri';
import { ECOMMERCE_PACKAGES, SOCIAL_PACKAGES } from '../../data/packages';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ── Checkout Modal ────────────────────────────────────────────
function CheckoutModal({ pkg, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({ name: '', email: '', business: '' });

  const handlePay = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/payments/initiate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId:     pkg.id,
          customerName:  form.name,
          customerEmail: form.email,
          businessName:  form.business,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93 }}
        onClick={e => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--dark-border)',
            boxShadow: '0 20px 60px rgba(124,58,237,0.15)',
          }}
        >
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316)' }} />

          <div className="px-6 py-5 border-b flex justify-between items-start"
            style={{ borderColor: 'var(--dark-border)' }}>
            <div>
              <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--text)' }}>
                {pkg.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Secure payment via Flutterwave
              </p>
            </div>
            <button onClick={onClose} className="transition-colors hover:text-purple-600"
              style={{ color: 'var(--text-muted)' }}>
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {[
              { label: 'Full Name *',          key: 'name',     type: 'text',  placeholder: 'John Smith'   },
              { label: 'Email *',              key: 'email',    type: 'email', placeholder: 'john@brand.com' },
              { label: 'Business (optional)',  key: 'business', type: 'text',  placeholder: 'Your Brand'   },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="text-xs block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full text-sm px-3 py-2.5 rounded-lg outline-none transition-colors"
                  style={{ background: 'var(--light)', border: '1px solid var(--dark-border)', color: 'var(--text)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                  onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--dark-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            ))}

            <div className="rounded-lg p-3.5 space-y-2"
              style={{ background: 'var(--light)', border: '1px solid var(--dark-border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-muted)' }}>{pkg.name}</span>
                <span className="font-semibold" style={{ color: 'var(--text)' }}>
                  ${pkg.price?.toLocaleString()}
                </span>
              </div>
              <div className="h-px" style={{ background: 'var(--dark-border)' }} />
              <div className="flex justify-between font-semibold">
                <span style={{ color: 'var(--text)' }}>Total</span>
                <span style={{ color: '#7C3AED' }}>${pkg.price?.toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={loading || !form.name || !form.email}
              className="w-full py-3 text-white font-semibold text-sm rounded-lg transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
            >
              {loading ? 'Processing...' : `Pay $${pkg.price?.toLocaleString()}`}
            </button>

            <p className="text-center text-[10px]" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
              Secured by Flutterwave • SSL encrypted
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Package Card ──────────────────────────────────────────────
function PackageCard({ pkg, index, type, onSelect }) {
  const isPopular = pkg.badge === 'Most Popular';
  const isCustom  = pkg.price === null;
  const { color, colorB, name, tagline, price, badge, features, notIncluded } = pkg;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="relative flex flex-col rounded-xl overflow-hidden"
      style={{
        background: isPopular ? 'linear-gradient(145deg, #FAF8FF, #F5F0FF)' : '#FFFFFF',
        border: isPopular ? `1px solid ${color}40` : '1px solid var(--dark-border)',
        boxShadow: isPopular
          ? `0 8px 32px ${color}18, 0 2px 8px rgba(0,0,0,0.05)`
          : '0 2px 12px rgba(124,58,237,0.04)',
      }}
    >
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, ${colorB})` }} />

      {badge && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-heading text-base font-bold" style={{ color: 'var(--text)' }}>{name}</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{tagline}</p>
        </div>

        <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--dark-border)' }}>
          {isCustom ? (
            <span className="font-heading text-2xl font-extrabold" style={{ color }}>Custom</span>
          ) : (
            <div className="flex items-end gap-1">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>$</span>
              <span className="font-heading text-3xl font-extrabold leading-none" style={{ color }}>
                {price?.toLocaleString()}
              </span>
              <span className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                {type === 'monthly' ? '/mo' : ' USD'}
              </span>
            </div>
          )}
        </div>

        <ul className="space-y-2 mb-4 flex-1 text-xs">
          {features.map(f => (
            <li key={f} className="flex gap-2" style={{ color: 'var(--text-muted)' }}>
              <RiCheckLine className="w-4 h-4 flex-shrink-0" style={{ color }} />
              <span>{f}</span>
            </li>
          ))}
          {notIncluded?.map(f => (
            <li key={f} className="flex gap-2 line-through" style={{ color: 'var(--light-dim)', opacity: 0.5 }}>
              <RiCloseLine className="w-4 h-4 flex-shrink-0 opacity-40" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA — custom goes to book-a-call, paid opens modal */}
        {isCustom ? (
          <Link
            to="/book-a-call"
            className="w-full py-2.5 rounded-lg font-heading font-semibold text-sm text-white transition-all flex items-center justify-center gap-1.5"
            style={{ background: `linear-gradient(135deg, ${color}, ${colorB})`, boxShadow: `0 4px 16px ${color}28` }}
          >
            Book a Call <RiArrowRightUpLine className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={() => onSelect(pkg)}
            className="w-full py-2.5 rounded-lg font-heading font-semibold text-sm text-white transition-all"
            style={{ background: `linear-gradient(135deg, ${color}, ${colorB})`, boxShadow: `0 4px 16px ${color}28` }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Get Started
          </button>
        )}

        <p className="text-center text-[9px] mt-2" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
          <RiLockLine className="w-2.5 h-2.5 inline mr-1" />
          {isCustom ? 'Free strategy call' : 'Secure checkout'}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Packages() {
  const [activeTab,   setActiveTab]   = useState('ecommerce');
  const [selectedPkg, setSelectedPkg] = useState(null);

  const packages = activeTab === 'ecommerce' ? ECOMMERCE_PACKAGES : SOCIAL_PACKAGES;
  const type      = activeTab === 'ecommerce' ? 'one-time' : 'monthly';

  return (
    <section id="packages" className="section-pad relative overflow-hidden" style={{ background: '#F1EEF9' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full blur-[80px]" style={{ background: 'rgba(124,58,237,0.06)' }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-[80px]" style={{ background: 'rgba(249,115,22,0.06)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8">
          <span className="section-tag">Packages and Pricing</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mt-3 mb-2" style={{ color: 'var(--text)' }}>
            Transparent pricing, <span className="text-gradient">real results</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            Choose the plan that fits. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }} className="flex justify-center gap-2 mb-8">
          {[
            { id: 'ecommerce', label: 'eCommerce',    icon: RiShoppingBag3Line },
            { id: 'social',    label: 'Social Media', icon: RiInstagramLine    },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all"
              style={activeTab === id
                ? { background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: '#fff', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }
                : { background: '#FFFFFF', border: '1px solid var(--dark-border)', color: 'var(--text-muted)' }
              }>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} type={type} onSelect={setSelectedPkg} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-xs mt-8" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          All prices in USD.{' '}
          {activeTab === 'social' && 'Monthly plans can be cancelled anytime. '}
          <Link to="/book-a-call" className="underline hover:opacity-100 transition-opacity"
            style={{ color: 'var(--purple)' }}>
            Not sure? Book a free strategy call.
          </Link>
        </motion.p>
      </div>

      {/* Only render modal when a package is selected */}
      {selectedPkg && (
        <CheckoutModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </section>
  );
}