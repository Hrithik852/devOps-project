/**
 * Navbar — shared across all pages.
 * Full-width on desktop, responsive on mobile.
 *
 * Props:
 *   mode: 'auth' | 'dashboard'
 *   activeTab: 'login' | 'register' (for auth mode)
 *   onTabChange: (tab) => void  (for auth mode)
 *   username: string (for dashboard mode)
 *   email: string (for dashboard mode)
 *   userId: string (for dashboard mode)
 *   onLogout: () => void (for dashboard mode)
 */
import { useState, useRef, useEffect } from 'react';

export default function Navbar({ mode = 'auth', activeTab, onTabChange, username, email, userId, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className="nav-root">
      {/* Brand */}
      <div className="nav-brand">
        <div className="nav-logo-mark">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
            spa
          </span>
        </div>
        <div>
          <div className="nav-brand-name">Verdant</div>
          <div className="nav-brand-tag" style={{ display: window.innerWidth < 600 ? 'none' : 'block' }}>
            Liquid Glass Platform
          </div>
        </div>
      </div>

      {/* Center — tabs for auth, status for dashboard */}
      {mode === 'auth' && (
        <div className="nav-tab-group">
          <button
            className={`nav-tab${activeTab === 'login' ? ' active' : ''}`}
            type="button"
            onClick={() => onTabChange?.('login')}
          >
            Sign In
          </button>
          <button
            className={`nav-tab${activeTab === 'register' ? ' active' : ''}`}
            type="button"
            onClick={() => onTabChange?.('register')}
          >
            Sign Up
          </button>
        </div>
      )}

      {mode === 'dashboard' && (
        <div className="nav-status-dot" style={{ display: 'flex' }}>
          <span className="dot" />
          Connected
        </div>
      )}

      {/* Right actions */}
      <div className="nav-actions">
        {mode === 'auth' && (
          <div className="nav-status-dot">
            <span className="dot" />
            <span style={{ display: window.innerWidth < 500 ? 'none' : undefined }}>Secure</span>
          </div>
        )}

        {mode === 'dashboard' && (
          <>
            {/* Notifications button */}
            <button
              className="dash-nav-icon-btn"
              type="button"
              aria-label="Notifications"
              onClick={() => {}}
              style={{ border: 'none' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#c8eae1' }}>
                notifications
              </span>
              <span className="ping-badge" />
            </button>

            {/* Profile button + dropdown */}
            <div className="nav-profile-wrap" ref={dropdownRef}>
              <button
                type="button"
                className={`dash-nav-user${dropdownOpen ? ' active' : ''}`}
                onClick={() => setDropdownOpen((v) => !v)}
                style={{ border: 'none' }}
                aria-label="Profile menu"
                aria-expanded={dropdownOpen}
              >
                <div className="dash-nav-avatar">
                  {username ? username[0].toUpperCase() : 'U'}
                </div>
                <span className="dash-nav-username" style={{ display: window.innerWidth < 600 ? 'none' : undefined }}>
                  {username || 'Account'}
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '14px',
                    color: 'var(--on-surface-variant)',
                    display: window.innerWidth < 600 ? 'none' : undefined,
                    transition: 'transform 0.2s ease',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown popup */}
              {dropdownOpen && (
                <div className="nav-dropdown glass-surface">
                  {/* Header */}
                  <div className="nav-dropdown-header">
                    <div className="nav-dropdown-avatar">
                      {username ? username[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="nav-dropdown-name">{username || 'Account'}</div>
                      {email && <div className="nav-dropdown-email">{email}</div>}
                    </div>
                  </div>

                  <div className="nav-dropdown-divider" />

                  {/* Info rows */}
                  {userId && (
                    <div className="nav-dropdown-row">
                      <span className="nav-dropdown-key">User ID</span>
                      <span className="nav-dropdown-val">{String(userId).slice(-8)}</span>
                    </div>
                  )}
                  <div className="nav-dropdown-row">
                    <span className="nav-dropdown-key">Session</span>
                    <span className="nav-dropdown-session">Active</span>
                  </div>

                  <div className="nav-dropdown-divider" />

                  {/* Sign out */}
                  <button
                    type="button"
                    className="nav-dropdown-signout"
                    onClick={() => { setDropdownOpen(false); onLogout?.(); }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
