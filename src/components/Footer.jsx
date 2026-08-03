import { useResponsive } from '../hooks/useResponsive'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const roomLinks = [
  'Studio King',
  'Studio Large',
  'Studio Twin',
  'Suite Room',
  'Family Room',
  'VIP Room',
]

const quickLinks = [
  { label: 'Amenities', id: 'amenities' },
  { label: 'Location', id: 'location' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const { isMobile, isTablet } = useResponsive()

  const gridCols = isMobile
    ? '1fr'
    : isTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(4, 1fr)'

  const linkStyle = {
    fontSize: '0.875rem',
    color: '#7ba3b8',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'Inter, sans-serif',
    padding: 0,
    textAlign: 'left',
    wordBreak: 'break-word',
  }

  return (
    <footer style={{ background: '#0d1821', borderTop: '1px solid rgba(17,104,133,0.25)', padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridCols,
            gap: isMobile ? 32 : 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                marginBottom: 16,
              }}
            >
              <img src="/logo.png" alt="BnB Homes" style={{ height: 36, width: 'auto' }} />
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#ffffff' }}>
                BnB <span style={{ color: '#00e5ff' }}>Homes</span>
              </span>
            </a>
            <p style={{ color: '#7ba3b8', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 24px' }}>
              Premium stays in the heart of Trivandrum. Modern comfort, warm hospitality.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { icon: '📱', href: 'tel:7540000750', label: 'Call' },
                { icon: '💬', href: 'https://wa.me/917540000750', label: 'WhatsApp', external: true },
                { icon: '✉️', href: 'mailto:bnbhomestvm@gmail.com', label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noreferrer' : undefined}
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0f1e2d',
                    border: '1px solid rgba(17,104,133,0.25)',
                    borderRadius: '50%',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1a8fb5'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Rooms
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {roomLinks.map((room) => (
                <li key={room}>
                  <button
                    onClick={() => scrollTo('rooms')}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                    onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                  >
                    {room}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Quick Links
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                    onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://web.bnbhomes.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...linkStyle, display: 'inline-block' }}
                  onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                  onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                >
                  Staff Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Contact
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '518/4, Phoenix Lane',
                'Kazhakootam, Trivandrum',
              ].map((line) => (
                <li key={line} style={{ fontSize: '0.875rem', color: '#7ba3b8' }}>{line}</li>
              ))}
              <li>
                <a
                  href="tel:7540000750"
                  style={{ ...linkStyle, display: 'inline-block' }}
                  onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                  onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                >
                  7540000750
                </a>
              </li>
              <li>
                <a
                  href="tel:04713567506"
                  style={{ ...linkStyle, display: 'inline-block' }}
                  onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                  onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                >
                  0471 3567506
                </a>
              </li>
              <li>
                <a
                  href="mailto:bnbhomestvm@gmail.com"
                  style={{ ...linkStyle, display: 'inline-block', wordBreak: 'break-all' }}
                  onMouseEnter={(e) => (e.target.style.color = '#1a8fb5')}
                  onMouseLeave={(e) => (e.target.style.color = '#7ba3b8')}
                >
                  bnbhomestvm@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — flex on desktop, stacked on mobile */}
        <div
          style={{
            paddingTop: 32,
            borderTop: '1px solid rgba(17,104,133,0.25)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'center',
            gap: 8,
            fontSize: '0.8rem',
            color: '#7ba3b8',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <p style={{ margin: 0 }}>© 2026 BnB Homes. All rights reserved.</p>
          <p style={{ margin: 0 }}>Designed with ❤️ in Trivandrum</p>
        </div>
      </div>
    </footer>
  )
}
