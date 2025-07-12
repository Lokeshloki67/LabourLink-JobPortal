export const tamilNaduDistricts = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kanchipuram',
  'Kanyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris (Udhagamandalam)',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi (Tuticorin)',
  'Tiruchirappalli (Trichy)',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar'
];

export const laborTypes = [
  // Construction & Building
  'Electrician',
  'Plumber',
  'Carpenter',
  'Mason',
  'Welder',
  'Painter',
  'Tile Worker',
  'Roofer',
  'Glazier',
  'Plasterer',
  'Bricklayer',
  'Steel Fixer',
  'Concrete Worker',
  'Demolition Worker',
  'Scaffolder',
  
  // Home Services
  'Cleaner',
  'Housekeeper',
  'Cook',
  'Babysitter',
  'Elder Care',
  'Laundry Service',
  'Ironing Service',
  'Deep Cleaning Specialist',
  'Carpet Cleaner',
  'Window Cleaner',
  'Pest Control Specialist',
  'Fumigation Expert',
  
  // Technical Services
  'AC Technician',
  'Refrigerator Repair',
  'Washing Machine Repair',
  'TV Repair',
  'Computer Technician',
  'Mobile Repair',
  'CCTV Installer',
  'Satellite Dish Installer',
  'Internet Technician',
  'Solar Panel Installer',
  'Generator Mechanic',
  'UPS Repair',
  
  // Automotive
  'Car Mechanic',
  'Bike Mechanic',
  'Auto Rickshaw Mechanic',
  'Truck Mechanic',
  'Tyre Puncture',
  'Car Wash',
  'Vehicle Painter',
  'Denting & Painting',
  'Battery Service',
  'Oil Change Service',
  
  // Beauty & Wellness
  'Barber',
  'Hair Stylist',
  'Beautician',
  'Massage Therapist',
  'Manicurist',
  'Pedicurist',
  'Mehendi Artist',
  'Makeup Artist',
  'Spa Therapist',
  
  // Fitness & Health
  'Fitness Trainer',
  'Yoga Instructor',
  'Physiotherapist',
  'Nurse',
  'Caregiver',
  'Dietitian',
  'Swimming Instructor',
  'Dance Teacher',
  
  // Education & Training
  'Tutor',
  'Music Teacher',
  'Art Teacher',
  'Language Teacher',
  'Computer Teacher',
  'Driving Instructor',
  'Skill Trainer',
  
  // Transportation
  'Driver',
  'Delivery Person',
  'Courier',
  'Moving Service',
  'Packing Service',
  'Loading/Unloading',
  'Logistics Helper',
  
  // Outdoor Services
  'Gardener',
  'Landscaper',
  'Tree Trimmer',
  'Lawn Mower',
  'Pool Cleaner',
  'Exterior Cleaner',
  'Gutter Cleaner',
  
  // Event Services
  'Event Decorator',
  'Photographer',
  'Videographer',
  'DJ',
  'Sound System Operator',
  'Light Technician',
  'Stage Setup',
  'Catering Service',
  'Waiter/Waitress',
  'Event Coordinator',
  
  // Specialized Services
  'Tailor',
  'Cobbler',
  'Locksmith',
  'Key Maker',
  'Umbrella Repair',
  'Watch Repair',
  'Jewelry Repair',
  'Leather Worker',
  'Upholsterer',
  'Curtain Installer',
  
  // Security Services
  'Security Guard',
  'Watchman',
  'Bouncer',
  'CCTV Operator',
  
  // Food Services
  'Chef',
  'Baker',
  'Caterer',
  'Food Delivery',
  'Tiffin Service',
  'Sweet Maker',
  'Snack Vendor',
  
  // Agricultural
  'Farm Worker',
  'Harvester',
  'Irrigation Specialist',
  'Pesticide Sprayer',
  'Cattle Caretaker',
  'Poultry Worker',
  
  // Miscellaneous
  'Data Entry Operator',
  'Office Assistant',
  'Receptionist',
  'Salesperson',
  'Cashier',
  'Stock Keeper',
  'Peon',
  'Helper'
];

export const extraWorkTypes = [
  'House Cleaning',
  'Pest Control',
  'Interior Painting',
  'Garden Maintenance',
  'Home Security Installation',
  'Furniture Assembly',
  'Deep Cleaning',
  'Appliance Installation',
  'Window Cleaning',
  'Carpet Cleaning',
  'Kitchen Cleaning',
  'Bathroom Renovation',
  'Floor Polishing',
  'Wall Painting',
  'Ceiling Repair',
  'Door Installation',
  'Lock Repair',
  'Tile Work',
  'Electrical Wiring',
  'Plumbing Repair',
  'AC Installation',
  'TV Mounting',
  'Furniture Repair',
  'Curtain Installation',
  'Lighting Installation',
  'Fan Installation',
  'Switch Board Installation',
  'Water Tank Cleaning',
  'Terrace Waterproofing',
  'Balcony Cleaning'
];

// Pricing structure for different labor types
export const laborPricing = {
  // Construction & Building (₹300-800 per day)
  'Electrician': { basePrice: 500, hourlyRate: 80, emergencyRate: 150 },
  'Plumber': { basePrice: 450, hourlyRate: 75, emergencyRate: 140 },
  'Carpenter': { basePrice: 600, hourlyRate: 90, emergencyRate: 160 },
  'Mason': { basePrice: 550, hourlyRate: 85, emergencyRate: 150 },
  'Welder': { basePrice: 650, hourlyRate: 100, emergencyRate: 180 },
  'Painter': { basePrice: 400, hourlyRate: 70, emergencyRate: 120 },
  'Tile Worker': { basePrice: 500, hourlyRate: 80, emergencyRate: 140 },
  'Roofer': { basePrice: 600, hourlyRate: 90, emergencyRate: 160 },
  
  // Home Services (₹200-500 per day)
  'Cleaner': { basePrice: 250, hourlyRate: 40, emergencyRate: 80 },
  'Housekeeper': { basePrice: 300, hourlyRate: 50, emergencyRate: 90 },
  'Cook': { basePrice: 400, hourlyRate: 60, emergencyRate: 100 },
  'Babysitter': { basePrice: 300, hourlyRate: 50, emergencyRate: 90 },
  'Elder Care': { basePrice: 350, hourlyRate: 55, emergencyRate: 100 },
  'Laundry Service': { basePrice: 200, hourlyRate: 35, emergencyRate: 70 },
  
  // Technical Services (₹400-1000 per visit)
  'AC Technician': { basePrice: 600, hourlyRate: 100, emergencyRate: 200 },
  'Refrigerator Repair': { basePrice: 500, hourlyRate: 80, emergencyRate: 160 },
  'Computer Technician': { basePrice: 450, hourlyRate: 75, emergencyRate: 150 },
  'Mobile Repair': { basePrice: 300, hourlyRate: 50, emergencyRate: 100 },
  'CCTV Installer': { basePrice: 800, hourlyRate: 120, emergencyRate: 220 },
  
  // Automotive (₹300-600 per service)
  'Car Mechanic': { basePrice: 500, hourlyRate: 80, emergencyRate: 150 },
  'Bike Mechanic': { basePrice: 300, hourlyRate: 50, emergencyRate: 100 },
  'Tyre Puncture': { basePrice: 100, hourlyRate: 30, emergencyRate: 60 },
  'Car Wash': { basePrice: 200, hourlyRate: 35, emergencyRate: 70 },
  
  // Beauty & Wellness (₹200-800 per service)
  'Barber': { basePrice: 150, hourlyRate: 30, emergencyRate: 60 },
  'Hair Stylist': { basePrice: 400, hourlyRate: 60, emergencyRate: 120 },
  'Beautician': { basePrice: 500, hourlyRate: 80, emergencyRate: 150 },
  'Massage Therapist': { basePrice: 600, hourlyRate: 90, emergencyRate: 170 },
  
  // Default pricing for unlisted services
  'default': { basePrice: 400, hourlyRate: 60, emergencyRate: 120 }
};

// Service categories for better organization
export const serviceCategories = {
  'Construction & Building': [
    'Electrician', 'Plumber', 'Carpenter', 'Mason', 'Welder', 'Painter', 
    'Tile Worker', 'Roofer', 'Glazier', 'Plasterer', 'Bricklayer'
  ],
  'Home Services': [
    'Cleaner', 'Housekeeper', 'Cook', 'Babysitter', 'Elder Care', 
    'Laundry Service', 'Deep Cleaning Specialist', 'Pest Control Specialist'
  ],
  'Technical Services': [
    'AC Technician', 'Refrigerator Repair', 'Computer Technician', 
    'Mobile Repair', 'CCTV Installer', 'Solar Panel Installer'
  ],
  'Automotive': [
    'Car Mechanic', 'Bike Mechanic', 'Tyre Puncture', 'Car Wash', 
    'Vehicle Painter', 'Denting & Painting'
  ],
  'Beauty & Wellness': [
    'Barber', 'Hair Stylist', 'Beautician', 'Massage Therapist', 
    'Makeup Artist', 'Spa Therapist'
  ],
  'Fitness & Health': [
    'Fitness Trainer', 'Yoga Instructor', 'Physiotherapist', 
    'Nurse', 'Caregiver', 'Swimming Instructor'
  ],
  'Education & Training': [
    'Tutor', 'Music Teacher', 'Art Teacher', 'Language Teacher', 
    'Driving Instructor', 'Skill Trainer'
  ],
  'Transportation': [
    'Driver', 'Delivery Person', 'Moving Service', 'Packing Service', 
    'Loading/Unloading', 'Logistics Helper'
  ],
  'Event Services': [
    'Event Decorator', 'Photographer', 'Videographer', 'DJ', 
    'Catering Service', 'Event Coordinator'
  ],
  'Specialized Services': [
    'Tailor', 'Locksmith', 'Security Guard', 'Gardener', 
    'Watch Repair', 'Jewelry Repair'
  ]
};