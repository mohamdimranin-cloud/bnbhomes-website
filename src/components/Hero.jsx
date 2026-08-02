import { useState, useEffect } from 'react'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const initialFloors = [
  {
    label: '5th Floor',
    dots: [false, false, false, false, false],
  },
  {
    label: '4th Floor',
    dots: [true, false, false, true, false, false],
  },
  {
    label: '3rd Floor',
    dots: [false, true, false, false, false, true],
  },
  {
    label: '2nd Floor',
    dots: [true, true, false, false, true, false],
  },
  {
    label: '1st Floor',
    dots: [false, false, true, false, false, false],
  },
]

export default function Hero() {
  const [floors, setFloors] = useState(initialFloors)

  useEffect(() => {
    const interval = setInterval(() => {
      setFloors((prev) => {
        const next = prev.map((floor) => ({ ...floor, dots: [...floor.dots] }))
        // pick a random floor and random dot to toggle
        const fi = Math.floor(Math.random() * next.length)
        const di = Math.floor(Math.random() * next[fi].dots.length)
        next[fi].dots[di] = !next[fi].dots[di]
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 60px',
      }}
    >
      {/* Grid overlay */}
      <div className="hero-grid" />
      {/* Orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* Content wrapper */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left: Text Content */}
        <div style={{ flex: 1, minWidth: 280, maxWidth: 600 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              background: 'rgba(17,104,133,0.2)',
              border: '1px solid rgba(17,104,133,0.4)',
              borderRadius: 100,
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#00e5ff',
              marginBottom: 28,
              letterSpacing: '0.5px',
            }}
          >
            <span className="badge-dot" />
            Now Available — Trivandrum
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: 24,
              letterSpacing: -1,
            }}
          >
            Stay Beyond<br />
            <span className="gradient-text">Ordinary</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.1rem',
              color: '#7ba3b8',
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            Premium studio and suite rooms in the heart of Kazhakootam.<br />
            Modern comfort, transparent pricing, and a home away from home.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Book a Room
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('rooms')}>
              Explore Rooms →
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { num: '31+', label: 'Rooms' },
              null,
              { num: '6', label: 'Floors' },
              null,
              { num: '5★', label: 'Experience' },
            ].map((item, i) =>
              item === null ? (
                <div
                  key={i}
                  style={{ width: 1, height: 40, background: 'rgba(17,104,133,0.25)' }}
                />
              ) : (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#7ba3b8',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: Building Card */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 280,
          }}
        >
          <div className="building-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {floors.map((floor) => (
                <div
                  key={floor.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#162535',
                    borderRadius: 10,
                    border: '1px solid rgba(17,104,133,0.25)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = '#116885')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)')
                  }
                >
                  <span style={{ fontSize: '0.75rem', color: '#7ba3b8', fontWeight: 500 }}>
                    {floor.label}
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {floor.dots.map((occupied, di) => (
                      <span
                        key={di}
                        className={`dot ${occupied ? 'occupied' : 'vacant'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: '1px solid rgba(17,104,133,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.8rem',
                color: '#7ba3b8',
              }}
            >
              <span className="live-dot" />
              Live Availability
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#7ba3b8',
          fontSize: '0.75rem',
          letterSpacing: 2,
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
