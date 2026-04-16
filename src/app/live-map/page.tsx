'use client';
import { useState, useEffect } from 'react';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { getCongestionColor, randomBetween } from '@/lib/utils';
import Link from 'next/link';
import { MapPin, Navigation, Layers, Eye } from 'lucide-react';

export default function LiveMapPage() {
    const [junctions, setJunctions] = useState(ONGOLE_JUNCTIONS.map(j => ({
        ...j, congestion: Math.round(randomBetween(15, 85)), vehicles: Math.round(randomBetween(50, 300)),
    })));

    useEffect(() => {
        const interval = setInterval(() => {
            setJunctions(prev => prev.map(j => ({
                ...j, congestion: Math.max(0, Math.min(100, j.congestion + Math.round(randomBetween(-5, 5)))),
                vehicles: Math.max(10, j.vehicles + Math.round(randomBetween(-15, 15))),
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Live Traffic <span className="gradient-text">Map</span></h1>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Real-time traffic visualization — Ongole City</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Traffic', 'Heatmap', 'Satellite'].map(v => (
                        <button key={v} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: v === 'Traffic' ? 'rgba(59,130,246,0.2)' : 'transparent', color: '#f1f5f9', fontSize: '0.75rem', cursor: 'pointer' }}>
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1rem', height: 'calc(100vh - 120px)' }}>
                {/* Map Area */}
                <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
                    <div style={{
                        width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    }}>
                        {/* Simulated map with junction points */}
                        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ position: 'absolute', inset: 0 }}>
                            {/* Road lines */}
                            <line x1="100" y1="300" x2="700" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="4" /> {/* NH-16 */}
                            <line x1="400" y1="50" x2="400" y2="550" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                            <line x1="200" y1="100" x2="600" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                            <line x1="600" y1="100" x2="200" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                            <text x="350" y="290" fill="#475569" fontSize="10" fontWeight="600">NH-16</text>

                            {/* Junction points */}
                            {junctions.map((j, i) => {
                                const x = 100 + ((j.lng - 80.04) / 0.03) * 600;
                                const y = 550 - ((j.lat - 15.495) / 0.02) * 500;
                                const color = getCongestionColor(j.congestion);
                                return (
                                    <g key={j.id}>
                                        <circle cx={x} cy={y} r={16} fill={color + '30'} />
                                        <circle cx={x} cy={y} r={8} fill={color} stroke="white" strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                                            <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <text x={x} y={y - 18} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">
                                            {j.name.length > 15 ? j.name.substring(0, 15) + '...' : j.name}
                                        </text>
                                        <text x={x} y={y + 24} textAnchor="middle" fill={color} fontSize="8" fontWeight="700">{j.congestion}%</text>
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Map overlay controls */}
                        <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Navigation size={16} />
                            </button>
                            <button style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Layers size={16} />
                            </button>
                        </div>

                        {/* Legend */}
                        <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.7)', padding: '8px 12px', borderRadius: 10, display: 'flex', gap: 12 }}>
                            {[['Free', '#06b6d4'], ['Low', '#10b981'], ['Moderate', '#f59e0b'], ['High', '#f97316'], ['Critical', '#ef4444']].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.625rem', color: '#94a3b8' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c as string }} />{l}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right panel: Junction list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'auto' }}>
                    <div className="glass-card" style={{ padding: '1rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} /> Active Junctions ({junctions.length})
                        </h3>
                    </div>
                    {junctions.sort((a, b) => b.congestion - a.congestion).map(j => (
                        <Link href={`/junction/${j.id}`} key={j.id} className="glass-card" style={{ padding: '0.75rem', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f1f5f9' }}>{j.name}</div>
                                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{j.road} • {j.zone}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1rem', fontWeight: 800, color: getCongestionColor(j.congestion) }}>{j.congestion}%</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>{j.vehicles} vehicles</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                <div style={{ height: '100%', width: `${j.congestion}%`, borderRadius: 2, background: getCongestionColor(j.congestion), transition: 'width 1s ease' }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
