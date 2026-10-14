import React, { useState } from 'react';
import { ShieldCheck, UserCheck, UserX, Clock, Search, Eye, Filter, CheckCircle2, AlertTriangle, FileText, Lock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CitizenVerificationCenter() {
  const { citizensList, updateCitizenVerificationStatus } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  const filteredCitizens = citizensList.filter(citizen => {
    const matchesSearch = (citizen.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (citizen.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (citizen.phone || '').includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || citizen.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (citizenEmail, newStatus) => {
    updateCitizenVerificationStatus(citizenEmail, newStatus);
    if (selectedCitizen && selectedCitizen.email === citizenEmail) {
      setSelectedCitizen(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.08))', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
              ADMINISTRATION & IDENTITY MANAGEMENT
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Citizen Account Verification Center</h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Review submitted citizen identities, masked Aadhaar verifications, and manage portal access privileges.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>PENDING VERIFICATIONS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                {citizensList.filter(c => c.status === 'PENDING VERIFICATION' || c.status === 'PENDING').length}
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>VERIFIED CITIZENS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {citizensList.filter(c => c.status === 'VERIFIED').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
        <div style={{ position: 'relative', width: '340px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search citizen by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {['ALL', 'PENDING VERIFICATION', 'VERIFIED', 'UNDER REVIEW', 'REJECTED'].map(status => (
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

      {/* Citizens Verification Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.74rem', fontWeight: 700 }}>
              <th style={{ padding: '14px 16px' }}>CITIZEN PROFILE</th>
              <th style={{ padding: '14px 16px' }}>REGISTRATION DATE</th>
              <th style={{ padding: '14px 16px' }}>MASKED AADHAAR ID</th>
              <th style={{ padding: '14px 16px' }}>CONTACT EMAIL</th>
              <th style={{ padding: '14px 16px' }}>MOBILE PHONE</th>
              <th style={{ padding: '14px 16px' }}>STATUS</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredCitizens.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No citizen verification records found matching criteria.
                </td>
              </tr>
            ) : (
              filteredCitizens.map(citizen => {
                const isPending = citizen.status === 'PENDING VERIFICATION' || citizen.status === 'PENDING';
                const isVerified = citizen.status === 'VERIFIED';
                return (
                  <tr key={citizen.email} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s ease' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={citizen.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"}
                          alt={citizen.name}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{citizen.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ID: {citizen.id || 'CIT-NEW'}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'Space Mono' }}>
                      {citizen.registrationDate || '2026-08-26'}
                    </td>

                    <td style={{ padding: '14px 16px', color: 'var(--accent-cyan)', fontFamily: 'Space Mono', fontWeight: 700 }}>
                      {citizen.maskedAadhaar || 'XXXX-XXXX-1234'}
                    </td>

                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                      {citizen.email}
                    </td>

                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'Space Mono' }}>
                      {citizen.phone}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span className={`badge ${isVerified ? 'badge-emerald' : isPending ? 'badge-amber' : 'badge-critical'}`}>
                        {citizen.status}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                          onClick={() => setSelectedCitizen(citizen)}
                        >
                          <Eye size={13} /> Inspect
                        </button>

                        {isPending && (
                          <>
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{ padding: '4px 10px', fontSize: '0.74rem', background: '#10b981', borderColor: '#10b981' }}
                              onClick={() => handleAction(citizen.email, 'VERIFIED')}
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '4px 10px', fontSize: '0.74rem', color: '#f43f5e' }}
                              onClick={() => handleAction(citizen.email, 'REJECTED')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Citizen Detailed Verification Drawer Modal */}
      {selectedCitizen && (
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
          <div className="glass-card" style={{ width: '560px', padding: '24px', background: 'var(--bg-secondary)', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setSelectedCitizen(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <img
                src={selectedCitizen.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"}
                alt={selectedCitizen.name}
                style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
              />
              <div>
                <span className={`badge ${selectedCitizen.status === 'VERIFIED' ? 'badge-emerald' : 'badge-amber'}`}>
                  {selectedCitizen.status}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>{selectedCitizen.name}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registered: {selectedCitizen.registrationDate || '2026-08-26'}</div>
              </div>
            </div>

            {/* Profile Info Details Grid */}
            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', marginBottom: '20px' }}>
              <div><strong>Email:</strong> {selectedCitizen.email}</div>
              <div><strong>Mobile Phone:</strong> <span style={{ fontFamily: 'Space Mono' }}>{selectedCitizen.phone}</span></div>
              <div><strong>Masked Aadhaar ID:</strong> <span style={{ color: 'var(--accent-cyan)', fontFamily: 'Space Mono', fontWeight: 700 }}>{selectedCitizen.maskedAadhaar || 'XXXX-XXXX-1234'}</span></div>
              <div><strong>Residential Address:</strong> {selectedCitizen.address || 'Vadodara, Gujarat'}</div>
              <div><strong>Emergency Contact:</strong> {selectedCitizen.emergencyContact || 'Family Contact'}</div>
            </div>

            {/* Verification Actions */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ color: '#f43f5e' }}
                onClick={() => { handleAction(selectedCitizen.email, 'REJECTED'); setSelectedCitizen(null); }}
              >
                <UserX size={16} /> Reject Application
              </button>

              <button
                type="button"
                className="btn btn-primary"
                style={{ background: '#10b981', borderColor: '#10b981' }}
                onClick={() => { handleAction(selectedCitizen.email, 'VERIFIED'); setSelectedCitizen(null); }}
              >
                <UserCheck size={16} /> Approve & Verify Identity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
