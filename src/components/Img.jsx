/**
 * Img.jsx
 * Drop-in replacement for <img> that:
 *  - Sets crossOrigin="anonymous" so Unsplash/Cloudinary CORS headers are respected
 *  - Sets referrerPolicy="no-referrer-when-downgrade" so Unsplash accepts the request
 *  - Shows a branded placeholder if the image fails to load (no broken icon)
 *
 * Usage:
 *   import Img from '../components/Img'
 *   <Img src="https://..." alt="..." style={{ width:'100%', height:300, objectFit:'cover' }} />
 */

import { useState } from 'react'

const ACCENT = '#F97316'

export default function Img({ src, alt = '', style = {}, className, ...props }) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const base = {
    display: 'block',
    ...style,
  }

  if (errored) {
    return (
      <div
        style={{
          ...base,
          background: `linear-gradient(135deg, #1c1616 0%, #2a1f1f 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          minHeight: style.height || style.minHeight || 200,
        }}
        className={className}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>
          🖼
        </div>
        <span style={{
          fontSize: 11, color: 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '0.08em',
        }}>
          {alt || 'Image'}
        </span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', ...base, overflow: style.overflow || 'hidden' }} className={className}>
      {/* Skeleton shimmer shown until loaded */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #1c1616 25%, #2a1f1f 50%, #1c1616 75%)',
          backgroundSize: '200% 100%',
          animation: 'img-shimmer 1.4s ease-in-out infinite',
        }} />
      )}
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{
          ...base,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          position: 'relative', zIndex: 1,
        }}
        {...props}
      />
      <style>{`
        @keyframes img-shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>
    </div>
  )
}