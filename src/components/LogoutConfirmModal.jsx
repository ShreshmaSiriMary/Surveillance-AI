import React from 'react';
import { LogOut, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LogoutConfirmModal() {
  const { showLogoutConfirm, confirmLogout, setShowLogoutConfirm, user } = useAuth();

  if (!showLogoutConfirm) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 300
    }}>
      <div className="glass-card" style={{
        width: '440px',
        padding: '24px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        position: 'relative',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <button 
          onClick={() => setShowLogoutConfirm(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <LogOut size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Confirm Account Sign Out</h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Logged in as: <strong>{user?.name}</strong> ({user?.role === 'admin' ? 'Admin Officer' : 'Citizen User'})
            </p>
          </div>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
          Are you sure you want to log out of the <strong>Criminal Face Detection & Missing Person Identification System</strong>? Any active surveillance filters will be reset.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => setShowLogoutConfirm(false)}>
            Cancel
          </button>

          <button className="btn btn-danger" onClick={confirmLogout}>
            <LogOut size={16} /> Yes, Confirm Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
