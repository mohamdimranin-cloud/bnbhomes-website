import { useState, useEffect } from 'react'
import { useResponsive } from '../hooks/useResponsive'

const contactMethods = [
  { icon: '📱', label: 'Call / WhatsApp', value: '7540000750', href: 'tel:7540000750' },
  { icon: '☎️', label: 'Landline', value: '0471 3567506', href: 'tel:04713567506' },
  { icon: '✉️', label: 'Email', value: 'bnbhomestvm@gmail.com', href: 'mailto:bnbhomestvm@gmail.com' },
]

/** Generate a unique booking reference: BNB-YYYYMMDD-XXXX */
function generateBookingId() {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BNB-${date}-${rand}`
}

const STEPS = ['Your Details', 'Stay Dates', 'Confirm']

export default function Contact() {
  const { isMobile } = useResponsive()
  const today = new Date().toISOString().split('T')[0]
  const [step, setStep] = useState(0)
  const [bookingId] = useState(generateBookingId)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    checkin: '', checkout: '', guests: 1,
  })

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  useEffect(() => {
    if (form.checkin && form.checkout && form.checkout <= form.checkin) {
      const d = new Date(form.checkin)
      d.setDate(d.getDate() + 1)
      set('checkout', d.toISOString().slice(0, 10))
    }
  }, [form.checkin])

  const nights = form.checkin && form.checkout
    ? Math.max(0, Math.round((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 0

  const handleSubmit = async () => {
    const { name, phone, email, checkin, checkout, guests } = form

    setSubmitted(true) // Show thank you immediately

    // Save to Neon DB via the Render API
    try {
      const res = await fetch('https://bnbhomes-api.onrender.com/public/advanceBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          guestName: name,
          guestMobile: phone,
          guestWhatsapp: phone,
          guestEmail: email || null,
          guestType: 'Direct',
          corporateName: null,
          checkInDate: checkin,
          checkOutDate: checkout,
          numberOfNights: nights,
          roomType: '',
          numberOfRooms: 1,
          ratePerRoom: 0,
          totalAmount: 0,
          discountAmt: 0,
          finalAmount: 0,
          advanceAmount: 0,
          paidVia: 'Website',
          paidReference: null,
          balanceAmount: 0,
          remarks: `Guests: ${guests} | Website booking`,
          bookingRef: bookingId,
          previousRef: null,
        }),
      })
    } catch (_) {
      // Silent fail — booking ID is already shown to user
    }
  }

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.phone.trim()
    if (step === 1) return form.checkin && form.checkout && nights > 0
    return true
  }

  const inputStyle = {
    padding: '13px 16px',
    background: 'rgba(8,14,20,0.6)',
    border: '1px solid rgba(17,104,133,0.3)',
    borderRadius: 12,
    color: '#e8f4f8',
    fontSize: '0.95rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.2s',
    width: '100%',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: '#7ba3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8,
  }
  const focus = e => { e.target.style.borderColor = '#00e5ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,229,255,0.1)' }
  const blur  = e => { e.target.style.borderColor = 'rgba(17,104,133,0.3)'; e.target.style.boxShadow = 'none' }

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#0d1821' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 40 : 64,
          alignItems: 'start',
        }}>

          {/* ── LEFT: contact info ── */}
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
              Fill the advance booking form and we'll confirm your room via WhatsApp within minutes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {contactMethods.map(m => (
                <a key={m.label} href={m.href} className="animate-card" style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 20px', background: '#0f1e2d',
                  border: '1px solid rgba(17,104,133,0.25)', borderRadius: 12,
                  transition: 'all 0.3s', textDecoration: 'none',
                  minWidth: 0, overflow: 'hidden',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a8fb5'; e.currentTarget.style.transform = 'translateX(6px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(17,104,133,0.25)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{m.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.83rem', color: '#ffffff', fontWeight: 600 }}>{m.label}</strong>
                    <span style={{ fontSize: '0.9rem', color: '#1a8fb5', wordBreak: 'break-all' }}>{m.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: booking card ── */}
          {!submitted ? (
            <div style={{
              background: 'linear-gradient(145deg, #0f1e2d, #0a1520)',
              border: '1px solid rgba(17,104,133,0.35)',
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(17,104,133,0.1)',
              minWidth: 0,
            }}>

              {/* Card header */}
              <div style={{
                background: 'linear-gradient(135deg, #116885, #0c4d62)',
                padding: isMobile ? '20px 20px' : '24px 32px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 10, right: 20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,229,255,0.08)', pointerEvents: 'none' }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  position: 'relative',
                  flexWrap: 'wrap',
                  gap: 12,
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>
                      Advance Booking
                    </div>
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                      Reserve Your Room
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4, letterSpacing: '1px' }}>BOOKING ID</div>
                    <div style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '0.85rem', fontWeight: 700, color: '#00e5ff',
                      background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.3)',
                      padding: '4px 10px', borderRadius: 8, letterSpacing: '1px',
                    }}>
                      {bookingId}
                    </div>
                  </div>
                </div>

                {/* Step progress bar */}
                <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
                  {STEPS.map((s, i) => (
                    <div key={s} style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        height: 3, borderRadius: 2,
                        background: i <= step ? '#00e5ff' : 'rgba(255,255,255,0.2)',
                        transition: 'background 0.4s',
                      }} />
                      <div style={{ fontSize: '0.65rem', color: i <= step ? '#00e5ff' : 'rgba(255,255,255,0.4)', marginTop: 5, textAlign: 'center', letterSpacing: '0.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: isMobile ? 20 : 32 }}>

                {/* STEP 0 — Your Details */}
                {step === 0 && (
                  <div>
                    <div style={{ marginBottom: 18 }}>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" placeholder="Your full name" required
                        value={form.name} onChange={e => set('name', e.target.value)}
                        style={inputStyle} onFocus={focus} onBlur={blur} />
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: 14, marginBottom: 18,
                    }}>
                      <div>
                        <label style={labelStyle}>Phone *</label>
                        <input type="tel" placeholder="Mobile number" required
                          value={form.phone} onChange={e => set('phone', e.target.value)}
                          style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" placeholder="your@email.com"
                          value={form.email} onChange={e => set('email', e.target.value)}
                          style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1 — Stay Dates */}
                {step === 1 && (
                  <div>
                    {/* Date inputs: 2 cols desktop, 1 col ≤480px */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: 14, marginBottom: 18,
                    }}>
                      <div>
                        <label style={labelStyle}>Check-in *</label>
                        <input type="date" required min={today}
                          value={form.checkin} onChange={e => set('checkin', e.target.value)}
                          style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label style={labelStyle}>Check-out *</label>
                        <input type="date" required min={form.checkin || today}
                          value={form.checkout} onChange={e => set('checkout', e.target.value)}
                          style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>

                    {/* Nights badge */}
                    {nights > 0 && (
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        padding: '12px 20px', borderRadius: 12, marginBottom: 18,
                        background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
                      }}>
                        <span style={{ fontSize: '1.3rem' }}>🌙</span>
                        <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#00e5ff' }}>
                          {nights}
                        </span>
                        <span style={{ color: '#7ba3b8', fontSize: '0.9rem' }}>
                          {nights === 1 ? 'Night' : 'Nights'}
                        </span>
                      </div>
                    )}

                    {/* Guests counter — fits on all screens */}
                    <div>
                      <label style={labelStyle}>Number of Guests *</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button type="button"
                          onClick={() => set('guests', Math.max(1, form.guests - 1))}
                          style={{
                            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                            background: 'rgba(17,104,133,0.2)', border: '1px solid rgba(17,104,133,0.35)',
                            color: '#e8f4f8', fontSize: '1.4rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.15)'; e.currentTarget.style.borderColor = '#00e5ff' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17,104,133,0.2)'; e.currentTarget.style.borderColor = 'rgba(17,104,133,0.35)' }}
                        >
                          −
                        </button>
                        <div style={{
                          flex: 1, textAlign: 'center', padding: '13px 8px',
                          background: 'rgba(8,14,20,0.6)', border: '1px solid rgba(17,104,133,0.3)',
                          borderRadius: 12, fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '1.1rem', fontWeight: 700, color: '#ffffff',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {form.guests} {form.guests === 1 ? 'Guest' : 'Guests'}
                        </div>
                        <button type="button"
                          onClick={() => set('guests', Math.min(20, form.guests + 1))}
                          style={{
                            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                            background: 'rgba(17,104,133,0.2)', border: '1px solid rgba(17,104,133,0.35)',
                            color: '#e8f4f8', fontSize: '1.4rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.15)'; e.currentTarget.style.borderColor = '#00e5ff' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17,104,133,0.2)'; e.currentTarget.style.borderColor = 'rgba(17,104,133,0.35)' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Confirm summary */}
                {step === 2 && (
                  <div>
                    <div style={{
                      background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)',
                      borderRadius: 14, padding: isMobile ? 14 : 20, marginBottom: 20,
                      overflow: 'hidden',
                    }}>
                      <div style={{ fontSize: '0.7rem', color: '#00e5ff', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>
                        Booking Summary
                      </div>
                      {[
                        ['🔖 Booking ID', bookingId],
                        ['👤 Name', form.name],
                        ['📱 Phone', form.phone],
                        form.email ? ['✉️ Email', form.email] : null,
                        ['📅 Check-in', form.checkin],
                        ['📅 Check-out', form.checkout],
                        ['🌙 Nights', `${nights} night${nights !== 1 ? 's' : ''}`],
                        ['👥 Guests', `${form.guests} guest${form.guests !== 1 ? 's' : ''}`],
                      ].filter(Boolean).map(([label, value]) => (
                        <div key={label} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '9px 0',
                          borderBottom: '1px solid rgba(17,104,133,0.15)',
                          gap: 12,
                          minWidth: 0,
                        }}>
                          <span style={{
                            fontSize: '0.82rem', color: '#7ba3b8',
                            flexShrink: 0, whiteSpace: 'nowrap',
                          }}>{label}</span>
                          <span style={{
                            fontSize: '0.88rem', fontWeight: 600,
                            fontFamily: label.includes('ID') ? '"Space Grotesk", sans-serif' : 'inherit',
                            color: label.includes('ID') ? '#00e5ff' : '#ffffff',
                            textAlign: 'right',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                          }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#7ba3b8', textAlign: 'center', lineHeight: 1.6 }}>
                      By confirming, you'll be redirected to WhatsApp to send this booking request to our team.
                    </p>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(s => s - 1)}
                      className="btn-ghost"
                      style={{
                        flex: '0 0 auto', width: 100,
                        justifyContent: 'center', padding: '13px 12px',
                        borderRadius: 12, whiteSpace: 'nowrap', fontSize: '0.9rem',
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button"
                      onClick={() => { if (canNext()) setStep(s => s + 1) }}
                      className="btn-primary"
                      style={{
                        flex: 1, justifyContent: 'center', padding: '13px 12px', border: 'none',
                        opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed',
                        borderRadius: 12, whiteSpace: 'nowrap', fontSize: '0.9rem',
                      }}
                    >
                      Next →
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit}
                      className="btn-primary"
                      style={{
                        flex: 1, justifyContent: 'center',
                        padding: '13px 8px', border: 'none',
                        borderRadius: 12, whiteSpace: 'nowrap',
                        fontSize: '0.95rem',
                        minWidth: 0,
                      }}
                    >
                      ✓ Confirm Booking
                    </button>
                  )}
                </div>

              </div>
            </div>
          ) : (
            /* ── Thank You card ── */
            <div style={{
              background: 'linear-gradient(145deg, #0f1e2d, #0a1520)',
              border: '1px solid rgba(0,229,255,0.3)',
              borderRadius: 24, padding: isMobile ? 28 : 48, textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(0,229,255,0.1)',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>🙏</div>
              <h3 style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: 12,
              }}>
                Thank You!
              </h3>
              <p style={{ color: '#7ba3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 24 }}>
                Your booking has been received.<br />
                Our team will contact you shortly to confirm availability.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.9rem', fontWeight: 700,
                color: '#00e5ff', background: 'rgba(0,229,255,0.08)',
                border: '1px solid rgba(0,229,255,0.25)',
                padding: '10px 20px', borderRadius: 10, marginBottom: 28,
              }}>
                <span>📋</span>
                <span>{bookingId}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7ba3b8', marginBottom: 28 }}>
                Save your Booking ID for reference
              </p>
              <button onClick={() => { setSubmitted(false); setStep(0) }}
                className="btn-ghost" style={{ justifyContent: 'center', borderRadius: 12 }}>
                Make Another Booking
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
