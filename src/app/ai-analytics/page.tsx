'use client';
import { randomBetween } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

const models = [
    { name: 'LSTM', accuracy: 92.3, mae: 3.2, rmse: 4.1, status: 'active', color: '#3b82f6' },
    { name: 'GRU', accuracy: 89.7, mae: 3.8, rmse: 4.6, status: 'active', color: '#8b5cf6' },
    { name: 'CNN Density', accuracy: 87.5, mae: 4.1, rmse: 5.0, status: 'active', color: '#06b6d4' },
    { name: 'Isolation Forest', accuracy: 94.1, mae: 2.1, rmse: 2.8, status: 'active', color: '#10b981' },
    { name: 'PPO (RL)', accuracy: 88.2, mae: null, rmse: null, status: 'active', color: '#f59e0b' },
    { name: 'DQN (RL)', accuracy: 85.9, mae: null, rmse: null, status: 'standby', color: '#f97316' },
];

const radarData = [
    { metric: 'Accuracy', LSTM: 92, GRU: 89, CNN: 87 },
    { metric: 'Speed', LSTM: 85, GRU: 90, CNN: 78 },
    { metric: 'Stability', LSTM: 88, GRU: 86, CNN: 82 },
    { metric: 'Generalization', LSTM: 80, GRU: 82, CNN: 75 },
    { metric: 'Real-time', LSTM: 78, GRU: 85, CNN: 70 },
];

export default function AIAnalyticsPage() {
    const dailyAccuracy = Array.from({ length: 14 }, (_, i) => ({
        day: `Day ${i + 1}`, lstm: Math.round(randomBetween(88, 96)), gru: Math.round(randomBetween(85, 93)), cnn: Math.round(randomBetween(82, 92)),
    }));

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI/ML <span className="gradient-text">Analytics</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Model performance, accuracy metrics, and AI comparison dashboard</p>

            {/* Model cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {models.map(m => (
                    <div key={m.name} className="glass-card" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color }} />
                                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{m.name}</span>
                            </div>
                            <span className={`badge ${m.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{m.status}</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color }}>{m.accuracy}%</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Accuracy</div>
                        {m.mae && (
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                                <span>MAE: {m.mae}</span><span>RMSE: {m.rmse}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Accuracy trend */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>📈 Model Accuracy Trend (14 Days)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={dailyAccuracy}>
                            <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[75, 100]} />
                            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
                            <Area type="monotone" dataKey="lstm" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" strokeWidth={2} />
                            <Area type="monotone" dataKey="gru" stroke="#8b5cf6" fill="rgba(139,92,246,0.1)" strokeWidth={2} />
                            <Area type="monotone" dataKey="cnn" stroke="#06b6d4" fill="rgba(6,182,212,0.1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Radar chart */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>🎯 Model Comparison Radar</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                            <Radar name="LSTM" dataKey="LSTM" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                            <Radar name="GRU" dataKey="GRU" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
                            <Radar name="CNN" dataKey="CNN" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
                            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
