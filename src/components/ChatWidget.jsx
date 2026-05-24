import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RiMessage3Line, RiCloseLine, RiSendPlaneLine,
  RiRobot2Line, RiUser3Line, RiSparklingLine,
} from 'react-icons/ri';
import { useChatbot } from './useChatbot';

const ACCENT  = '#F97316';
const ACCENTB = '#FB923C';

const QUICK_REPLIES = [
  'I need a Shopify store',
  'How much is branding?',
  'I want Google Ads',
  'What services do you offer?',
];

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px' }}>
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'block' }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function Message({ msg, isLast }) {
  const isBot = msg.role === 'assistant';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: isBot ? 'row' : 'row-reverse' }}
    >
      {/* Avatar */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: isBot ? `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})` : '#E2D9F3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isBot
          ? <RiRobot2Line style={{ width: 14, height: 14, color: '#fff' }} />
          : <RiUser3Line style={{ width: 14, height: 14, color: '#7C3AED' }} />
        }
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '78%',
        padding: '10px 14px',
        borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        fontSize: 13,
        lineHeight: 1.6,
        background: isBot ? '#F8F7FF' : `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
        color: isBot ? '#1E1B2E' : '#fff',
        boxShadow: isBot ? '0 1px 4px rgba(0,0,0,0.06)' : `0 2px 12px ${ACCENT}40`,
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const { messages, input, setInput, loading, sendMessage } = useChatbot();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const prevLen = useRef(messages.length);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!open && messages.length > prevLen.current) {
      setHasNewMsg(true);
    }
    prevLen.current = messages.length;
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setHasNewMsg(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSend = (text) => {
    setShowQuick(false);
    sendMessage(text);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', bottom: 88, right: 20, zIndex: 9998,
              width: 'min(360px, calc(100vw - 40px))',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)',
              display: 'flex', flexDirection: 'column',
              maxHeight: 'min(560px, calc(100vh - 120px))',
            }}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RiSparklingLine style={{ width: 18, height: 18, color: '#fff' }} />
                  </div>
                  {/* Live dot */}
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>Proven Profit</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: 0 }}>AI Assistant • Online now</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              >
                <RiCloseLine style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px 14px',
              display: 'flex', flexDirection: 'column', gap: 12,
              background: '#fff',
            }}>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} isLast={i === messages.length - 1} />
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <RiRobot2Line style={{ width: 14, height: 14, color: '#fff' }} />
                  </div>
                  <div style={{ background: '#F8F7FF', borderRadius: '4px 16px 16px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Quick replies — only show at start */}
              {showQuick && messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}
                >
                  {QUICK_REPLIES.map(q => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      style={{
                        padding: '6px 12px', borderRadius: 100,
                        background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`,
                        color: ACCENT, fontSize: 11, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}20`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}10`; }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '10px 12px',
              borderTop: '1px solid rgba(0,0,0,0.07)',
              background: '#fff',
              display: 'flex', alignItems: 'center', gap: 8,
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message..."
                style={{
                  flex: 1, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 100,
                  padding: '9px 16px', fontSize: 13, outline: 'none',
                  background: '#F8F7FF', color: '#1E1B2E',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: '50%', border: 'none',
                  background: input.trim() && !loading ? `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})` : '#E5E7EB',
                  color: input.trim() && !loading ? '#fff' : '#9CA3AF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  boxShadow: input.trim() && !loading ? `0 4px 12px ${ACCENT}40` : 'none',
                  flexShrink: 0,
                }}
              >
                <RiSendPlaneLine style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Footer */}
            <div style={{ padding: '6px 14px 10px', background: '#fff', textAlign: 'center' }}>
              <p style={{ fontSize: 10, color: '#9CA3AF', margin: 0 }}>Powered by Proven Profit AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#1E1B2E' : `linear-gradient(135deg, ${ACCENT}, ${ACCENTB})`,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 4px 20px rgba(0,0,0,0.25)' : `0 8px 28px ${ACCENT}55`,
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <RiCloseLine style={{ width: 24, height: 24, color: '#fff' }} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <RiMessage3Line style={{ width: 24, height: 24, color: '#fff' }} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasNewMsg && !open && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            style={{
              position: 'absolute', top: -2, right: -2,
              width: 16, height: 16, borderRadius: '50%',
              background: '#EF4444', border: '2px solid #fff',
            }}
          />
        )}
      </motion.button>
    </>
  );
}