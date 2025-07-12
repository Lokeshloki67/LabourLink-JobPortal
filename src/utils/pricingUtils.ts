import { laborPricing } from '../data/districts';
import { ServicePricing } from '../types';

// Calculate service cost based on various factors
export const calculateServiceCost = (
  laborType: string,
  duration: number = 4, // hours
  urgency: 'normal' | 'urgent' | 'emergency' = 'normal',
  distance: number = 0, // kilometers
  materialCost: number = 0,
  extraServices: string[] = []
): number => {
  const pricing = laborPricing[laborType] || laborPricing.default;
  
  let totalCost = 0;
  
  // Base service cost
  if (duration <= 4) {
    totalCost += pricing.basePrice;
  } else {
    totalCost += pricing.basePrice + (duration - 4) * pricing.hourlyRate;
  }
  
  // Urgency multiplier
  switch (urgency) {
    case 'urgent':
      totalCost *= 1.3; // 30% extra
      break;
    case 'emergency':
      totalCost *= 1.5; // 50% extra
      break;
  }
  
  // Distance charges (₹10 per km beyond 5km)
  if (distance > 5) {
    totalCost += (distance - 5) * 10;
  }
  
  // Material cost
  totalCost += materialCost;
  
  // Extra services (20% of base price each)
  totalCost += extraServices.length * (pricing.basePrice * 0.2);
  
  return Math.round(totalCost);
};

// Get pricing breakdown for transparency
export const getPricingBreakdown = (
  laborType: string,
  duration: number = 4,
  urgency: 'normal' | 'urgent' | 'emergency' = 'normal',
  distance: number = 0,
  materialCost: number = 0,
  extraServices: string[] = []
) => {
  const pricing = laborPricing[laborType] || laborPricing.default;
  
  const breakdown = {
    baseService: 0,
    additionalHours: 0,
    urgencyCharge: 0,
    travelCharge: 0,
    materialCost: materialCost,
    extraServices: 0,
    total: 0
  };
  
  // Base service
  breakdown.baseService = pricing.basePrice;
  
  // Additional hours
  if (duration > 4) {
    breakdown.additionalHours = (duration - 4) * pricing.hourlyRate;
  }
  
  // Subtotal before multipliers
  let subtotal = breakdown.baseService + breakdown.additionalHours;
  
  // Urgency charges
  switch (urgency) {
    case 'urgent':
      breakdown.urgencyCharge = subtotal * 0.3;
      break;
    case 'emergency':
      breakdown.urgencyCharge = subtotal * 0.5;
      break;
  }
  
  // Travel charges
  if (distance > 5) {
    breakdown.travelCharge = (distance - 5) * 10;
  }
  
  // Extra services
  breakdown.extraServices = extraServices.length * (pricing.basePrice * 0.2);
  
  // Total
  breakdown.total = Math.round(
    subtotal + 
    breakdown.urgencyCharge + 
    breakdown.travelCharge + 
    breakdown.materialCost + 
    breakdown.extraServices
  );
  
  return breakdown;
};

// Get estimated time for service
export const getEstimatedServiceTime = (laborType: string, extraServices: string[] = []): string => {
  const baseTimes: { [key: string]: number } = {
    'Electrician': 3,
    'Plumber': 2.5,
    'Carpenter': 6,
    'Painter': 8,
    'Cleaner': 4,
    'AC Technician': 2,
    'Computer Technician': 1.5,
    'Car Mechanic': 3,
    'Beautician': 2,
    'Cook': 4,
    'default': 3
  };
  
  const baseTime = baseTimes[laborType] || baseTimes.default;
  const extraTime = extraServices.length * 0.5; // 30 minutes per extra service
  
  const totalHours = baseTime + extraTime;
  
  if (totalHours < 1) {
    return `${Math.round(totalHours * 60)} minutes`;
  } else if (totalHours < 2) {
    return `${Math.floor(totalHours)} hour ${Math.round((totalHours % 1) * 60)} minutes`;
  } else {
    return `${Math.round(totalHours)} hours`;
  }
};

// Get service availability based on time and urgency
export const getServiceAvailability = (urgency: 'normal' | 'urgent' | 'emergency'): string => {
  const now = new Date();
  const hour = now.getHours();
  
  switch (urgency) {
    case 'emergency':
      return 'Available 24/7';
    case 'urgent':
      if (hour >= 6 && hour <= 22) {
        return 'Available within 2 hours';
      } else {
        return 'Available from 6:00 AM';
      }
    default:
      if (hour >= 8 && hour <= 18) {
        return 'Available today';
      } else {
        return 'Available tomorrow';
      }
  }
};