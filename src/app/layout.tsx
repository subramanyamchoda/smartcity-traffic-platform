import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Ongole AI Smart Traffic Digital Twin Platform",
  description: "AI-powered Smart Traffic Monitoring & Control system for Ongole City, Andhra Pradesh. Real-time traffic management using LSTM, RL, YOLOv8 and Digital Twin technology.",
  keywords: "Ongole, smart traffic, AI, digital twin, traffic monitoring, Andhra Pradesh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, marginLeft: '260px', padding: '1rem', minHeight: '100vh', overflow: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
