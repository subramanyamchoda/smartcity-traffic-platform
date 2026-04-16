'use client';
import { useState, useEffect } from 'react';
import { randomBetween } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Wifi, Battery, Thermometer, Wind, Activity, Gauge, Radio } from 'lucide-react';

export default function IoTSimulationPage() {
    const [sensorData, setSensorData] = useState({
        totalSensors: 125, activeSensors: 118, avgBattery: 78.5,
        vehicleCount: Math.round(randomBetween(800, 2000)),
        avgSpeed: Math.round(randomBetween(25, 45) * 10) / 10,
        avgQueue: Math.round(randomBetween(10, 40) * 10) / 10,
        aqi: Math.round(randomBetween(40, 180)),
        co2: Math.round(randomBetween(350, 600)),
    });

    const sensorTypes = [
        { type: 'Vehicle Counters', count: 25, active: 24, icon: Activity, color: '#3b82f6' },
        { type: 'Speed Sensors', count: 25, active: 23, icon: Gauge, color: '#06b6d4' },
        { type: 'Queue Sensors', count: 25, active: 24, icon: Radio, color: '#8b5cf6' },
        { type: 'Air Quality', count: 25, active: 25, icon: Wind, color: '#10b981' },
        { type: 'CO₂ Monitors', count: 25, active: 22, icon: Thermometer, color: '#f59e0b' },
    ];

    const [history, setHistory] = useState(Array.from({ length: 30 }, (_, i) => ({
        time: `${i}m`, vehicles: Math.round(randomBetween(50, 200)),
        speed: Math.round(randomBetween(15, 55)), aqi: Math.round(randomBetween(40, 180)),
    })));

    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData(prev => ({
                ...prev,
                vehicleCount: Math.max(100, prev.vehicleCount + Math.round(randomBetween(-50, 50))),
                avgSpeed: Math.max(5, Math.min(60, prev.avgSpeed + randomBetween(-2, 2))),
                aqi: Math.max(20, Math.min(300, prev.aqi + Math.round(randomBetween(-10, 10)))),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>IoT <span className="gradient-text">Simulation</span></h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Simulated IoT sensor network across 25 junctions</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {sensorTypes.map(s => (
                    <div key={s.type} className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                        <s.icon size={24} color={s.color} style={{ margin: '0 auto 0.5rem' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.active}/{s.count}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{s.type}</div>
                        <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', width: `${(s.active / s.count) * 100}%`, borderRadius: 2, background: s.color }} />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>📊 Sensor Readings (30 min)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={history}>
                            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
                            <Area type="monotone" dataKey="vehicles" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" strokeWidth={2} />
                            <Area type="monotone" dataKey="speed" stroke="#10b981" fill="rgba(16,185,129,0.1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1rem' }}>📡 Network Status</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {[
                            { label: 'Total Sensors', value: sensorData.totalSensors, icon: Wifi, color: '#3b82f6' },
                            { label: 'Active', value: sensorData.activeSensors, icon: Activity, color: '#10b981' },
                            { label: 'Avg Battery', value: `${sensorData.avgBattery}%`, icon: Battery, color: '#f59e0b' },
                            { label: 'Readings/min', value: Math.round(randomBetween(200, 500)), icon: Radio, color: '#8b5cf6' },
                        ].map(s => (
                            <div key={s.label} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, textAlign: 'center' }}>
                                <s.icon size={20} color={s.color} style={{ margin: '0 auto 6px' }} />
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
