'use client';
import { useState } from 'react';
import { randomBetween } from '@/lib/utils';
import { Route, Clock, Leaf, Zap, Navigation, MapPin } from 'lucide-react';

export default function RouteOptimizationPage() {
    const [routes, setRoutes] = useState<any[] | null>(null);

    const findRoutes = () => {
        setRoutes([
            { strategy: 'Fastest', time: Math.round(randomBetween(8, 15)), distance: Math.round(randomBetween(3, 6) * 10) / 10, co2: Math.round(randomBetween(1, 3) * 10) / 10, congestion: Math.round(randomBetween(40, 70)), color: '#3b82f6', icon: '⚡' },
            { strategy: 'Least Congested', time: Math.round(randomBetween(12, 22)), distance: Math.round(randomBetween(4, 8) * 10) / 10, co2: Math.round(randomBetween(0.8, 2.5) * 10) / 10, congestion: Math.round(randomBetween(10, 35)), color: '#10b981', icon: '🛣️' },
            { strategy: 'Emergency', time: Math.round(randomBetween(5, 10)), distance: Math.round(randomBetween(3, 5) * 10) / 10, co2: Math.round(randomBetween(1.5, 4) * 10) / 10, congestion: Math.round(randomBetween(20, 50)), color: '#ef4444', icon: '🚨' },
            { strategy: 'Least Carbon', time: Math.round(randomBetween(15, 28)), distance: Math.round(randomBetween(3, 7) * 10) / 10, co2: Math.round(randomBetween(0.3, 1.2) * 10) / 10, congestion: Math.round(randomBetween(20, 55)), color: '#8b5cf6', icon: '🌿' },
        ]);
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Route <span className="gradient-text">Optimization</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>AI-powered route suggestions — fastest, greenest, safest</p>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: 6 }}>Origin</label>
                        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MapPin size={16} color="#3b82f6" /> Bus Stand Junction, Ongole
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: 6 }}>Destination</label>
                        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MapPin size={16} color="#ef4444" /> Railway Station, Ongole
                        </div>
                    </div>
                    <button onClick={findRoutes} style={{
                        padding: '10px 28px', borderRadius: 10, border: 'none',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white',
                        fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <Navigation size={16} /> Find Routes
                    </button>
                </div>
            </div>

            {routes && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {routes.map(r => (
                        <div key={r.strategy} className="glass-card animate-slide-up" style={{ padding: '1.5rem', borderLeft: `4px solid ${r.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', color: r.color }}>{r.strategy}</div>
                                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>AI Optimized Route</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Clock size={16} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                                    <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>{r.time} min</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Travel Time</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Route size={16} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                                    <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>{r.distance} km</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Distance</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Leaf size={16} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                                    <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>{r.co2} kg</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>CO₂</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Zap size={16} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                                    <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>{r.congestion}%</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Congestion</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
