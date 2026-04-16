'use client';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { randomBetween } from '@/lib/utils';
import { Camera, Circle, Video, Eye, AlertTriangle } from 'lucide-react';

export default function CameraMonitoringPage() {
    const cameras = ONGOLE_JUNCTIONS.slice(0, 12).map(j => ({
        id: `${j.junction_id}-CAM1`, junction: j.name, direction: 'North', online: Math.random() > 0.1,
        detection: Math.random() > 0.2, vehicles: Math.round(randomBetween(10, 80)),
    }));

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Camera <span className="gradient-text">Monitoring</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>CCTV surveillance with YOLOv8 vehicle detection overlay</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {cameras.map(c => (
                    <div key={c.id} className="glass-card" style={{ overflow: 'hidden' }}>
                        <div style={{ height: 180, background: 'linear-gradient(135deg, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {c.online ? (
                                <>
                                    <Video size={40} color="rgba(255,255,255,0.2)" />
                                    <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Circle size={8} fill="#10b981" color="#10b981" />
                                        <span style={{ fontSize: '0.625rem', color: '#10b981', fontWeight: 600 }}>LIVE</span>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '2px 8px', background: 'rgba(0,0,0,0.6)', borderRadius: 6, fontSize: '0.625rem', color: '#f1f5f9' }}>
                                        🚗 {c.vehicles} detected
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <AlertTriangle size={32} color="#ef4444" />
                                    <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 8 }}>Camera Offline</div>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '0.75rem' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{c.junction}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b', marginTop: 4 }}>
                                <span>{c.id} • {c.direction}</span>
                                <span className={`badge ${c.online ? 'badge-success' : 'badge-danger'}`}>{c.online ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
