import { useState, useEffect } from 'react'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Rooms', id: 'rooms' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Location', id: 'location' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8,14,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(17,104,133,0.25)' : 'none',
      }}
    >
      {/* Top bar: logo + hamburger always on same row */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
        >
          <img
            src="/logo.png"
            alt="BnB Homes"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700, fontSize: '1.3rem', color: '#ffffff',
            whiteSpace: 'nowrap',
          }}>
            BnB <span style={{ color: '#00e5ff' }}>Homes</span>
          </span>
        </a>

        {/* Desktop Nav Links — hidden on mobile via CSS */}
        <ul
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7ba3b8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.2s',
                  padding: 0,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
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
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #116885, #1a8fb5)',
                color: 'white',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(17,104,133,0.5)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Staff Login
            </a>
          </li>
        </ul>

        {/* Hamburger — visible only on mobile */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          style={{
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: '#e8f4f8',
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: '#e8f4f8',
              borderRadius: 2,
              transition: 'all 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: '#e8f4f8',
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu — full width, stacked */}
      {mobileOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'rgba(8,14,20,0.98)',
            borderTop: '1px solid rgba(17,104,133,0.25)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setMobileOpen(false) }}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(17,104,133,0.15)',
                color: '#e8f4f8',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                padding: '16px 24px',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(17,104,133,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://web.bnbhomes.in"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{
              color: '#e8f4f8',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '16px 24px',
              borderBottom: '1px solid rgba(17,104,133,0.15)',
              display: 'block',
              width: '100%',
              textDecoration: 'none',
            }}
          >
            Staff Login
          </a>
        </div>
      )}
    </nav>
  )
}
