import React, { useState } from 'react';
import { Sliders, Sparkles, Clock, RefreshCw, UserCheck, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { INITIAL_MISSING_PERSONS, INITIAL_CRIMINALS } from '../data/mockData';
import { generateRandomEmbedding } from '../utils/faceAiEngine';

export default function AgingSimulator() {
  const [selectedSubject, setSelectedSubject] = useState(INITIAL_MISSING_PERSONS[0]); // Aarav Sharma (Child)
  const [yearsAdvance, setYearsAdvance] = useState(5); // +5 Years
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState(null);

  const handleRunAgingSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newAge = selectedSubject.age + yearsAdvance;
      const seed = selectedSubject.name.length + yearsAdvance;
      const newEmbeddings = generateRandomEmbedding(seed);
      
      setSimulatedResult({
        projectedAge: newAge,
        projectedVector: newEmbeddings,
        confidenceInterval: (98.5 - (yearsAdvance * 0.4)).toFixed(1),
        visualPredictionUrl: selectedSubject.avatar // Using avatar as base
      });
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock color="var(--accent-indigo)" /> AI Suspect Aging & Facial Progression Simulator
            </h2>
            <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>PREDICTIVE BIOMETRICS</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Generates AI Age-Progressed Facial Embeddings & Vector Projections for Long-Term Missing Persons & Fugitives
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleRunAgingSimulation} disabled={isSimulating}>
          {isSimulating ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
          {isSimulating ? 'Computing Age Transformation...' : 'Generate Age Progression Vector'}
        </button>
      </div>

      {/* Main Grid: Subject Picker & Controls vs AI Vector Prediction Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column: Target Selector & Time Progression Slider */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--accent-cyan)" /> 1. Select Target & Progression Span
          </h3>

          {/* Subject Picker */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>TARGET SUBJECT</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              {[...INITIAL_MISSING_PERSONS, ...INITIAL_CRIMINALS].slice(0, 4).map(sub => (
                <button
                  key={sub.id}
                  onClick={() => { setSelectedSubject(sub); setSimulatedResult(null); }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedSubject.id === sub.id ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-primary)',
                    border: selectedSubject.id === sub.id ? '1px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <img src={sub.avatar} alt={sub.name} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  {sub.name.split(' ')[0]} ({sub.age}y)
                </button>
              ))}
            </div>
          </div>

          {/* Subject Card Display */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <img
              src={selectedSubject.avatar}
              alt={selectedSubject.name}
              style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.96rem' }}>{selectedSubject.name}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                ID: {selectedSubject.id} | Current Age: {selectedSubject.age} years
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--accent-amber)', marginTop: '2px' }}>
                Category: {selectedSubject.category} ({selectedSubject.subCategory})
              </div>
            </div>
          </div>

          {/* Aging Advancement Slider */}
          <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
              <span>Age Progression Advance:</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-indigo)', fontFamily: 'JetBrains Mono' }}>
                +{yearsAdvance} Years (Target Age: {selectedSubject.age + yearsAdvance} yrs)
              </span>
            </div>

            <input 
              type="range" min="1" max="20" step="1"
              value={yearsAdvance}
              onChange={(e) => setYearsAdvance(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>+1 Year</span>
              <span>+5 Years</span>
              <span>+10 Years</span>
              <span>+20 Years</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Visual & Vector Output Prediction */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--accent-indigo)" /> 2. AI Age-Progressed Vector Prediction
            </h3>

            {simulatedResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Visual Side-by-Side Comparison */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={selectedSubject.avatar}
                      alt="Original"
                      style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                    />
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Original ({selectedSubject.age} yrs)</div>
                  </div>

                  <ArrowRight size={24} color="var(--accent-indigo)" />

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid var(--accent-indigo)', filter: 'contrast(1.1) brightness(0.95)' }}>
                      <img
                        src={selectedSubject.avatar}
                        alt="Age Progressed"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(99, 102, 241, 0.85)', color: '#fff', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px' }}>
                        AI AGE PROJECTION
                      </div>
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-indigo)', marginTop: '4px' }}>
                      Projected ({simulatedResult.projectedAge} yrs)
                    </div>
                  </div>
                </div>

                {/* Vector Embedding Output */}
                <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--accent-indigo)', marginBottom: '6px' }}>
                    AGE-ADJUSTED RESNET-50 EMBEDDING VECTOR (+{yearsAdvance} YEARS)
                  </div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                    [{simulatedResult.projectedVector.join(', ')}]
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={16} /> Projected Vector Match Accuracy: {simulatedResult.confidenceInterval}%
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '50px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                Adjust aging slider and click "Generate Age Progression Vector" to compute AI facial transformations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
