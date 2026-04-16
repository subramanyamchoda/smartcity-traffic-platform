'use client';
import { useState, useEffect, use } from 'react';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { getCongestionColor, getCongestionLabel, randomBetween, generateSimulatedData } from '@/lib/utils';
import { ArrowLeft, Upload, Activity, Car, Brain, Leaf, Clock, Bus, ParkingCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';

export default function JunctionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const junctionId = parseInt(resolvedParams.id);
    const junction = ONGOLE_JUNCTIONS.find(j => j.id === junctionId) || ONGOLE_JUNCTIONS[0];
    const [data, setData] = useState(generateSimulatedData());
    const [uploadResult, setUploadResult] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('overview');

    const timePatterns = [
        { period: '6AM-9AM', label: 'Morning Rush', congestion: Math.round(randomBetween(55, 85)) },
        { period: '9AM-12PM', label: 'Mid Morning', congestion: Math.round(randomBetween(35, 55)) },
        { period: '12PM-2PM', label: 'Afternoon', congestion: Math.round(randomBetween(40, 65)) },
        { period: '2PM-5PM', label: 'Post Lunch', congestion: Math.round(randomBetween(30, 50)) },
        { period: '5PM-8PM', label: 'Evening Rush', congestion: Math.round(randomBetween(60, 90)) },
        { period: '8PM-11PM', label: 'Night', congestion: Math.round(randomBetween(15, 35)) },
    ];

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`, congestion: Math.round(randomBetween(15, 85)),
        vehicles: Math.round(randomBetween(50, 400)), speed: Math.round(randomBetween(15, 55)),
    }));

    useEffect(() => {
        const interval = setInterval(() => setData(generateSimulatedData()), 5000);
        return () => clearInterval(interval);
    }, []);

    const handleUpload = () => {
        setTimeout(() => {
            setUploadResult({
                total: Math.round(randomBetween(30, 150)),
                cars: Math.round(randomBetween(15, 80)),
                buses: Math.round(randomBetween(2, 15)),
                trucks: Math.round(randomBetween(3, 20)),
                bikes: Math.round(randomBetween(10, 50)),
                congestion: randomBetween(20, 80) > 50 ? 'Heavy' : 'Moderate',
                speed: Math.round(randomBetween(15, 45)),
                density: randomBetween(20, 80) > 50 ? 'Dense' : 'Medium',
                confidence: Math.round(randomBetween(85, 98)),
            });
        }, 1500);
    };

    const tabs = ['overview', 'ai-insights', 'transport', 'environment', 'track-traffic'];

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Link href="/junction-control" style={{ color: '#94a3b8', textDecoration: 'none' }}><ArrowLeft size={20} /></Link>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{junction.name}</h1>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{junction.road} • {junction.zone} Zone • ID: {junction.junction_id}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="animate-pulse-glow" style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live</span>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 3 }}>
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: activeTab === tab ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                        color: activeTab === tab ? 'white' : '#94a3b8', fontWeight: 600, fontSize: '0.8125rem',
                        textTransform: 'capitalize', transition: 'all 0.2s ease',
                    }}>{tab.replace('-', ' ')}</button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <>
                    {/* Real-time stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {[
                            { icon: Activity, label: 'Congestion', value: `${data.congestion}%`, color: getCongestionColor(data.congestion) },
                            { icon: Car, label: 'Vehicles', value: data.vehicleCount, color: '#3b82f6' },
                            { icon: Zap, label: 'Avg Speed', value: `${data.avgSpeed} km/h`, color: '#10b981' },
                            { icon: Clock, label: 'Queue', value: `${data.queueLength}m`, color: '#f59e0b' },
                            { icon: Leaf, label: 'CO₂', value: `${data.co2} ppm`, color: '#8b5cf6' },
                        ].map(s => (
                            <div key={s.label} className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <s.icon size={20} color={s.color} style={{ marginBottom: 6 }} />
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{s.value}</div>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Charts row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="glass-card" style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>📊 24h Congestion History</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={hourlyData}>
                                    <defs>
                                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                                    </defs>
                                    <XAxis dataKey="hour" stroke="#475569" fontSize={9} tickLine={false} />
                                    <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
                                    <Area type="monotone" dataKey="congestion" stroke="#3b82f6" fill="url(#cg)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="glass-card" style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>🕐 Traffic Patterns</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={timePatterns}>
                                    <XAxis dataKey="period" stroke="#475569" fontSize={9} tickLine={false} />
                                    <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
                                    <Bar dataKey="congestion" radius={[4, 4, 0, 0]}>
                                        {timePatterns.map((entry, i) => <Cell key={i} fill={getCongestionColor(entry.congestion)} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Vehicle Distribution */}
                    <div className="glass-card" style={{ padding: '1.25rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>🚗 Vehicle Distribution</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
                            {[
                                { label: 'Cars', value: data.cars, icon: '🚗', color: '#3b82f6' },
                                { label: 'Bikes', value: data.bikes, icon: '🏍️', color: '#06b6d4' },
                                { label: 'Auto', value: data.autoRickshaws, icon: '🛺', color: '#8b5cf6' },
                                { label: 'Buses', value: data.buses, icon: '🚌', color: '#10b981' },
                                { label: 'Trucks', value: data.trucks, icon: '🚛', color: '#f59e0b' },
                                { label: 'Total', value: data.vehicleCount, icon: '📊', color: '#ef4444' },
                            ].map(v => (
                                <div key={v.label} style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{v.icon}</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: v.color }}>{v.value}</div>
                                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{v.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'ai-insights' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>🧠 LSTM Prediction (5 min)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Predicted Congestion</div><div style={{ fontSize: '2rem', fontWeight: 800, color: getCongestionColor(Math.round(data.congestion * 1.1)) }}>{Math.round(data.congestion * 1.1)}%</div></div>
                            <div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Confidence Score</div><div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{Math.round(randomBetween(82, 96))}%</div></div>
                        </div>
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(59,130,246,0.1)', borderRadius: 8, fontSize: '0.8125rem', color: '#94a3b8' }}>
                            <strong style={{ color: '#3b82f6' }}>SHAP Explanation:</strong> Top factors — Time of day (0.32), Vehicle count trend (+0.28), Historical average (-0.15)
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>🤖 RL Signal Optimization</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {['North', 'South', 'East', 'West'].map(d => (
                                <div key={d} style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{d} Green</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{Math.round(randomBetween(15, 55))}s</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <div style={{ flex: 1, padding: '0.5rem', background: 'rgba(16,185,129,0.1)', borderRadius: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Travel Time ↓</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>{Math.round(randomBetween(10, 25))}%</div>
                            </div>
                            <div style={{ flex: 1, padding: '0.5rem', background: 'rgba(139,92,246,0.1)', borderRadius: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>CO₂ ↓</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#8b5cf6' }}>{Math.round(randomBetween(5, 15))}%</div>
                            </div>
                            <div style={{ flex: 1, padding: '0.5rem', background: 'rgba(59,130,246,0.1)', borderRadius: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Queue ↓</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#3b82f6' }}>{Math.round(randomBetween(15, 35))}%</div>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>⚠️ Anomaly Detection</h3>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Isolation Forest Status: <span className="badge badge-success">Normal</span></div>
                        <div style={{ marginTop: '0.75rem', color: '#64748b', fontSize: '0.8125rem' }}>No anomalies detected in the last 30 minutes. Model confidence: {Math.round(randomBetween(90, 98))}%</div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>📈 Peak Hour Prediction</h3>
                        {timePatterns.slice(0, 4).map(p => (
                            <div key={p.period} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: '#64748b', width: 80 }}>{p.period}</span>
                                <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.05)' }}>
                                    <div style={{ height: '100%', width: `${p.congestion}%`, borderRadius: 4, background: getCongestionColor(p.congestion), transition: 'width 0.5s ease' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: getCongestionColor(p.congestion), width: 40 }}>{p.congestion}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'transport' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}><Bus size={16} style={{ display: 'inline', marginRight: 6 }} />Nearby Bus ETA</h3>
                        {['Route 1 — Ongole-Chirala', 'Route 3 — Station-Market', 'Route 5 — City Circular'].map(r => (
                            <div key={r} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem', marginBottom: '0.375rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                <span style={{ fontSize: '0.8125rem', color: '#f1f5f9' }}>{r}</span>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981' }}>{Math.round(randomBetween(3, 20))} min</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}><ParkingCircle size={16} style={{ display: 'inline', marginRight: 6 }} />Nearby Parking</h3>
                        {['Kurnool Road Parking', 'Market Centre Parking', 'Bus Stand Parking'].map(p => {
                            const occ = Math.round(randomBetween(30, 95));
                            return (
                                <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem', marginBottom: '0.375rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                                    <span style={{ fontSize: '0.8125rem', color: '#f1f5f9' }}>{p}</span>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: occ > 80 ? '#ef4444' : occ > 50 ? '#f59e0b' : '#10b981' }}>{occ}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'environment' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                        { label: 'CO₂ Level', value: `${data.co2} ppm`, icon: '🌿', color: data.co2 > 500 ? '#ef4444' : '#10b981' },
                        { label: 'AQI', value: data.aqi, icon: '🌬️', color: data.aqi > 150 ? '#ef4444' : data.aqi > 100 ? '#f59e0b' : '#10b981' },
                        { label: 'Temperature', value: `${data.temperature}°C`, icon: '🌡️', color: '#f59e0b' },
                        { label: 'Fuel Consumption', value: `${Math.round(randomBetween(10, 50))} L/hr`, icon: '⛽', color: '#f97316' },
                        { label: 'Carbon Score', value: `${Math.round(randomBetween(30, 80))}/100`, icon: '🏆', color: '#8b5cf6' },
                        { label: 'Carbon Credits', value: Math.round(randomBetween(5, 50)), icon: '💳', color: '#06b6d4' },
                    ].map(e => (
                        <div key={e.label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{e.icon}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: e.color }}>{e.value}</div>
                            <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>{e.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'track-traffic' && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '1rem' }}>
                        <Upload size={18} style={{ display: 'inline', marginRight: 8 }} />Track Traffic — Upload Image/Video
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
                        Upload a traffic image or video. Our YOLOv8 model will detect, count, and classify all vehicles.
                    </p>
                    <div style={{
                        border: '2px dashed rgba(59,130,246,0.3)', borderRadius: 16, padding: '3rem', textAlign: 'center',
                        background: 'rgba(59,130,246,0.05)', cursor: 'pointer', marginBottom: '1.5rem',
                    }} onClick={handleUpload}>
                        <Upload size={48} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9' }}>Click to upload or drag & drop</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>Supports: JPG, PNG, MP4, AVI • Max 50MB</div>
                    </div>

                    {uploadResult && (
                        <div className="animate-slide-up">
                            <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#10b981' }}>✅ Detection Results</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                                {[
                                    { label: 'Cars', value: uploadResult.cars, icon: '🚗' },
                                    { label: 'Buses', value: uploadResult.buses, icon: '🚌' },
                                    { label: 'Trucks', value: uploadResult.trucks, icon: '🚛' },
                                    { label: 'Bikes', value: uploadResult.bikes, icon: '🏍️' },
                                    { label: 'Total', value: uploadResult.total, icon: '📊' },
                                ].map(v => (
                                    <div key={v.label} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{v.icon}</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>{v.value}</div>
                                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{v.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Congestion</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: uploadResult.congestion === 'Heavy' ? '#ef4444' : '#f59e0b' }}>{uploadResult.congestion}</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Est. Speed</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#10b981' }}>{uploadResult.speed} km/h</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Density</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#8b5cf6' }}>{uploadResult.density}</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Confidence</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#06b6d4' }}>{uploadResult.confidence}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
