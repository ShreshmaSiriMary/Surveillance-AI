import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Shield, UserCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NotificationCenter({ isOpen, onClose }) {
  const { notifications, setNotifications } = useAuth();

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div style={{
      position: 'absolute',
      top: '55px',
      right: '20px',
      width: '360px',
      zIndex: 300
    }} className="glass-card">
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800 }}>Notification Dispatch</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button type="button" onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>
            Mark all read
          </button>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            No new notifications.
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: n.read ? 'transparent' : 'rgba(6, 182, 212, 0.08)',
                borderLeft: n.read ? '3px solid transparent' : '3px solid var(--accent-cyan)',
                marginBottom: '4px',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: n.read ? 'var(--text-primary)' : 'var(--accent-cyan)' }}>
                  {n.title}
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'Space Mono' }}>{n.time}</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {n.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
