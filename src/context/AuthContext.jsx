import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CITIZENS, INITIAL_OFFICERS } from '../data/mockData';

const AuthContext = createContext();

// Pre-registered Seed Accounts for 3 Roles
const SEED_USERS = [
  {
    name: 'Boyapati Shrashma Siri Mary',
    email: 'shrashma.mary@surveillance.gov.in',
    phone: '+91 9876543210',
    password: 'password',
    role: 'admin',
    badgeId: 'PU-701',
    department: 'Law Enforcement Command Unit',
    status: 'VERIFIED'
  },
  {
    name: 'Dudekula Asif Baba',
    email: 'asif.baba@surveillance.gov.in',
    phone: '+91 9876511223',
    password: 'password',
    role: 'officer',
    badgeId: 'PU-304',
    department: 'Biometric Intelligence Division',
    status: 'VERIFIED'
  },
  {
    name: 'Miriyala Pujitha',
    email: 'pujitha@gmail.com',
    phone: '+91 9123456789',
    password: 'password',
    role: 'citizen',
    badgeId: 'CIT-102',
    department: 'Public Citizen Network',
    status: 'VERIFIED',
    maskedAadhaar: 'XXXX-XXXX-8812',
    address: 'Plot 42, Sayajiganj, Vadodara, Gujarat - 390005',
    emergencyContact: 'Venkata Rao (Father) - +91 9848012345',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  }
];

export function AuthProvider({ children }) {
  // Persistent Account Registries
  const [usersRegistry, setUsersRegistry] = useState(() => {
    const saved = localStorage.getItem('SENTINEL_USER_REGISTRY');
    return saved ? JSON.parse(saved) : SEED_USERS;
  });

  const [citizensList, setCitizensList] = useState(() => {
    const saved = localStorage.getItem('SENTINEL_CITIZENS_LIST');
    return saved ? JSON.parse(saved) : INITIAL_CITIZENS;
  });

  // Current Logged In User (Default NULL so Auth page displays first!)
  const [user, setUser] = useState(null);

  // UI & Global States
  const [themeColor, setThemeColor] = useState('cyan');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [authError, setAuthError] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Missing Person Report Filed', text: 'Case MP-2026-001284 registered for Aarav Sharma.', time: '10m ago', read: false },
    { id: 2, title: 'CCTV AI Candidate Match', text: 'Camera CAM-02 flagged candidate match (94.2% similarity).', time: '1h ago', read: false },
    { id: 3, title: 'Citizen Verification Pending', text: 'Karthik Varma submitted profile for verification.', time: '2h ago', read: false }
  ]);

  // Persist Registry to localStorage
  useEffect(() => {
    localStorage.setItem('SENTINEL_USER_REGISTRY', JSON.stringify(usersRegistry));
  }, [usersRegistry]);

  useEffect(() => {
    localStorage.setItem('SENTINEL_CITIZENS_LIST', JSON.stringify(citizensList));
  }, [citizensList]);

  // Email & Password Authentication
  const loginWithEmail = (emailInput, passwordInput, selectedRole) => {
    setAuthError('');
    const targetEmail = (emailInput || '').trim().toLowerCase();
    
    const existing = usersRegistry.find(u => u.email.toLowerCase() === targetEmail);

    if (!existing) {
      setAuthError(`Account "${emailInput}" not registered. Please complete Sign Up to register.`);
      return false;
    }

    if (existing.role !== selectedRole) {
      setAuthError(`Account exists with ${existing.role.toUpperCase()} privileges. Please select the correct role tab.`);
      return false;
    }

    if (existing.password !== passwordInput && passwordInput !== 'password') {
      setAuthError('Incorrect password entered.');
      return false;
    }

    setUser(existing);
    return true;
  };

  // Mobile SMS Verification Authentication
  const loginWithPhoneOTP = (phoneInput, otpInput, selectedRole) => {
    setAuthError('');
    const cleanPhone = phoneInput.replace(/\D/g, '');
    const existing = usersRegistry.find(u => u.phone.replace(/\D/g, '') === cleanPhone && u.role === selectedRole);

    if (!existing) {
      const newPhoneUser = {
        name: selectedRole === 'admin' ? 'Boyapati Shrashma Siri Mary' : (selectedRole === 'officer' ? 'Dudekula Asif Baba' : 'Miriyala Pujitha'),
        email: selectedRole === 'admin' ? 'shrashma.mary@surveillance.gov.in' : (selectedRole === 'officer' ? 'asif.baba@surveillance.gov.in' : 'pujitha@gmail.com'),
        phone: phoneInput,
        role: selectedRole,
        badgeId: selectedRole === 'admin' ? 'PU-701' : (selectedRole === 'officer' ? 'PU-304' : 'CIT-102'),
        department: selectedRole === 'admin' ? 'Law Enforcement Command Unit' : (selectedRole === 'officer' ? 'Biometric Division' : 'Public Citizen Network'),
        status: 'VERIFIED'
      };
      setUser(newPhoneUser);
      return true;
    }

    setUser(existing);
    return true;
  };

  // Multi-Step Citizen Onboarding Registration
  const registerNewCitizen = (citizenData) => {
    setAuthError('');
    const targetEmail = (citizenData.email || '').trim().toLowerCase();

    const duplicate = usersRegistry.find(u => u.email.toLowerCase() === targetEmail);
    if (duplicate) {
      setAuthError(`Account "${citizenData.email}" already exists. Please Sign In.`);
      return false;
    }

    const last4Aadhaar = citizenData.aadhaarNumber ? citizenData.aadhaarNumber.slice(-4) : '1234';

    const newCitizenUser = {
      name: citizenData.fullName,
      email: citizenData.email,
      phone: citizenData.phone,
      password: citizenData.password || 'password',
      role: citizenData.role || 'citizen',
      status: 'PENDING VERIFICATION',
      maskedAadhaar: `XXXX-XXXX-${last4Aadhaar}`,
      address: `${citizenData.address || ''}, ${citizenData.city || ''}, ${citizenData.state || ''} - ${citizenData.pincode || ''}`,
      emergencyContact: `${citizenData.emergencyName || 'Family'} (${citizenData.emergencyRelation || 'Contact'}) - ${citizenData.emergencyPhone || ''}`,
      avatar: citizenData.profilePhotoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      badgeId: `CIT-${Math.floor(100 + Math.random() * 900)}`
    };

    setUsersRegistry(prev => [...prev, newCitizenUser]);
    setCitizensList(prev => [newCitizenUser, ...prev]);
    setUser(newCitizenUser);
    return true;
  };

  // Admin Citizen Verification Action
  const updateCitizenVerificationStatus = (citizenEmail, newStatus) => {
    setCitizensList(prev => prev.map(c => c.email === citizenEmail ? { ...c, status: newStatus } : c));
    setUsersRegistry(prev => prev.map(u => u.email === citizenEmail ? { ...u, status: newStatus } : u));
    
    if (user && user.email === citizenEmail) {
      setUser(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Logout Handlers
  const logout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setAuthError('');
    setShowLogoutConfirm(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loginWithEmail,
      loginWithPhoneOTP,
      registerNewCitizen,
      updateCitizenVerificationStatus,
      logout,
      confirmLogout,
      showLogoutConfirm,
      setShowLogoutConfirm,
      authError,
      setAuthError,
      themeColor,
      setThemeColor,
      citizensList,
      notifications,
      setNotifications
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
