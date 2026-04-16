'use client';
import { useState, useEffect } from 'react';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { getCongestionColor, randomBetween } from '@/lib/utils';
import Link from 'next/link';
import { Search, Filter, Grid, List } from 'lucide-react';

export default function JunctionControlPage() {
    const [search, setSearch] = useState('');
    const [junctions, setJunctions] = useState(ONGOLE_JUNCTIONS.map(j => ({
        ...j, congestion: Math.round(randomBetween(15, 85)), vehicles: Math.round(randomBetween(50, 300)),
        speed: Math.round(randomBetween(15, 55)), status: 'active' as string,
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

    const filtered = junctions.filter(j => j.name.toLowerCase().includes(search.toLowerCase()) || j.zone.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Junction <span className="gradient-text">Control</span></h1>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{junctions.length} junctions monitored across Ongole City</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search junctions..."
                            style={{ padding: '8px 12px 8px 34px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#f1f5f9', fontSize: '0.8125rem', width: 220, outline: 'none' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {filtered.map(j => (
                    <Link href={`/junction/${j.id}`} key={j.id} className="glass-card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <div>
                                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f1f5f9' }}>{j.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{j.road}</div>
                            </div>
                            <span className="badge badge-success">Active</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: getCongestionColor(j.congestion) }}>{j.congestion}%</div>
                                <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Congestion</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#3b82f6' }}>{j.vehicles}</div>
                                <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Vehicles</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>{j.speed}</div>
                                <div style={{ fontSize: '0.625rem', color: '#64748b' }}>km/h</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b' }}>
                            <span>📍 {j.zone}</span><span>ID: {j.junction_id}</span>
                        </div>
                        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', width: `${j.congestion}%`, borderRadius: 2, background: getCongestionColor(j.congestion), transition: 'width 1s ease' }} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
