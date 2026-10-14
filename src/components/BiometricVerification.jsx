import React, { useState } from 'react';
import { Fingerprint, Eye, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { INITIAL_CRIMINALS } from '../data/mockData';

export default function BiometricVerification() {
  const [selectedSubject, setSelectedSubject] = useState(INITIAL_CRIMINALS[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedStep, setVerifiedStep] = useState(0); // 0 = idle, 1 = face, 2 = fingerprint, 3 = iris, 4 = complete

  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerifiedStep(1);

    setTimeout(() => setVerifiedStep(2), 700);
    setTimeout(() => setVerifiedStep(3), 1400);
    setTimeout(() => {
      setVerifiedStep(4);
      setIsVerifying(false);
    }, 2100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Fingerprint color="var(--accent-emerald)" /> Multi-Biometric Cross-Verification Portal
            </h2>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>DUAL-FACTOR AUTHORIZATION</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Combines CNN Facial Embeddings + Fingerprint Minutiae + Iris Scanning for 99.9% High-Security Verification
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleStartVerification} disabled={isVerifying}>
          {isVerifying ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <ShieldCheck size={16} />}
          {isVerifying ? 'Running Multi-Biometric Scan...' : 'Execute Biometric Verification'}
        </button>
      </div>

      {/* Main Grid: Target Selector & 3-Step Verification Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Left Column: Target Selector Card */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.02rem', marginBottom: '14px' }}>Target Identity</h3>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <img
              src={selectedSubject.avatar}
              alt={selectedSubject.name}
              style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-cyan)' }}
            />
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{selectedSubject.name}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                ID: {selectedSubject.id}
              </div>
            </div>

            <div style={{ width: '100%', padding: '10px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', fontSize: '0.74rem', textAlign: 'left' }}>
              <div><strong>Threat:</strong> {selectedSubject.threatLevel}</div>
              <div><strong>Status:</strong> {selectedSubject.status}</div>
              <div><strong>Assigned Officer:</strong> {selectedSubject.caseOfficer}</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Biometric Verification Layer Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Layer 1: Face CNN Embeddings */}
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${verifiedStep >= 1 ? '#10b981' : 'var(--border-color)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cpu size={22} color={verifiedStep >= 1 ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Layer 1: ResNet-50 Facial Vector Match</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>128-Dimensional Cosine Distance Match</div>
                </div>
              </div>

              {verifiedStep >= 1 ? (
                <span className="badge badge-emerald"><CheckCircle2 size={12} /> MATCH VERIFIED (98.4%)</span>
              ) : (
                <span className="badge badge-cyan">PENDING SCAN</span>
              )}
            </div>
          </div>

          {/* Layer 2: Fingerprint Minutiae Pattern */}
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${verifiedStep >= 2 ? '#10b981' : 'var(--border-color)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Fingerprint size={22} color={verifiedStep >= 2 ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Layer 2: Fingerprint Minutiae Ridge Cross-Check</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Bifurcation & Ridge Endings Analysis</div>
                </div>
              </div>

              {verifiedStep >= 2 ? (
                <span className="badge badge-emerald"><CheckCircle2 size={12} /> FINGERPRINT MATCHED</span>
              ) : (
                <span className="badge badge-cyan">PENDING SCAN</span>
              )}
            </div>
          </div>

          {/* Layer 3: Iris Texture Pattern */}
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${verifiedStep >= 3 ? '#10b981' : 'var(--border-color)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Eye size={22} color={verifiedStep >= 3 ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Layer 3: Iris Texture & Pupil Ratio Scan</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Infrared Pupil Dilation & Sclera Vectors</div>
                </div>
              </div>

              {verifiedStep >= 3 ? (
                <span className="badge badge-emerald"><CheckCircle2 size={12} /> IRIS VERIFIED (99.9%)</span>
              ) : (
                <span className="badge badge-cyan">PENDING SCAN</span>
              )}
            </div>
          </div>

          {/* Final Verification Certificate Status */}
          {verifiedStep === 4 && (
            <div className="glass-card" style={{ padding: '18px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={24} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    MULTIPLE BIOMETRIC VERIFICATION PASSED: 99.9% HIGH CONFIDENCE
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                    Executive arrest warrant & emergency police dispatch cleared. Chain of custody log generated.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
