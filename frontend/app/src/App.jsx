import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';

function MainNavigator() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('login');

  if (loading) {
    return (
      <div className="loading-screen oil-canvas-bg">
        <div className="loading-box">
          <div className="loading-logo">
            <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#a9d2b6' }}>
              spa
            </span>
          </div>
          <div className="loading-title">Verdant</div>
          <div className="loading-sub">Loading your session...</div>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '22px',
              color: '#a9d2b6',
              animation: 'spin 1.2s linear infinite',
              marginTop: '8px',
            }}
          >
            progress_activity
          </span>
        </div>
      </div>
    );
  }

  if (user) {
    return <DashboardScreen />;
  }
  // Instead of: if (user) return <DashboardScreen />;
  //return <DashboardScreen />;


  if (currentScreen === 'register') {
    return <RegisterScreen onNavigate={(s) => setCurrentScreen(s)} />;
  }

  return <LoginScreen onNavigate={(s) => setCurrentScreen(s)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
