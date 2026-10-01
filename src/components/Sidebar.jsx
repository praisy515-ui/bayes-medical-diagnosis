import React from 'react';
import {
  LayoutDashboard,
  Database,
  Calculator,
  GitBranch,
  Grid,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Info,
  ChevronLeft,
  ChevronRight,
  Activity,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ currentView, onSelectView, isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Home' },
    { id: 'dataset', label: 'Dataset (10,000)', icon: Database, badge: '10K' },
    { id: 'probability', label: 'Probability Analysis', icon: Calculator },
    { id: 'bayes', label: 'Bayes Theorem', icon: GitBranch, badge: 'Core' },
    { id: 'confusion', label: 'Confusion Matrix', icon: Grid },
    { id: 'metrics', label: 'Performance Metrics', icon: BarChart3 },
    { id: 'prevalence', label: 'Prevalence Analysis', icon: TrendingUp, badge: 'Interactive' },
    { id: 'false-positive', label: 'False Positive Analysis', icon: AlertTriangle, badge: 'Interactive' },
    { id: 'insights', label: 'Insights & Findings', icon: Lightbulb },
    { id: 'about', label: 'About Project', icon: Info }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 35
          }}
        />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header with Combined Medical Cross + Probability Curve Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon-box" title="Bayes Medical Analytics">
              {/* Medical Cross + Probability Chart combo */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Medical Cross in background */}
                <rect x="10" y="2" width="4" height="20" rx="1.5" fill="rgba(45, 212, 191, 0.35)" />
                <rect x="2" y="10" width="20" height="4" rx="1.5" fill="rgba(45, 212, 191, 0.35)" />
                {/* Distribution Gaussian / Bayes curve line */}
                <path d="M3 18C6 18 8 7 12 7C16 7 18 18 21 18" stroke="#2dd4bf" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="12" cy="7" r="2.2" fill="#a78bfa" />
              </svg>
            </div>
            
            <div className="logo-text-box">
              <span className="logo-title">BayesMed Analytics</span>
              <span className="logo-subtitle">Python & Pandas Lab</span>
            </div>
          </div>

          <button 
            className="sidebar-toggle-btn"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">Navigation & Tools</div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectView(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={item.label}
              >
                <span className="nav-item-icon">
                  <Icon size={19} />
                </span>
                <span className="nav-item-label">{item.label}</span>
                {item.badge && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-project-pill">
            <div style={{ color: 'var(--teal-light)', display: 'flex' }}>
              <GraduationCap size={20} />
            </div>
            <div className="sidebar-project-pill-text">
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Academic Project
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Simulated 10,000 Cohort
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
