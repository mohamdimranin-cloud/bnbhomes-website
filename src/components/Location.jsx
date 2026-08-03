import { useResponsive } from '../hooks/useResponsive'

const nearby = [
  'Technopark Phase III',
  'UST Global',
  'Kazhakootam Junction',
  'NH Bypass',
  'Medical College',
]

export default function Location() {
  const { isMobile } = useResponsive()

  return (
    <section id="location" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 40 : 64,
            alignItems: 'start',
          }}
        >
          {/* Left: Info */}
          <div>
            <span className="section-tag">Find Us</span>
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
              Right in the<br /><span className="gradient-text">Heart of the City</span>
            </h2>
            <p style={{ color: '#7ba3b8', lineHeight: 1.7, margin: '20px 0 32px', wordBreak: 'break-word' }}>
              Strategically located at Kazhakootam — Trivandrum's fastest growing tech and
              residential hub. Minutes from IT parks, hospitals, and the city center.
            </p>

            {/* Address Card */}
            <div
              className="animate-card"
              style={{
                background: '#0f1e2d',
                border: '1px solid rgba(17,104,133,0.25)',
                borderRadius: 16,
                padding: 24,
                marginBottom: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minWidth: 0,
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem', color: '#7ba3b8' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>📍</span>
                <span style={{ wordBreak: 'break-word' }}>518/4, Phoenix Lane, Thirupathapuram Jn,<br />Kazhakootam, Trivandrum, Kerala</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem', color: '#7ba3b8' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>📱</span>
                <span style={{ wordBreak: 'break-word' }}>
                  <a href="tel:7540000750" style={{ color: '#1a8fb5' }}>7540000750</a>
                  &nbsp;|&nbsp;
                  <a href="tel:04713567506" style={{ color: '#1a8fb5' }}>0471 3567506</a>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem', color: '#7ba3b8' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>✉️</span>
                <a href="mailto:bnbhomestvm@gmail.com" style={{ color: '#1a8fb5', wordBreak: 'break-all' }}>
                  bnbhomestvm@gmail.com
                </a>
              </div>
            </div>

            {/* Nearby */}
            <div>
              <h5
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#7ba3b8',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                Nearby
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {nearby.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      padding: '5px 14px',
                      background: 'rgba(17,104,133,0.15)',
                      border: '1px solid rgba(17,104,133,0.25)',
                      borderRadius: 100,
                      color: '#7ba3b8',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map — stacks below on mobile */}
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8!2d76.8730!3d8.5674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCozNCcwMi4yIk4gNzLCsDUyJzIyLjgiRQ!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height={isMobile ? 280 : 400}
              style={{
                border: 0,
                borderRadius: 16,
                boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
                outline: '1px solid rgba(17,104,133,0.25)',
                display: 'block',
                maxWidth: '100%',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BnB Homes Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
