import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, CheckCircle, AlertCircle, Image as ImageIcon, RefreshCw } from 'lucide-react';

export default function FileUpload({ 
  onFileSelect, 
  accept = "image/*,.pdf,.doc,.docx", 
  maxSizeMB = 5, 
  label = "Upload File",
  description = "PNG, JPG, WebP, or PDF up to 5MB",
  existingUrl = null
}) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(existingUrl);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    // Size validation
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds maximum limit of ${maxSizeMB}MB.`);
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setProgress(30);

    // Simulate progress
    setTimeout(() => setProgress(70), 150);
    setTimeout(() => {
      setProgress(100);
      setUploading(false);

      // Generate preview if image
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
          if (onFileSelect) onFileSelect(selectedFile, e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null);
        if (onFileSelect) onFileSelect(selectedFile, null);
      }
    }, 350);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setError('');
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
    if (onFileSelect) onFileSelect(null, null);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Upload Zone */}
      {!file && !previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current && inputRef.current.click()}
          style={{
            border: `2px dashed ${dragActive ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '24px 16px',
            textAlign: 'center',
            background: dragActive ? 'rgba(6, 182, 212, 0.08)' : 'rgba(15, 23, 42, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            gap: '8px'
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <UploadCloud size={20} />
          </div>

          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {label}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Drag & drop or <span style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>browse file explorer</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {description}
            </div>
          </div>
        </div>
      ) : (
        /* File Preview Card */
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          background: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="File Preview"
                style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
              />
            ) : (
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                <File size={22} />
              </div>
            )}

            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {file ? file.name : 'Uploaded Document / Image'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Attached File'} • <span style={{ color: '#10b981' }}>Ready</span>
              </div>

              {uploading && (
                <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.2s ease' }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => inputRef.current && inputRef.current.click()}
              title="Replace File"
              className="btn btn-secondary"
              style={{ padding: '6px', height: '32px', width: '32px' }}
            >
              <RefreshCw size={14} />
              <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
            </button>

            <button
              type="button"
              onClick={handleRemove}
              title="Remove File"
              className="btn btn-secondary"
              style={{ padding: '6px', height: '32px', width: '32px', color: '#f43f5e' }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div style={{ marginTop: '6px', fontSize: '0.74rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={14} /> {error}
        </div>
      )}
    </div>
  );
}
