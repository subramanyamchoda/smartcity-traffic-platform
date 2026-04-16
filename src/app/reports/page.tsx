'use client';
import { randomBetween } from '@/lib/utils';
import { FileText, Download, Calendar, BarChart3, Leaf, Car, AlertTriangle, ParkingCircle } from 'lucide-react';

export default function ReportsPage() {
    const stats = {
        avgCongestion: Math.round(randomBetween(35, 55)),
        totalVehicles: Math.round(randomBetween(25000, 80000)),
        lstmAccuracy: Math.round(randomBetween(88, 95) * 10) / 10,
        gruAccuracy: Math.round(randomBetween(85, 93) * 10) / 10,
        incidents: Math.round(randomBetween(15, 60)),
        co2Saved: Math.round(randomBetween(200, 800)),
        parkingOccupancy: Math.round(randomBetween(55, 80)),
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Reports & <span className="gradient-text">Analytics</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Generate daily, weekly, and monthly reports with PDF/CSV export</p>

            {/* Summary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                    { icon: Car, label: 'Total Vehicles', value: stats.totalVehicles.toLocaleString(), color: '#3b82f6' },
                    { icon: BarChart3, label: 'Avg Congestion', value: `${stats.avgCongestion}%`, color: '#f59e0b' },
                    { icon: Leaf, label: 'CO₂ Saved', value: `${stats.co2Saved} kg`, color: '#10b981' },
                    { icon: AlertTriangle, label: 'Incidents', value: stats.incidents, color: '#ef4444' },
                ].map(s => (
                    <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                        <s.icon size={24} color={s.color} style={{ margin: '0 auto 0.5rem' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Generate reports */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>📋 Generate Report</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {['Daily', 'Weekly', 'Monthly'].map(period => (
                        <div key={period} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 12, textAlign: 'center' }}>
                            <Calendar size={24} color="#3b82f6" style={{ margin: '0 auto 0.75rem' }} />
                            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{period} Report</div>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Download size={12} /> PDF
                                </button>
                                <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#f1f5f9', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Download size={12} /> CSV
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Model accuracy */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>🤖 AI Model Accuracy Report</h3>
                <table className="data-table">
                    <thead><tr><th>Model</th><th>Accuracy</th><th>Status</th><th>Predictions Today</th></tr></thead>
                    <tbody>
                        {[
                            { name: 'LSTM', accuracy: stats.lstmAccuracy, predictions: Math.round(randomBetween(400, 1000)) },
                            { name: 'GRU', accuracy: stats.gruAccuracy, predictions: Math.round(randomBetween(300, 800)) },
                            { name: 'CNN Density', accuracy: Math.round(randomBetween(82, 92) * 10) / 10, predictions: Math.round(randomBetween(200, 600)) },
                            { name: 'Isolation Forest', accuracy: Math.round(randomBetween(90, 97) * 10) / 10, predictions: Math.round(randomBetween(100, 400)) },
                        ].map(m => (
                            <tr key={m.name}>
                                <td style={{ fontWeight: 600 }}>{m.name}</td>
                                <td><span style={{ fontWeight: 700, color: m.accuracy > 90 ? '#10b981' : '#f59e0b' }}>{m.accuracy}%</span></td>
                                <td><span className="badge badge-success">Active</span></td>
                                <td>{m.predictions.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
