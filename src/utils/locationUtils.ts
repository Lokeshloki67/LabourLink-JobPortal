import { tamilNaduDistricts } from '../data/districts';

// District proximity mapping for nearby location assignment
export const districtProximity: { [key: string]: string[] } = {
  'Chennai': ['Tiruvallur', 'Kanchipuram', 'Chengalpattu', 'Ranipet'],
  'Coimbatore': ['Tiruppur', 'Erode', 'Nilgiris (Udhagamandalam)', 'Karur'],
  'Madurai': ['Dindigul', 'Theni', 'Virudhunagar', 'Sivaganga'],
  'Salem': ['Namakkal', 'Dharmapuri', 'Erode', 'Krishnagiri'],
  'Erode': ['Salem', 'Namakkal', 'Karur', 'Coimbatore', 'Tiruppur'],
  'Vellore': ['Tirupathur', 'Krishnagiri', 'Dharmapuri', 'Ranipet'],
  'Tiruppur': ['Coimbatore', 'Erode', 'Karur', 'Dindigul'],
  'Thanjavur': ['Tiruvarur', 'Nagapattinam', 'Pudukkottai', 'Tiruchirappalli (Trichy)'],
  'Tiruchirappalli (Trichy)': ['Thanjavur', 'Pudukkottai', 'Karur', 'Perambalur'],
  'Tirunelveli': ['Tenkasi', 'Thoothukudi (Tuticorin)', 'Virudhunagar', 'Kanyakumari'],
  'Kanchipuram': ['Chennai', 'Chengalpattu', 'Tiruvallur', 'Vellore'],
  'Cuddalore': ['Viluppuram', 'Kallakurichi', 'Chengalpattu', 'Mayiladuthurai'],
  'Dharmapuri': ['Salem', 'Krishnagiri', 'Vellore', 'Tirupathur'],
  'Dindigul': ['Madurai', 'Theni', 'Tiruppur', 'Karur'],
  'Kallakurichi': ['Viluppuram', 'Cuddalore', 'Salem', 'Tiruvannamalai'],
  'Karur': ['Tiruchirappalli (Trichy)', 'Erode', 'Dindigul', 'Namakkal'],
  'Krishnagiri': ['Dharmapuri', 'Vellore', 'Tirupathur', 'Salem'],
  'Mayiladuthurai': ['Nagapattinam', 'Thanjavur', 'Tiruvarur', 'Cuddalore'],
  'Nagapattinam': ['Mayiladuthurai', 'Thanjavur', 'Tiruvarur'],
  'Namakkal': ['Salem', 'Erode', 'Karur', 'Tiruchirappalli (Trichy)'],
  'Nilgiris (Udhagamandalam)': ['Coimbatore', 'Erode'],
  'Perambalur': ['Tiruchirappalli (Trichy)', 'Ariyalur', 'Cuddalore'],
  'Pudukkottai': ['Thanjavur', 'Tiruchirappalli (Trichy)', 'Sivaganga', 'Ramanathapuram'],
  'Ramanathapuram': ['Pudukkottai', 'Sivaganga', 'Virudhunagar'],
  'Ranipet': ['Vellore', 'Tirupathur', 'Chennai', 'Tiruvallur'],
  'Sivaganga': ['Madurai', 'Pudukkottai', 'Ramanathapuram', 'Virudhunagar'],
  'Tenkasi': ['Tirunelveli', 'Virudhunagar', 'Theni'],
  'Theni': ['Madurai', 'Dindigul', 'Tenkasi', 'Virudhunagar'],
  'Thoothukudi (Tuticorin)': ['Tirunelveli', 'Virudhunagar'],
  'Tirupathur': ['Vellore', 'Krishnagiri', 'Dharmapuri', 'Ranipet'],
  'Tiruvallur': ['Chennai', 'Kanchipuram', 'Ranipet', 'Vellore'],
  'Tiruvannamalai': ['Vellore', 'Kallakurichi', 'Viluppuram', 'Kanchipuram'],
  'Tiruvarur': ['Thanjavur', 'Nagapattinam', 'Mayiladuthurai'],
  'Viluppuram': ['Kallakurichi', 'Cuddalore', 'Tiruvannamalai', 'Kanchipuram'],
  'Virudhunagar': ['Madurai', 'Sivaganga', 'Ramanathapuram', 'Tenkasi', 'Theni', 'Tirunelveli'],
  'Ariyalur': ['Perambalur', 'Tiruchirappalli (Trichy)', 'Thanjavur'],
  'Chengalpattu': ['Chennai', 'Kanchipuram', 'Tiruvallur', 'Cuddalore'],
  'Kanyakumari': ['Tirunelveli', 'Tenkasi']
};

// Get nearby districts for a given district
export const getNearbyDistricts = (district: string): string[] => {
  return districtProximity[district] || [];
};

// Calculate distance between two districts (simplified)
export const calculateDistrictDistance = (district1: string, district2: string): number => {
  if (district1 === district2) return 0;
  
  const nearby = getNearbyDistricts(district1);
  if (nearby.includes(district2)) return 1; // Adjacent districts
  
  // Check if district2 is nearby to any of district1's neighbors
  for (const neighbor of nearby) {
    const neighborNearby = getNearbyDistricts(neighbor);
    if (neighborNearby.includes(district2)) return 2; // Two districts away
  }
  
  return 3; // Far districts
};

// Check if a laborer can serve a customer location
export const canServeLocation = (laborerDistrict: string, customerDistrict: string): boolean => {
  const distance = calculateDistrictDistance(laborerDistrict, customerDistrict);
  return distance <= 2; // Can serve same district, adjacent, or one district away
};

// Get all districts a laborer can serve
export const getServiceableDistricts = (laborerDistrict: string): string[] => {
  const serviceable = [laborerDistrict]; // Can always serve own district
  const nearby = getNearbyDistricts(laborerDistrict);
  serviceable.push(...nearby);
  
  // Add districts that are one step away from nearby districts
  nearby.forEach(district => {
    const secondLevel = getNearbyDistricts(district);
    secondLevel.forEach(d => {
      if (!serviceable.includes(d)) {
        serviceable.push(d);
      }
    });
  });
  
  return serviceable;
};

// Priority scoring for laborer assignment
export const calculateAssignmentScore = (
  laborer: any,
  customerDistrict: string,
  urgency: 'normal' | 'urgent' | 'emergency' = 'normal'
): number => {
  let score = 0;
  
  // Distance factor (higher score for closer distance)
  const distance = calculateDistrictDistance(laborer.district, customerDistrict);
  switch (distance) {
    case 0: score += 100; break; // Same district
    case 1: score += 80; break;  // Adjacent district
    case 2: score += 60; break;  // Two districts away
    default: score += 0; break;  // Too far
  }
  
  // Rating factor
  score += laborer.rating * 10;
  
  // Availability factor
  if (laborer.available) score += 50;
  if (laborer.emergencyAvailable && urgency === 'emergency') score += 30;
  
  // Experience factor (extract years from experience string)
  const experienceYears = parseInt(laborer.experience) || 1;
  score += Math.min(experienceYears * 2, 20); // Max 20 points for experience
  
  return score;
};