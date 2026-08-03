import { useResponsive } from '../hooks/useResponsive'

const amenities = [
  {
    icon: '⚡',
    title: 'High-Speed Wi-Fi',
    desc: 'Blazing-fast internet across all floors — work, stream, or video call without interruption.',
  },
  {
    icon: '❄️',
    title: 'Climate Control',
    desc: 'Individual AC units in every room — your comfort, your temperature, your choice.',
  },
  {
    icon: '🔒',
    title: 'Secure Access',
    desc: '24/7 security with monitored entry. Your safety is our priority at every hour.',
  },
  {
    icon: '🍳',
    title: 'Breakfast Option',
    desc: 'Start your day right with our optional breakfast package — fresh, local, and delicious.',
  },
  {
    icon: '🚗',
    title: 'Parking',
    desc: 'Dedicated parking space for vehicles. Bring your car or bike — we have room for it.',
  },
  {
    icon: '📺',
    title: 'Smart Entertainment',
    desc: 'Smart TVs with streaming-ready setup in every room for your downtime.',
  },
  {
    icon: '🧹',
    title: 'Housekeeping',
    desc: 'Regular housekeeping to keep your space spotless throughout your stay.',
  },
  {
    icon: '📞',
    title: '24/7 Support',
    desc: 'Our team is always a call away. Any hour, any issue — we are here for you.',
  },
]

function AmenityCard({ amenity, index }) {
  return (
    <div
      className="animate-card"
      style={{
        background: '#0f1e2d',
        border: '1px solid rgba(17,104,133,0.25)',
        borderRadius: 16,
        padding: '28px 24px',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        transitionDelay: `${index * 0.07}s`,
        minWidth: 0,
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#1a8fb5'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(17,104,133,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span style={{ fontSize: '2.2rem', marginBottom: 16, display: 'block' }}>
        {amenity.icon}
      </span>
      <h4 style={{
        fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: 10,
        wordBreak: 'break-word',
      }}>
        {amenity.title}
      </h4>
      <p style={{ fontSize: '0.85rem', color: '#7ba3b8', lineHeight: 1.6, wordBreak: 'break-word' }}>
        {amenity.desc}
      </p>
    </div>
  )
}

export default function Amenities() {
  const { isMobile, isTablet } = useResponsive()

  const gridCols = isMobile
    ? '1fr'
    : isTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(4, 1fr)'

  return (
    <section id="amenities" style={{ padding: '100px 0', background: '#0d1821' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">Why BnB Homes</span>
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
            Built for the<br /><span className="gradient-text">Modern Traveler</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridCols,
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {amenities.map((amenity, i) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
