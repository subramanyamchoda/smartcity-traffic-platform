'use client';
import { useState, useEffect } from 'react';
import { randomBetween } from '@/lib/utils';
import { ParkingCircle, Car, MapPin, Clock } from 'lucide-react';

const parkingLots = [
    { name: 'Kurnool Road Parking', capacity: 150, occupied: 95, rate: 20, zone: 'Central' },
    { name: 'Bus Stand Parking', capacity: 200, occupied: 160, rate: 15, zone: 'Transport' },
    { name: 'Market Centre Parking', capacity: 100, occupied: 78, rate: 25, zone: 'Commercial' },
    { name: 'Railway Station Parking', capacity: 120, occupied: 45, rate: 20, zone: 'Transport' },
    { name: 'Court Centre Parking', capacity: 80, occupied: 55, rate: 20, zone: 'Central' },
    { name: 'Hospital Parking', capacity: 60, occupied: 52, rate: 10, zone: 'Hospital' },
];

export default function ParkingPage() {
    const [lots, setLots] = useState(parkingLots);

    useEffect(() => {
        const interval = setInterval(() => {
            setLots(prev => prev.map(l => ({
                ...l, occupied: Math.max(0, Math.min(l.capacity, l.occupied + Math.round(randomBetween(-3, 3)))),
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Parking <span className="gradient-text">Intelligence</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Real-time parking lot occupancy and availability</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{lots.reduce((a, l) => a + l.capacity, 0)}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Total Capacity</div>
                </div>
                <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>{lots.reduce((a, l) => a + l.occupied, 0)}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Currently Occupied</div>
                </div>
                <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{lots.reduce((a, l) => a + (l.capacity - l.occupied), 0)}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Available Spots</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
                {lots.map(l => {
                    const pct = Math.round((l.occupied / l.capacity) * 100);
                    const color = pct > 85 ? '#ef4444' : pct > 60 ? '#f59e0b' : '#10b981';
                    return (
                        <div key={l.name} className="glass-card" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{l.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}><MapPin size={12} style={{ display: 'inline' }} /> {l.zone} Zone • ₹{l.rate}/hr</div>
                                </div>
                                <span className={`badge ${pct > 85 ? 'badge-danger' : pct > 60 ? 'badge-warning' : 'badge-success'}`}>
                                    {pct > 85 ? 'Almost Full' : pct > 60 ? 'Filling Up' : 'Available'}
                                </span>
                            </div>
                            {/* Radial gauge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                                    <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="8"
                                        strokeDasharray={`${pct * 2.136} ${213.6 - pct * 2.136}`}
                                        strokeDashoffset="53.4" strokeLinecap="round" style={{ transition: 'all 1s ease' }} />
                                    <text x="40" y="44" textAnchor="middle" fill={color} fontSize="16" fontWeight="800">{pct}%</text>
                                </svg>
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: 4 }}>
                                        <div><span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Occupied:</span> <span style={{ fontWeight: 700 }}>{l.occupied}</span></div>
                                        <div><span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Free:</span> <span style={{ fontWeight: 700, color: '#10b981' }}>{l.capacity - l.occupied}</span></div>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Capacity: {l.capacity} spots</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
