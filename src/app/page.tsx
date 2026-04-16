'use client';
import Link from 'next/link';
import { ArrowRight, Activity, Shield, Brain, Map, Zap, Users, BarChart3, Cpu } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Traffic Prediction', desc: 'LSTM, GRU & CNN models predict congestion 5-15 min ahead with 92% accuracy', color: '#8b5cf6' },
  { icon: Cpu, title: 'RL Signal Control', desc: 'PPO/DQN reinforcement learning optimizes signal timing in real-time', color: '#3b82f6' },
  { icon: Activity, title: 'Digital Twin Engine', desc: 'Simulate festivals, emergencies & weather scenarios before they happen', color: '#06b6d4' },
  { icon: Map, title: 'Live Traffic Map', desc: '25+ junctions monitored with TomTom & Google Maps integration', color: '#10b981' },
  { icon: Shield, title: 'YOLOv8 Detection', desc: 'Upload images/videos for instant vehicle detection & traffic analysis', color: '#f59e0b' },
  { icon: BarChart3, title: 'Carbon Monitoring', desc: 'Track CO₂ emissions, fuel savings & carbon credits per junction', color: '#ef4444' },
  { icon: Zap, title: 'IoT Sensors', desc: '125+ simulated sensors tracking speed, queue length & air quality', color: '#f97316' },
  { icon: Users, title: 'Citizen Engagement', desc: 'Report incidents, earn points & compete on leaderboards', color: '#ec4899' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative', padding: '4rem 2rem', textAlign: 'center',
        borderRadius: 24, overflow: 'hidden', marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="animate-slide-up">
          <div style={{
            display: 'inline-flex', padding: '6px 16px', borderRadius: 9999,
            background: 'rgba(59,130,246,0.15)', color: '#3b82f6',
            fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1.5rem',
            border: '1px solid rgba(59,130,246,0.3)',
          }}>
            🚦 AI-Powered Traffic Management
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
            <span className="gradient-text">Ongole City</span>
            <br />Smart Traffic Digital Twin
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Next-generation traffic monitoring & AI control platform for Ongole, Prakasam District, Andhra Pradesh.
            Powered by LSTM prediction, reinforcement learning, and real-time digital twin simulation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white', fontWeight: 600, fontSize: '0.9375rem',
              textDecoration: 'none', boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
              transition: 'all 0.3s ease',
            }}>
              Open Dashboard <ArrowRight size={18} />
            </Link>
            <Link href="/live-map" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#f1f5f9', fontWeight: 600, fontSize: '0.9375rem',
              textDecoration: 'none', transition: 'all 0.3s ease',
            }}>
              <Map size={18} /> View Live Map
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
          marginTop: '3rem', padding: '1.5rem',
          background: 'rgba(0,0,0,0.2)', borderRadius: 16,
        }}>
          {[
            { value: '25+', label: 'Junctions' },
            { value: '125+', label: 'IoT Sensors' },
            { value: '6', label: 'AI Models' },
            { value: '30s', label: 'Update Freq' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '2rem', fontWeight: 800 }} className="gradient-text">{s.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '1rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
          Platform <span className="gradient-text">Features</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.9375rem' }}>
          Comprehensive smart city traffic management powered by cutting-edge AI
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {features.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, marginBottom: '1rem',
                background: `${f.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon size={24} color={f.color} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
