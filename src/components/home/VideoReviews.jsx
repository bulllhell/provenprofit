import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiPlayCircleLine, RiPauseLine,
  RiVolumeUpLine, RiVolumeMuteLine,
  RiFullscreenLine, RiStarFill,
  RiArrowRightLine, RiArrowLeftLine,
  RiShieldCheckLine,
} from 'react-icons/ri'

const VIDEOS = [
  {
    id: 1,
    src: '/videos/bos1.mp4',
    label: 'Store Launch',
    result: '$24K / 60 days',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.25)',
    border: 'rgba(124,58,237,0.30)',
  },
  {
    id: 2,
    src: '/videos/bos2.mp4',
    label: 'Brand Growth',
    result: '+340% Revenue',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.25)',
    border: 'rgba(249,115,22,0.30)',
  },
  {
    id: 3,
    src: '/videos/bos3.mp4',
    label: 'Paid Ads',
    result: '6.2% Conv.',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.25)',
    border: 'rgba(124,58,237,0.30)',
  },
]

function Player({ video, total, index }) {
  const videoRef                = useRef(null)
  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(true)
  const [progress, setProgress] = useState(0)
  const [loaded,   setLoaded]   = useState(false)
  const { src, label, result, color, glow } = video

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    setLoaded(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [video.id])

  useEffect(() => {
    const t = setTimeout(() => { if (!loaded) setLoaded(true) }, 3000)
    return () => clearTimeout(t)
  }, [loaded])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const openFullscreen = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen)          v.requestFullscreen()
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  const scrub = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted={muted}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedData={() => setLoaded(true)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        style={{ zIndex: 2 }}
      />

      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center"
             style={{ background: 'linear-gradient(135deg, #F1EEF9 0%, #E9E4F8 100%)', zIndex: 3 }}>
          <div className="w-8 h-8 rounded-full"
               style={{ border: '2px solid #E2D9F3', borderTopColor: color, animation: 'spin 0.8s linear infinite' }} />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
           style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 45%, rgba(0,0,0,0.70) 100%)', zIndex: 4 }} />

      {/* TOP — label + stars */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: color + '22', border: '1px solid ' + color + '50', color, backdropFilter: 'blur(8px)' }}>
          {label}
        </span>
        <div className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-xl"
             style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
          {[...Array(5)].map((_, i) => (
            <RiStarFill key={i} size={10} className="text-yellow-400" />
          ))}
        </div>
      </div>

      {/* CENTER play */}
      <AnimatePresence>
        {!playing && (
          <motion.button
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.80 }}
            transition={{ duration: 0.2 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: loaded ? 'rgba(255,255,255,0.25)' : color + '22',
                border: loaded ? '1px solid rgba(255,255,255,0.40)' : '1px solid ' + color + '40',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 40px ' + glow,
              }}
            >
              {loaded && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                     style={{ background: color }} />
              )}
              <RiPlayCircleLine size={32}
                style={{ color: loaded ? '#FFFFFF' : color }} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* BOTTOM */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10">

        {/* ── Verified + result pills — responsive ── */}
        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full"
               style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
            <RiShieldCheckLine size={10} style={{ color }} />
            <span className="font-body text-[9px] font-semibold text-white whitespace-nowrap">
              Verified
            </span>
          </div>
          <div className="px-2 py-1 rounded-full"
               style={{ background: color + '25', border: '1px solid ' + color + '50', backdropFilter: 'blur(8px)' }}>
            <span className="font-heading font-bold text-[9px] whitespace-nowrap" style={{ color }}>
              {result}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-1 rounded-full mb-3 cursor-pointer"
             style={{ background: 'rgba(255,255,255,0.25)' }}
             onClick={scrub}>
          <div className="h-full rounded-full transition-all duration-100"
               style={{ width: progress + '%', background: color }} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              {playing
                ? <RiPauseLine      size={15} className="text-white" />
                : <RiPlayCircleLine size={15} className="text-white" />}
            </button>
            <button onClick={toggleMute}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              {muted
                ? <RiVolumeMuteLine size={15} className="text-white" />
                : <RiVolumeUpLine   size={15} className="text-white" />}
            </button>
            <button onClick={openFullscreen}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <RiFullscreenLine size={15} className="text-white" />
            </button>
          </div>
          <span className="font-body text-xs font-semibold text-white opacity-50">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function VideoReviews() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir) => {
    setDirection(dir)
    setCurrent(i => (i + dir + VIDEOS.length) % VIDEOS.length)
  }

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.93 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.93 }),
  }

  return (
    <section
      id="videoreviews"
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ background: 'var(--light)' }}
    >
      {/* Top / bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(to right, transparent, #E2D9F3, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(to right, transparent, #E2D9F3, transparent)' }} />

      {/* Soft blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
             style={{ background: 'rgba(124,58,237,0.05)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="section-tag">Client Reviews</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight mb-3"
            style={{ color: 'var(--text)' }}
          >
            Don't take our word for it{' '}
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

        {/* ── DECK LAYOUT ── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT — Stacked deck */}
          <div className="relative w-full max-w-[260px] mx-auto lg:mx-0 shrink-0"
               style={{ height: '460px' }}>

            {/* Ghost cards */}
            {[2, 1].map((offset) => (
              <div key={offset} className="absolute inset-0 rounded-3xl"
                   style={{
                     background: '#F1EEF9',
                     border: '1px solid #E2D9F3',
                     boxShadow: '0 2px 12px rgba(124,58,237,0.07)',
                     transform: 'translateY(' + (offset * 10) + 'px) scale(' + (1 - offset * 0.04) + ')',
                     zIndex: 3 - offset,
                   }} />
            ))}

            {/* Active card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: 'easeOut' }}
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  zIndex: 10,
                  boxShadow: '0 8px 40px ' + VIDEOS[current].glow + ', 0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid ' + VIDEOS[current].border,
                }}
              >
                <Player
                  video={VIDEOS[current]}
                  total={VIDEOS.length}
                  index={current}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Info panel */}
          <div className="flex-1 flex flex-col gap-7 w-full">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '200+', label: 'Happy Clients' },
                { val: '4.9★', label: 'Avg Rating'    },
                { val: '100%', label: 'Real Reviews'  },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-2xl p-4 text-center"
                     style={{ background: '#F1EEF9', border: '1px solid #E2D9F3' }}>
                  <p className="font-heading font-extrabold text-xl mb-0.5"
                     style={{ color: '#7C3AED' }}>{val}</p>
                  <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Selector list */}
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-4"
                 style={{ color: 'var(--text-muted)' }}>
                Select Review
              </p>
              <div className="flex flex-col gap-2.5">
                {VIDEOS.map((v, i) => (
                  <motion.button
                    key={v.id}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300"
                    style={{
                      background: current === i ? v.color + '10' : '#F1EEF9',
                      border: '1px solid ' + (current === i ? v.color + '40' : '#E2D9F3'),
                    }}
                  >
                    <div className="w-1 h-8 rounded-full shrink-0"
                         style={{ background: current === i ? v.color : '#E2D9F3' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-sm mb-0.5"
                         style={{ color: current === i ? 'var(--text)' : 'var(--text-muted)' }}>
                        {v.label}
                      </p>
                      <p className="font-body text-xs"
                         style={{ color: current === i ? v.color : 'var(--text-muted)' }}>
                        {v.result}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <RiStarFill key={j} size={9}
                                    style={{ color: current === i ? '#FBBF24' : '#E2D9F3' }} />
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Prev / Next + dots */}
            <div className="flex items-center gap-3">
              <button onClick={() => go(-1)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-body text-sm font-semibold transition-all duration-200"
                style={{ background: '#F1EEF9', border: '1px solid #E2D9F3', color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#C4B5F4'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E2D9F3'}>
                <RiArrowLeftLine size={16} />
                Prev
              </button>
              <button onClick={() => go(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-body text-sm font-semibold transition-all duration-200"
                style={{ background: '#7C3AED', color: '#FFFFFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
                onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}>
                Next
                <RiArrowRightLine size={16} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 ml-1">
                {VIDEOS.map((v, i) => (
                  <button key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? '20px' : '7px',
                      height: '7px',
                      background: i === current ? VIDEOS[current].color : '#E2D9F3',
                    }} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Tap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs font-body mt-8"
          style={{ color: 'var(--light-dim)' }}
        >
          Tap a card to play · Use arrows to browse
        </motion.p>

      </div>
    </section>
  )
}