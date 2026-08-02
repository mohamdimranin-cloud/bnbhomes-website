import { useState } from 'react'

const contactMethods = [
  { icon: '📱', label: 'Call / WhatsApp', value: '7540000750', href: 'tel:7540000750' },
  { icon: '☎️', label: 'Landline', value: '0471 3567506', href: 'tel:04713567506' },
  { icon: '✉️', label: 'Email', value: 'bnbhomestvm@gmail.com', href: 'mailto:bnbhomestvm@gmail.com' },
]

const roomTypes = [
  'Studio King',
  'Studio Large',
  'Studio Twin',
  'Suite Room',
  'Family Room',
  'VIP Room',
]

export default function Contact() {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkin: '',
    checkout: '',
    roomtype: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, phone, checkin, checkout, roomtype, message } = form
    const waText = encodeURIComponent(
      `Hi BnB Homes! I'd like to book a room.\n\nName: ${name}\nPhone: ${phone}\nRoom: ${roomtype || 'Any'}\nCheck-in: ${checkin}\nCheck-out: ${checkout}${message ? '\nNotes: ' + message : ''}`
    )
    setSubmitted(true)
    setTimeout(() => {
      window.open(`https://wa.me/917540000750?text=${waText}`, '_blank')
      setForm({ name: '', phone: '', email: '', checkin: '', checkout: '', roomtype: '', message: '' })
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

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#0d1821' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Left: Contact Info */}
          <div>
            <span className="section-tag">Get in Touch</span>
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
              Ready to<br /><span className="gradient-text">Book Your Stay?</span>
            </h2>
            <p style={{ color: '#7ba3b8', lineHeight: 1.7, margin: '20px 0 32px' }}>
              Call us, WhatsApp us, or fill the form — we'll confirm your room within minutes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="animate-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: '#0f1e2d',
                    border: '1px solid rgba(17,104,133,0.25)',
                    borderRadius: 10,
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1a8fb5'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                      {method.label}
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: '#1a8fb5' }}>{method.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              background: '#0f1e2d',
              border: '1px solid rgba(17,104,133,0.25)',
              borderRadius: 20,
              padding: 36,
            }}
          >
            <h3
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 28,
              }}
            >
              Send an Enquiry
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                />
              </div>

              {/* Phone + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile number"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                  />
                </div>
              </div>

              {/* Check-in + Check-out */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    required
                    min={today}
                    value={form.checkin}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkout"
                    required
                    min={today}
                    value={form.checkout}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                  />
                </div>
              </div>

              {/* Room Type */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Room Type
                </label>
                <select
                  name="roomtype"
                  value={form.roomtype}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                >
                  <option value="">Select room type</option>
                  {roomTypes.map((rt) => (
                    <option key={rt} value={rt} style={{ background: '#0d1821' }}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Any special requirements?"
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                  onFocus={(e) => (e.target.style.borderColor = '#1a8fb5')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(17,104,133,0.25)')}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: 16, border: 'none' }}
              >
                Send Enquiry
              </button>

              {submitted && (
                <p style={{ marginTop: 12, fontSize: '0.85rem', textAlign: 'center', color: '#22c55e' }}>
                  ✓ Redirecting to WhatsApp to confirm your booking...
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
