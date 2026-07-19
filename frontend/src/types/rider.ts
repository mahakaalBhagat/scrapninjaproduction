// Rider and tracking types
export interface Rider {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  totalDeliveries: number;
  vehicle: string;
  licensePlate: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'available' | 'on-pickup' | 'en-route' | 'completed' | 'cancelled';
}

export interface OrderTracking {
  orderId: string;
  rider?: Rider;
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
  };
  estimatedArrivalTime: number; // minutes
  distance: number; // km
  status: 'pending' | 'rider-assigned' | 'en-route' | 'arrived' | 'completed' | 'cancelled';
  timeline: {
    orderPlaced: string;
    riderAssigned?: string;
    pickupStarted?: string;
    onRoute?: string;
    arrived?: string;
    completed?: string;
  };
  locationHistory: Array<{
    latitude: number;
    longitude: number;
    timestamp: string;
    address: string;
  }>;
}

export interface RiderAssignmentRequest {
  orderId: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  pickupTimeSlot: string;
  customerPhone: string;
  cartValue: number;
  itemCount: number;
}
