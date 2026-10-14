import React, { useState } from 'react';
import { Briefcase, Search, Plus, Filter, Clock, MapPin, User, CheckCircle2, AlertCircle, FileText, Send, Eye, Shield } from 'lucide-react';
import { INITIAL_MISSING_PERSONS, INITIAL_OFFICERS } from '../data/mockData';

export default function CaseManagement() {
  const [cases, setCases] = useState(INITIAL_MISSING_PERSONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCase, setSelectedCase] = useState(null);
  const [newNote, setNewNote] = useState('');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.lastSeen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (caseId, newStatus) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCase) return;

    const noteObj = {
      text: newNote,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      author: 'Insp. Boyapati Shrashma Siri Mary'
    };

    setCases(prev => prev.map(c => c.id === selectedCase.id ? {
      ...c,
      notes: [...(c.notes || []), noteObj]
    } : c));

    setSelectedCase(prev => ({
      ...prev,
      notes: [...(prev.notes || []), noteObj]
    }));

    setNewNote('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(6, 182, 212, 0.08))', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
              PUBLIC SAFETY CASE MANAGEMENT & DISPATCH
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Active Missing Person & Incident Cases</h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Review case timelines, assign duty officers, update investigation statuses, and review AI candidate matches.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE CASES</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {cases.filter(c => c.status !== 'RESOLVED / LOCATED').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
        <div style={{ position: 'relative', width: '340px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by case ID, name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {['ALL', 'ACTIVE SEARCH', 'INVESTIGATION', 'RESOLVED / LOCATED'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: statusFilter === status ? 'var(--accent-cyan)' : 'transparent',
                color: statusFilter === status ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredCases.map(c => (
          <div key={c.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--accent-cyan)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-cyan" style={{ fontFamily: 'Space Mono' }}>{c.id}</span>
                <span className={`badge ${c.status === 'RESOLVED / LOCATED' ? 'badge-emerald' : 'badge-amber'}`}>
                  {c.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <img
                  src={c.avatar}
                  alt={c.name}
                  style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{c.name}</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Age: {c.age} yrs • {c.gender}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '2px', fontFamily: 'Space Mono' }}>
                    {c.firNumber || `FIR-2026-${c.id.slice(-4)}`}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                {c.description}
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="var(--accent-cyan)" /> {c.lastSeen}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={13} color="var(--accent-emerald)" /> Officer: {c.caseOfficer}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.82rem' }}
              onClick={() => setSelectedCase(c)}
            >
              <Eye size={14} /> Open Case Docket & Timeline
            </button>
          </div>
        ))}
      </div>

      {/* Detailed Case Inspection Drawer Modal */}
      {selectedCase && (
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
          zIndex: 250
        }}>
          <div className="glass-card" style={{ width: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <Eye size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <img
                src={selectedCase.avatar}
                alt={selectedCase.name}
                style={{ width: '68px', height: '68px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
              />
              <div>
                <span className="badge badge-cyan" style={{ fontFamily: 'Space Mono' }}>{selectedCase.id}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>{selectedCase.name}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Assigned Officer: {selectedCase.caseOfficer}</div>
              </div>
            </div>

            {/* Case Status Controls */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>CURRENT INVESTIGATION STATUS</div>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '2px' }}>{selectedCase.status}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.76rem' }}
                  onClick={() => handleUpdateStatus(selectedCase.id, 'INVESTIGATION')}
                >
                  Set Active Investigation
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ fontSize: '0.76rem', background: '#10b981', borderColor: '#10b981' }}
                  onClick={() => handleUpdateStatus(selectedCase.id, 'RESOLVED / LOCATED')}
                >
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Case Notes History */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.86rem', fontWeight: 700, marginBottom: '8px' }}>Investigation Case Notes</h4>
              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(selectedCase.notes || [
                  { text: 'Case registered following complaint. CNN facial vectors generated.', author: selectedCase.caseOfficer, timestamp: '2026-08-24 10:00 AM' }
                ]).map((note, idx) => (
                  <div key={idx} style={{ fontSize: '0.76rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                      <span><strong>{note.author}</strong></span>
                      <span style={{ fontFamily: 'Space Mono', fontSize: '0.7rem' }}>{note.timestamp}</span>
                    </div>
                    <div style={{ color: 'var(--text-primary)', marginTop: '2px' }}>{note.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                required
                placeholder="Append official case note or lead updates..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 16px' }}>
                <Send size={16} /> Append Note
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
