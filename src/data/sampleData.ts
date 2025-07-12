import type { User, Laborer } from '../types';
import { tamilNaduDistricts, laborTypes } from './districts';

export const sampleUsers: User[] = [
  // Admin
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
  
  // Customers
  { id: 2, username: 'customer1', password: 'pass123', role: 'customer', name: 'Rajesh Kumar', phone: '+91-9876543210' },
  { id: 3, username: 'customer2', password: 'pass123', role: 'customer', name: 'Priya Sharma', phone: '+91-9876543211' },
  { id: 4, username: 'customer3', password: 'pass123', role: 'customer', name: 'Arun Krishnan', phone: '+91-9876543212' },
  
  // Laborers - Comprehensive list across all districts
  { id: 100, username: 'john_electrician', password: 'pass123', role: 'labour', name: 'John Smith', phone: '+91-9876543213', district: 'Chennai', skill: 'Electrician', experience: '5 years', rating: 4.8 },
  { id: 101, username: 'maria_plumber', password: 'pass123', role: 'labour', name: 'Maria Garcia', phone: '+91-9876543214', district: 'Chennai', skill: 'Plumber', experience: '3 years', rating: 4.6 },
  { id: 102, username: 'david_carpenter', password: 'pass123', role: 'labour', name: 'David Johnson', phone: '+91-9876543215', district: 'Chennai', skill: 'Carpenter', experience: '7 years', rating: 4.9 },
  { id: 103, username: 'sarah_painter', password: 'pass123', role: 'labour', name: 'Sarah Wilson', phone: '+91-9876543216', district: 'Chennai', skill: 'Painter', experience: '4 years', rating: 4.7 },
  { id: 104, username: 'michael_ac', password: 'pass123', role: 'labour', name: 'Michael Brown', phone: '+91-9876543217', district: 'Chennai', skill: 'AC Technician', experience: '6 years', rating: 4.5 },
  
  // Coimbatore workers
  { id: 105, username: 'lisa_cleaner', password: 'pass123', role: 'labour', name: 'Lisa Davis', phone: '+91-9876543218', district: 'Coimbatore', skill: 'Cleaner', experience: '2 years', rating: 4.4 },
  { id: 106, username: 'robert_mechanic', password: 'pass123', role: 'labour', name: 'Robert Miller', phone: '+91-9876543219', district: 'Coimbatore', skill: 'Car Mechanic', experience: '8 years', rating: 4.8 },
  { id: 107, username: 'jennifer_cook', password: 'pass123', role: 'labour', name: 'Jennifer Taylor', phone: '+91-9876543220', district: 'Coimbatore', skill: 'Cook', experience: '3 years', rating: 4.6 },
  { id: 108, username: 'james_welder', password: 'pass123', role: 'labour', name: 'James Anderson', phone: '+91-9876543221', district: 'Coimbatore', skill: 'Welder', experience: '5 years', rating: 4.7 },
  { id: 109, username: 'emma_beautician', password: 'pass123', role: 'labour', name: 'Emma Thompson', phone: '+91-9876543222', district: 'Coimbatore', skill: 'Beautician', experience: '4 years', rating: 4.5 },
  
  // Madurai workers
  { id: 110, username: 'william_mason', password: 'pass123', role: 'labour', name: 'William Garcia', phone: '+91-9876543223', district: 'Madurai', skill: 'Mason', experience: '6 years', rating: 4.6 },
  { id: 111, username: 'olivia_tutor', password: 'pass123', role: 'labour', name: 'Olivia Martinez', phone: '+91-9876543224', district: 'Madurai', skill: 'Tutor', experience: '3 years', rating: 4.8 },
  { id: 112, username: 'benjamin_driver', password: 'pass123', role: 'labour', name: 'Benjamin Rodriguez', phone: '+91-9876543225', district: 'Madurai', skill: 'Driver', experience: '7 years', rating: 4.4 },
  { id: 113, username: 'sophia_gardener', password: 'pass123', role: 'labour', name: 'Sophia Lee', phone: '+91-9876543226', district: 'Madurai', skill: 'Gardener', experience: '2 years', rating: 4.3 },
  { id: 114, username: 'alexander_security', password: 'pass123', role: 'labour', name: 'Alexander Walker', phone: '+91-9876543227', district: 'Madurai', skill: 'Security Guard', experience: '5 years', rating: 4.5 },
  
  // Salem workers
  { id: 115, username: 'charlotte_housekeeper', password: 'pass123', role: 'labour', name: 'Charlotte Hall', phone: '+91-9876543228', district: 'Salem', skill: 'Housekeeper', experience: '4 years', rating: 4.7 },
  { id: 116, username: 'daniel_photographer', password: 'pass123', role: 'labour', name: 'Daniel Allen', phone: '+91-9876543229', district: 'Salem', skill: 'Photographer', experience: '6 years', rating: 4.9 },
  { id: 117, username: 'amelia_tailor', password: 'pass123', role: 'labour', name: 'Amelia Young', phone: '+91-9876543230', district: 'Salem', skill: 'Tailor', experience: '8 years', rating: 4.6 },
  { id: 118, username: 'matthew_locksmith', password: 'pass123', role: 'labour', name: 'Matthew King', phone: '+91-9876543231', district: 'Salem', skill: 'Locksmith', experience: '5 years', rating: 4.4 },
  { id: 119, username: 'harper_fitness', password: 'pass123', role: 'labour', name: 'Harper Wright', phone: '+91-9876543232', district: 'Salem', skill: 'Fitness Trainer', experience: '3 years', rating: 4.8 },
  
  // Erode workers
  { id: 120, username: 'ethan_computer', password: 'pass123', role: 'labour', name: 'Ethan Lopez', phone: '+91-9876543233', district: 'Erode', skill: 'Computer Technician', experience: '4 years', rating: 4.5 },
  { id: 121, username: 'abigail_mobile', password: 'pass123', role: 'labour', name: 'Abigail Hill', phone: '+91-9876543234', district: 'Erode', skill: 'Mobile Repair', experience: '2 years', rating: 4.3 },
  { id: 122, username: 'jacob_pest', password: 'pass123', role: 'labour', name: 'Jacob Scott', phone: '+91-9876543235', district: 'Erode', skill: 'Pest Control Specialist', experience: '6 years', rating: 4.7 },
  { id: 123, username: 'mia_massage', password: 'pass123', role: 'labour', name: 'Mia Green', phone: '+91-9876543236', district: 'Erode', skill: 'Massage Therapist', experience: '5 years', rating: 4.6 },
  { id: 124, username: 'noah_delivery', password: 'pass123', role: 'labour', name: 'Noah Adams', phone: '+91-9876543237', district: 'Erode', skill: 'Delivery Person', experience: '3 years', rating: 4.4 },
];

export const sampleLaborers: Laborer[] = sampleUsers
  .filter(user => user.role === 'labour')
  .map(user => ({
    id: user.id,
    name: user.name,
    skill: user.skill!,
    district: user.district!,
    phone: user.phone!,
    experience: user.experience!,
    rating: user.rating!,
    available: Math.random() > 0.3, // 70% availability rate
    userId: user.id
  }));

// Generate additional laborers for all districts and skills
export const generateComprehensiveLaborers = (): Laborer[] => {
  const laborers: Laborer[] = [...sampleLaborers];
  let id = 200;

  // Ensure at least 2-3 workers per skill per major district
  const majorDistricts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Erode', 'Vellore', 'Tiruppur', 'Thanjavur'];
  const popularSkills = laborTypes.slice(0, 50); // Top 50 skills

  majorDistricts.forEach(district => {
    popularSkills.forEach(skill => {
      // Check if we already have workers for this skill in this district
      const existingWorkers = laborers.filter(l => l.district === district && l.skill === skill);
      
      if (existingWorkers.length < 2) {
        // Add 1-2 more workers
        const workersToAdd = 2 - existingWorkers.length;
        
        for (let i = 0; i < workersToAdd; i++) {
          const names = [
            'Arjun Kumar', 'Priya Devi', 'Karthik Raja', 'Meera Lakshmi', 'Suresh Babu',
            'Divya Priya', 'Rajesh Kumar', 'Lakshmi Devi', 'Vijay Kumar', 'Sangeetha Rani',
            'Murugan Vel', 'Kavitha Devi', 'Senthil Kumar', 'Revathi Priya', 'Ganesh Babu'
          ];
          
          const randomName = names[Math.floor(Math.random() * names.length)];
          const experience = `${Math.floor(Math.random() * 8) + 1} years`;
          const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10; // 3.5 to 5.0
          
          laborers.push({
            id: id++,
            name: randomName,
            skill,
            district,
            phone: `+91-98765${String(43000 + id).slice(-5)}`,
            experience,
            rating,
            available: Math.random() > 0.25, // 75% availability
            userId: id
          });
        }
      }
    });
  });

  return laborers;
};