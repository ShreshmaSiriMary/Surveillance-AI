import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Volume2, VolumeX, X, CheckCircle2, PhoneCall } from 'lucide-react';

export default function AlertModal({ alertData, onClose }) {
  const [muted, setMuted] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!alertData) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(9, 13, 22, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 200
    }}>
      <div className="glass-card" style={{
        width: '540px',
        padding: '24px',
        background: 'var(--bg-secondary)',
        border: '2px solid #ef4444',
        boxShadow: 'var(--glow-red)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Emergency Alert Header Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            <AlertTriangle size={28} className="pulse-red" />
          </div>
          <div>
            <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>CRITICAL SURVEILLANCE ALARM</span>
            <h2 style={{ fontSize: '1.35rem', color: '#ef4444', marginTop: '2px' }}>
              HIGH PRIORITY TARGET MATCH DETECTED
            </h2>
          </div>
        </div>

        {/* Target Profile Content */}
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          marginBottom: '16px'
        }}>
          <img
            src={alertData.avatar}
            alt={alertData.name}
            style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid #ef4444' }}
          />

          <div style={{ fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{alertData.name}</div>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}>
              MATCH CONFIDENCE: {alertData.confidenceMatch || 98.4}%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.76rem' }}>
              <strong>Category:</strong> {alertData.category} ({alertData.subCategory})
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
              <strong>Last Location:</strong> {alertData.lastSeen}
            </div>
          </div>
        </div>

        {/* Dispatch Action Status */}
        {dispatched ? (
          <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#10b981', fontSize: '0.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CheckCircle2 size={18} /> Emergency Patrol Unit Dispatched to Camera Location!
          </div>
        ) : (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Law Enforcement Officer notification alert active. Confirm emergency dispatch to alert nearby units.
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? 'Unmute Audio' : 'Mute Alarm'}
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={onClose}>Dismiss</button>
            <button 
              className="btn btn-danger" 
              onClick={() => setDispatched(true)}
              disabled={dispatched}
            >
              <PhoneCall size={16} /> Confirm Dispatch Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
