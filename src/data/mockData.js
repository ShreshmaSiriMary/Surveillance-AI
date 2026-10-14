// SENTINEL-AI — Synthetic Public-Safety Demo Dataset
// All records are synthetic demo identities for prototype research purposes.

export const INITIAL_CITIZENS = [
  {
    id: "CIT-2026-0101",
    name: "Miriyala Pujitha",
    email: "pujitha@gmail.com",
    phone: "+91 9123456789",
    status: "VERIFIED",
    registrationDate: "2026-08-20 10:15 AM",
    maskedAadhaar: "XXXX-XXXX-8812",
    address: "Plot 42, Sayajiganj, Vadodara, Gujarat - 390005",
    emergencyContact: "Venkata Rao (Father) - +91 9848012345",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "CIT-2026-0102",
    name: "Karthik Varma",
    email: "karthik.varma@outlook.com",
    phone: "+91 9849011223",
    status: "PENDING",
    registrationDate: "2026-08-25 02:30 PM",
    maskedAadhaar: "XXXX-XXXX-4410",
    address: "Flat 301, Alkapuri Towers, Vadodara, Gujarat - 390007",
    emergencyContact: "Srilatha Varma (Wife) - +91 9849099887",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "CIT-2026-0103",
    name: "Ananya Sharma",
    email: "ananya.sharma@gmail.com",
    phone: "+91 9440122334",
    status: "VERIFIED",
    registrationDate: "2026-08-22 11:45 AM",
    maskedAadhaar: "XXXX-XXXX-9901",
    address: "House 14, Parul Campus Road, Limda, Vadodara - 391760",
    emergencyContact: "Rajesh Sharma (Brother) - +91 9440188776",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "CIT-2026-0104",
    name: "Rameshchandra Patel",
    email: "ramesh.patel@yahoo.co.in",
    phone: "+91 9712345678",
    status: "UNDER REVIEW",
    registrationDate: "2026-08-24 09:10 AM",
    maskedAadhaar: "XXXX-XXXX-3341",
    address: "Fatehgunj Main Road, Vadodara, Gujarat - 390002",
    emergencyContact: "Bhavna Patel (Daughter) - +91 9712399887",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "CIT-2026-0105",
    name: "Priya Deshmukh",
    email: "priya.deshmukh@gmail.com",
    phone: "+91 9922011234",
    status: "VERIFIED",
    registrationDate: "2026-08-21 04:20 PM",
    maskedAadhaar: "XXXX-XXXX-1120",
    address: "Ring Road, Surat, Gujarat - 395002",
    emergencyContact: "Vikram Deshmukh (Husband) - +91 9922098765",
    avatar: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_OFFICERS = [
  {
    id: "OFF-701",
    name: "Insp. Boyapati Shrashma Siri Mary",
    role: "admin",
    email: "shrashma.mary@surveillance.gov.in",
    badgeId: "PU-701",
    unit: "Law Enforcement Command Unit",
    phone: "+91 9876543210",
    assignedCasesCount: 6,
    status: "ACTIVE ON DUTY",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "OFF-304",
    name: "Sub-Insp. Dudekula Asif Baba",
    role: "officer",
    email: "asif.baba@surveillance.gov.in",
    badgeId: "PU-304",
    unit: "Biometric Intelligence Division",
    phone: "+91 9876511223",
    assignedCasesCount: 4,
    status: "ACTIVE ON DUTY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "OFF-109",
    name: "Det. Yarramsetty Revanth Balaji",
    role: "officer",
    email: "revanth.balaji@surveillance.gov.in",
    badgeId: "PU-109",
    unit: "Crime Investigation Unit",
    phone: "+91 9876533445",
    assignedCasesCount: 5,
    status: "ON FIELD PATROL",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "OFF-502",
    name: "Insp. Ms. Roshni Kumari",
    role: "admin",
    email: "roshni.kumari@surveillance.gov.in",
    badgeId: "PU-502",
    unit: "AI Surveillance Operations",
    phone: "+91 9876555667",
    assignedCasesCount: 3,
    status: "ACTIVE ON DUTY",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_MISSING_PERSONS = [
  {
    id: "MP-2026-001284",
    name: "Aarav Sharma",
    category: "Missing Person",
    subCategory: "Child",
    alias: "Sonu",
    age: 8,
    gender: "Male",
    threatLevel: "AMBER ALERT",
    wantedFor: "Missing since 2026-08-23 from Sayaji Baug Park, Vadodara",
    lastSeen: "Sayaji Baug Park Main Entrance, Vadodara",
    lastSeenDate: "2026-08-23 03:00 PM",
    locationCoords: { lat: 22.3080, lng: 73.1750 },
    reward: "₹500,000 (Community Fund)",
    status: "ACTIVE SEARCH",
    confidenceMatch: 94.2,
    avatar: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Insp. Boyapati Shrashma Siri Mary (PU-701)",
    reporter: "Miriyala Pujitha (Mother)",
    description: "Wearing: Blue cartoon t-shirt, navy shorts, yellow sneakers. Small birthmark on left wrist.",
    wearingDetails: "Blue cartoon t-shirt, navy shorts, yellow Puma sneakers",
    maskedAadhaar: "XXXX-XXXX-7712",
    firNumber: "FIR-2026-8812",
    isDemo: true,
    facialEmbeddings: [0.05, 0.81, -0.42, 0.19, -0.63, 0.38, 0.15, -0.84, 0.29, -0.07]
  },
  {
    id: "MP-2026-001290",
    name: "Priyanka Patel",
    category: "Missing Person",
    subCategory: "Vulnerable Adult",
    alias: "Priya",
    age: 21,
    gender: "Female",
    threatLevel: "URGENT",
    wantedFor: "Reported missing after Parul University AI Dept Class",
    lastSeen: "Parul Institute Campus (PIET Gate B), Vadodara",
    lastSeenDate: "2026-08-24 08:45 AM",
    locationCoords: { lat: 22.2885, lng: 73.3634 },
    reward: "₹250,000",
    status: "INVESTIGATION",
    confidenceMatch: 91.6,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Sub-Insp. Dudekula Asif Baba (PU-304)",
    reporter: "Rameshchandra Patel (Father)",
    description: "Wearing: Beige trench coat, black denim jeans, carrying a silver HP laptop sleeve.",
    wearingDetails: "Beige trench coat, black jeans, silver HP laptop bag",
    maskedAadhaar: "XXXX-XXXX-4401",
    firNumber: "FIR-2026-9041",
    isDemo: true,
    facialEmbeddings: [-0.61, -0.19, 0.44, 0.82, -0.05, -0.71, 0.33, 0.49, -0.88, 0.12]
  },
  {
    id: "MP-2026-001211",
    name: "Rameshchandra Joshi",
    category: "Missing Person",
    subCategory: "Senior Citizen",
    alias: "Kaka",
    age: 74,
    gender: "Male",
    threatLevel: "HIGH",
    wantedFor: "Alzheimer's patient wandered off from Fatehgunj residence",
    lastSeen: "Fatehgunj Bus Station, Vadodara",
    lastSeenDate: "2026-08-24 06:10 AM",
    locationCoords: { lat: 22.3180, lng: 73.1890 },
    reward: "₹100,000",
    status: "RESOLVED / LOCATED",
    confidenceMatch: 98.1,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Det. Yarramsetty Revanth Balaji (PU-109)",
    reporter: "Bhavna Joshi (Daughter)",
    description: "Located safely near Transit Hub Node #04. Reunited with family.",
    wearingDetails: "White Kurta Pyjama, gold spectacles, brown chappals",
    maskedAadhaar: "XXXX-XXXX-8829",
    firNumber: "FIR-2026-5501",
    isDemo: true,
    facialEmbeddings: [0.77, 0.32, -0.89, -0.04, 0.51, 0.22, -0.66, 0.41, 0.10, -0.93]
  },
  {
    id: "MP-2026-001150",
    name: "Rohan & Diya Joshi",
    category: "Missing Person",
    subCategory: "Siblings",
    alias: "Diya & Rohan",
    age: 10,
    gender: "Male",
    threatLevel: "AMBER ALERT",
    wantedFor: "Missing after tuition class near Mandvi Market, Vadodara",
    lastSeen: "Mandvi Gate Commercial Area, Vadodara",
    lastSeenDate: "2026-08-23 06:00 PM",
    locationCoords: { lat: 22.3001, lng: 73.2050 },
    reward: "₹1,000,000",
    status: "ACTIVE SEARCH",
    confidenceMatch: 93.4,
    avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Insp. Ms. Roshni Kumari (PU-502)",
    reporter: "Ananya Sharma (Aunt)",
    description: "Wearing: White school uniform shirts, navy shorts, carrying red Wildcraft schoolbags.",
    wearingDetails: "White school uniform shirts, navy shorts, red schoolbags",
    maskedAadhaar: "XXXX-XXXX-8812",
    firNumber: "FIR-2026-3310",
    isDemo: true,
    facialEmbeddings: [0.15, -0.22, 0.77, -0.45, 0.33, 0.88, -0.19, 0.05, -0.62, 0.41]
  }
];

export const INITIAL_SYNTHETIC_SUSPECTS = [
  {
    id: "SYN-2026-0891",
    name: "Vikram 'Ghost' Malhotra (Synthetic Example)",
    category: "Suspect Record",
    subCategory: "Fugitive Example",
    alias: "The Phantom Operator",
    age: 34,
    gender: "Male",
    threatLevel: "CRITICAL",
    wantedFor: "Simulated Case: Financial Cyber Fraud & Fugitive Tracking Example",
    lastSeen: "Platform 3, Vadodara Central Railway Station",
    lastSeenDate: "2026-08-24 11:15 AM",
    locationCoords: { lat: 22.3072, lng: 73.1812 },
    reward: "₹5,000,000",
    status: "AT LARGE",
    confidenceMatch: 98.4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Insp. Boyapati Shrashma Siri Mary",
    isDemo: true,
    facialEmbeddings: [0.12, -0.45, 0.88, -0.23, 0.67, 0.11, -0.92, 0.34, 0.55, -0.19],
    description: "DEMO RECORD: Sharp jawline, dark jacket, scar near right eyebrow."
  },
  {
    id: "SYN-2026-0412",
    name: "Ananya Deshmukh (Synthetic Example)",
    category: "Suspect Record",
    subCategory: "High Priority Example",
    alias: "Red Sparrow",
    age: 29,
    gender: "Female",
    threatLevel: "HIGH",
    wantedFor: "Simulated Case: Corporate Forgery & Cyber Fraud Example",
    lastSeen: "Gate 4, Vadodara Airport Terminal",
    lastSeenDate: "2026-08-23 04:45 PM",
    locationCoords: { lat: 22.3150, lng: 73.2200 },
    reward: "₹2,500,000",
    status: "UNDER SURVEILLANCE",
    confidenceMatch: 95.1,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Insp. Boyapati Shrashma Siri Mary",
    isDemo: true,
    facialEmbeddings: [-0.34, 0.62, 0.15, -0.77, 0.44, 0.89, -0.12, 0.05, 0.61, -0.41],
    description: "DEMO RECORD: High cheekbones, dark brown hair, spectacles."
  },
  {
    id: "SYN-2026-0105",
    name: "Kabir Singh Rathore (Synthetic Example)",
    category: "Suspect Record",
    subCategory: "Repeat Offender Example",
    alias: "Slick Kabir",
    age: 41,
    gender: "Male",
    threatLevel: "MEDIUM",
    wantedFor: "Simulated Case: Highway Robbery & Trafficking Example",
    lastSeen: "Alkapuri Commercial Complex, Vadodara",
    lastSeenDate: "2026-08-22 09:30 PM",
    locationCoords: { lat: 22.2980, lng: 73.1650 },
    reward: "₹1,000,000",
    status: "AT LARGE",
    confidenceMatch: 91.8,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    caseOfficer: "Sub-Insp. Dudekula Asif Baba",
    isDemo: true,
    facialEmbeddings: [0.55, -0.12, -0.33, 0.89, 0.04, -0.56, 0.22, 0.78, -0.31, 0.19],
    description: "DEMO RECORD: Tattoo on left neck, short cropped hair, heavy stubble."
  }
];

// Alias export for backward compatibility
export const INITIAL_CRIMINALS = INITIAL_SYNTHETIC_SUSPECTS;

export const FORENSIC_SKETCHES = [
  {
    id: "SK-01",
    title: "Bank Robbery Suspect Witness Composite",
    dateCreated: "2026-08-20",
    sketchImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    topMatches: [
      { id: "SYN-2026-0891", name: "Vikram Malhotra", similarity: 94.2 },
      { id: "SYN-2026-0105", name: "Kabir Singh Rathore", similarity: 72.8 }
    ]
  },
  {
    id: "SK-02",
    title: "Sayaji Baug Witness Composite",
    dateCreated: "2026-08-23",
    sketchImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    topMatches: [
      { id: "SYN-2026-0105", name: "Kabir Singh Rathore", similarity: 89.6 },
      { id: "SYN-2026-0891", name: "Vikram Malhotra", similarity: 65.4 }
    ]
  }
];

export const CAMERAS = [
  {
    id: "CAM-01",
    name: "Terminal 1 - Vadodara International Airport",
    location: "Security Gate Alpha",
    coords: { lat: 22.3150, lng: 73.2200 },
    status: "ONLINE",
    resolution: "4K 60FPS",
    detectedCount: 4,
    privacyBlur: false,
    feedType: "cctv1",
    isDemo: true
  },
  {
    id: "CAM-02",
    name: "Vadodara Central Railway Station",
    location: "Main Concourse Platform 1-3",
    coords: { lat: 22.3072, lng: 73.1812 },
    status: "RECORDING",
    resolution: "1080P 30FPS",
    detectedCount: 6,
    privacyBlur: true,
    feedType: "cctv2",
    isDemo: true
  },
  {
    id: "CAM-03",
    name: "Sayaji Baug Smart City Square",
    location: "Commercial Crossroad East",
    coords: { lat: 22.3080, lng: 73.1750 },
    status: "ONLINE",
    resolution: "4K 30FPS",
    detectedCount: 3,
    privacyBlur: false,
    feedType: "cctv3",
    isDemo: true
  },
  {
    id: "CAM-04",
    name: "Parul University Campus (PIET Gate)",
    location: "Waghodia Road Hub",
    coords: { lat: 22.2885, lng: 73.3634 },
    status: "ONLINE",
    resolution: "1080P 60FPS",
    detectedCount: 5,
    privacyBlur: false,
    feedType: "cctv4",
    isDemo: true
  },
  {
    id: "CAM-05",
    name: "Surat Railway Junction Concourse",
    location: "Platform 4 Entry",
    coords: { lat: 21.1702, lng: 72.8311 },
    status: "ONLINE",
    resolution: "1080P 30FPS",
    detectedCount: 2,
    privacyBlur: false,
    feedType: "cctv1",
    isDemo: true
  },
  {
    id: "CAM-06",
    name: "Ahmedabad Transit Depot Gate 2",
    location: "Gita Mandir Depot",
    coords: { lat: 23.0225, lng: 72.5714 },
    status: "MAINTENANCE",
    resolution: "1080P 30FPS",
    detectedCount: 0,
    privacyBlur: false,
    feedType: "cctv2",
    isDemo: true
  },
  {
    id: "CAM-LIVE",
    name: "Live Command Desk WebCam Input",
    location: "Local Command Desk #01",
    coords: { lat: 22.3000, lng: 73.1800 },
    status: "ONLINE",
    resolution: "HD Real-time",
    detectedCount: 1,
    privacyBlur: false,
    feedType: "webcam",
    isDemo: false
  }
];

export const SYSTEM_METRICS = {
  accuracy: "98.4%",
  precision: "97.8%",
  recall: "96.9%",
  avgInferenceLatency: "14.2 ms",
  processedFramesToday: 1428900,
  activeAlertsCount: 3,
  databaseRecordsTotal: 48920,
  gpuLoad: "34%",
  modelArchitecture: "MobileFaceNet + ResNet-50 Hybrid CNN Embedding Model"
};

export const RECENT_ALERTS = [
  {
    id: "ALT-9901",
    timestamp: "12:41:05 PM",
    subjectId: "SYN-2026-0891",
    subjectName: "Vikram 'Ghost' Malhotra",
    category: "AI Candidate Match",
    threatLevel: "CRITICAL",
    camera: "CAM-02 (Central Railway)",
    confidence: 94.2,
    status: "HUMAN REVIEW REQUIRED",
    officer: "Insp. Boyapati Shrashma Siri Mary"
  },
  {
    id: "ALT-9898",
    timestamp: "12:35:12 PM",
    subjectId: "MP-2026-001284",
    subjectName: "Aarav Sharma",
    category: "Missing Child Lead",
    threatLevel: "AMBER",
    camera: "CAM-03 (Sayaji Baug)",
    confidence: 91.8,
    status: "PATROL EN ROUTE",
    officer: "Miriyala Pujitha (Reporter)"
  }
];
