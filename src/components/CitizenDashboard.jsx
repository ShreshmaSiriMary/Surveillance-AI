import React, { useState } from 'react';
import { Search, MapPin, Eye, AlertCircle, Send, CheckCircle2, Heart, Shield, Plus, X, Upload, CreditCard, Shirt, Calendar, UserCheck } from 'lucide-react';
import { INITIAL_MISSING_PERSONS } from '../data/mockData';
import { generateRandomEmbedding } from '../utils/faceAiEngine';

export default function CitizenDashboard() {
  const [missingList, setMissingList] = useState(INITIAL_MISSING_PERSONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  // Modal States
  const [showTipModal, setShowTipModal] = useState(false);
  const [showFirModal, setShowFirModal] = useState(false);
  const [submittedFir, setSubmittedFir] = useState(null);

  // Tip form state
  const [tipData, setTipData] = useState({
    location: '',
    details: ''
  });

  // Official Missing Person FIR Complaint Form State (With Aadhar Card & Wearing Details)
  const [firData, setFirData] = useState({
    name: '',
    age: 12,
    gender: 'Male',
    threatLevel: 'AMBER ALERT',
    lastSeen: '',
    lastSeenDate: '',
    wearingDetails: '',
    aadharNumber: '',
    complainantName: '',
    complainantRelation: '',
    complainantPhone: '',
    photoPreview: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&auto=format&fit=crop&q=80',
    aadharDocPreview: null
  });

  const filteredPersons = missingList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lastSeen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Submit Tip Handler
  const handleSendTip = (e) => {
    e.preventDefault();
    alert("Anonymous tip successfully dispatched to police authorities!");
    setShowTipModal(false);
    setTipData({ location: '', details: '' });
  };

  // Upload Missing Person Photo Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFirData({ ...firData, photoPreview: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Aadhar Card Document Handler
  const handleAadharDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFirData({ ...firData, aadharDocPreview: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Official Missing Person FIR Complaint Handler
  const handleFileFirComplaint = (e) => {
    e.preventDefault();
    
    // Format Aadhar number: XXXX-XXXX-XXXX
    const rawAadhar = firData.aadharNumber.replace(/\D/g, '');
    const formattedAadhar = rawAadhar.length === 12 
      ? `${rawAadhar.slice(0,4)}-${rawAadhar.slice(4,8)}-${rawAadhar.slice(8,12)}` 
      : firData.aadharNumber;

    const firRef = `FIR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newMissingEntry = {
      id: `MSG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: firData.name,
      category: "Missing Person",
      subCategory: firData.age < 18 ? "Child" : "Adult",
      alias: firData.name.split(' ')[0],
      age: parseInt(firData.age),
      gender: firData.gender,
      threatLevel: firData.threatLevel,
      wantedFor: `Missing since ${firData.lastSeenDate || 'Today'} from ${firData.lastSeen}`,
      lastSeen: firData.lastSeen,
      lastSeenDate: firData.lastSeenDate || new Date().toISOString().replace('T', ' ').substring(0, 16),
      locationCoords: { lat: 22.3080, lng: 73.1750 },
      reward: "₹100,000 (Family Reward)",
      status: "Active Search",
      confidenceMatch: 97.5,
      avatar: firData.photoPreview,
      caseOfficer: `${firData.complainantName} (${firData.complainantRelation})`,
      description: `Wearing: ${firData.wearingDetails}. Complainant: ${firData.complainantName} (${firData.complainantPhone})`,
      wearingDetails: firData.wearingDetails,
      aadharNumber: formattedAadhar,
      firNumber: firRef,
      facialEmbeddings: generateRandomEmbedding(firData.name.length)
    };

    setMissingList([newMissingEntry, ...missingList]);
    setSubmittedFir({ firNumber: firRef, name: firData.name });
    setShowFirModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Citizen Banner Header */}
      <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
              PUBLIC CITIZEN SAFETY PORTAL
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Community Missing Persons & FIR Complaint Filing</h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '650px' }}>
              File official missing person complaints with Aadhar card verification and clothing details. Submit anonymous sightings directly to police authorities.
            </p>
          </div>

          <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', padding: '12px 20px' }} onClick={() => setShowFirModal(true)}>
            <Plus size={18} /> File Missing Person FIR Complaint
          </button>
        </div>
      </div>

      {/* Submitted FIR Success Toast */}
      {submittedFir && (
        <div className="glass-card" style={{ padding: '16px 20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={24} color="#10b981" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.96rem', color: '#10b981' }}>
                FIR Complaint Filed Successfully! Reference: {submittedFir.firNumber}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                {submittedFir.name} has been added to active CNN facial surveillance tracking across all CCTV camera nodes.
              </div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => setSubmittedFir(null)}>Dismiss</button>
        </div>
      )}

      {/* Search & Counter Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', width: '360px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search missing person by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
          Active Missing Registries: <strong style={{ color: 'var(--accent-emerald)' }}>{missingList.length} Persons Listed</strong>
        </div>
      </div>

      {/* Missing Persons Public Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredPersons.map(person => (
          <div key={person.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--accent-amber)' }}>
            <div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                <img
                  src={person.avatar}
                  alt={person.name}
                  style={{ width: '74px', height: '74px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--accent-amber)' }}
                />
                <div>
                  <span className="badge badge-amber" style={{ fontSize: '0.6rem' }}>{person.threatLevel}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>{person.name}</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                    {person.firNumber ? `FIR: ${person.firNumber}` : `ID: ${person.id}`} • {person.age} yrs ({person.gender})
                  </div>
                </div>
              </div>

              {/* Wearing Details & Aadhar Info */}
              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '12px', fontSize: '0.76rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shirt size={13} /> Wearing Details:
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{person.wearingDetails || person.wantedFor}</div>

                {person.aadharNumber && (
                  <div style={{ marginTop: '4px', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'JetBrains Mono' }}>
                    <CreditCard size={12} color="var(--accent-emerald)" /> Aadhar Verification: XXXX-XXXX-{person.aadharNumber.slice(-4)}
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="var(--accent-cyan)" /> <strong>Last Seen:</strong> {person.lastSeen}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Heart size={13} color="#ef4444" /> <strong>Reward:</strong> {person.reward}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', fontSize: '0.82rem' }}
              onClick={() => { setSelectedPerson(person); setShowTipModal(true); }}
            >
              <Send size={14} /> Report Sighting of {person.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>

      {/* MODAL 1: File Official Missing Person FIR Complaint with Aadhar & Photos */}
      {showFirModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(7, 11, 20, 0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 250
        }}>
          <form className="glass-card" onSubmit={handleFileFirComplaint} style={{ width: '620px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button 
              type="button"
              onClick={() => setShowFirModal(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Shield color="var(--accent-emerald)" size={24} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>File Official Missing Person FIR Complaint</h2>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Submit missing person photo, clothing details, and Aadhar card verification to initiate real-time AI facial recognition tracking across smart city CCTV cameras.
            </p>

            {/* Section 1: Missing Person Details */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
                1. MISSING PERSON DETAILS
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Missing Person Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={firData.name}
                    onChange={(e) => setFirData({ ...firData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Age *</label>
                  <input
                    type="number"
                    required
                    value={firData.age}
                    onChange={(e) => setFirData({ ...firData, age: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Gender *</label>
                  <select
                    value={firData.gender}
                    onChange={(e) => setFirData({ ...firData, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Row */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <img
                  src={firData.photoPreview}
                  alt="Missing Person Preview"
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
                />
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Upload Recent Photo of Missing Person *</label>
                  <label className="btn btn-secondary" style={{ fontSize: '0.76rem', padding: '6px 12px', width: '100%', justifyContent: 'flex-start' }}>
                    <Upload size={14} /> Choose Image File
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: What They Were Wearing & Incident Location */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '10px' }}>
                2. CLOTHING & INCIDENT LOCATION DETAILS
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>What They Were Wearing (Clothing, Shirt, Pants, Shoes) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Hooded Sweatshirt, Blue Jeans, White Sneakers, Black Watch"
                  value={firData.wearingDetails}
                  onChange={(e) => setFirData({ ...firData, wearingDetails: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Where Missing (Exact Location) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Sayaji Baug Park Entrance, Vadodara"
                    value={firData.lastSeen}
                    onChange={(e) => setFirData({ ...firData, lastSeen: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Date & Time Missing *</label>
                  <input
                    type="datetime-local"
                    required
                    value={firData.lastSeenDate}
                    onChange={(e) => setFirData({ ...firData, lastSeenDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Aadhar Card Verification & Complainant Info */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '10px' }}>
                3. AADHAR CARD VERIFICATION & COMPLAINANT INFO
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Missing Person 12-Digit Aadhar Card Number *</label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  placeholder="e.g. 4812-9034-7712"
                  value={firData.aadharNumber}
                  onChange={(e) => setFirData({ ...firData, aadharNumber: e.target.value })}
                  className="input-field"
                  style={{ fontFamily: 'JetBrains Mono' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Complainant Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Miriyala Pujitha"
                    value={firData.complainantName}
                    onChange={(e) => setFirData({ ...firData, complainantName: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Relation to Missing Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mother / Sister"
                    value={firData.complainantRelation}
                    onChange={(e) => setFirData({ ...firData, complainantRelation: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Contact Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={firData.complainantPhone}
                    onChange={(e) => setFirData({ ...firData, complainantPhone: e.target.value })}
                    className="input-field"
                    style={{ fontFamily: 'JetBrains Mono' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowFirModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981', padding: '10px 20px' }}>
                <Shield size={18} /> File FIR Complaint & Initiate AI Search
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: Anonymous Sighting Tip */}
      {showTipModal && selectedPerson && (
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
          zIndex: 200
        }}>
          <form className="glass-card" onSubmit={handleSendTip} style={{ width: '480px', padding: '24px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button 
              type="button"
              onClick={() => setShowTipModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Report Sighting of {selectedPerson.name}</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Send location sighting details directly to Insp. Boyapati Shrashma Siri Mary's command team.
            </p>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sighting Location *</label>
              <input
                type="text"
                required
                placeholder="e.g. Near Fatehgunj Bus Station, Vadodara"
                value={tipData.location}
                onChange={(e) => setTipData({ ...tipData, location: e.target.value })}
                className="input-field"
                style={{ marginTop: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sighting Description & Direction *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe clothing, time of sighting, who they were with..."
                value={tipData.details}
                onChange={(e) => setTipData({ ...tipData, details: e.target.value })}
                className="input-field"
                style={{ marginTop: '4px', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowTipModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }}>
                <Send size={16} /> Submit Sighting Tip
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
