import React, { useState } from 'react';
import { Shield, AlertCircle, UserRound, LockKeyhole, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const inputStyle = { marginTop: 5, height: 44 };
export default function LoginPage() {
  const { loginWithEmail, registerNewCitizen, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState('login');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const set = key => event => setForm(current => ({ ...current, [key]: event.target.value }));
  const submit = async event => {
    event.preventDefault(); setBusy(true); setAuthError('');
    try { if (mode === 'login') await loginWithEmail(form.email, form.password); else await registerNewCitizen(form); }
    finally { setBusy(false); }
  };
  return <div className="login-shell">
    <section className="login-hero"><div className="login-scan" aria-hidden="true" />
      <div className="login-brand"><div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', display: 'grid', placeItems: 'center' }}><Shield size={26} color="white" /></div><div><strong style={{ fontSize: '1.25rem', color: 'white' }}>Survelliance-AI</strong><div style={{ fontSize: '.74rem', color: '#94a3b8' }}>Case review and public reporting</div></div></div>
      <div className="login-intro"><span className="badge badge-cyan">Secure workspace</span><h1 style={{ fontSize: '2.2rem', lineHeight: 1.25, color: 'white', margin: '18px 0 14px' }}>Clear workflows for missing-person reports.</h1><p style={{ color: '#94a3b8', lineHeight: 1.7 }}>Submit a report, share a sighting, and review cases once they have been approved for public viewing.</p><div className="login-demo-note"><strong>Privacy and safety</strong><span>This application is not an official police or emergency reporting service. Contact local emergency services for urgent help. Do not submit identity documents or biometric data.</span></div></div>
      <div className="login-footer">Survelliance-AI · Public reporting workspace</div>
    </section>
    <section className="login-form-panel"><div style={{ width: '100%', maxWidth: 440 }}>
      <div style={{ marginBottom: 22 }}><h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{mode === 'login' ? 'Sign in' : 'Create a citizen account'}</h2><p style={{ fontSize: '.84rem', color: '#94a3b8', marginTop: 5 }}>{mode === 'login' ? 'Your access level is assigned by an administrator.' : 'Only basic contact details are needed to submit reports.'}</p></div>
      {authError && <div role="alert" style={{ background: 'rgba(239,68,68,.15)', border: '1px solid #ef4444', borderRadius: 10, padding: 12, color: '#f87171', fontSize: '.8rem', marginBottom: 16, display: 'flex', gap: 8 }}><AlertCircle size={17} />{authError}</div>}
      <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', marginBottom: 20 }}><button type="button" className="btn btn-secondary" style={{ flex: 1, border: 0, borderRadius: 0, color: mode === 'login' ? 'var(--accent-cyan)' : undefined }} onClick={() => { setMode('login'); setAuthError(''); }}>Sign in</button><button type="button" className="btn btn-secondary" style={{ flex: 1, border: 0, borderRadius: 0, color: mode === 'register' ? 'var(--accent-cyan)' : undefined }} onClick={() => { setMode('register'); setAuthError(''); }}>Create account</button></div>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {mode === 'register' && <label style={{ fontSize: '.78rem', color: '#94a3b8' }}>Full name<input required minLength={2} maxLength={100} autoComplete="name" className="input-field" style={inputStyle} value={form.name} onChange={set('name')} /></label>}
        <label style={{ fontSize: '.78rem', color: '#94a3b8' }}>Email address<input type="email" required autoComplete="email" className="input-field" style={inputStyle} value={form.email} onChange={set('email')} /></label>
        {mode === 'register' && <label style={{ fontSize: '.78rem', color: '#94a3b8' }}>Phone (optional)<input type="tel" maxLength={30} autoComplete="tel" className="input-field" style={inputStyle} value={form.phone} onChange={set('phone')} /></label>}
        <label style={{ fontSize: '.78rem', color: '#94a3b8' }}>Password<input type="password" required minLength={mode === 'register' ? 10 : 1} maxLength={128} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="input-field" style={inputStyle} value={form.password} onChange={set('password')} /></label>
        <button type="submit" disabled={busy} className="btn btn-primary" style={{ height: 46, marginTop: 6 }}>{mode === 'login' ? <><LockKeyhole size={17} /> {busy ? 'Signing in…' : 'Sign in'}</> : <><UserPlus size={17} /> {busy ? 'Creating account…' : 'Create citizen account'}</>}</button>
      </form>
      <p style={{ color: '#64748b', fontSize: '.73rem', lineHeight: 1.5, marginTop: 18 }}><UserRound size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />Administrator and officer accounts are created by an administrator; public registration cannot grant elevated access. SMS sign-in is not available unless configured by the deployment operator.</p>
    </div></section>
  </div>;
}
