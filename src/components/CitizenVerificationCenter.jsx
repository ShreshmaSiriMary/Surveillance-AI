import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CitizenVerificationCenter() {
  return <section className="glass-card" style={{ padding: 24 }}><span className="badge badge-cyan">ACCOUNT POLICY</span><h1 style={{ marginTop: 10 }}>Account access</h1><p style={{ marginTop: 10, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Citizen registration collects only a name, email, optional phone number, and password. This application does not collect or verify identity documents. Administrator and officer access must be provisioned by an administrator.</p><p style={{ display: 'flex', gap: 8, marginTop: 16, color: 'var(--text-muted)' }}><ShieldCheck size={17} /> No personal identity documents are stored by this workflow.</p></section>;
}
