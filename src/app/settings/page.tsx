'use client';
import { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, Bell, Globe, Database, Key, Palette } from 'lucide-react';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(true);
    const [refreshRate, setRefreshRate] = useState('30');
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="animate-fade-in" style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <SettingsIcon size={24} style={{ display: 'inline', marginRight: 8 }} />
                <span className="gradient-text">Settings</span>
            </h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>Configure platform preferences, API keys, and display options</p>

            {/* Theme */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Palette size={18} color="#8b5cf6" /> Appearance
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Dark Mode</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Toggle between dark and light theme</div>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} style={{
                        width: 52, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative',
                        background: darkMode ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#475569',
                    }}>
                        <div style={{
                            width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 3,
                            left: darkMode ? 27 : 3, transition: 'left 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {darkMode ? <Moon size={12} color="#3b82f6" /> : <Sun size={12} color="#f59e0b" />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Data refresh */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Database size={18} color="#06b6d4" /> Data Settings
                </h3>
                <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 6 }}>Refresh Rate</div>
                    <select value={refreshRate} onChange={e => setRefreshRate(e.target.value)} style={{
                        padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#f1f5f9', fontSize: '0.875rem', outline: 'none', width: '100%',
                    }}>
                        <option value="15">15 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Push Notifications</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Receive alerts for critical events</div>
                    </div>
                    <button onClick={() => setNotifications(!notifications)} style={{
                        width: 52, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative',
                        background: notifications ? 'linear-gradient(135deg, #10b981, #06b6d4)' : '#475569',
                    }}>
                        <div style={{
                            width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 3,
                            left: notifications ? 27 : 3, transition: 'left 0.2s ease',
                        }} />
                    </button>
                </div>
            </div>

            {/* API Keys */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Key size={18} color="#f59e0b" /> API Configuration
                </h3>
                {['TomTom Traffic API', 'Google Maps API', 'OpenAI API', 'Grok API'].map(api => (
                    <div key={api} style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10, marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 4 }}>{api}</div>
                        <input type="password" defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx" style={{
                            width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.1)', color: '#64748b', fontSize: '0.8125rem', outline: 'none',
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
