import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';

export default function RegisterScreen({ onNavigate }) {
  const { register, authError, setAuthError } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!username.trim() || !email.trim() || !password.trim()) {
      setAuthError('All fields are required.');
      return;
    }
    if (!agreed) {
      setAuthError('Please accept the terms to continue.');
      return;
    }
    try {
      setSubmitting(true);
      await register(username.trim(), email.trim(), password);
    } catch {
      // error is set in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar mode="auth" activeTab="register" onTabChange={onNavigate} />

      <div className="auth-page oil-canvas-bg">
        {/* Left panel — desktop only */}
        <aside className="auth-left">
          <div className="brand-panel">
            <div className="brand-headline">
              <span className="brand-eyebrow">Get started free</span>
              <h2 className="brand-title">
                Your account. <em>Your data.</em> Your control.
              </h2>
              <p className="brand-subtitle">
                Built for modern DevOps workflows — CI/CD pipelines,
                containerization, and infrastructure as code.
              </p>
            </div>

            <ul className="feature-list">
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    box
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Containerization</h4>
                  <p>Package applications with Docker for consistent environments across development and production.</p>
                </div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    cycle
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Continuous Deployment</h4>
                  <p>Push tested code to production quickly and reliably through automated pipelines.</p>
                </div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#a9d2b6' }}>
                    difference
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Version Control</h4>
                  <p>Manage code changes efficiently with Git and enable smooth collaboration across teams.</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right panel — registration form */}
        <section className="auth-right">
          <div className="auth-card glass-surface">
            <div className="auth-card-header">
              <h1>Create an account</h1>
              <p>Fill in the details below to get started.</p>
            </div>

            {authError && (
              <div className="form-error">{authError}</div>
            )}

            <form onSubmit={handleSubmit} className="form-body" noValidate>
              {/* Username */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-username">Username</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">person</span>
                  <input
                    id="reg-username"
                    type="text"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-email">Email address</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">alternate_email</span>
                  <input
                    id="reg-email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-field">
                <label className="form-label" htmlFor="reg-password">Password</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">lock</span>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
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

              {/* Terms toggle */}
              <div className="form-row-meta">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setAgreed((v) => !v)}
                >
                  <div className={`toggle-track${agreed ? ' on' : ''}`}>
                    <div className="toggle-thumb" />
                  </div>
                  <span className="toggle-label">I agree to the Terms of Service</span>
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
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-card-footer">
              Already have an account?
              <button type="button" className="text-link" onClick={() => onNavigate('login')}>
                Sign in
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
