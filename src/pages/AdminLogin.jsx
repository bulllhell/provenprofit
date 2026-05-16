import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { RiLockLine, RiMailLine, RiEyeLine, RiEyeOffLine, RiLoader4Line } from 'react-icons/ri';
import logo from '../assets/images/povG.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      setError('Invalid email or password.');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--light)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Proven Profit" className="h-10 w-auto object-contain" />
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--dark-border)',
            boxShadow: '0 8px 40px rgba(124,58,237,0.08)',
          }}
        >
          <h1 className="font-heading text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            Admin Login
          </h1>
          <p className="text-sm font-body mb-7" style={{ color: 'var(--text-muted)' }}>
            Sign in to view bookings and subscribers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-body font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Email
              </label>
              <div className="relative">
                <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-dim)' }} />
                <input
                  type="email"
                  required
                  placeholder="admin@provenprofitmarketing.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="input-base pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-body font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Password
              </label>
              <div className="relative">
                <RiLockLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-dim)' }} />
                <input
                  type={show ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input-base pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--light-dim)' }}
                >
                  {show ? <RiEyeOffLine className="w-4 h-4" /> : <RiEyeLine className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-body">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
              }}
            >
              {loading
                ? <><RiLoader4Line className="w-4 h-4 animate-spin" /> Signing in...</>
                : <><RiLockLine className="w-4 h-4" /> Sign In</>
              }
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}