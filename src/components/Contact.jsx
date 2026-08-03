import { useState } from 'react'

const contactMethods = [
  { icon: '📱', label: 'Call / WhatsApp', value: '7540000750', href: 'tel:7540000750' },
  { icon: '☎️', label: 'Landline', value: '0471 3567506', href: 'tel:04713567506' },
  { icon: '✉️', label: 'Email', value: 'bnbhomestvm@gmail.com', href: 'mailto:bnbhomestvm@gmail.com' },
]

export default function Contact() {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: '1',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, phone, email, checkin, checkout, guests } = form
    const waText = encodeURIComponent(
      `Hi BnB Homes! I'd like to make an advance booking.\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email || 'N/A'}\n` +
      `Check-in: ${checkin}\n` +
      `Check-out: ${checkout}\n` +
      `Number of Guests: ${guests}`
    )
    setSubmitted(true)
    setTimeout(() => {
      window.open(`https://wa.me/917540000750?text=${waText}`, '_blank')
      setForm({ name: '', phone: '', email: '', checkin: '', checkout: '', guests: '1' })
      setSubmitted(false)
    }, 1200)
  }

  const inputStyle = {
    padding: '12px 16px',
    background: '#0d1821',
    border: '1px solid rgba(17,104,133,0.25)',
    borderRadius: 10,
    color: '#e8f4f8',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    WebkitAppearance: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#7ba3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 8,
  }

  const focus = (e) => (e.target.style.borderColor = '#1a8fb5')
  const blur  = (e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#0d1821' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64,
          alignItems: 'start',
        }}>

          {/* Left — contact info */}
          <div>
            <span className="section-tag">Get in Touch</span>
            <h2 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 16,
            }}>
              Ready to<br /><span className="gradient-text">Book Your Stay?</span>
            </h2>
            <p style={{ color: '#7ba3b8', lineHeight: 1.7, margin: '20px 0 32px' }}>
              Call us, WhatsApp us, or fill the advance booking form — we'll confirm within minutes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactMethods.map((m) => (
                <a key={m.label} href={m.href} className="animate-card" style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 20px', background: '#0f1e2d',
                  border: '1px solid rgba(17,104,133,0.25)', borderRadius: 10,
                  transition: 'all 0.3s', textDecoration: 'none',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1a8fb5'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>{m.label}</strong>
                    <span style={{ fontSize: '0.9rem', color: '#1a8fb5' }}>{m.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — advance booking form */}
          <div style={{
            background: '#0f1e2d',
            border: '1px solid rgba(17,104,133,0.3)',
            borderRadius: 20, padding: 36,
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #116885, #1a8fb5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
              }}>📅</div>
              <div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', margin: 0,
                }}>Advance Booking</h3>
                <p style={{ fontSize: '0.8rem', color: '#7ba3b8', margin: 0 }}>
                  Reserve your room — we'll confirm via WhatsApp
                </p>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(17,104,133,0.2)', margin: '20px 0 24px' }} />

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" name="name" placeholder="Your full name"
                  required value={form.name} onChange={set}
                  style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>

              {/* Phone + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" name="phone" placeholder="Mobile number"
                    required value={form.phone} onChange={set}
                    style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" placeholder="Email address"
                    value={form.email} onChange={set}
                    style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              {/* Check-in + Check-out */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Check-in Date *</label>
                  <input type="date" name="checkin" required min={today}
                    value={form.checkin} onChange={set}
                    style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Check-out Date *</label>
                  <input type="date" name="checkout" required
                    min={form.checkin || today}
                    value={form.checkout} onChange={set}
                    style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              {/* Number of Guests */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Number of Guests *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button type="button"
                    onClick={() => setForm(p => ({ ...p, guests: String(Math.max(1, Number(p.guests) - 1)) }))}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: 'rgba(17,104,133,0.2)', border: '1px solid rgba(17,104,133,0.3)',
                      color: '#e8f4f8', fontSize: '1.3rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(17,104,133,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(17,104,133,0.2)'}
                  >−</button>
                  <div style={{
                    flex: 1, textAlign: 'center',
                    padding: '12px 16px', background: '#0d1821',
                    border: '1px solid rgba(17,104,133,0.25)', borderRadius: 10,
                    fontSize: '1.1rem', fontWeight: 600, color: '#ffffff',
                  }}>
                    {form.guests} {Number(form.guests) === 1 ? 'Guest' : 'Guests'}
                  </div>
                  <button type="button"
                    onClick={() => setForm(p => ({ ...p, guests: String(Math.min(20, Number(p.guests) + 1)) }))}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: 'rgba(17,104,133,0.2)', border: '1px solid rgba(17,104,133,0.3)',
                      color: '#e8f4f8', fontSize: '1.3rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(17,104,133,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(17,104,133,0.2)'}
                  >+</button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px', border: 'none' }}
              >
                📅 Confirm Advance Booking
              </button>

              {submitted && (
                <p style={{ marginTop: 12, fontSize: '0.85rem', textAlign: 'center', color: '#22c55e' }}>
                  ✓ Opening WhatsApp to confirm your booking...
                </p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
