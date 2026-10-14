import React from 'react';
import {
  LayoutDashboard,
  Video,
  Users,
  PenTool,
  MapPin,
  Fingerprint,
  BarChart3,
  ShieldCheck,
  Clock,
  Lock,
  Heart,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menus = {
  admin: [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'verification_center', label: 'Citizen verification', icon: UserCheck },
    { id: 'cases', label: 'Case management', icon: Briefcase },
    { id: 'surveillance', label: 'Camera monitoring', icon: Video, badge: 'Demo' },
    { id: 'database', label: 'Records registry', icon: Users },
    { id: 'sketch', label: 'Image matching', icon: PenTool },
    { id: 'gis', label: 'Map view', icon: MapPin },
    { id: 'aging', label: 'Age progression', icon: Clock },
    { id: 'biometric', label: 'Identity checks', icon: Fingerprint },
    { id: 'analytics', label: 'Reports', icon: BarChart3 },
    { id: 'audit', label: 'Audit history', icon: Lock }
  ],
  officer: [
    { id: 'cases', label: 'Assigned cases', icon: Briefcase },
    { id: 'surveillance', label: 'Camera monitoring', icon: Video, badge: 'Demo' },
    { id: 'database', label: 'Records search', icon: Users },
    { id: 'sketch', label: 'Image matching', icon: PenTool },
    { id: 'gis', label: 'Map view', icon: MapPin },
    { id: 'analytics', label: 'Reports', icon: BarChart3 }
  ],
  citizen: [
    { id: 'citizen_dashboard', label: 'Public safety', icon: Heart },
    { id: 'database', label: 'Missing persons', icon: Users },
    { id: 'gis', label: 'Safety map', icon: MapPin }
  ]
};

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  const role = user?.role || 'citizen';
  const menuItems = menus[role] || menus.citizen;
  const roleLabel = role === 'admin' ? 'Administrator' : role === 'officer' ? 'Duty officer' : 'Public user';

  return (
    <aside className="app-sidebar">
      <div className="sidebar-heading">
        <span className="sidebar-section-label">Workspace</span>
        <span className="sidebar-role">{roleLabel}</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className={`sidebar-link${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveTab(id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {badge && <span className="sidebar-link-badge">{badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-status" role="note">
        <ShieldCheck size={17} aria-hidden="true" />
        <div>
          <strong>Demonstration workspace</strong>
          <p>Records and activity shown here are sample data.</p>
        </div>
      </div>
    </aside>
  );
}
