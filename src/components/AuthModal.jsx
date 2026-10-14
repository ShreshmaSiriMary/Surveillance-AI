import React, { useState } from 'react';
import { Mail, Phone, Lock, ShieldCheck, X, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithEmail, loginWithGoogle, loginWithPhoneOTP } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup' | 'phone_otp'
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin' | 'user'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    loginWithEmail(email || 'officer@police.gov.in', password || 'password', selectedRole);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setOtpSent(true);
    setOtp('482019'); // Auto-fill 2FA OTP simulation for ease of testing
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    loginWithPhoneOTP(phone, otp, selectedRole);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 250
    }}>
      <div className="glass-card" style={{
        width: '460px',
        padding: '24px',
        background: 'var(--bg-secondary)',
        position: 'relative'
      }}>
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        )}

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>
            SENTINEL<span style={{ color: 'var(--accent-cyan)' }}>-AI</span> Authentication
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Biometric Law Enforcement & Public Safety Intelligence Portal
          </p>
        </div>

        {/* Role Selector Toggle (Admin vs User) */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-primary)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: selectedRole === 'admin' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
              color: selectedRole === 'admin' ? '#fff' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Law Enforcement Admin
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('user')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: selectedRole === 'user' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: selectedRole === 'user' ? '#fff' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            General Citizen / User
          </button>
        </div>

        {/* Method Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '18px' }}>
          {[
            { id: 'login', label: 'Email Sign In' },
            { id: 'phone_otp', label: 'Phone 2-Step OTP' },
            { id: 'signup', label: 'Create Account' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setOtpSent(false); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* One-Click Google Authentication Button */}
        <button
          type="button"
          onClick={() => loginWithGoogle(selectedRole)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            background: '#ffffff',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '0.84rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          Sign in with Google Workspace
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          — OR CONTINUE WITH CREDENTIALS —
        </div>

        {/* Tab 1: Email Login / Sign Up Form */}
        {(activeTab === 'login' || activeTab === 'signup') && (
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Official Email Address</label>
              <input
                type="email"
                required
                placeholder="officer@police.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
              <ShieldCheck size={16} /> {activeTab === 'login' ? 'Sign In as ' + (selectedRole === 'admin' ? 'Admin Officer' : 'Public User') : 'Register Account'}
            </button>
          </form>
        )}

        {/* Tab 2: Phone + 2-Step OTP Verification Form */}
        {activeTab === 'phone_otp' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Mobile Phone Number (+91)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ fontFamily: 'JetBrains Mono' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <Phone size={16} /> Send 2-Step Verification OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid #10b981', fontSize: '0.74rem', color: '#10b981' }}>
                  <CheckCircle2 size={14} inline style={{ marginRight: '6px' }} />
                  OTP sent to {phone}. Auto-filled code for testing: <strong>482019</strong>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Enter 6-Digit 2FA Security OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                    style={{ fontFamily: 'JetBrains Mono', fontSize: '1.2rem', letterSpacing: '0.2em', textAlign: 'center' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <KeyRound size={16} /> Verify OTP & Authenticate
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
