import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiPlayCircleLine, RiPauseLine,
  RiVolumeUpLine, RiVolumeMuteLine,
  RiFullscreenLine, RiStarFill,
} from 'react-icons/ri';

const VIDEOS = [
  { id: 1, src: '/videos/bos1.mp4', label: 'Store Design',  accent: '#7C3AED', stars: 5 },
  { id: 2, src: '/videos/bos2.mp4', label: 'Social Media',  accent: '#F97316', stars: 5 },
  { id: 3, src: '/videos/bos3.mp4', label: 'Brand Growth',  accent: '#7C3AED', stars: 5 },
];

function VideoCard({ video, isActive, onClick }) {
  const videoRef  = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded,   setLoaded]   = useState(false);
  const { src, label, accent, stars } = video;

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // Fallback: remove skeleton after 3 seconds if onLoadedData doesn't fire
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loaded) setLoaded(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [loaded]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!isActive) { onClick(); return; }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const openFullscreen = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen)          v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const scrub = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer h-96 sm:h-[500px] md:h-[550px] w-full aspect-[9/16]"
      style={{
        background: '#F1EEF9',
        border: isActive
          ? `1px solid ${accent}60`
          : '1px solid #E2D9F3',
        boxShadow: isActive
          ? `0 8px 32px ${accent}22, 0 2px 8px rgba(0,0,0,0.06)`
          : '0 2px 12px rgba(124,58,237,0.07)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Video — explicit z-index, always rendered */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onLoadedData={() => setLoaded(true)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 10 }}
      />

      {/* Loading skeleton — lower z-index */}
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #F1EEF9 0%, #E9E4F8 100%)',
            zIndex: 5,
          }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-[#E2D9F3]"
            style={{ borderTopColor: accent, animation: 'spin 0.8s linear infinite' }}
          />
        </div>
      )}

      {/* Overlay — only bottom fade when video is loaded */}
      {loaded && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.55) 100%)',
            zIndex: 8,
          }}
        />
      )}

      {/* Top — label + stars */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-20">
        <span
          className="text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md"
          style={{
            background: `${accent}22`,
            border: `1px solid ${accent}40`,
            color: loaded ? '#fff' : accent,
          }}
        >
          {label}
        </span>
        <div className="flex items-center gap-0.5">
          {[...Array(stars)].map((_, i) => (
            <RiStarFill key={i} className="w-3 h-3 text-yellow-400 drop-shadow-sm" />
          ))}
        </div>
      </div>

      {/* Center play button */}
      <AnimatePresence>
        {(!playing || !isActive) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 hover:scale-110"
              style={loaded
                ? { background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }
                : { background: `${accent}18`, border: `1px solid ${accent}30` }
              }
            >
              <RiPlayCircleLine
                className="w-7 h-7"
                style={{ color: loaded ? '#fff' : accent }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom controls — active only */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-0 left-0 right-0 p-3 z-20 pointer-events-auto"
          >
            {/* Progress bar */}
            <div
              className="w-full h-1 rounded-full mb-3 cursor-pointer hover:h-1.5 transition-all"
              style={{ background: 'rgba(255,255,255,0.25)' }}
              onClick={scrub}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%`, background: accent }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors hover:bg-opacity-30"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                {playing
                  ? <RiPauseLine className="w-4 h-4" />
                  : <RiPlayCircleLine className="w-4 h-4" />
                }
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors hover:bg-opacity-30"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  {muted
                    ? <RiVolumeMuteLine className="w-4 h-4" />
                    : <RiVolumeUpLine className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={openFullscreen}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors hover:bg-opacity-30"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <RiFullscreenLine className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function VideoReviews() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section
      id="videoreviews"
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ background: 'var(--light)' }}
    >
      {/* Subtle top/bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #E2D9F3, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #E2D9F3, transparent)' }} />

      {/* Soft purple blob bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{ background: 'rgba(124,58,237,0.04)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="section-tag">Client Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight mb-2"
            style={{ color: 'var(--text)' }}
          >
            Don't take our word for it —{' '}
            <span className="text-gradient">hear it from them</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm font-body"
            style={{ color: 'var(--text-muted)' }}
          >
            Real clients. Real results. Unscripted.
          </motion.p>
        </div>

        {/* 3 portrait cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl mx-auto">
          {VIDEOS.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={activeId === video.id}
              onClick={() => setActiveId(activeId === video.id ? null : video.id)}
            />
          ))}
        </div>

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs font-body mt-6"
          style={{ color: 'var(--light-dim)' }}
        >
          Tap a video to play
        </motion.p>
      </div>
    </section>
  );
}