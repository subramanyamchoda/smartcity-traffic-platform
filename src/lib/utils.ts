export function cn(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

export function getCongestionColor(value: number): string {
    if (value >= 80) return '#ef4444';
    if (value >= 60) return '#f97316';
    if (value >= 40) return '#f59e0b';
    if (value >= 20) return '#10b981';
    return '#06b6d4';
}

export function getCongestionLabel(value: number): string {
    if (value >= 80) return 'Critical';
    if (value >= 60) return 'High';
    if (value >= 40) return 'Moderate';
    if (value >= 20) return 'Low';
    return 'Free Flow';
}

export function getCongestionClass(value: number): string {
    if (value >= 80) return 'congestion-critical';
    if (value >= 60) return 'congestion-high';
    if (value >= 40) return 'congestion-moderate';
    return 'congestion-low';
}

export function formatNumber(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
}

export function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function generateSimulatedData() {
    const congestion = randomBetween(15, 85);
    return {
        congestion: Math.round(congestion * 10) / 10,
        vehicleCount: Math.round(randomBetween(50, 500)),
        avgSpeed: Math.round(Math.max(5, 60 - congestion * 0.5) * 10) / 10,
        queueLength: Math.round(randomBetween(0, 50) * 10) / 10,
        cars: Math.round(randomBetween(20, 200)),
        buses: Math.round(randomBetween(2, 30)),
        trucks: Math.round(randomBetween(3, 40)),
        bikes: Math.round(randomBetween(10, 100)),
        autoRickshaws: Math.round(randomBetween(5, 60)),
        co2: Math.round(randomBetween(350, 600)),
        aqi: Math.round(randomBetween(30, 200)),
        temperature: Math.round(randomBetween(25, 42) * 10) / 10,
    };
}
