import React, { useEffect, useRef } from 'react'

const gradients = {
  red:    "linear-gradient(to bottom, #d1d5db, #111827)",   // gray-300 → gray-900
  blue:   "linear-gradient(to bottom, #93c5fd, #2563eb)",   // blue-300 → blue-600
  green:  "linear-gradient(to bottom, #6ee7b7, #059669)",   // emerald-300 → emerald-600
  orange: "linear-gradient(to bottom, #fda4af, #e11d48)",   // rose-300 → rose-600
}

const podGradients = {
  red:    "linear-gradient(to bottom, #d1d5db33, #11182766)",
  blue:   "linear-gradient(to bottom, #93c5fd33, #2563eb66)",
  green:  "linear-gradient(to bottom, #6ee7b733, #05966966)",
  orange: "linear-gradient(to bottom, #fda4af33, #e11d4866)",
}

const hexColors = {
  red: "#d1d5db",
  blue: "#93c5fd",
  green: "#6ee7b7",
  orange: "#fda4af",
}
export default function Points({ matchHistory, players }) {
  const fillRefs = useRef({})

  const totals = {}
  players.forEach(p => { totals[p.player] = 0 })
  matchHistory.forEach(m => m.players.forEach(mp => {
    totals[mp.player] = (totals[mp.player] || 0) + parseFloat(mp.points)
  }))

  const sorted = [...players]
    .map(p => ({ ...p, total: totals[p.player], hex: hexColors[p.color] }))
    .sort((a, b) => b.total - a.total)

  const maxTotal = sorted[0]?.total || 1

  const podiumOrder = [sorted[1], sorted[0], sorted[2]]
  const podClasses = ['second', 'first', 'third']

  const wins = {}
  players.forEach(p => { wins[p.player] = 0 })
  matchHistory.forEach(m => {
    const top = [...m.players].sort((a, b) => parseFloat(b.points) - parseFloat(a.points))[0]
    if (top) wins[top.player] = (wins[top.player] || 0) + 1
  })

  const best = { val: 0, name: '', match: '' }
  matchHistory.forEach(m => m.players.forEach(mp => {
    const pts = parseFloat(mp.points)
    if (pts > best.val) {
      const pl = players.find(p => p.player === mp.player)
      best.val = pts
      best.name = pl?.name.split(' ')[0] || ''
      best.match = m.match
    }
  }))
  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0)

  useEffect(() => {
    sorted.forEach((p, i) => {
      setTimeout(() => {
        const el = fillRefs.current[p.player]
        if (el) el.style.width = ((p.total / maxTotal) * 100) + '%'
      }, 300 + i * 100)
    })
  }, [])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#000' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '28px 18px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 6 }}>
              Season 2026
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 38,
              lineHeight: 1,
              letterSpacing: 1,
              background: 'linear-gradient(135deg, #000000 20%, rgba(73, 73, 73, 0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Home Premier<br />League
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.06)', border: '0.5px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: '6px 12px', fontSize: 11, color: 'rgba(0,0,0,0.35)', fontWeight: 500 }}>
            {matchHistory.length} Matches
          </div>
        </div>

        {/* Podium */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
          {podiumOrder.map((p, i) => {
            if (!p) return null
            const realRank = sorted.indexOf(p)
            const cl = podClasses[i]
            const blockH = [44, 64, 32][i]
            const avatarSize = cl === 'first' ? 68 : 52
            const ringColors = ['#C0C0C0', '#FFD700', '#CD7F32']
            const ringGlows = ['rgba(192,192,192,0.3)', 'rgba(255,215,0,0.4)', 'rgba(205,127,50,0.3)']
            return (
              <div key={p.player} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ position: 'relative', marginBottom: 8 }}>
                  {cl === 'first' && <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 16 }}>👑</span>}
                  <img src={p.image} alt={p.name} style={{ width: avatarSize, height: avatarSize, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `2px solid ${ringColors[i]}`, boxShadow: `0 0 ${cl === 'first' ? 16 : 10}px ${ringGlows[i]}` }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.8)', marginBottom: 4, textAlign: 'center' }}>
                  {p.name.split(' ')[0]}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: cl === 'first' ? 18 : 15, color: cl === 'first' ? '#FFD700' : 'rgba(0,0,0,0.5)', marginBottom: 6 }}>
                  {Math.round(p.total).toLocaleString()}
                </div>
                <div style={{ width: '100%', height: blockH, borderRadius: '10px 10px 0 0', background: podGradients[p.color], border: `0.5px solid ${p.hex}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: p.hex,textShadow: "1px 1px 2px black, -1px -1px 2px white", opacity: 0.6 }}>
                    {realRank + 1}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Section label */}
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', fontWeight: 600, marginBottom: 14 }}>
          Points breakdown
        </div>

        {/* Bar rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {sorted.map((p) => (
            <div key={p.player} style={{ background: '#f3f4f6', border: '0.5px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '12px 14px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: gradients[p.color], opacity: 0.08, borderRadius: '0 14px 14px 0', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, position: 'relative', zIndex: 1 }}>
                <img src={p.image} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>{p.name.split(' ')[0]}</div>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', marginTop: 1 }}>
                    {wins[p.player]} match win{wins[p.player] !== 1 ? 's' : ''}
                  </div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 0.5, color: p.hex }}>
                  {Math.round(p.total).toLocaleString()}
                </div>
              </div>

              <div style={{ height: 6, background: 'rgba(0,0,0,0.07)', borderRadius: 99, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                <div
                  ref={el => fillRefs.current[p.player] = el}
                  style={{
                    height: '100%',
                    borderRadius: 99,
                    width: '0%',
                    background: gradients[p.color],
                    transition: 'width 1.1s cubic-bezier(0.34,1.3,0.64,1)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}