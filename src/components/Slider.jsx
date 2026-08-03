import { useState, useEffect, useCallback } from 'react'

/**
 * Reusable image slider with smooth CSS slide transition.
 * Props:
 *   images        — array of src strings
 *   autoPlay      — ms interval (0 = no auto, default 3500)
 *   height        — container height (default '100%')
 *   overlay       — render a dark overlay on top (for hero bg use)
 *   showDots      — show dot indicators
 *   showArrows    — show prev/next arrows
 *   objectFit     — 'cover' | 'contain' (default 'cover')
 */
export default function Slider({
  images = [],
  autoPlay = 3500,
  height = '100%',
  overlay = false,
  showDots = true,
  showArrows = true,
  objectFit = 'cover',
}) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating || idx === current) return
    setPrev(current)
    setCurrent(idx)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 600)
  }, [current, animating])

  const next = useCallback(() => goTo((current + 1) % images.length), [current, images.length, goTo])
  const back = useCallback(() => goTo((current - 1 + images.length) % images.length), [current, images.length, goTo])

  useEffect(() => {
    if (!autoPlay || images.length < 2) return
    const t = setInterval(next, autoPlay)
    return () => clearInterval(t)
  }, [autoPlay, next, images.length])

  if (!images.length) return null

  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>

      {/* Previous slide (fading out) */}
      {prev !== null && (
        <img
          src={images[prev]}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit,
            opacity: 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}

      {/* Current slide */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit,
            opacity: i === current ? 1 : 0,
            transform: i === current
              ? 'scale(1.04)'
              : 'scale(1)',
            transition: 'opacity 0.6s ease, transform 6s ease',
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      {overlay && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to right, rgba(8,14,20,0.85) 40%, rgba(8,14,20,0.3) 100%)',
        }} />
      )}

      {/* Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button onClick={back} aria-label="Previous" style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            zIndex: 3, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 32, height: 32, color: '#fff',
            cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(17,104,133,0.7)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
          >‹</button>
          <button onClick={next} aria-label="Next" style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            zIndex: 3, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 32, height: 32, color: '#fff',
            cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(17,104,133,0.7)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
          >›</button>
        </>
      )}

      {/* Dots */}
      {showDots && images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', gap: 6,
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 20 : 8, height: 8,
                borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? '#00e5ff' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
