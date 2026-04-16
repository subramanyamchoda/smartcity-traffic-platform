'use client';
import { Brain, Map, Shield, Zap, Users, BarChart3, Cpu, Radio, GitBranch } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
                <div style={{
                    width: 80, height: 80, borderRadius: 20, margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 900, color: 'white',
                    boxShadow: '0 0 40px rgba(59,130,246,0.4)',
                }}>
                    OT
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    <span className="gradient-text">Ongole Traffic</span>
                </h1>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#94a3b8', marginBottom: '1rem' }}>
                    AI Smart Traffic Digital Twin Platform
                </h2>
                <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
                    A production-grade smart traffic management system designed exclusively for Ongole City,
                    Prakasam District, Andhra Pradesh, India. Powered by advanced AI/ML models, real-time IoT sensors,
                    and digital twin simulation technology.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                    { icon: Brain, title: 'AI/ML Engine', desc: 'LSTM, GRU, CNN, PPO/DQN RL, YOLOv8, Isolation Forest, SHAP/LIME' },
                    { icon: Map, title: 'City Coverage', desc: '25+ junctions, NH-16, major & minor roads, hospitals, markets, schools' },
                    { icon: Cpu, title: 'Digital Twin', desc: 'Real-time simulation of festivals, emergencies, weather, and signal failures' },
                    { icon: Radio, title: 'IoT Network', desc: '125+ simulated sensors — speed, vehicle count, queue, air quality, CO₂' },
                    { icon: Shield, title: 'Security', desc: 'JWT auth, RBAC (Admin/Officer/Analyst/Citizen), encrypted APIs, audit logs' },
                    { icon: Users, title: 'Engagement', desc: 'Citizen reporting, gamification points, leaderboards, verified incidents' },
                ].map(f => (
                    <div key={f.title} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <f.icon size={28} color="#3b82f6" style={{ margin: '0 auto 0.75rem' }} />
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</div>
                        <div style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.75rem' }}>Tech Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                    {['Next.js 14', 'TailwindCSS', 'TypeScript', 'Django', 'DRF', 'Django Channels', 'PostgreSQL', 'TimescaleDB', 'Redis', 'Celery', 'PyTorch', 'TensorFlow', 'YOLOv8', 'Stable-Baselines3', 'SHAP', 'Docker'].map(t => (
                        <span key={t} style={{ padding: '4px 12px', borderRadius: 8, background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
                    ))}
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
                    Version 2.0 — Built for Ongole Smart City Initiative 🏙️
                </p>
            </div>
        </div>
    );
}
