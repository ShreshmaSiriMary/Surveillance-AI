import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Award, 
  FileText, 
  X, 
  Check, 
  Upload,
  Cpu
} from 'lucide-react';
import { INITIAL_CRIMINALS, INITIAL_MISSING_PERSONS } from '../data/mockData';
import { generateRandomEmbedding } from '../utils/faceAiEngine';

export default function DatabaseManager() {
  const [criminals, setCriminals] = useState(INITIAL_CRIMINALS);
  const [missingPersons, setMissingPersons] = useState(INITIAL_MISSING_PERSONS);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding new target
  const [formData, setFormData] = useState({
    name: '',
    category: 'Criminal',
    subCategory: 'Wanted Suspect',
    alias: '',
    age: 25,
    gender: 'Male',
    threatLevel: 'HIGH',
    wantedFor: '',
    lastSeen: '',
    reward: '$10,000',
    caseOfficer: 'Insp. R. Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    description: ''
  });

  const allRecords = [...criminals, ...missingPersons];

  const filteredRecords = allRecords.filter(item => {
    const matchesCategory = 
      activeFilter === 'ALL' ||
      (activeFilter === 'CRIMINAL' && item.category === 'Criminal') ||
      (activeFilter === 'MISSING' && item.category === 'Missing Person') ||
      (activeFilter === 'CRITICAL' && item.threatLevel.includes('CRITICAL'));
    
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.alias && item.alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.wantedFor && item.wantedFor.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCreateRecord = (e) => {
    e.preventDefault();
    const newId = formData.category === 'Criminal' 
      ? `CRM-2026-${Math.floor(1000 + Math.random() * 9000)}` 
      : `MSG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      ...formData,
      id: newId,
      status: 'At Large',
      confidenceMatch: 95.0,
      lastSeenDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      facialEmbeddings: generateRandomEmbedding(formData.name.length),
      locationCoords: { lat: 22.3000, lng: 73.1800 }
    };

    if (formData.category === 'Criminal') {
      setCriminals([newRecord, ...criminals]);
    } else {
      setMissingPersons([newRecord, ...missingPersons]);
    }

    setShowAddModal(false);
    setSelectedProfile(newRecord);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header & Action Controls */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users color="var(--accent-cyan)" /> Centralized Biometric Database Manager
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Manage Criminal Records, Missing Person Registries & CNN Facial Vectors
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Register New Subject
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'ALL', label: `All Records (${allRecords.length})` },
            { id: 'CRIMINAL', label: `Criminals (${criminals.length})` },
            { id: 'MISSING', label: `Missing Persons (${missingPersons.length})` },
            { id: 'CRITICAL', label: 'Critical Threat Level' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`btn ${activeFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by Name, Case ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        {filteredRecords.map(item => {
          const isCriminal = item.category === 'Criminal';
          return (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{ 
                padding: '16px', 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderTop: `4px solid ${isCriminal ? '#ef4444' : '#f59e0b'}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 800 }}>{item.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                        ID: {item.id} | {item.gender}, {item.age} yrs
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${item.threatLevel.includes('CRITICAL') ? 'badge-critical' : 'badge-amber'}`} style={{ fontSize: '0.6rem' }}>
                    {item.threatLevel}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.4 }}>
                  <strong>Wanted / Details:</strong> {item.wantedFor}
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} color="var(--accent-cyan)" /> {item.lastSeen}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={12} color="var(--accent-amber)" /> Reward: {item.reward}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', fontSize: '0.76rem', padding: '6px' }}
                  onClick={() => setSelectedProfile(item)}
                >
                  View Vector Dossier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vector Dossier Profile Modal */}
      {selectedProfile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.80)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 100
        }}>
          <div className="glass-card" style={{ width: '580px', padding: '24px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button 
              onClick={() => setSelectedProfile(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={selectedProfile.avatar}
                alt={selectedProfile.name}
                style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
              />
              <div>
                <span className={`badge ${selectedProfile.category === 'Criminal' ? 'badge-critical' : 'badge-amber'}`}>
                  {selectedProfile.category}
                </span>
                <h2 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{selectedProfile.name}</h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                  System ID: {selectedProfile.id} | Alias: "{selectedProfile.alias || 'N/A'}"
                </div>
              </div>
            </div>

            {/* Facial Embedding Vector Display */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Cpu size={14} /> 128-DIMENSIONAL CNN EMBEDDING VECTOR (RESNET-50)
              </div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', wordBreak: 'break-all', lineHeight: 1.6 }}>
                [{selectedProfile.facialEmbeddings ? selectedProfile.facialEmbeddings.join(', ') : '0.12, -0.45, 0.88, -0.23, 0.67, 0.11, -0.92, 0.34, 0.55, -0.19'}]
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Case Description:</strong> {selectedProfile.description || selectedProfile.wantedFor}</div>
              <div><strong>Assigned Officer:</strong> {selectedProfile.caseOfficer}</div>
              <div><strong>Last Known Location:</strong> {selectedProfile.lastSeen}</div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedProfile(null)}>Close Dossier</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Subject Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.80)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 100
        }}>
          <form className="glass-card" onSubmit={handleCreateRecord} style={{ width: '520px', padding: '24px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button 
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Register New Biometric Target</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Criminal">Criminal</option>
                  <option value="Missing Person">Missing Person</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Age</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Gender</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="input-field"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Threat Level</label>
                <select 
                  value={formData.threatLevel} 
                  onChange={(e) => setFormData({ ...formData, threatLevel: e.target.value })}
                  className="input-field"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="AMBER ALERT">AMBER ALERT</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Wanted For / Incident Reason</label>
              <input 
                type="text" 
                required
                value={formData.wantedFor} 
                onChange={(e) => setFormData({ ...formData, wantedFor: e.target.value })}
                className="input-field"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Last Known Location</label>
              <input 
                type="text" 
                value={formData.lastSeen} 
                onChange={(e) => setFormData({ ...formData, lastSeen: e.target.value })}
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save to Database</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
