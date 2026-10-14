import React, { useState } from 'react';
import { Shield, Phone, CheckCircle2, KeyRound, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FileUpload from './FileUpload';

export default function LoginPage() {
  const { loginWithEmail, loginWithPhoneOTP, registerNewCitizen, authError, setAuthError } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'sms' | 'signup'
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin' | 'officer' | 'citizen'

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mobile Verification Real OTP States
  const [phone, setPhone] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');

  // Multi-Step Citizen Registration Onboarding State (6 Steps)
  const [signupStep, setSignupStep] = useState(1);
  const [citizenFormData, setCitizenFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Address
    address: '',
    city: 'Vadodara',
    district: 'Vadodara',
    state: 'Gujarat',
    pincode: '390005',
    // Step 3: Identity
    idType: 'Aadhaar Card',
    aadhaarNumber: '',
    aadhaarDocUrl: null,
    // Step 4: Emergency Contact
    emergencyName: '',
    emergencyRelation: 'Father',
    emergencyPhone: '',
    // Step 5: Profile Photo
    profilePhotoUrl: null,
    // Step 6: Consent
    consentGiven: false
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const defaultEmail = selectedRole === 'admin'
      ? 'shrashma.mary@surveillance.gov.in'
      : (selectedRole === 'officer' ? 'asif.baba@surveillance.gov.in' : 'pujitha@gmail.com');

    loginWithEmail(email || defaultEmail, password || 'password', selectedRole);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setAuthError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setAuthError('');
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomCode);
    setOtpSent(true);
    console.log(`[SMS Gateway Dispatch] Secret OTP for +91 ${phone}: ${randomCode}`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpInput !== generatedOtp) {
      setAuthError('Invalid OTP code. Please check your mobile handset messages.');
      return;
    }
    setAuthError('');
    loginWithPhoneOTP(`+91 ${phone}`, otpInput, selectedRole);
  };

  const handleCitizenSignupSubmit = (e) => {
    e.preventDefault();
    if (citizenFormData.password !== citizenFormData.confirmPassword) {
      setAuthError('Passwords do not match. Please re-enter passwords.');
      return;
    }
    if (!citizenFormData.consentGiven) {
      setAuthError('Please accept the consent terms to complete verification registration.');
      return;
    }

    registerNewCitizen({
      ...citizenFormData,
      phone: `+91 ${citizenFormData.mobile}`,
      role: selectedRole
    });
  };

  return (
    <div className="login-shell">
      {/* Left Visual Hero Panel */}
      <section className="login-hero">
        <div className="login-scan" aria-hidden="true" />
        {/* Branding Header */}
        <div className="login-brand">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Shield size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              Survelliance-AI
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
              Case review and public reporting
            </div>
          </div>
        </div>

        {/* Middle Description */}
        <div className="login-intro">
          <div className="badge badge-cyan" style={{ marginBottom: '16px' }}>
            Demonstration workspace
          </div>

          <h1 style={{ fontSize: '2.2rem', lineHeight: 1.25, fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Clear workflows for public safety teams.
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '28px' }}>
            Explore sample case review, camera monitoring, and citizen reporting workflows in one place.
          </p>

          <div className="login-demo-note">
            <strong>Sample environment</strong>
            <span>Sign-in, SMS verification, records, and camera feeds are simulated. Do not enter real personal, identity, or biometric information.</span>
          </div>
        </div>

        <div className="login-footer">Prototype interface - Sample data only</div>
      </section>

      {/* Right Column Auth Form */}
      <section className="login-form-panel">
        <div style={{ width: '100%', maxWidth: '440px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              {activeTab === 'signup' ? 'Create a citizen profile' : 'Sign in to the demo'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
              Choose a sample role to explore the interface.
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '10px', padding: '12px 14px', color: '#f87171', fontSize: '0.78rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} flexShrink={0} />
              <div>{authError}</div>
            </div>
          )}

          {/* Role Segmented Tabs (3 ROLES: Admin, Officer, Citizen) */}
          <div style={{ display: 'flex', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '18px' }}>
            {[
              { id: 'admin', label: 'Admin' },
              { id: 'officer', label: 'Officer' },
              { id: 'citizen', label: 'Citizen' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setSelectedRole(r.id); setAuthError(''); }}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedRole === r.id ? 'var(--accent-cyan)' : 'transparent',
                  color: selectedRole === r.id ? '#ffffff' : '#94a3b8',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Auth Method Navigation Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', marginBottom: '20px' }}>
            {[
              { id: 'login', label: 'Email Sign In' },
              { id: 'sms', label: 'Phone code (demo)' },
              { id: 'signup', label: 'Citizen registration' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id); setOtpSent(false); setAuthError(''); }}
                style={{
                  flex: 1,
                  padding: '10px 4px',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--accent-cyan)' : '#64748b',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Email Sign In */}
          {activeTab === 'login' && (
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder={selectedRole === 'admin' ? 'shrashma.mary@surveillance.gov.in' : (selectedRole === 'officer' ? 'asif.baba@surveillance.gov.in' : 'pujitha@gmail.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ marginTop: '4px', height: '42px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ marginTop: '4px', height: '42px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ height: '44px', marginTop: '6px', fontSize: '0.88rem' }}>
                <Shield size={18} /> Sign In to {selectedRole.toUpperCase()} Portal
              </button>
            </form>
          )}

          {/* Tab 2: Mobile SMS Verification */}
          {activeTab === 'sms' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Mobile Phone Number</label>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{
                        background: '#0f172a',
                        border: '1px solid var(--border-color)',
                        borderRight: 'none',
                        padding: '0 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        borderRadius: '8px 0 0 8px',
                        fontWeight: 700,
                        color: 'var(--accent-cyan)',
                        fontFamily: 'Space Mono',
                        fontSize: '0.88rem'
                      }}>
                        🇮🇳 +91
                      </div>

                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder=""
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="input-field"
                        style={{ flex: 1, height: '42px', borderRadius: '0 8px 8px 0', fontFamily: 'Space Mono' }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ height: '44px', fontSize: '0.88rem' }}>
                    <Phone size={18} /> Send Verification SMS Code
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '12px 14px', borderRadius: '10px', border: '1px solid #10b981', fontSize: '0.78rem', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                      <CheckCircle2 size={16} /> SMS VERIFICATION DISPATCHED
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      A 6-digit OTP code has been sent to <strong>+91 {phone}</strong>. Please check your mobile handset.
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>Enter 6-Digit SMS Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="input-field"
                      style={{ marginTop: '4px', height: '44px', fontFamily: 'Space Mono', fontSize: '1.2rem', letterSpacing: '0.2em', textAlign: 'center' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ height: '44px', fontSize: '0.88rem' }}>
                    <KeyRound size={18} /> Verify Code & Launch Portal
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Tab 3: Multi-Step Citizen Registration (6 Steps) */}
          {activeTab === 'signup' && (
            <form onSubmit={handleCitizenSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Step Progress Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>STEP {signupStep} OF 6</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {signupStep === 1 && 'BASIC INFO'}
                  {signupStep === 2 && 'ADDRESS DETAILS'}
                  {signupStep === 3 && 'IDENTITY VERIFICATION'}
                  {signupStep === 4 && 'EMERGENCY CONTACT'}
                  {signupStep === 5 && 'PROFILE PHOTO'}
                  {signupStep === 6 && 'CONSENT & SUBMIT'}
                </span>
              </div>

              <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ width: `${(signupStep / 6) * 100}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.3s ease' }} />
              </div>

              {/* STEP 1: Basic Information */}
              {signupStep === 1 && (
                <>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Full Name (According to Official ID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Miriyala Pujitha"
                      value={citizenFormData.fullName}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, fullName: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={citizenFormData.dob}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, dob: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Gender *</label>
                      <select
                        value={citizenFormData.gender}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, gender: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Mobile Phone Number *</label>
                    <div style={{ display: 'flex', marginTop: '2px' }}>
                      <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRight: 'none', padding: '0 10px', display: 'flex', alignItems: 'center', borderRadius: '8px 0 0 8px', fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.74rem', fontFamily: 'Space Mono' }}>
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={citizenFormData.mobile}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, mobile: e.target.value.replace(/\D/g, '') })}
                        className="input-field"
                        style={{ flex: 1, borderRadius: '0 8px 8px 0', fontFamily: 'Space Mono' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="pujitha@gmail.com"
                      value={citizenFormData.email}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, email: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={citizenFormData.password}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, password: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Confirm Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={citizenFormData.confirmPassword}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, confirmPassword: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: Address */}
              {signupStep === 2 && (
                <>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>House / Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 42, Sayajiganj"
                      value={citizenFormData.address}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, address: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>City / Station *</label>
                      <input
                        type="text"
                        required
                        value={citizenFormData.city}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, city: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>District *</label>
                      <input
                        type="text"
                        required
                        value={citizenFormData.district}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, district: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>State *</label>
                      <input
                        type="text"
                        required
                        value={citizenFormData.state}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, state: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={citizenFormData.pincode}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, pincode: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px', fontFamily: 'Space Mono' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3: Identity Verification (Masked Aadhaar) */}
              {signupStep === 3 && (
                <>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>ID Document Type *</label>
                    <select
                      value={citizenFormData.idType}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, idType: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px' }}
                    >
                      <option value="Aadhaar Card">Indian Aadhaar Card</option>
                      <option value="Voter ID">Voter ID Card</option>
                      <option value="Passport">Indian Passport</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>12-Digit Aadhaar Card Number *</label>
                    <input
                      type="text"
                      required
                      maxLength={14}
                      placeholder="e.g. 4812-9034-7712"
                      value={citizenFormData.aadhaarNumber}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, aadhaarNumber: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px', fontFamily: 'Space Mono' }}
                    />
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Privacy Notice: Aadhaar will be masked as <span style={{ color: 'var(--accent-cyan)' }}>XXXX-XXXX-1234</span> for security.
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Upload Identity Document Photo *</label>
                    <FileUpload
                      label="Upload ID Card Photo"
                      onFileSelect={(file, preview) => setCitizenFormData({ ...citizenFormData, aadhaarDocUrl: preview })}
                    />
                  </div>
                </>
              )}

              {/* STEP 4: Emergency Contact */}
              {signupStep === 4 && (
                <>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Emergency Contact Person Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Venkata Rao"
                      value={citizenFormData.emergencyName}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, emergencyName: e.target.value })}
                      className="input-field"
                      style={{ marginTop: '2px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Relationship *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Father / Spouse"
                        value={citizenFormData.emergencyRelation}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, emergencyRelation: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9848012345"
                        value={citizenFormData.emergencyPhone}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, emergencyPhone: e.target.value })}
                        className="input-field"
                        style={{ marginTop: '2px', fontFamily: 'Space Mono' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 5: Profile Photo Upload */}
              {signupStep === 5 && (
                <>
                  <label style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Upload Profile Photograph *</label>
                  <FileUpload
                    label="Choose Profile Photo"
                    onFileSelect={(file, preview) => setCitizenFormData({ ...citizenFormData, profilePhotoUrl: preview })}
                  />
                </>
              )}

              {/* STEP 6: Consent & Submit */}
              {signupStep === 6 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.3)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '4px' }}>PUBLIC SAFETY CONSENT & VERIFICATION TERMS</div>
                    By submitting this profile, you declare that all furnished identity and contact details are accurate. Submitted data will be processed for citizen identity verification and public safety missing person complaint filings.
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={citizenFormData.consentGiven}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, consentGiven: e.target.checked })}
                    />
                    I accept consent terms & submit profile for verification.
                  </label>

                  <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: '6px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={18} /> Submit Profile & Register Account
                  </button>
                </div>
              )}

              {/* Step Navigation Buttons */}
              {signupStep < 6 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  {signupStep > 1 ? (
                    <button type="button" className="btn btn-secondary" onClick={() => setSignupStep(prev => prev - 1)} style={{ padding: '8px 14px' }}>
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : <div />}

                  <button type="button" className="btn btn-primary" onClick={() => setSignupStep(prev => prev + 1)} style={{ padding: '8px 16px' }}>
                    Next Step <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}


