'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { Home, LayoutDashboard, Map, GitBranch, Brain, Cpu, Camera, Wifi, Bus, ParkingCircle, Route, Bell, FileText, Shield, Settings, Info } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    Home, LayoutDashboard, Map, GitBranch, Brain, Cpu, Camera, Wifi, Bus, ParkingCircle, Route, Bell, FileText, Shield, Settings, Info
};

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', zIndex: 50,
            background: 'rgba(10, 14, 26, 0.95)', backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
        }}>
            {/* Logo */}
            <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.25rem', fontWeight: 800, color: 'white',
                        boxShadow: '0 0 20px rgba(59,130,246,0.4)',
                    }}>
                        OT
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#f1f5f9', lineHeight: 1.2 }}>Ongole Traffic</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500 }}>AI Digital Twin</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {NAV_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon] || Home;
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                            <Icon size={18} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={{
                padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.6875rem', color: '#475569', textAlign: 'center',
            }}>
                <div style={{ fontWeight: 600 }}>Ongole Smart City</div>
                <div>Prakasam District, AP</div>
                <div style={{ marginTop: 4, color: '#3b82f6' }}>v2.0 — AI Powered</div>
            </div>
        </aside>
    );
}
