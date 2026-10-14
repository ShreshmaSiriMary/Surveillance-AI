import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Lock, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AuditLogs() {
  const [logFilter, setLogFilter] = useState('ALL');
  const [searchLog, setSearchLog] = useState('');

  const mockLogs = [
    { id: 'LOG-9912', timestamp: '2026-08-24 12:41:05', officer: 'Insp. Rajesh Verma (PU-702)', action: 'Emergency Dispatch Confirmed for Vikram Malhotra', level: 'CRITICAL', ip: '192.168.31.46' },
    { id: 'LOG-9910', timestamp: '2026-08-24 12:35:12', officer: 'Officer Priya Nair (PU-551)', action: 'AMBER Alert Match Detected on CAM-03', level: 'WARNING', ip: '192.168.31.50' },
    { id: 'LOG-9904', timestamp: '2026-08-24 11:20:00', officer: 'Det. Sarah Jenkins (PU-819)', action: 'Privacy Face Blur Mode Toggled ON (CAM-02)', level: 'INFO', ip: '192.168.31.44' },
    { id: 'LOG-9892', timestamp: '2026-08-24 10:15:30', officer: 'Insp. R. Sharma (PU-101)', action: '128-D Vector Dossier Exported (CRM-2026-0412)', level: 'INFO', ip: '192.168.31.10' },
    { id: 'LOG-9880', timestamp: '2026-08-24 09:00:15', officer: 'System Daemon', action: 'CCTV Cluster Health Check Passed (5/5 Operational)', level: 'INFO', ip: '127.0.0.1' }
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesFilter = logFilter === 'ALL' || log.level === logFilter;
    const matchesSearch = log.action.toLowerCase().includes(searchLog.toLowerCase()) || log.officer.toLowerCase().includes(searchLog.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock color="var(--accent-cyan)" /> Immutable Security Audit & Compliance Ledger
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Cryptographically Hashed Operational Logs & Chain of Custody Audit Trail
          </p>
        </div>

        <span className="badge badge-emerald">AES-256 LEDGER ACTIVE</span>
      </div>

      {/* Filter Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setLogFilter(lvl)}
              className={`btn ${logFilter === lvl ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              {lvl} Logs
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search Audit Logs..."
            value={searchLog}
            onChange={(e) => setSearchLog(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '32px' }}
          />
        </div>
      </div>

      {/* Log Table */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Log ID</th>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Timestamp</th>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Officer / Actor</th>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Action Executed</th>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Security Level</th>
              <th style={{ padding: '10px', color: 'var(--text-muted)' }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}>{row.id}</td>
                <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{row.timestamp}</td>
                <td style={{ padding: '10px', fontWeight: 600 }}>{row.officer}</td>
                <td style={{ padding: '10px' }}>{row.action}</td>
                <td style={{ padding: '10px' }}>
                  <span className={`badge ${row.level === 'CRITICAL' ? 'badge-critical' : (row.level === 'WARNING' ? 'badge-amber' : 'badge-cyan')}`} style={{ fontSize: '0.58rem' }}>
                    {row.level}
                  </span>
                </td>
                <td style={{ padding: '10px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
