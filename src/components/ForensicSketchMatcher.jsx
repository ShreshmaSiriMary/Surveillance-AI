import React, { useState } from 'react';
import { PenTool, Upload, Sparkles, Sliders, CheckCircle2, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { FORENSIC_SKETCHES, INITIAL_CRIMINALS, INITIAL_MISSING_PERSONS } from '../data/mockData';
import { findKNearestMatches, generateRandomEmbedding } from '../utils/faceAiEngine';

export default function ForensicSketchMatcher() {
  const [selectedSketch, setSelectedSketch] = useState(FORENSIC_SKETCHES[0]);
  const [customSketchImage, setCustomSketchImage] = useState(null);
  const [featureWeights, setFeatureWeights] = useState({
    jawline: 0.8,
    eyeDistance: 0.6,
    noseContour: 0.7,
    lipWidth: 0.5
  });
  const [matchingResults, setMatchingResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const allTargets = [...INITIAL_CRIMINALS, ...INITIAL_MISSING_PERSONS];

  const handleRunAiMatching = () => {
    setIsSearching(true);
    setTimeout(() => {
      // Calculate feature-weighted embedding search
      const baseSeed = (featureWeights.jawline * 100) + (featureWeights.eyeDistance * 50);
      const queryVec = generateRandomEmbedding(baseSeed);
      const results = findKNearestMatches(queryVec, allTargets, 3, 0.60);
      setMatchingResults(results);
      setIsSearching(false);
    }, 800);
  };

  const handleSketchUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomSketchImage(ev.target.result);
        setSelectedSketch({
          id: `SK-CUSTOM`,
          title: file.name,
          dateCreated: 'Today',
          sketchImage: ev.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PenTool color="var(--accent-amber)" /> AI Forensic Composite & Sketch Matcher
            </h2>
            <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>ENTERPRISE INNOVATION</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Perform Deep Embedding Vector Similarity Search on Hand-drawn Police Forensic Sketches
          </p>
        </div>

        <label className="btn btn-secondary">
          <Upload size={16} /> Upload New Witness Sketch
          <input type="file" accept="image/*" onChange={handleSketchUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Main Grid: Sketch Selector & Tuning vs Matching Results */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column: Sketch Workspace & Feature Tuning Sliders */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--accent-cyan)" /> 1. Input Sketch & Feature Tuning
          </h3>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '150px',
              height: '170px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '2px solid var(--accent-amber)',
              background: '#000',
              flexShrink: 0
            }}>
              <img
                src={selectedSketch.sketchImage}
                alt="Suspect Sketch"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.96rem' }}>{selectedSketch.title}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>
                Ref ID: {selectedSketch.id} | Date: {selectedSketch.dateCreated}
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Select sample sketches below or upload a witness drawing to extract facial vectors.
              </p>
            </div>
          </div>

          {/* Preset Sketch Picker */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>PRESET WITNESS SKETCHES</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              {FORENSIC_SKETCHES.map(sk => (
                <button
                  key={sk.id}
                  onClick={() => setSelectedSketch(sk)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedSketch.id === sk.id ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-primary)',
                    border: selectedSketch.id === sk.id ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {sk.title}
                </button>
              ))}
            </div>
          </div>

          {/* Facial Landmark Weight Sliders */}
          <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
              ADJUST LANDMARK FEATURE WEIGHTING
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.76rem' }}>
              <div>
                <span>Jawline Sharpness ({Math.round(featureWeights.jawline * 100)}%)</span>
                <input 
                  type="range" min="0.1" max="1.0" step="0.1"
                  value={featureWeights.jawline}
                  onChange={(e) => setFeatureWeights({ ...featureWeights, jawline: parseFloat(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                />
              </div>
              <div>
                <span>Inter-Pupillary Distance ({Math.round(featureWeights.eyeDistance * 100)}%)</span>
                <input 
                  type="range" min="0.1" max="1.0" step="0.1"
                  value={featureWeights.eyeDistance}
                  onChange={(e) => setFeatureWeights({ ...featureWeights, eyeDistance: parseFloat(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleRunAiMatching} disabled={isSearching}>
            {isSearching ? <Cpu size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
            {isSearching ? 'Extracting Vector Embeddings...' : 'Run AI Vector Similarity Match'}
          </button>
        </div>

        {/* Right Column: AI Vector Search Match Results */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--accent-amber)" /> 2. Ranked Biometric Database Matches
            </h3>

            {matchingResults ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {matchingResults.map((match, idx) => (
                  <div 
                    key={match.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      border: idx === 0 ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={match.avatar}
                        alt={match.name}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                          #{idx + 1} {match.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ID: {match.id} | Threat: {match.threatLevel}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'JetBrains Mono' }}>
                        {match.matchPercentage}%
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        Distance: {match.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                Click "Run AI Vector Similarity Match" to scan 48,000+ database embeddings against the forensic sketch input.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
