import React, { useState } from 'react';
import { MapPin, Radio, Video, Layers } from 'lucide-react';
import { CAMERAS, RECENT_ALERTS } from '../data/mockData';

export default function GisMap() {
  const [selectedPin, setSelectedPin] = useState(CAMERAS[1]); // Railway Station default
  const [showHeatmap, setShowHeatmap] = useState(true);
  const selectedCameraAlerts = RECENT_ALERTS.filter(alert => alert.camera.includes(selectedPin.id));

  return (
    <div className="map-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div className="glass-card map-header" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin color="var(--accent-cyan)" /> Map and location overview
            </h2>
            <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Demo</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Sample camera locations and incident markers. This is not a live map.
          </p>
        </div>

        <button 
          className={`btn ${showHeatmap ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setShowHeatmap(current => !current)}
          aria-pressed={showHeatmap}
        >
          <Layers size={16} /> {showHeatmap ? 'Hide sample hotspots' : 'Show sample hotspots'}
        </button>
      </div>

      {/* Main Map Viewport & Details Panel Grid */}
      <div className="map-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '20px' }}>
        {/* Interactive GIS Spatial Grid Map Simulation Canvas Container */}
        <div className="glass-card map-viewport" role="region" aria-label="Sample camera location map" style={{ position: 'relative', height: '520px', overflow: 'hidden', padding: 0 }}>
          {/* Simulated Dark Mode Topographic Map Background */}
          <div className="map-canvas" style={{
            width: '100%',
            height: '100%',
            background: '#070b14',
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              linear-gradient(rgba(15, 23, 42, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 23, 42, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            position: 'relative'
          }}>
            {/* Spatial Heatmap Radial Glows */}
            {showHeatmap && (
              <>
                {/* Hotspot 1: Central Railway Station (Red High Risk) */}
                <div style={{
                  position: 'absolute',
                  left: '42%',
                  top: '55%',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }} />

                {/* Hotspot 2: City Square Park (Amber Missing Child) */}
                <div style={{
                  position: 'absolute',
                  left: '60%',
                  top: '38%',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }} />
              </>
            )}

            {/* CCTV Camera Pins on Map */}
            {CAMERAS.map((cam, idx) => {
              const coords = [
                { top: '30%', left: '75%' }, // Airport
                { top: '55%', left: '42%' }, // Railway Station
                { top: '38%', left: '60%' }, // City Square
                { top: '70%', left: '30%' }, // University campus
                { top: '25%', left: '25%' }, // Surat railway junction
                { top: '72%', left: '62%' }, // Ahmedabad transit depot
                { top: '32%', left: '86%' }  // Command desk webcam
              ][idx];

              const isSelected = selectedPin.id === cam.id;

              return (
                <button
                  key={cam.id}
                  type="button"
                  className="map-camera-pin"
                  aria-label={`${cam.id}, ${cam.name}, ${cam.location}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedPin(cam)}
                  style={{
                    position: 'absolute',
                    top: coords.top,
                    left: coords.left,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    zIndex: 20
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 0 0 4px rgba(112, 181, 210, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    <Video size={16} color={isSelected ? '#fff' : 'var(--accent-cyan)'} />
                  </div>
                  <div style={{
                    fontSize: '0.68rem',
                    fontWeight: 'bold',
                    background: 'rgba(15, 23, 42, 0.9)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    color: '#fff'
                  }}>
                    {cam.id}
                  </div>
                </button>
              );
            })}

            {/* Map Legend Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.90)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.74rem',
              display: 'flex',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} /> Example hotspot
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} /> Missing-person example
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }} /> Camera location
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Node Info & Local Incident Log */}
        <div className="glass-card map-details" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} color="var(--accent-cyan)" /> Selected camera
            </h3>

            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>{selectedPin.id}</span>
                <span className="badge badge-amber" style={{ fontSize: '0.58rem' }}>Sample · {selectedPin.status}</span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{selectedPin.name}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{selectedPin.location}</div>
              
              <div style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>
                GPS: {selectedPin.coords.lat}° N, {selectedPin.coords.lng}° E
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
              SAMPLE ACTIVITY FOR THIS CAMERA
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedCameraAlerts.length > 0 ? selectedCameraAlerts.map(alt => (
                <div key={alt.id} style={{ fontSize: '0.74rem', padding: '8px 10px', background: 'var(--bg-primary)', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                  <div style={{ fontWeight: 700 }}>{alt.subjectName}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{alt.timestamp} • {alt.status}</div>
                </div>
              )) : <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>No sample activity for this camera.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

