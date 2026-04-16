'use client';
import { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, X, ChevronRight } from 'lucide-react';
import { randomBetween } from '@/lib/utils';

const alertsData = [
    { id: 1, type: 'High Congestion', severity: 'red', status: 'new', junction: 'Kurnool Road Junction', description: 'Congestion index exceeded 85% threshold', time: '2 min ago' },
    { id: 2, type: 'Signal Failure', severity: 'orange', status: 'assigned', junction: 'Trunk Road Circle', description: 'Traffic signal malfunction detected on East approach', time: '8 min ago' },
    { id: 3, type: 'Camera Offline', severity: 'yellow', status: 'acknowledged', junction: 'Bus Stand Junction', description: 'CAM-ONG-J04-CAM2 went offline', time: '15 min ago' },
    { id: 4, type: 'Environmental', severity: 'orange', status: 'new', junction: 'Market Centre', description: 'AQI exceeded 200 — hazardous air quality alert', time: '22 min ago' },
    { id: 5, type: 'Accident', severity: 'red', status: 'acknowledged', junction: 'Hospital Road Junction', description: 'Minor accident reported near junction — traffic diversion active', time: '35 min ago' },
    { id: 6, type: 'Sensor Malfunction', severity: 'blue', status: 'resolved', junction: 'Bandlamitta Junction', description: 'Speed sensor ONG-J14-SPE1 recovered after restart', time: '1 hr ago' },
    { id: 7, type: 'High Congestion', severity: 'yellow', status: 'resolved', junction: 'Railway Station Road', description: 'Evening rush congestion normalized', time: '2 hr ago' },
];

const sevColor: Record<string, string> = { red: '#ef4444', orange: '#f97316', yellow: '#f59e0b', blue: '#3b82f6' };
const statusLabel: Record<string, string> = { new: 'badge-danger', assigned: 'badge-warning', acknowledged: 'badge-info', resolved: 'badge-success' };

export default function AlertsPage() {
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? alertsData : alertsData.filter(a => a.status === filter);

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Alert <span className="gradient-text">Management</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Real-time alerts, incident tracking, and resolution timeline</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'Critical', count: alertsData.filter(a => a.severity === 'red').length, color: '#ef4444' },
                    { label: 'High', count: alertsData.filter(a => a.severity === 'orange').length, color: '#f97316' },
                    { label: 'Medium', count: alertsData.filter(a => a.severity === 'yellow').length, color: '#f59e0b' },
                    { label: 'Info', count: alertsData.filter(a => a.severity === 'blue').length, color: '#3b82f6' },
                ].map(s => (
                    <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.count}</div>
                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 3 }}>
                {['all', 'new', 'assigned', 'acknowledged', 'resolved'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: filter === f ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                        color: filter === f ? 'white' : '#94a3b8', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'capitalize',
                    }}>{f}</button>
                ))}
            </div>

            {/* Alert list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filtered.map(a => (
                    <div key={a.id} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: `4px solid ${sevColor[a.severity]}` }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${sevColor[a.severity]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AlertTriangle size={20} color={sevColor[a.severity]} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{a.type}</span>
                                <span className={`badge ${statusLabel[a.status]}`}>{a.status}</span>
                            </div>
                            <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{a.description}</div>
                            <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: 4 }}>📍 {a.junction} • <Clock size={10} style={{ display: 'inline' }} /> {a.time}</div>
                        </div>
                        <ChevronRight size={16} color="#475569" />
                    </div>
                ))}
            </div>
        </div>
    );
}
