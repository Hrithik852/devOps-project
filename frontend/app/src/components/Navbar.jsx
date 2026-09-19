/**
 * Navbar — shared across all pages.
 * Full-width on desktop, responsive on mobile.
 *
 * Props:
 *   mode: 'auth' | 'dashboard'
 *   activeTab: 'login' | 'register' (for auth mode)
 *   onTabChange: (tab) => void  (for auth mode)
 *   username: string (for dashboard mode)
 *   onProfile: () => void (for dashboard mode)
 *   onLogout: () => void (for dashboard mode)
 */
export default function Navbar({ mode = 'auth', activeTab, onTabChange, username, onProfile }) {
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

      {/* Center — tabs for auth, empty for dashboard */}
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

            <button
              type="button"
              className="dash-nav-user"
              onClick={onProfile}
              style={{ border: 'none' }}
            >
              <div className="dash-nav-avatar">
                {username ? username[0].toUpperCase() : 'U'}
              </div>
              <span className="dash-nav-username" style={{ display: window.innerWidth < 600 ? 'none' : undefined }}>
                {username || 'Account'}
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
