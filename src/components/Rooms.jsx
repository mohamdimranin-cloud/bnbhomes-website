import { useRef, useEffect, useState } from 'react'
import LazyImage from './LazyImage'
import { useResponsive } from '../hooks/useResponsive'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const rooms = [
  {
    icon: '🏠',
    name: 'Studio King',
    desc: 'Elegant king-bed studio with modern furnishings, private bathroom, and city views. Perfect for solo travelers and couples.',
    features: ['King-size bed', 'Private bathroom', 'High-speed Wi-Fi', 'Smart TV'],
    featured: true,
    images: ['/images/room-2.webp', '/images/room-4.webp', '/images/room-6.webp'],
  },
  {
    icon: '🛏️',
    name: 'Studio Large',
    desc: 'Spacious large studio with extra floor space — ideal for extended stays and business travelers.',
    features: ['Large double bed', 'Work desk', 'Mini kitchen', 'Air conditioning'],
    featured: false,
    images: ['/images/room-7.webp', '/images/room-8.webp', '/images/room-9.webp'],
  },
  {
    icon: '👥',
    name: 'Studio Twin',
    desc: 'Two comfortable single beds in a well-designed layout — great for friends or colleagues traveling together.',
    features: ['Two single beds', 'Shared vanity', 'Wardrobe storage', 'Blackout curtains'],
    featured: false,
    images: ['/images/room-10.webp', '/images/room-11.webp', '/images/room-12.webp'],
  },
  {
    icon: '✨',
    name: 'Suite Room',
    desc: 'Premium suite experience with a separate living area, luxury bath, and panoramic views of Trivandrum.',
    features: ['Separate living area', 'Premium bath', 'City view', 'Premium amenities'],
    featured: false,
    images: ['/images/room-16.webp', '/images/room-17.webp', '/images/room-18.webp'],
  },
  {
    icon: '🏡',
    name: 'Family Room',
    desc: 'Generous family room with multiple beds and ample space for families to relax and unwind comfortably.',
    features: ['Multiple beds', 'Extra space', 'Family amenities', 'Child-friendly'],
    featured: false,
    images: ['/images/room-22.webp', '/images/room-23.webp', '/images/room-24.webp'],
  },
  {
    icon: '👑',
    name: 'VIP Room',
    desc: 'Our finest offering — the VIP room on the top floor with exclusive access, premium décor, and concierge service.',
    features: ['Top floor location', 'Exclusive access', 'Concierge service', 'Premium décor'],
    featured: true,
    images: ['/images/room-27.webp', '/images/room-28.webp', '/images/room-29.webp'],
  },
]

function RoomCard({ room, index }) {
  const ref = useRef(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    el.style.transitionDelay = `${index * 0.08}s`
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="animate-card"
      style={{
        background: room.featured
          ? 'linear-gradient(135deg, #0f1e2d, rgba(17,104,133,0.15))'
          : '#0f1e2d',
        border: `1px solid ${room.featured ? '#116885' : 'rgba(17,104,133,0.25)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
        cursor: 'default',
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#116885'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4), 0 0 30px rgba(17,104,133,0.2)'
      }}
      onMouseLeave={(e) => {
        if (!room.featured) e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Room image — slider container: overflow hidden to prevent bleed */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <LazyImage
          src={room.images[0]}
          alt={room.name}
          style={{ height: 200 }}
          imgStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '3px 10px',
          fontSize: '0.7rem', color: '#fff',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          📷 {room.images.length} photos
        </div>
        {room.featured && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            fontSize: '0.7rem', fontWeight: 600,
            padding: '4px 12px',
            background: 'linear-gradient(135deg, #116885, #1a8fb5)',
            borderRadius: 100, color: 'white',
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {room.name === 'Studio King' ? 'Most Popular' : 'Premium'}
          </div>
        )}
      </div>

      {/* Shine line */}
      <div className="room-card-shine" style={{ opacity: room.featured ? 1 : 0 }} />

      {/* Card body */}
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{room.icon}</span>
          <h3 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '1.2rem', fontWeight: 700, color: '#ffffff',
            margin: 0, minWidth: 0, overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {room.name}
          </h3>
        </div>

        <p style={{
          fontSize: '0.875rem', color: '#7ba3b8', lineHeight: 1.6,
          marginBottom: 16, wordBreak: 'break-word',
        }}>
          {room.desc}
        </p>

        <ul style={{
          listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6,
          marginBottom: 20, padding: 0,
        }}>
          {room.features.map((f) => (
            <li key={f} style={{
              fontSize: '0.72rem', padding: '3px 10px',
              background: 'rgba(17,104,133,0.15)',
              border: '1px solid rgba(17,104,133,0.25)',
              borderRadius: 100, color: '#7ba3b8',
              whiteSpace: 'nowrap',
            }}>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo('contact')}
          className={room.featured ? 'btn-primary' : 'btn-ghost'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}

export default function Rooms() {
  const { isMobile, isTablet } = useResponsive()

  const gridCols = isMobile
    ? '1fr'
    : isTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(3, 1fr)'

  return (
    <section id="rooms" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">Our Rooms</span>
          <h2
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Every Stay,<br /><span className="gradient-text">Perfectly Curated</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#7ba3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            From cozy studios to spacious family rooms — we have the right space for every guest.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridCols,
            gap: 24,
          }}
        >
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
