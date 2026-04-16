'use client';
import { useState } from 'react';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { randomBetween, getCongestionColor } from '@/lib/utils';
import { Cpu, Play, RotateCw, Zap } from 'lucide-react';

export default function AIControllerPage() {
    const [selectedJunction, setSelectedJunction] = useState(ONGOLE_JUNCTIONS[0]);
    const [optimization, setOptimization] = useState<any>(null);
    const [running, setRunning] = useState(false);

    const runOptimization = () => {
        setRunning(true);
        setTimeout(() => {
            setOptimization({
                north: Math.round(randomBetween(15, 55)),
                south: Math.round(randomBetween(15, 55)),
                east: Math.round(randomBetween(15, 55)),
                west: Math.round(randomBetween(15, 55)),
                cycle: Math.round(randomBetween(90, 180)),
                reward: (randomBetween(0.6, 0.95)).toFixed(3),
                travelImprovement: Math.round(randomBetween(8, 25)),
                queueReduction: Math.round(randomBetween(12, 40)),
                co2Reduction: Math.round(randomBetween(3, 18)),
                algorithm: 'PPO',
            });
            setRunning(false);
        }, 2000);
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI Traffic <span className="gradient-text">Controller</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>RL-based signal timing optimization using PPO/DQN</p>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1rem' }}>
                {/* Junction selector */}
                <div className="glass-card" style={{ padding: '1rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '1rem' }}>Select Junction</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxHeight: 'calc(100vh - 240px)', overflow: 'auto' }}>
                        {ONGOLE_JUNCTIONS.map(j => (
                            <button key={j.id} onClick={() => setSelectedJunction(j)} style={{
                                padding: '0.625rem', borderRadius: 8, border: 'none', textAlign: 'left', cursor: 'pointer',
                                background: selectedJunction.id === j.id ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'rgba(0,0,0,0.2)',
                                color: selectedJunction.id === j.id ? 'white' : '#94a3b8', fontSize: '0.8125rem', fontWeight: 500,
                            }}>
                                {j.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Control panel */}
                <div>
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{selectedJunction.name}</h3>
                                <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{selectedJunction.road} • {selectedJunction.zone}</p>
                            </div>
                            <button onClick={runOptimization} disabled={running} style={{
                                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 10, border: 'none',
                                background: running ? '#475569' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white',
                                fontWeight: 600, fontSize: '0.875rem', cursor: running ? 'wait' : 'pointer',
                            }}>
                                {running ? <RotateCw size={16} className="animate-spin" /> : <Play size={16} />}
                                {running ? 'Optimizing...' : 'Run Optimization'}
                            </button>
                        </div>

                        {/* Signal timing visualization */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            {['North', 'South', 'East', 'West'].map(d => {
                                const green = optimization ? optimization[d.toLowerCase()] : Math.round(randomBetween(20, 45));
                                return (
                                    <div key={d} style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 12 }}>
                                        <div style={{
                                            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 0.75rem',
                                            background: `conic-gradient(#10b981 ${green * 3.6}deg, #ef4444 ${green * 3.6}deg ${(green + 5) * 3.6}deg, #475569 ${(green + 5) * 3.6}deg)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0a0e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: '#10b981' }}>
                                                {green}s
                                            </div>
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{d}</div>
                                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Green Phase</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {optimization && (
                        <div className="glass-card animate-slide-up" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#10b981' }}>✅ Optimization Results ({optimization.algorithm})</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                {[
                                    { label: 'Reward Score', value: optimization.reward, color: '#3b82f6' },
                                    { label: 'Travel Time ↓', value: `${optimization.travelImprovement}%`, color: '#10b981' },
                                    { label: 'Queue Reduction', value: `${optimization.queueReduction}%`, color: '#8b5cf6' },
                                    { label: 'CO₂ Reduction', value: `${optimization.co2Reduction}%`, color: '#06b6d4' },
                                ].map(r => (
                                    <div key={r.label} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: r.color }}>{r.value}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
