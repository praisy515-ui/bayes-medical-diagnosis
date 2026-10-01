import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';

export default function TopNavbar({ 
  currentTitle, 
  onOpenMobileMenu, 
  searchQuery, 
  onSearchChange,
  onOpenHelpModal,
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Simulated Dataset Loaded',
      desc: '10,000 observations initialized (95 TP, 495 FP, 5 FN, 9,405 TN).',
      time: 'Just now',
      type: 'info'
    },
    {
      id: 2,
      title: 'Bayes Theorem Verified',
      desc: 'P(Disease|Positive) computed at 16.10% matching theoretical derivation.',
      time: 'Ready',
      type: 'success'
    },
    {
      id: 3,
      title: 'Presentation Mode Active',
      desc: 'All charts & interactive sliders are calibrated for live demonstration.',
      time: 'Active',
      type: 'highlight'
    }
  ];

  return (
    <header className="top-navbar">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="navbar-left">
        <button 
          className="navbar-icon-btn d-md-none" 
          onClick={onOpenMobileMenu}
          aria-label="Open Navigation Menu"
          style={{ display: 'none' }}
        >
          <Menu size={20} />
        </button>

        <div className="navbar-page-title-box">
          <span className="navbar-page-category">Probability & Medical Data Analytics</span>
          <h1 className="navbar-page-title">{currentTitle}</h1>
        </div>
      </div>

      {/* Right: Badges, Search, Notifications, Profile */}
      <div className="navbar-right">
        {/* Prominent Educational / Simulated Data Badge */}
        <div className="edu-badge" title="This is an academic simulation for probability teaching, not a real diagnostic system">
          <span className="edu-badge-pulse" />
          <ShieldAlert size={14} style={{ color: 'var(--purple-light)' }} />
          <span>Educational / Simulated Data</span>
        </div>

        {/* Search Input */}
        <div className="search-input-wrapper">
          <Search size={15} className="search-icon-inside" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search dataset, metrics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              style={{ position: 'absolute', right: '10px', color: 'var(--text-muted)' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Quick Presentation Help Button */}
        <button 
          className="navbar-icon-btn" 
          onClick={onOpenHelpModal}
          title="Presentation Guide & Shortcuts"
        >
          <HelpCircle size={18} />
        </button>

        {/* Notifications Icon with popover toggle */}
        <div style={{ position: 'relative' }}>
          <button 
            className="navbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications & System Logs"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                background: '#0f172a',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '16px',
                zIndex: 100,
                animation: 'fadeIn 0.2s ease-out'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>System Events</span>
                <span style={{ fontSize: '11px', color: 'var(--teal-light)' }}>Simulated Runtime</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Student Presenter Profile Badge */}
        <div className="profile-card-mini">
          <div className="profile-avatar">
            BT
          </div>
          <div className="profile-info">
            <span className="profile-name">Student Presenter</span>
            <span className="profile-role">Bayes Project Demo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
