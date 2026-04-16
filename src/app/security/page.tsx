'use client';
import { Shield, User, Lock, Eye, Clock, FileText } from 'lucide-react';

const auditLogs = [
    { user: 'admin', action: 'Updated signal config', resource: 'Kurnool Road Junction', time: '2 min ago', ip: '192.168.1.10' },
    { user: 'officer_01', action: 'Acknowledged alert', resource: 'Alert #42 — High Congestion', time: '8 min ago', ip: '192.168.1.25' },
    { user: 'analyst_02', action: 'Generated report', resource: 'Daily Report — Feb 21', time: '15 min ago', ip: '192.168.1.30' },
    { user: 'admin', action: 'Ran RL optimization', resource: 'Trunk Road Circle', time: '22 min ago', ip: '192.168.1.10' },
    { user: 'citizen_05', action: 'Reported incident', resource: 'Accident — Hospital Road', time: '35 min ago', ip: '203.0.113.45' },
    { user: 'officer_03', action: 'Resolved alert', resource: 'Alert #38 — Camera Offline', time: '1 hr ago', ip: '192.168.1.28' },
];

const roles = [
    { role: 'Admin', users: 2, permissions: ['Full system access', 'User management', 'AI model config', 'Signal override'], color: '#ef4444' },
    { role: 'Traffic Officer', users: 8, permissions: ['View dashboard', 'Manage alerts', 'View cameras', 'Signal control'], color: '#f59e0b' },
    { role: 'Analyst', users: 5, permissions: ['View analytics', 'Generate reports', 'AI model insights', 'Data export'], color: '#3b82f6' },
    { role: 'Citizen', users: 150, permissions: ['View public dashboard', 'Report incidents', 'Gamification', 'Route info'], color: '#10b981' },
];

export default function SecurityPage() {
    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Security & <span className="gradient-text">Access Control</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Role-based access, audit logs, and AI decision transparency</p>

            {/* Roles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {roles.map(r => (
                    <div key={r.role} className="glass-card" style={{ padding: '1.25rem', borderTop: `3px solid ${r.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <div style={{ fontWeight: 700 }}>{r.role}</div>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.users} users</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {r.permissions.map(p => (
                                <div key={p} style={{ fontSize: '0.6875rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Lock size={10} color={r.color} /> {p}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Audit logs */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}><Eye size={16} style={{ display: 'inline', marginRight: 6 }} />Audit Logs</h3>
                <table className="data-table">
                    <thead><tr><th>User</th><th>Action</th><th>Resource</th><th>Time</th><th>IP</th></tr></thead>
                    <tbody>
                        {auditLogs.map((l, i) => (
                            <tr key={i}>
                                <td><span style={{ fontWeight: 600 }}>{l.user}</span></td>
                                <td>{l.action}</td>
                                <td style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{l.resource}</td>
                                <td style={{ fontSize: '0.8125rem', color: '#64748b' }}>{l.time}</td>
                                <td style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>{l.ip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
