export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'customer' | 'labour';
  name: string;
  phone?: string;
  district?: string;
  skill?: string;
  experience?: string;
  rating?: number;
}

export interface Laborer {
  id: number;
  name: string;
  skill: string;
  district: string;
  phone: string;
  experience: string;
  rating: number;
  available: boolean;
  userId: number;
  specializations?: string[];
  certifications?: string[];
  languages?: string[];
  workingHours?: string;
  emergencyAvailable?: boolean;
}

export interface CustomerRequest {
  id: number;
  customerId: number;
  customerName: string;
  phone: string;
  district: string;
  address: string;
  laborType: string;
  extraWorkTypes: string[];
  timestamp: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  assignedLaborerId?: number;
  rating?: number;
  feedback?: string;
  urgency?: 'normal' | 'urgent' | 'emergency';
  preferredTime?: string;
  estimatedCost?: number;
  actualCost?: number;
  workDescription?: string;
  customerLocation?: {
    latitude?: number;
    longitude?: number;
    landmark?: string;
  };
}

export interface Assignment {
  id: number;
  customer: CustomerRequest;
  laborer: Laborer;
  assignedAt: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  earnings?: number;
  startTime?: string;
  endTime?: string;
  workPhotos?: string[];
  customerFeedback?: string;
  laborerNotes?: string;
  distance?: number; // in kilometers
  travelTime?: number; // in minutes
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface ServicePricing {
  basePrice: number;
  hourlyRate: number;
  emergencyRate: number;
  materialCost?: number;
  transportCost?: number;
}

export interface LocationData {
  district: string;
  nearbyDistricts: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}