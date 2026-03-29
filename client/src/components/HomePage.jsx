import React, { useEffect, useRef, useState } from 'react'

const gradients = {
    red: "linear-gradient(to bottom, #d1d5db, #111827)",
    blue: "linear-gradient(to bottom, #93c5fd, #2563eb)",
    green: "linear-gradient(to bottom, #6ee7b7, #059669)",
    orange: "linear-gradient(to bottom, #fda4af, #e11d48)",
}

const podGradients = {
    red: "linear-gradient(135deg, #d1d5db22, #11182744)",
    blue: "linear-gradient(135deg, #93c5fd22, #2563eb44)",
    green: "linear-gradient(135deg, #6ee7b722, #05966944)",
    orange: "linear-gradient(135deg, #fda4af22, #e11d4844)",
}

const hexColors = {
    red: "#d1d5db",
    blue: "#93c5fd",
    green: "#6ee7b7",
    orange: "#fda4af",
}

const rankConfig = [
    { ring: '#FFD700', glow: 'rgba(255,215,0,0.35)', label: '1st', crown: true, size: 96 },
    { ring: '#C0C0C0', glow: 'rgba(192,192,192,0.25)', label: '2nd', crown: false, size: 80 },
    { ring: '#CD7F32', glow: 'rgba(205,127,50,0.25)', label: '3rd', crown: false, size: 80 },
]

export default function HomePage({ players, matchHistory = [] }) {
    const [visible, setVisible] = useState(false)
    const cardRefs = useRef([])

    // Compute totals from matchHistory
    const totals = {}
    players.forEach(p => { totals[p.player] = 0 })
    matchHistory.forEach(m => m.players?.forEach(mp => {
        totals[mp.player] = (totals[mp.player] || 0) + parseFloat(mp.points || 0)
    }))

    // Compute wins
    const wins = {}
    players.forEach(p => { wins[p.player] = 0 })
    matchHistory.forEach(m => {
        const top = [...(m.players || [])].sort((a, b) => parseFloat(b.points) - parseFloat(a.points))[0]
        if (top) wins[top.player] = (wins[top.player] || 0) + 1
    })

    // Sort players by points descending
    const sorted = [...players]
        .map(p => ({ ...p, total: totals[p.player] || 0, hex: hexColors[p.color] }))
        .sort((a, b) => b.total - a.total)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 80)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className="bg-gradient-to-br from-red-50 to-white"
            style={{
                minHeight: '100vh',
                fontFamily: "'DM Sans', sans-serif",
                color: '#000',
            }}
        >
            <div style={{ maxWidth: 480, margin: '0 auto', padding: '36px 18px 60px' }}>

                {/* ── Header ── */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 36,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(-10px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                >
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 6 }}>
                            Season 2026
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, lineHeight: 1, letterSpacing: 1 }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #000 20%, rgba(73,73,73,0.5))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Home Premier
                            </span>
                            <br />
                            <span style={{ color: '#ef4444' }}>League</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 6 }}>
                            Meet the stars of the season
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(0,0,0,0.06)',
                        border: '0.5px solid rgba(0,0,0,0.07)',
                        borderRadius: 20,
                        padding: '6px 14px',
                        fontSize: 11,
                        color: 'rgba(0,0,0,0.35)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                    }}>
                        {matchHistory.length} Matches
                    </div>
                </div>

                {/* ── Section label ── */}
                <div style={{
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.3)',
                    fontWeight: 600,
                    marginBottom: 16,
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.2s',
                }}>
                    Rankings
                </div>

                {/* ── Player Cards ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {sorted.map((p, i) => {
                        const rank = rankConfig[i]
                        const isTop3 = i < 3

                        return (
                            <div
                                key={p.player}
                                ref={el => cardRefs.current[i] = el}
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: isTop3 ? podGradients[p.color] : 'rgba(243,244,246,0.8)',
                                    border: isTop3
                                        ? `1px solid ${p.hex}44`
                                        : '0.5px solid rgba(0,0,0,0.07)',
                                    borderRadius: 20,
                                    padding: '14px 16px',
                                    overflow: 'hidden',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'none' : 'translateY(16px)',
                                    transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
                                    boxShadow: isTop3 ? `0 4px 24px ${rank?.glow || 'rgba(0,0,0,0.08)'}` : '0 1px 4px rgba(0,0,0,0.05)',
                                }}
                            >
                                {/* Subtle bg glow strip */}
                                <div style={{
                                    position: 'absolute', top: 0, right: 0, bottom: 0, width: '35%',
                                    background: gradients[p.color], opacity: 0.06,
                                    borderRadius: '0 20px 20px 0', pointerEvents: 'none',
                                }} />

                                {/* Top row: rank + avatar + name/wins + points */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    {/* Rank number */}
                                    <div style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: isTop3 ? 26 : 20,
                                        color: rank ? rank.ring : 'rgba(0,0,0,0.18)',
                                        minWidth: 28,
                                        textAlign: 'center',
                                        lineHeight: 1,
                                        flexShrink: 0,
                                        position: 'relative', zIndex: 1,
                                    }}>
                                        {i + 1}
                                    </div>

                                    {/* Avatar */}
                                    <div style={{ position: 'relative', flexShrink: 0 }}>
                                        {isTop3 && i === 0 && (
                                            <span style={{
                                                position: 'absolute', top: -14, left: '50%',
                                                transform: 'translateX(-50%)', fontSize: 14, zIndex: 2,
                                            }}>👑</span>
                                        )}
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            style={{
                                                width: rank ? rank.size : 56,
                                                height: rank ? rank.size : 56,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                        {isTop3 && (
                                            <div style={{
                                                position: 'absolute', inset: -3, borderRadius: '50%',
                                                border: `2px solid ${rank.ring}`,
                                                boxShadow: `0 0 12px ${rank.glow}`,
                                                pointerEvents: 'none',
                                            }} />
                                        )}
                                    </div>

                                    {/* Name + wins */}
                                    <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                                        <div style={{
                                            fontSize: isTop3 ? 15 : 13,
                                            fontWeight: 700,
                                            color: '#000',
                                            marginBottom: 2,
                                            letterSpacing: isTop3 ? 0.3 : 0,
                                        }}>
                                            {p.name}
                                        </div>
                                        {matchHistory.length > 0 && (
                                            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)' }}>
                                                {wins[p.player] || 0} match win{wins[p.player] !== 1 ? 's' : ''}
                                            </div>
                                        )}
                                    </div>

                                    {/* Points */}
                                    {matchHistory.length > 0 && (
                                        <div style={{
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: isTop3 ? 26 : 20,
                                            letterSpacing: 0.5,
                                            color: isTop3 ? rank.ring : p.hex,
                                            flexShrink: 0,
                                            position: 'relative', zIndex: 1,
                                            textShadow: isTop3 ? `0 0 12px ${rank.glow}` : 'none',
                                            textAlign: 'right',
                                        }}>
                                            {Math.round(p.total).toLocaleString()}
                                            <span style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: 'rgba(0,0,0,0.3)', display: 'block', marginTop: -2, textShadow: 'none' }}>
                                                pts
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* About — full width at bottom */}
                                {p.about && (
                                    <div style={{
                                        marginTop: 12,
                                        paddingTop: 10,
                                        borderTop: '0.5px solid rgba(0,0,0,0.07)',
                                        fontSize: 12,
                                        color: 'rgba(0,0,0,0.5)',
                                        lineHeight: 1.55,
                                        position: 'relative', zIndex: 1,
                                    }}>
                                        {p.about}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* ── Footer tag ── */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 40,
                    fontSize: 11,
                    color: 'rgba(0,0,0,0.2)',
                    letterSpacing: 1,
                    fontWeight: 500,
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.7s',
                }}>
                    HPL · 2026
                </div>

            </div>
        </div>
    )
}