import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import {
  RiCalendarLine, RiMailLine, RiUserLine, RiPhoneLine,
  RiMoneyDollarCircleLine, RiMessageLine, RiLogoutBoxLine,
  RiRefreshLine, RiCheckLine, RiTimeLine, RiCloseCircleLine,
  RiDownloadLine, RiSearchLine, RiFilterLine, RiLoader4Line,
  RiInboxLine, RiTeamLine, RiArrowRightUpLine,
} from 'react-icons/ri';
import logo from '../assets/newbos.png';

// ── Status badge ─────────────────────────────────────────────
const STATUS_STYLES = {
  new:       { bg: 'rgba(124,58,237,0.1)',  color: '#7C3AED', label: 'New'       },
  contacted: { bg: 'rgba(249,115,22,0.1)',  color: '#F97316', label: 'Contacted' },
  booked:    { bg: 'rgba(52,211,153,0.12)', color: '#059669', label: 'Booked'    },
  closed:    { bg: 'rgba(148,163,184,0.15)',color: '#64748B', label: 'Closed'    },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.new;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent, loading }) {
  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4"
      style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)', boxShadow: '0 2px 12px rgba(124,58,237,0.04)' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: accent + '15' }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div>
        <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{label}</p>
        {loading
          ? <div className="w-12 h-5 rounded mt-0.5 animate-pulse" style={{ background: 'var(--dark-border)' }} />
          : <p className="font-heading text-xl font-extrabold" style={{ color: 'var(--text)' }}>{value}</p>
        }
      </div>
    </div>
  );
}

// ── Export CSV helper ────────────────────────────────────────
function exportCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const rows    = data.map(r => Object.values(r).map(v => `"${v ?? ''}"`).join(','));
  const blob    = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Main Dashboard ───────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab,    setActiveTab]    = useState('bookings');
  const [bookings,     setBookings]     = useState([]);
  const [subscribers,  setSubscribers]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updating,     setUpdating]     = useState(null);
  const [expanded,     setExpanded]     = useState(null);
  const [userName,     setUserName]     = useState('');

  // ── Auth check ───────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
      else setUserName(session.user.email);
    });
  }, [navigate]);

  // ── Fetch data ───────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: b }, { data: s }] = await Promise.all([
      supabase.from('booking_requests').select('*').order('submitted_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
    ]);
    setBookings(b || []);
    setSubscribers(s || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Update booking status ─────────────────────────────────
  const updateStatus = async (id, status) => {
    setUpdating(id);
    await supabase.from('booking_requests').update({ status }).eq('id', id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    setUpdating(null);
  };

  // ── Sign out ─────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // ── Filtered bookings ─────────────────────────────────────
  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.service?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const newCount  = bookings.filter(b => b.status === 'new').length;
  const bookCount = bookings.filter(b => b.status === 'booked').length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* ── Top navbar ─────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: 'rgba(248,247,255,0.95)', borderColor: 'var(--dark-border)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Proven Profit" className="h-8 w-auto object-contain" />
            <span
              className="text-xs font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}
            >
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-body" style={{ color: 'var(--text-muted)' }}>
              {userName}
            </span>
            <button
              onClick={fetchData}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}
              title="Refresh"
            >
              <RiRefreshLine className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444' }}
            >
              <RiLogoutBoxLine className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Stats row ──────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={RiInboxLine}    label="Total Bookings"   value={bookings.length}    accent="#7C3AED" loading={loading} />
          <StatCard icon={RiCalendarLine} label="New / Unread"     value={newCount}           accent="#F97316" loading={loading} />
          <StatCard icon={RiCheckLine}    label="Booked Calls"     value={bookCount}          accent="#059669" loading={loading} />
          <StatCard icon={RiTeamLine}     label="Subscribers"      value={subscribers.length} accent="#0081FB" loading={loading} />
        </div>

        {/* ── Tabs ───────────────────────────────── */}
        <div
          className="flex items-center gap-1 p-1 rounded-2xl mb-6 w-fit"
          style={{ background: '#F1EEF9', border: '1px solid var(--dark-border)' }}
        >
          {[
            { id: 'bookings',     label: 'Bookings',     count: bookings.length    },
            { id: 'subscribers',  label: 'Subscribers',  count: subscribers.length },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-heading font-semibold transition-all duration-200"
              style={activeTab === id
                ? { background: '#FFFFFF', color: '#7C3AED', boxShadow: '0 2px 8px rgba(124,58,237,0.12)' }
                : { color: 'var(--text-muted)' }
              }
            >
              {label}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-body"
                style={activeTab === id
                  ? { background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }
                  : { background: 'rgba(0,0,0,0.06)', color: 'var(--text-muted)' }
                }
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* ── BOOKINGS TAB ───────────────────────── */}
        {activeTab === 'bookings' && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
              {/* Search */}
              <div className="relative flex-1 w-full sm:max-w-xs">
                <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-dim)' }} />
                <input
                  type="text"
                  placeholder="Search name, email, service..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-base pl-10 text-xs"
                />
              </div>
              {/* Status filter */}
              <div className="relative">
                <RiFilterLine className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--light-dim)' }} />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="input-base pl-9 pr-4 text-xs w-40 appearance-none"
                >
                  <option value="all">All statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              {/* Export */}
              <button
                onClick={() => exportCSV(bookings, 'bookings.csv')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-heading font-semibold transition-colors flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.15)' }}
              >
                <RiDownloadLine className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {/* Table / Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RiLoader4Line className="w-7 h-7 animate-spin" style={{ color: '#7C3AED' }} />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <RiInboxLine className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--dark-muted)' }} />
                <p className="font-heading text-base font-semibold" style={{ color: 'var(--text)' }}>No bookings found</p>
                <p className="text-sm font-body mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(b => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: '#FFFFFF',
                      border: b.status === 'new' ? '1px solid rgba(124,58,237,0.3)' : '1px solid var(--dark-border)',
                      boxShadow: b.status === 'new' ? '0 2px 12px rgba(124,58,237,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Row header */}
                    <div
                      className="flex items-start sm:items-center justify-between gap-4 p-4 cursor-pointer"
                      onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                    >
                      <div className="flex items-start sm:items-center gap-3 flex-wrap flex-1 min-w-0">
                        {/* Avatar */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm text-white"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
                        >
                          {b.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading text-sm font-bold truncate" style={{ color: 'var(--text)' }}>
                              {b.name}
                            </span>
                            <StatusBadge status={b.status} />
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                            <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{b.email}</span>
                            {b.service && (
                              <span className="text-xs font-body" style={{ color: '#7C3AED' }}>{b.service}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="hidden sm:block text-[10px] font-body" style={{ color: 'var(--light-dim)' }}>
                          {new Date(b.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <RiArrowRightUpLine
                          className="w-4 h-4 transition-transform duration-200"
                          style={{
                            color: 'var(--light-dim)',
                            transform: expanded === b.id ? 'rotate(90deg)' : 'rotate(0deg)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence initial={false}>
                      {expanded === b.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-4 pb-4 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4"
                            style={{ borderTop: '1px solid var(--dark-border)' }}
                          >
                            {/* Details */}
                            <div className="space-y-2.5 pt-4">
                              {[
                                { icon: RiMailLine,               label: 'Email',          val: b.email          },
                                { icon: RiPhoneLine,              label: 'Phone',          val: b.phone          },
                                { icon: RiMoneyDollarCircleLine,  label: 'Budget',         val: b.budget         },
                                { icon: RiTimeLine,               label: 'Preferred Time', val: b.preferred_time },
                              ].map(({ icon: Icon, label, val }) => val ? (
                                <div key={label} className="flex items-start gap-2">
                                  <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#7C3AED' }} />
                                  <div>
                                    <span className="text-[10px] font-body uppercase tracking-wider block" style={{ color: 'var(--light-dim)' }}>{label}</span>
                                    <span className="text-xs font-body" style={{ color: 'var(--text)' }}>{val}</span>
                                  </div>
                                </div>
                              ) : null)}
                            </div>

                            {/* Message + actions */}
                            <div className="pt-4 space-y-3">
                              {b.message && (
                                <div>
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <RiMessageLine className="w-3.5 h-3.5" style={{ color: '#7C3AED' }} />
                                    <span className="text-[10px] font-body uppercase tracking-wider" style={{ color: 'var(--light-dim)' }}>Message</span>
                                  </div>
                                  <p
                                    className="text-xs font-body leading-relaxed p-3 rounded-xl"
                                    style={{ background: 'var(--dark-card)', color: 'var(--text)', border: '1px solid var(--dark-border)' }}
                                  >
                                    {b.message}
                                  </p>
                                </div>
                              )}

                              {/* Status update */}
                              <div>
                                <span className="text-[10px] font-body uppercase tracking-wider block mb-2" style={{ color: 'var(--light-dim)' }}>
                                  Update Status
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {Object.entries(STATUS_STYLES).map(([key, s]) => (
                                    <button
                                      key={key}
                                      onClick={() => updateStatus(b.id, key)}
                                      disabled={b.status === key || updating === b.id}
                                      className="px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-40"
                                      style={b.status === key
                                        ? { background: s.bg, color: s.color, border: `1px solid ${s.color}40` }
                                        : { background: 'var(--dark-card)', color: 'var(--text-muted)', border: '1px solid var(--dark-border)' }
                                      }
                                    >
                                      {updating === b.id ? '...' : s.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Quick actions */}
                              <div className="flex gap-2">
                                <a
                                  href={`mailto:${b.email}`}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors"
                                  style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.15)' }}
                                >
                                  <RiMailLine className="w-3.5 h-3.5" /> Email
                                </a>
                                {b.phone && (
                                  <a
                                    href={`https://wa.me/${b.phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors"
                                    style={{ background: 'rgba(37,211,102,0.08)', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}
                                  >
                                    <RiPhoneLine className="w-3.5 h-3.5" /> WhatsApp
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SUBSCRIBERS TAB ────────────────────── */}
        {activeTab === 'subscribers' && (
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-dim)' }} />
                <input
                  type="text"
                  placeholder="Search email..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-base pl-10 text-xs"
                />
              </div>
              <button
                onClick={() => exportCSV(subscribers, 'subscribers.csv')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-heading font-semibold flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.15)' }}
              >
                <RiDownloadLine className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RiLoader4Line className="w-7 h-7 animate-spin" style={{ color: '#7C3AED' }} />
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)' }}
              >
                {/* Table header */}
                <div
                  className="grid grid-cols-3 px-5 py-3 text-[10px] font-heading font-bold uppercase tracking-widest"
                  style={{ background: 'var(--dark-card)', color: 'var(--text-muted)', borderBottom: '1px solid var(--dark-border)' }}
                >
                  <span>Email</span>
                  <span>Source</span>
                  <span>Subscribed</span>
                </div>

                {subscribers
                  .filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()))
                  .map((s, i) => (
                    <div
                      key={s.id}
                      className="grid grid-cols-3 px-5 py-3.5 text-xs font-body items-center"
                      style={{
                        color: 'var(--text)',
                        borderBottom: i < subscribers.length - 1 ? '1px solid var(--dark-border)' : 'none',
                        background: i % 2 === 0 ? '#FFFFFF' : 'rgba(241,238,249,0.4)',
                      }}
                    >
                      <span className="truncate pr-4" style={{ color: 'var(--text)' }}>{s.email}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{s.source || 'footer'}</span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {new Date(s.subscribed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  ))
                }

                {subscribers.length === 0 && (
                  <div className="text-center py-16">
                    <RiMailLine className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--dark-muted)' }} />
                    <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>No subscribers yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}