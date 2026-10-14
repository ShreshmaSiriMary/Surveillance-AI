import React, { useState } from 'react';
import { ShieldCheck, Bell, LogOut, Sun, Moon, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

export default function Navbar({ theme, toggleTheme }) {
  const { user, logout, notifications } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="app-header">
      <a className="brand" href="#main-content" aria-label="Sentinel home">
        <span className="brand-mark"><ShieldCheck size={22} aria-hidden="true" /></span>
        <span className="brand-copy">
          <strong>Survelliance-AI</strong>
          <span>Public safety workspace</span>
        </span>
        <span className="environment-badge">Demo</span>
      </a>

      <div className="header-actions">
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="icon-button"
        >
          {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </button>

        <div className="notification-wrap">
          <button
            type="button"
            onClick={() => setShowNotifications(previous => !previous)}
            title="Notifications"
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            aria-expanded={showNotifications}
            className="icon-button notification-button"
          >
            <Bell size={17} aria-hidden="true" />
            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          </button>
          <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

        {user && (
          <div className="user-menu">
            <span className="user-avatar"><UserRound size={17} aria-hidden="true" /></span>
            <span className="user-copy">
              <strong>{user.name}</strong>
              <span>{user.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'User'} · {user.status || 'Verified'}</span>
            </span>
            <button type="button" onClick={logout} title="Sign out" aria-label="Sign out" className="icon-button signout-button">
              <LogOut size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
