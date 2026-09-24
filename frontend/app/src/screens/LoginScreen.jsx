import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';

export default function LoginScreen({ onNavigate }) {
  const { login, authError, setAuthError } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!identifier.trim() || !password.trim()) {
      setAuthError('Please enter your email or username and password.');
      return;
    }
    try {
      setSubmitting(true);
      await login(identifier.trim(), password);
    } catch {
      // error is set in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar mode="auth" activeTab="login" onTabChange={onNavigate} />

      <div className="auth-page oil-canvas-bg">
        {/* Left panel — visible on desktop */}
        <aside className="auth-left">
          <div className="brand-panel">
            <div className="brand-headline">
              <span className="brand-eyebrow">Devops Project</span>
              <h2 className="brand-title">
                Ship faster with <em>DevOps</em> precision.
              </h2>
              <p className="brand-subtitle">
                A production-ready web app designed for learning
                modern DevOps practices — from code to cloud.
              </p>
            </div>

            <ul className="feature-list">
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    merge
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Continuous Integration</h4>
                  <p>Automatically build and test your code on every commit to catch issues early.</p>
                </div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    analytics
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Infrastructure as Code</h4>
                  <p>Define and manage your infrastructure using code for consistency and repeatability.</p>
                </div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    devices
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Fully Responsive</h4>
                  <p>Optimized for desktop, tablet, and mobile with adaptive layouts.</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right panel — auth form */}
        <section className="auth-right">
          <div className="auth-card glass-surface">
            <div className="auth-card-header">
              <h1>Welcome back</h1>
              <p>Sign in to your account to continue.</p>
            </div>

            {authError && (
              <div className="form-error">{authError}</div>
            )}

            <form onSubmit={handleSubmit} className="form-body" noValidate>
              {/* Email / Username */}
              <div className="form-field">
                <label className="form-label" htmlFor="login-identifier">
                  Email or Username
                </label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">
                    alternate_email
                  </span>
                  <input
                    id="login-identifier"
                    type="text"
                    className="form-input"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-field">
                <div className="form-label-row">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => alert('Contact your administrator to reset your password.')}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">lock</span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="form-input-eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="form-row-meta">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setRememberMe((v) => !v)}
                >
                  <div className={`toggle-track${rememberMe ? ' on' : ''}`}>
                    <div className="toggle-thumb" />
                  </div>
                  <span className="toggle-label">Remember me</span>
                </button>
              </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}
                    >
                      progress_activity
                    </span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-card-footer">
              Don&apos;t have an account?
              <button type="button" className="text-link" onClick={() => onNavigate('register')}>
                Create one
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
