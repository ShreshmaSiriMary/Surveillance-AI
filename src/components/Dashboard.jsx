import React from 'react';
import { Users, Video, AlertTriangle, Activity, Cpu, CheckCircle2, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { SYSTEM_METRICS, RECENT_ALERTS, CAMERAS, INITIAL_CRIMINALS, INITIAL_MISSING_PERSONS } from '../data/mockData';

export default function Dashboard({ setActiveTab, onTriggerMatchAlert }) {
  const totalCriminals = INITIAL_CRIMINALS.length;
  const totalMissing = INITIAL_MISSING_PERSONS.length;
  const activeCams = CAMERAS.filter(c => c.status === 'ACTIVE' || c.status.includes('LIVE')).length;

  return (
    <div className="dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome & Quick Action Header */}
      <div className="dashboard-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Operations overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            Review sample cases, camera activity, and service indicators.
          </p>
        </div>

        <div className="dashboard-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('sketch')}>
            <Zap size={16} color="var(--accent-cyan)" />
            Image matching
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('surveillance')}>
            <Video size={16} />
            View camera demo
          </button>
        </div>
      </div>

      <div className="demo-notice" role="note">
        <strong>Demonstration data</strong>
        <span>Records, alerts, camera feeds, and system metrics are simulated. No live services are connected.</span>
      </div>

      {/* KPI Key Metric Cards Grid */}
      <div className="dashboard-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Card 1: Total Registered DB */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>SAMPLE RECORDS</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalCriminals + totalMissing}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '8px' }}>
            <span>{totalCriminals} case profiles</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-amber)' }}>{totalMissing} missing persons</span>
          </div>
        </div>

        {/* Card 2: Active CCTV Feed Nodes */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>SAMPLE CAMERAS</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <Video size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{activeCams} / {CAMERAS.length}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> Example status only
          </div>
        </div>

        {/* Card 3: Model Accuracy */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>ILLUSTRATIVE MODEL METRICS</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{SYSTEM_METRICS.accuracy}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Precision: {SYSTEM_METRICS.precision} · Recall: {SYSTEM_METRICS.recall}
          </div>
        </div>

        {/* Card 4: AI Latency */}
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>INFERENCE LATENCY</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <Cpu size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{SYSTEM_METRICS.avgInferenceLatency}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-amber)', marginTop: '4px' }}>
            Sample performance indicator
          </div>
        </div>
      </div>

      {/* Main Grid Section: Live Feeds Preview & Emergency Alerts Feed */}
      <div className="dashboard-content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Column: Live CCTV Camera Feeds Quick Grid */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', className: 'pulse-red' }} />
              <h3 style={{ fontSize: '1.05rem' }}>Camera feed previews</h3>
            </div>
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setActiveTab('surveillance')}
            >
              View camera demo <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="camera-preview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {CAMERAS.slice(0, 4).map(cam => (
              <div 
                key={cam.id}
                style={{
                  position: 'relative',
                  height: '150px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: '#040711'
                }}
              >
                {/* Simulated Feed Background */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.55
                }} />

                {/* Camera Overlay Info */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                    {cam.id}
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.6rem' }}>Sample · {cam.status}</span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{cam.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{cam.location}</div>
                  </div>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px', color: '#8fc5dd' }}>
                    {cam.detectedCount} sample detections
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Alert Activity Log & Simulation Trigger */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="var(--accent-red)" />
                <h3 style={{ fontSize: '1.05rem' }}>Recent sample alerts</h3>
              </div>
              <span className="badge badge-critical">Sample activity</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {RECENT_ALERTS.map(alt => (
                <div 
                  key={alt.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                    borderLeft: `4px solid ${alt.threatLevel === 'CRITICAL' ? '#ef4444' : '#f59e0b'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                    <span style={{ fontWeight: 700, color: alt.threatLevel === 'CRITICAL' ? '#ef4444' : '#f59e0b' }}>
                      {alt.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{alt.timestamp}</span>
                  </div>

                  <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>{alt.subjectName}</div>
                  
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{alt.camera}</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>Match: {alt.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Simulation Trigger Button */}
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', fontSize: '0.82rem' }}
              onClick={() => onTriggerMatchAlert && onTriggerMatchAlert(INITIAL_CRIMINALS[0])}
            >
              <AlertTriangle size={16} /> Preview a sample alert
            </button>
          </div>
        </div>
      </div>

      {/* System Pipeline Architecture Overview (From B.Tech Project Thesis) */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--accent-cyan)" />
          Example image review workflow
        </h3>

        <div className="workflow-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
          textAlign: 'center',
          alignItems: 'center'
        }}>
          {[
            { step: '1. Add an image', desc: 'Use a sample or upload' },
            { step: '2. Review image quality', desc: 'Check lighting and framing' },
            { step: '3. Inspect candidate results', desc: 'Treat matches as unverified' },
            { step: '4. Check case context', desc: 'Confirm details independently' },
            { step: '5. Record a decision', desc: 'Document review outcome' },
            { step: '6. Escalate when needed', desc: 'Use established procedures' },
            { step: '7. Follow up', desc: 'Keep an auditable record' }
          ].map((item, idx) => (
            <div 
              key={idx}
              style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.76rem'
              }}
            >
              <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '4px' }}>{item.step}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
