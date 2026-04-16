// Ongole City Junctions
export const ONGOLE_JUNCTIONS = [
  { id: 1, junction_id: 'ONG-J01', name: 'Kurnool Road Junction', lat: 15.5057, lng: 80.0499, zone: 'Central', road: 'NH-16 / Kurnool Road' },
  { id: 2, junction_id: 'ONG-J02', name: 'Trunk Road Circle', lat: 15.5040, lng: 80.0510, zone: 'Central', road: 'Trunk Road' },
  { id: 3, junction_id: 'ONG-J03', name: 'Court Centre Junction', lat: 15.5030, lng: 80.0520, zone: 'Central', road: 'Court Road' },
  { id: 4, junction_id: 'ONG-J04', name: 'Bus Stand Junction', lat: 15.5065, lng: 80.0485, zone: 'Transport Hub', road: 'Bus Stand Road' },
  { id: 5, junction_id: 'ONG-J05', name: 'Railway Station Road', lat: 15.5090, lng: 80.0460, zone: 'Transport Hub', road: 'Station Road' },
  { id: 6, junction_id: 'ONG-J06', name: 'Bhagyanagar Junction', lat: 15.5020, lng: 80.0530, zone: 'Residential', road: 'Bhagyanagar Road' },
  { id: 7, junction_id: 'ONG-J07', name: 'Magistrate Road Junction', lat: 15.5050, lng: 80.0480, zone: 'Commercial', road: 'Magistrate Road' },
  { id: 8, junction_id: 'ONG-J08', name: 'Gandhi Nagar Circle', lat: 15.5010, lng: 80.0540, zone: 'Residential', road: 'Gandhi Nagar' },
  { id: 9, junction_id: 'ONG-J09', name: 'Prakasam Bhavan Junction', lat: 15.5070, lng: 80.0470, zone: 'Government', road: 'Collectorate Road' },
  { id: 10, junction_id: 'ONG-J10', name: 'Santhi Nagar Junction', lat: 15.5000, lng: 80.0550, zone: 'Residential', road: 'Santhi Nagar Road' },
  { id: 11, junction_id: 'ONG-J11', name: 'Hospital Road Junction', lat: 15.5080, lng: 80.0505, zone: 'Hospital Area', road: 'Hospital Road' },
  { id: 12, junction_id: 'ONG-J12', name: 'Market Centre', lat: 15.5035, lng: 80.0495, zone: 'Commercial', road: 'Market Road' },
  { id: 13, junction_id: 'ONG-J13', name: 'Balaji Nagar Junction', lat: 15.4990, lng: 80.0560, zone: 'Residential', road: 'Balaji Nagar Road' },
  { id: 14, junction_id: 'ONG-J14', name: 'Bandlamitta Junction', lat: 15.5100, lng: 80.0440, zone: 'Highway', road: 'NH-16 Bypass' },
  { id: 15, junction_id: 'ONG-J15', name: 'Mangamuru Road Junction', lat: 15.4980, lng: 80.0430, zone: 'Residential', road: 'Mangamuru Road' },
  { id: 16, junction_id: 'ONG-J16', name: 'Vengamukkapalli Junction', lat: 15.5120, lng: 80.0420, zone: 'Highway', road: 'NH-16' },
  { id: 17, junction_id: 'ONG-J17', name: 'Santhapet Junction', lat: 15.5045, lng: 80.0515, zone: 'Commercial', road: 'Santhapet Road' },
  { id: 18, junction_id: 'ONG-J18', name: 'Kothapatnam Road Junction', lat: 15.4970, lng: 80.0570, zone: 'Outskirts', road: 'Kothapatnam Road' },
  { id: 19, junction_id: 'ONG-J19', name: 'Addanki Road Junction', lat: 15.5110, lng: 80.0550, zone: 'Highway', road: 'Addanki Road' },
  { id: 20, junction_id: 'ONG-J20', name: 'Chirala Road Junction', lat: 15.5130, lng: 80.0470, zone: 'Highway', road: 'NH-16 North' },
  { id: 21, junction_id: 'ONG-J21', name: 'Parchur Road Junction', lat: 15.4960, lng: 80.0580, zone: 'Outskirts', road: 'Parchur Road' },
  { id: 22, junction_id: 'ONG-J22', name: 'Ongole-Markapur Road', lat: 15.5075, lng: 80.0410, zone: 'Highway', road: 'Markapur Road' },
  { id: 23, junction_id: 'ONG-J23', name: 'School Zone Junction', lat: 15.5025, lng: 80.0505, zone: 'School Area', road: 'School Road' },
  { id: 24, junction_id: 'ONG-J24', name: 'Swetha Mahal Junction', lat: 15.5060, lng: 80.0525, zone: 'Commercial', road: 'Swetha Mahal Road' },
  { id: 25, junction_id: 'ONG-J25', name: 'Vivekananda Nagar Junction', lat: 15.5015, lng: 80.0555, zone: 'Residential', road: 'Vivekananda Nagar' },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
export const TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || '';

export const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: 'Home' },
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Live Map', href: '/live-map', icon: 'Map' },
  { name: 'Junction Control', href: '/junction-control', icon: 'GitBranch' },
  { name: 'AI Analytics', href: '/ai-analytics', icon: 'Brain' },
  { name: 'AI Controller', href: '/ai-controller', icon: 'Cpu' },
  { name: 'Camera Monitor', href: '/camera-monitoring', icon: 'Camera' },
  { name: 'IoT Simulation', href: '/iot-simulation', icon: 'Wifi' },
  { name: 'Public Transport', href: '/public-transport', icon: 'Bus' },
  { name: 'Parking', href: '/parking', icon: 'ParkingCircle' },
  { name: 'Route Optimizer', href: '/route-optimization', icon: 'Route' },
  { name: 'Alerts', href: '/alerts', icon: 'Bell' },
  { name: 'Reports', href: '/reports', icon: 'FileText' },
  { name: 'Security', href: '/security', icon: 'Shield' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
  { name: 'About', href: '/about', icon: 'Info' },
];
