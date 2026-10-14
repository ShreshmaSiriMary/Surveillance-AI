import React, { useState } from 'react';
import { BarChart3, FileText, Printer, Download, ShieldCheck, Cpu, CheckCircle2, Award } from 'lucide-react';
import { SYSTEM_METRICS, RECENT_ALERTS, INITIAL_CRIMINALS } from '../data/mockData';

export default function AnalyticsReports() {
  const [selectedCaseAlert, setSelectedCaseAlert] = useState(RECENT_ALERTS[0]);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Toolbar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 color="var(--accent-cyan)" /> Model Analytics & Automated Case Reports
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            System Evaluation Metrics, Confusion Matrix Telemetry & Printable Evidence Reports
          </p>
        </div>

        <button className="btn btn-primary" onClick={handlePrintReport}>
          <Printer size={16} /> Export / Print Case Evidence Report
        </button>
      </div>

      {/* Model Performance Evaluation Table (From B.Tech Thesis PDF) */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" /> Model Performance & Load Evaluation Table
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Parameter</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Description</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Benchmark Result</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { param: 'Accuracy', desc: 'Correct identification of facial targets', res: '98.4%', status: 'PASSED' },
                { param: 'Precision', desc: 'True positive predictions ratio', res: '97.8%', status: 'PASSED' },
                { param: 'Recall', desc: 'Detection rate of actual wanted targets', res: '96.9%', status: 'PASSED' },
                { param: 'Response Time', desc: 'Time taken to identify face in video', res: '< 15 ms', status: 'OPTIMAL' },
                { param: 'Processing Speed', desc: 'Frame processing rate', res: '30-60 FPS Real-time', status: 'PASSED' },
                { param: 'False Positive Rate', desc: 'Incorrect positive matches', res: 'Low (< 1.2%)', status: 'SECURE' },
                { param: 'False Negative Rate', desc: 'Missed target detections', res: 'Low (< 1.6%)', status: 'SECURE' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 800 }}>{row.param}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{row.desc}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>{row.res}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Case Incident Evidence Report Generator Card */}
      <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid var(--border-color)', paddingBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
              OFFICIAL LAW ENFORCEMENT INCIDENT REPORT
            </div>
            <h2 style={{ fontSize: '1.4rem', marginTop: '2px' }}>Incident File #{selectedCaseAlert.id}</h2>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            <div>Date: 2026-08-24</div>
            <div>Department: AI & Data Science Command Unit</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
          {/* Frame Capture Image */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid var(--accent-red)' }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
              alt="Timestamped Frame"
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <div style={{ background: '#ef4444', color: '#fff', fontSize: '0.68rem', fontWeight: 'bold', padding: '4px', textAlign: 'center' }}>
              TIMESTAMPED FRAME CAPTURE (CAM-02)
            </div>
          </div>

          {/* Incident Details */}
          <div style={{ fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Subject Name:</strong> {selectedCaseAlert.subjectName}</div>
            <div><strong>Category:</strong> {selectedCaseAlert.category} ({selectedCaseAlert.threatLevel})</div>
            <div><strong>Match Confidence:</strong> <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{selectedCaseAlert.confidence}%</span></div>
            <div><strong>Camera Node:</strong> {selectedCaseAlert.camera}</div>
            <div><strong>Handling Officer:</strong> {selectedCaseAlert.officer}</div>
            <div><strong>Dispatch Status:</strong> <span className="badge badge-critical">{selectedCaseAlert.status}</span></div>
          </div>
        </div>

        {/* Officer Signature & Chain of Custody Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)' }}>Chain of Custody Hash:</div>
            <div style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
              eab3fe503c60451d8f77df3753f5254_AES256
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '160px', borderBottom: '1px solid var(--text-primary)', marginBottom: '4px', height: '30px' }} />
            <div style={{ fontWeight: 700 }}>Authorized Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
