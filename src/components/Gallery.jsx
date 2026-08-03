import Slider from './Slider'

// Unique room images — duplicates removed
const allImages = [
  '/images/room-1.webp',
  '/images/room-2.webp',
  '/images/room-3.webp',
  '/images/room-4.webp',
  '/images/room-5.webp',
  '/images/room-6.webp',
  '/images/room-7.webp',
  '/images/room-8.webp',
  '/images/room-9.webp',
  '/images/room-10.webp',
  '/images/room-12.webp',
  '/images/room-14.webp',
  '/images/room-16.webp',
  '/images/room-18.webp',
  '/images/room-19.webp',
  '/images/room-20.webp',
  '/images/room-21.webp',
  '/images/room-22.webp',
  '/images/room-23.webp',
  '/images/room-24.webp',
  '/images/room-25.webp',
  '/images/room-26.webp',
  '/images/room-27.webp',
  '/images/room-29.webp',
  '/images/room-30.webp',
  '/images/room-31.webp',
]

export default function Gallery() {
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

        {/* Slider — all 31 images */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(17,104,133,0.3)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 40px rgba(17,104,133,0.15)',
        }}>
          <Slider
            images={allImages}
            autoPlay={3500}
            height={480}
            showDots={true}
            showArrows={true}
            objectFit="cover"
          />
        </div>

      </div>
    </section>
  )
}
