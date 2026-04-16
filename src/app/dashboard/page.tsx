'use client';
import { useState, useEffect } from 'react';
import { Activity, Car, Cloud, AlertTriangle, TrendingUp, Gauge, Thermometer, Leaf, BarChart3, MapPin, Clock, Zap } from 'lucide-react';
import { ONGOLE_JUNCTIONS } from '@/lib/constants';
import { getCongestionColor, getCongestionLabel, randomBetween, generateSimulatedData } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

function StatCard({ icon: Icon, label, value, unit, color, trend }: any) {
    return (
        <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={color} />
                </div>
                {trend && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trend > 0 ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TrendingUp size={12} style={{ transform: trend > 0 ? 'none' : 'rotate(180deg)' }} />
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>{value}<span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: 4 }}>{unit}</span></div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>{label}</div>
        </div>
    );
}

function CongestionGauge({ value }: { value: number }) {
    const radius = 70;
    const circumference = Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="160" height="90" viewBox="0 0 160 90">
                <path d="M 10 80 A 70 70 0 0 1 150 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
                <path d="M 10 80 A 70 70 0 0 1 150 80" fill="none" stroke={getCongestionColor(value)} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
            </svg>
            <div style={{ marginTop: -30, textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: getCongestionColor(value) }}>{value}%</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{getCongestionLabel(value)}</div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [data, setData] = useState(generateSimulatedData());
    const [junctionData, setJunctionData] = useState(ONGOLE_JUNCTIONS.map(j => ({
        ...j, congestion: Math.round(randomBetween(15, 85)), vehicles: Math.round(randomBetween(50, 300)),
        speed: Math.round(randomBetween(15, 55)),
    })));
    const [chartData, setChartData] = useState<any[]>([]);
    const [time, setTime] = useState('');

    useEffect(() => {
        const hours = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`, congestion: Math.round(randomBetween(15, 85)),
            vehicles: Math.round(randomBetween(100, 600)), speed: Math.round(randomBetween(15, 55)),
        }));
        setChartData(hours);
        setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        const interval = setInterval(() => {
            setData(generateSimulatedData());
            setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            setJunctionData(prev => prev.map(j => ({
                ...j, congestion: Math.max(0, Math.min(100, j.congestion + Math.round(randomBetween(-5, 5)))),
                vehicles: Math.max(10, j.vehicles + Math.round(randomBetween(-20, 20))),
                speed: Math.max(5, Math.min(60, j.speed + Math.round(randomBetween(-3, 3)))),
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const vehiclePieData = [
        { name: 'Cars', value: data.cars, color: '#3b82f6' },
        { name: 'Bikes', value: data.bikes, color: '#06b6d4' },
        { name: 'Auto', value: data.autoRickshaws, color: '#8b5cf6' },
        { name: 'Buses', value: data.buses, color: '#10b981' },
        { name: 'Trucks', value: data.trucks, color: '#f59e0b' },
    ];

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Traffic <span className="gradient-text">Dashboard</span></h1>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Real-time monitoring — Ongole City, Prakasam District, AP</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div className="animate-pulse-glow" style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}><Clock size={14} style={{ display: 'inline', marginRight: 4 }} />{time}</span>
                </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <StatCard icon={Gauge} label="Avg Congestion" value={data.congestion} unit="%" color="#f97316" trend={3.2} />
                <StatCard icon={Car} label="Active Vehicles" value={data.vehicleCount} unit="" color="#3b82f6" trend={-1.5} />
                <StatCard icon={Activity} label="Avg Speed" value={data.avgSpeed} unit="km/h" color="#10b981" trend={-2.1} />
                <StatCard icon={AlertTriangle} label="Active Alerts" value={Math.round(randomBetween(2, 12))} unit="" color="#ef4444" trend={5} />
                <StatCard icon={Leaf} label="CO₂ Level" value={data.co2} unit="ppm" color="#8b5cf6" trend={1.8} />
                <StatCard icon={Thermometer} label="Temperature" value={data.temperature} unit="°C" color="#f59e0b" />
            </div>

            {/* Main grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Congestion timeline chart */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>📊 Congestion Trend (24h)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="congGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="hour" stroke="#475569" fontSize={10} tickLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                            <Area type="monotone" dataKey="congestion" stroke="#3b82f6" fill="url(#congGrad)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Vehicle distribution */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>🚗 Vehicle Distribution</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ResponsiveContainer width="50%" height={200}>
                            <PieChart>
                                <Pie data={vehiclePieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3}>
                                    {vehiclePieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ flex: 1 }}>
                            {vehiclePieData.map(v => (
                                <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 3, background: v.color }} />
                                    <span style={{ fontSize: '0.8125rem', color: '#94a3b8', flex: 1 }}>{v.name}</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9' }}>{v.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Congestion Gauge */}
                <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>⚡ Live Congestion</h3>
                    <CongestionGauge value={Math.round(data.congestion)} />
                    <div style={{ marginTop: '1rem', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <span>Queue Length</span><span style={{ color: '#f1f5f9', fontWeight: 600 }}>{data.queueLength}m</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <span>AQI</span><span style={{ color: '#f1f5f9', fontWeight: 600 }}>{data.aqi}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                            <span>Flow Rate</span><span style={{ color: '#f1f5f9', fontWeight: 600 }}>{Math.round(randomBetween(500, 3000))} veh/h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Junction Heatmap Grid */}
            <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem' }}>🗺️ Junction Status Grid</h3>
                    <Link href="/junction-control" style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}>View All →</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    {junctionData.slice(0, 12).map((j) => (
                        <Link href={`/junction/${j.id}`} key={j.id} style={{
                            padding: '0.75rem', borderRadius: 10, textDecoration: 'none', color: 'inherit',
                            background: 'rgba(0,0,0,0.2)', border: `1px solid ${getCongestionColor(j.congestion)}30`,
                            transition: 'all 0.2s ease',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f1f5f9' }}>{j.name.length > 18 ? j.name.substring(0, 18) + '...' : j.name}</span>
                                <span style={{
                                    fontSize: '0.6875rem', fontWeight: 700, padding: '1px 6px', borderRadius: 6,
                                    background: getCongestionColor(j.congestion) + '20', color: getCongestionColor(j.congestion),
                                }}>{j.congestion}%</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12, fontSize: '0.6875rem', color: '#64748b' }}>
                                <span>🚗 {j.vehicles}</span>
                                <span>⚡ {j.speed} km/h</span>
                            </div>
                            {/* Mini congestion bar */}
                            <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                <div style={{ height: '100%', width: `${j.congestion}%`, borderRadius: 2, background: getCongestionColor(j.congestion), transition: 'width 1s ease' }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
