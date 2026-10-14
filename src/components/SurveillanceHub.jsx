import React, { useState, useRef, useEffect } from 'react';
import { Video, Shield, Eye, AlertTriangle, Sliders, RefreshCw, Upload, Camera, Lock, CheckCircle2, Search } from 'lucide-react';
import { CAMERAS, INITIAL_MISSING_PERSONS } from '../data/mockData';
import { generateRandomEmbedding, performKnnSearch } from '../utils/faceAiEngine';
import FileUpload from './FileUpload';

export default function SurveillanceHub({ onTriggerMatchAlert }) {
  const [selectedCamera, setSelectedCamera] = useState(CAMERAS[0]);
  const [privacyBlur, setPrivacyBlur] = useState(false);
  const [sensitivity, setSensitivity] = useState(75);
  const [scanActive, setScanActive] = useState(true);
  const [candidateMatches, setCandidateMatches] = useState([]);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);

  const videoRef = useRef(null);

  // Handle camera switch or Webcam start
  useEffect(() => {
    if (selectedCamera.feedType === 'webcam') {
      navigator.mediaDevices?.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.log('Webcam not accessible:', err));
    }
  }, [selectedCamera]);

  // Handle File Explorer Image Upload for AI Candidate KNN Search
  const handleUploadedImage = (file, previewUrl) => {
    if (!previewUrl) return;
    setUploadedImagePreview(previewUrl);

    // Perform simulated KNN candidate vector search
    const queryEmbed = generateRandomEmbedding(file.name.length);
    const results = performKnnSearch(queryEmbed, INITIAL_MISSING_PERSONS, 3);
    setCandidateMatches(results);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Operations Header */}
      <div className="glass-card" style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.08))', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
              DEMO CCTV OPERATIONS CENTER
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Multi-Node CCTV AI Surveillance & Candidate Matching</h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Monitor smart city CCTV feeds, apply GDPR edge face anonymization, and run AI-assisted candidate searches.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', background: 'rgba(15, 23, 42, 0.8)', padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <Lock size={15} color={privacyBlur ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
              <span>Privacy Edge Blur</span>
              <input type="checkbox" checked={privacyBlur} onChange={(e) => setPrivacyBlur(e.target.checked)} />
            </label>
          </div>
        </div>
      </div>

      {/* Main Grid: Stream Viewport + Control Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: '20px' }}>
        
        {/* Left Column: CCTV Stream Player */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-cyan" style={{ fontFamily: 'Space Mono' }}>{selectedCamera.id}</span>
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>{selectedCamera.name}</span>
            </div>
            <span className="badge badge-emerald">DEMO CCTV FEED • {selectedCamera.resolution}</span>
          </div>

          {/* Video / Feed Container */}
          <div style={{ position: 'relative', width: '100%', height: '440px', background: '#040711', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            {selectedCamera.feedType === 'webcam' ? (
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: privacyBlur ? 'blur(10px)' : 'none' }} />
            ) : (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url('/login_bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: privacyBlur ? 'blur(12px)' : 'none'
              }} />
            )}

            {/* Laser Scan Animation Overlay */}
            {scanActive && <div className="scan-effect" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }} />}

            {/* AI Candidate Bounding Box Overlay */}
            {!privacyBlur && (
              <div style={{
                position: 'absolute',
                top: '25%',
                left: '35%',
                width: '180px',
                height: '210px',
                border: '2px solid var(--accent-cyan)',
                borderRadius: '8px',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}>
                <div style={{ fontSize: '0.64rem', color: '#ffffff', background: 'rgba(6, 182, 212, 0.9)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800, width: 'fit-content', fontFamily: 'Space Mono' }}>
                  TARGET CANDIDATE DETECTED
                </div>
                <div style={{ fontSize: '0.62rem', color: '#ffffff', background: 'rgba(15, 23, 42, 0.85)', padding: '4px', borderRadius: '4px' }}>
                  Similarity: <strong style={{ color: 'var(--accent-cyan)' }}>94.2%</strong> (Human Review Required)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Camera Selectors & File Upload AI Search */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Camera Node Switcher */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Camera Stream Selector
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CAMERAS.map(cam => (
                <button
                  key={cam.id}
                  type="button"
                  onClick={() => setSelectedCamera(cam)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: selectedCamera.id === cam.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    border: selectedCamera.id === cam.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    color: selectedCamera.id === cam.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{cam.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{cam.location}</div>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.58rem' }}>{cam.status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File Explorer Upload for Face Match Search */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '8px' }}>
              AI-Assisted Image Search
            </h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Upload image from File Explorer to execute KNN vector similarity search against registered missing person dossiers.
            </p>

            <FileUpload
              label="Upload Target Image"
              onFileSelect={handleUploadedImage}
            />

            {candidateMatches.length > 0 && (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>TOP KNN CANDIDATE MATCHES</div>
                {candidateMatches.map(match => (
                  <div key={match.id} style={{ background: 'var(--bg-primary)', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{match.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Similarity: <strong style={{ color: 'var(--accent-cyan)' }}>{match.similarity}%</strong> • Distance: {match.distance}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
