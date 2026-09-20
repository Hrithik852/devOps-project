import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';

// Hook: tracks mouse position as CSS vars on each glow-card element
function useCardGlow() {
  useEffect(() => {
    function track(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    }
    const cards = document.querySelectorAll('.dash-card, .metric-tile');
    cards.forEach((c) => c.addEventListener('mousemove', track));
    return () => cards.forEach((c) => c.removeEventListener('mousemove', track));
  });
}

export default function DashboardScreen() {
  const { user, logout, refreshUser } = useAuth();
  const [riskTolerance, setRiskTolerance] = useState(68);
  useCardGlow();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const username  = user?.username || 'User';
  const email     = user?.email    || '—';
  const userId    = user?._id      || user?.id || '—';

  return (
    <>
      <Navbar
        mode="dashboard"
        username={username}
        email={email}
        userId={userId}
        onLogout={logout}
      />

      <div className="dash-page oil-canvas-bg">
        <div className="dash-canvas">

          {/* Page heading */}
          <div style={{ marginBottom: '32px' }}>
            <p className="dash-section-label">Overview</p>
            <h1 style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#c8eae1',
            }}>
              Good evening, {username}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Here&apos;s your portfolio summary for today.
            </p>
          </div>

          <div className="dash-grid">

            {/* ── Portfolio Hero Card ── */}
            <div className="dash-card glass-surface portfolio-card" style={{ position: 'relative' }}>
              <p style={{ fontFamily: 'var(--font-label)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                Total Portfolio Value
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <div className="portfolio-balance">$1,429,850.00</div>
                <span className="change-pill">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                  +8.42% today
                </span>
              </div>

              {/* Mini chart */}
              <div className="chart-container">
                <svg viewBox="0 0 480 72" style={{ width: '100%', height: '72px' }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a9d2b6" stopOpacity="0.30" />
                      <stop offset="100%" stopColor="#a9d2b6" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,58 C60,52 90,34 140,36 C190,38 220,16 280,22 C340,28 390,6 480,10 L480,72 L0,72 Z"
                    fill="url(#chartFill)"
                  />
                  <path
                    d="M0,58 C60,52 90,34 140,36 C190,38 220,16 280,22 C340,28 390,6 480,10"
                    fill="none"
                    stroke="#a9d2b6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="480" cy="10" r="4" fill="#c3eccf" />
                </svg>
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="btn-action btn-action-primary"
                  onClick={() => alert('Liquidity allocation initiated.')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                  Deposit
                </button>
                <button
                  type="button"
                  className="btn-action btn-action-secondary"
                  onClick={() => alert('Portfolio rebalanced.')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
                  Rebalance
                </button>
                <button
                  type="button"
                  className="btn-action btn-action-secondary"
                  onClick={() => alert('Withdrawal flow coming soon.')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_outward</span>
                  Withdraw
                </button>
              </div>
            </div>

            {/* ── Risk Slider Card ── */}
            <div className="dash-card glass-surface" style={{ gridColumn: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-label)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                    Risk Tolerance
                  </p>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: '#c8eae1', marginTop: '2px' }}>
                    {riskTolerance}%
                  </p>
                </div>
                <span style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: riskTolerance < 40 ? 'rgba(252, 165, 165, 0.7)' : riskTolerance < 75 ? 'var(--primary)' : 'rgba(251, 219, 165, 0.75)',
                  opacity: 0.9,
                }}>
                  {riskTolerance < 40 ? 'Conservative' : riskTolerance < 75 ? 'Balanced' : 'Aggressive'}
                </span>
              </div>
              <div className="slider-wrap">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(Number(e.target.value))}
                  aria-label="Risk Tolerance"
                />
                <div className="slider-ticks">
                  <span className="slider-tick">Low</span>
                  <span className="slider-tick">Medium</span>
                  <span className="slider-tick">High</span>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '14px', lineHeight: 1.5 }}>
                Adjusts the target allocation between fixed income and growth assets.
              </p>
            </div>

            {/* ── Metric Tiles ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p className="dash-section-label">Performance</p>
              <div className="bento-grid">
                {[
                  { label: 'Net Yield',     value: '14.82%', sub: 'Compounded daily', icon: 'percent',     badge: '+3.2%' },
                  { label: 'Latency',       value: '99.4 ms',sub: 'Zero slippage',    icon: 'bolt',        badge: 'Optimal' },
                  { label: 'Carbon Offset', value: '3,410 t',sub: 'Net-Negative',     icon: 'forest',      badge: '+420 t' },
                  { label: 'Security',      value: '99.9%',  sub: 'AES-256 + JWT',   icon: 'shield',      badge: 'Secure' },
                ].map((m) => (
                  <div key={m.label} className="metric-tile glass-surface">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="metric-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#a9d2b6' }}>
                          {m.icon}
                        </span>
                      </div>
                      <span className="metric-badge">{m.badge}</span>
                    </div>
                    <div>
                      <div className="metric-label">{m.label}</div>
                      <div className="metric-value">{m.value}</div>
                      <div className="metric-sub">{m.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Account Card ── */}
            <div className="dash-card glass-surface" style={{ height: 'fit-content' }}>
              <p className="dash-section-label">Account</p>

              <div className="profile-row">
                <span className="profile-key">Username</span>
                <span className="profile-val">{username}</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">Email</span>
                <span className="profile-val" style={{ fontSize: '12px' }}>{email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">User ID</span>
                <span className="profile-val" style={{ fontSize: '11px', fontFamily: 'var(--font-label)' }}>
                  {String(userId).slice(-10)}
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-key">Session</span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-label)', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.85 }}>Active</span>
              </div>

              <div className="divider" />

              <button
                type="button"
                className="btn-action btn-action-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={logout}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Profile dropdown is now inside the Navbar */}
    </>
  );
}
