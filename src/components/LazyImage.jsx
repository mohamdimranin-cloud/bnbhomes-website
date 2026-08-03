import { useState } from 'react'

/**
 * LazyImage — shows a shimmer skeleton until image loads.
 * Uses native loading="lazy" + onLoad callback.
 */
export default function LazyImage({ src, alt, style = {}, imgStyle = {}, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#162535', ...style }}>
      {/* Shimmer skeleton */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #162535 25%, #1e3148 50%, #162535 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
        }} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        onLoad={() => setLoaded(true)}
        style={{
          display: 'block',
          transition: 'opacity 0.4s ease',
          opacity: loaded ? 1 : 0,
          ...imgStyle,
        }}
      />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}
