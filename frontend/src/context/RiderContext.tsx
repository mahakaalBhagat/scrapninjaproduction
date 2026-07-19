'use client';

import React, { createContext, useContext, useState } from 'react';
import { Rider, OrderTracking, RiderAssignmentRequest } from '@/types/rider';

interface RiderContextType {
  currentRider: Rider | null;
  orderTracking: OrderTracking | null;
  assignRider: (request: RiderAssignmentRequest) => Promise<Rider>;
  updateRiderLocation: (location: OrderTracking['currentLocation']) => void;
  completeDelivery: () => void;
  getRiderByOrder: (orderId: string) => OrderTracking | null;
}

const RiderContext = createContext<RiderContextType | undefined>(undefined);

// Mock rider data
const mockRiders: Rider[] = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    phone: '+971501234567',
    avatar: '👨‍💼',
    rating: 4.9,
    totalDeliveries: 1247,
    vehicle: 'Honda Civic',
    licensePlate: 'RG-123456',
    currentLocation: {
      latitude: 25.2048,
      longitude: 55.2708,
      address: 'Dubai Marina, Dubai',
    },
    status: 'available',
  },
  {
    id: 2,
    name: 'Fatima Al-Qasimi',
    phone: '+971501234568',
    avatar: '👩‍💼',
    rating: 4.8,
    totalDeliveries: 985,
    vehicle: 'Toyota Yaris',
    licensePlate: 'RG-123457',
    currentLocation: {
      latitude: 25.1972,
      longitude: 55.2744,
      address: 'Downtown Dubai, Dubai',
    },
    status: 'available',
  },
  {
    id: 3,
    name: 'Mohammed Al-Khaleej',
    phone: '+971501234569',
    avatar: '👨‍🔧',
    rating: 4.7,
    totalDeliveries: 1123,
    vehicle: 'Nissan Sentra',
    licensePlate: 'RG-123458',
    currentLocation: {
      latitude: 25.2854,
      longitude: 55.3624,
      address: 'Deira, Dubai',
    },
    status: 'available',
  },
  {
    id: 4,
    name: 'Layla Al-Shamsi',
    phone: '+971501234570',
    avatar: '👩‍🔧',
    rating: 4.9,
    totalDeliveries: 1456,
    vehicle: 'Hyundai Elantra',
    licensePlate: 'RG-123459',
    currentLocation: {
      latitude: 25.1453,
      longitude: 55.2308,
      address: 'Bur Dubai, Dubai',
    },
    status: 'available',
  },
  {
    id: 5,
    name: 'Hassan Al-Maktoum',
    phone: '+971501234571',
    avatar: '👨‍💻',
    rating: 4.6,
    totalDeliveries: 876,
    vehicle: 'Kia Cerato',
    licensePlate: 'RG-123460',
    currentLocation: {
      latitude: 25.3521,
      longitude: 55.3988,
      address: 'Abu Shagara, Dubai',
    },
    status: 'available',
  },
];

export const RiderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRider, setCurrentRider] = useState<Rider | null>(null);
  const [orderTracking, setOrderTracking] = useState<OrderTracking | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<Map<string, OrderTracking>>(new Map());

  const assignRider = async (request: RiderAssignmentRequest): Promise<Rider> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Pick a random available rider
    const randomRider = mockRiders[Math.floor(Math.random() * mockRiders.length)];
    const assignedRider = { ...randomRider, status: 'on-pickup' as const };

    // Create order tracking
    const newTracking: OrderTracking = {
      orderId: request.orderId,
      rider: assignedRider,
      currentLocation: {
        ...assignedRider.currentLocation,
        timestamp: new Date().toISOString(),
      },
      estimatedArrivalTime: Math.floor(Math.random() * 15) + 5, // 5-20 mins
      distance: Math.floor(Math.random() * 5) + 1, // 1-5 km
      status: 'rider-assigned',
      timeline: {
        orderPlaced: new Date().toISOString(),
        riderAssigned: new Date().toISOString(),
      },
      locationHistory: [{
        ...assignedRider.currentLocation,
        timestamp: new Date().toISOString(),
      }],
    };

    setCurrentRider(assignedRider);
    setOrderTracking(newTracking);
    
    // Store in map for later retrieval
    setAssignedOrders((prev) => new Map(prev).set(request.orderId, newTracking));

    return assignedRider;
  };

  const updateRiderLocation = (location: OrderTracking['currentLocation']) => {
    if (orderTracking) {
      const updated: OrderTracking = {
        ...orderTracking,
        currentLocation: location,
        locationHistory: [...orderTracking.locationHistory, location],
        estimatedArrivalTime: Math.max(0, orderTracking.estimatedArrivalTime - 1),
      };
      setOrderTracking(updated);

      if (currentRider) {
        setCurrentRider((prev) =>
          prev ? { ...prev, currentLocation: location } : null
        );
      }
    }
  };

  const completeDelivery = () => {
    if (orderTracking && currentRider) {
      const updated: OrderTracking = {
        ...orderTracking,
        status: 'completed',
        timeline: {
          ...orderTracking.timeline,
          completed: new Date().toISOString(),
        },
      };
      setOrderTracking(updated);
      setCurrentRider((prev) => (prev ? { ...prev, status: 'available' } : null));
    }
  };

  const getRiderByOrder = (orderId: string): OrderTracking | null => {
    return assignedOrders.get(orderId) || null;
  };

  return (
    <RiderContext.Provider
      value={{
        currentRider,
        orderTracking,
        assignRider,
        updateRiderLocation,
        completeDelivery,
        getRiderByOrder,
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};

export const useRider = () => {
  const context = useContext(RiderContext);
  if (!context) {
    throw new Error('useRider must be used within RiderProvider');
  }
  return context;
};
