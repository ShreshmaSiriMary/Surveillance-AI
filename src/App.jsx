import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CitizenDashboard from './components/CitizenDashboard';
import CitizenVerificationCenter from './components/CitizenVerificationCenter';
import CaseManagement from './components/CaseManagement';
import SurveillanceHub from './components/SurveillanceHub';
import DatabaseManager from './components/DatabaseManager';
import ForensicSketchMatcher from './components/ForensicSketchMatcher';
import GisMap from './components/GisMap';
import BiometricVerification from './components/BiometricVerification';
import AnalyticsReports from './components/AnalyticsReports';
import AgingSimulator from './components/AgingSimulator';
import AuditLogs from './components/AuditLogs';
import AlertModal from './components/AlertModal';
import LoginPage from './components/LoginPage';
import LogoutConfirmModal from './components/LogoutConfirmModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { INITIAL_SYNTHETIC_SUSPECTS } from './data/mockData';

function MainApp() {
  const { user, loading } = useAuth();
  const role = user?.role || 'citizen';

  // Default initial active tab according to role
  const getDefaultTab = (uRole) => {
    if (uRole === 'admin') return 'dashboard';
    if (uRole === 'officer') return 'cases';
    return 'citizen_dashboard';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab(role));
  const [theme, setTheme] = useState('dark');
  const [triggerAlertData, setTriggerAlertData] = useState(null);

  // Sync default tab when user switches
  useEffect(() => {
    if (user) {
      setActiveTab(getDefaultTab(user.role));
    }
  }, [user]);

  // Synchronize Theme attribute on html root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleTriggerMatchAlert = (subject) => {
    setTriggerAlertData(subject || INITIAL_SYNTHETIC_SUSPECTS[0]);
  };

  // If user is logged out, ALWAYS display the Auth Page first!
  if (loading) return <div className="login-shell" role="status" style={{ justifyContent: 'center', alignItems: 'center' }}>Connecting securely…</div>;
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main id="main-content" className="app-main" tabIndex={-1}>
          {/* Admin Command Dashboard */}
          {role === 'admin' && activeTab === 'dashboard' && (
            <Dashboard 
              setActiveTab={setActiveTab} 
              onTriggerMatchAlert={handleTriggerMatchAlert} 
            />
          )}

          {/* Admin Citizen Verification Center */}
          {role === 'admin' && activeTab === 'verification_center' && (
            <CitizenVerificationCenter />
          )}

          {/* Case Management (Admin & Officer) */}
          {(role === 'admin' || role === 'officer') && activeTab === 'cases' && (
            <CaseManagement />
          )}

          {/* Public Citizen Safety Portal */}
          {role === 'citizen' && activeTab === 'citizen_dashboard' && (
            <CitizenDashboard />
          )}

          {/* Live CCTV Operations Center (Admin & Officer) */}
          {(role === 'admin' || role === 'officer') && activeTab === 'surveillance' && (
            <SurveillanceHub 
              onTriggerMatchAlert={handleTriggerMatchAlert} 
            />
          )}

          {/* Database Manager (Role Adaptive) */}
          {activeTab === 'database' && (
            <DatabaseManager />
          )}

          {/* AI Forensic Sketch Matcher (Admin & Officer) */}
          {(role === 'admin' || role === 'officer') && activeTab === 'sketch' && (
            <ForensicSketchMatcher />
          )}

          {/* GIS Spatial Map (All Roles) */}
          {activeTab === 'gis' && (
            <GisMap />
          )}

          {/* AI Age Progression Simulator (Admin & Officer) */}
          {(role === 'admin' || role === 'officer') && activeTab === 'aging' && (
            <AgingSimulator />
          )}

          {/* Multi-Biometric Auth Portal (Admin Only) */}
          {role === 'admin' && activeTab === 'biometric' && (
            <BiometricVerification />
          )}

          {/* Analytics & Reports (Admin & Officer) */}
          {(role === 'admin' || role === 'officer') && activeTab === 'analytics' && (
            <AnalyticsReports />
          )}

          {/* Security Audit Ledger (Admin Only) */}
          {role === 'admin' && activeTab === 'audit' && (
            <AuditLogs />
          )}
        </main>
      </div>

      {/* Emergency Threat Match Popup Modal */}
      {triggerAlertData && (
        <AlertModal 
          alertData={triggerAlertData} 
          onClose={() => setTriggerAlertData(null)} 
        />
      )}

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
