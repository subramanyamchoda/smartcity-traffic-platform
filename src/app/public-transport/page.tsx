'use client';
import { randomBetween } from '@/lib/utils';
import { Bus, Train, Clock, MapPin, Users } from 'lucide-react';

const busRoutes = [
    { number: '1', name: 'Ongole - Chirala', stops: 12, frequency: 15, nextEta: Math.round(randomBetween(3, 20)), occupancy: Math.round(randomBetween(30, 90)) },
    { number: '2', name: 'Ongole - Kothapatnam', stops: 8, frequency: 20, nextEta: Math.round(randomBetween(5, 25)), occupancy: Math.round(randomBetween(20, 80)) },
    { number: '3', name: 'Station - Market', stops: 6, frequency: 10, nextEta: Math.round(randomBetween(2, 15)), occupancy: Math.round(randomBetween(40, 95)) },
    { number: '4', name: 'Ongole - Addanki', stops: 15, frequency: 25, nextEta: Math.round(randomBetween(8, 30)), occupancy: Math.round(randomBetween(25, 75)) },
    { number: '5', name: 'City Circular', stops: 20, frequency: 12, nextEta: Math.round(randomBetween(3, 12)), occupancy: Math.round(randomBetween(50, 95)) },
];

const trains = [
    { number: '12704', name: 'Falaknuma Express', arrival: '06:30', platform: '1', status: 'On Time' },
    { number: '12728', name: 'Godavari Express', arrival: '08:15', platform: '2', status: 'Delayed 10 min' },
    { number: '17229', name: 'Sabari Express', arrival: '11:00', platform: '1', status: 'On Time' },
    { number: '12711', name: 'Pinakini Express', arrival: '14:30', platform: '2', status: 'On Time' },
    { number: '22708', name: 'Visakha Express', arrival: '18:45', platform: '1', status: 'On Time' },
];

export default function PublicTransportPage() {
    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Public <span className="gradient-text">Transport</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Bus routes, train schedules, and multimodal routing for Ongole</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Bus routes */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}><Bus size={18} style={{ display: 'inline', marginRight: 8 }} />Bus Routes</h3>
                    {busRoutes.map(b => (
                        <div key={b.number} style={{ padding: '1rem', marginBottom: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
                                        {b.number}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{b.name}</div>
                                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{b.stops} stops • Every {b.frequency} min</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>{b.nextEta} min</div>
                                    <div style={{ fontSize: '0.625rem', color: '#64748b' }}>Next bus</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Occupancy</span>
                                <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.05)' }}>
                                    <div style={{ height: '100%', width: `${b.occupancy}%`, borderRadius: 3, background: b.occupancy > 80 ? '#ef4444' : b.occupancy > 50 ? '#f59e0b' : '#10b981' }} />
                                </div>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: b.occupancy > 80 ? '#ef4444' : '#10b981' }}>{b.occupancy}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Train schedule */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}><Train size={18} style={{ display: 'inline', marginRight: 8 }} />Ongole Railway Station</h3>
                    <table className="data-table">
                        <thead>
                            <tr><th>Train</th><th>Arrival</th><th>Platform</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            {trains.map(t => (
                                <tr key={t.number}>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>#{t.number}</div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{t.arrival}</td>
                                    <td><span className="badge badge-info">P{t.platform}</span></td>
                                    <td><span className={`badge ${t.status.includes('Delay') ? 'badge-warning' : 'badge-success'}`}>{t.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
