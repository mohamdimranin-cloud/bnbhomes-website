import { useState } from 'react'
import LazyImage from './LazyImage'

// All 31 webp images — fast loading
const allImages = Array.from({ length: 31 }, (_, i) => `/images/room-${i + 1}.webp`)

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" style={{ padding: '100px 0', background: '#080e14' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Photo Gallery</span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 16,
          }}>
            See It to<br /><span className="gradient-text">Believe It</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#7ba3b8', maxWidth: 480, margin: '0 auto' }}>
            Every room photographed to show you exactly what to expect — no surprises.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {allImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelected(src)}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'zoom-in',
                border: '1px solid rgba(17,104,133,0.2)',
                transition: 'all 0.3s ease',
                aspectRatio: i % 5 === 0 ? '16/10' : '4/3',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.borderColor = '#1a8fb5'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(17,104,133,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = 'rgba(17,104,133,0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <LazyImage
                src={src}
                alt={`BnB Homes room ${i + 1}`}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: 24,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: 40, height: 40,
              color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
          <img
            src={selected}
            alt="Room preview"
            style={{
              maxWidth: '90vw', maxHeight: '85vh',
              objectFit: 'contain', borderRadius: 16,
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
