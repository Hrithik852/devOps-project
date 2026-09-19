import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './authContextInstance';
import { loginUser, registerUser, getMe } from '../api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Hydrate user session on start
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const profile = await getMe();
      if (profile && (profile.username || profile.email)) {
        setUser(profile);
        localStorage.setItem('verdant_user', JSON.stringify(profile));
      } else {
        setUser(null);
        localStorage.removeItem('verdant_user');
      }
    } catch {
      // If cookie expired or no token, clear stale state
      setUser(null);
      localStorage.removeItem('verdant_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (identifier, password) => {
    setAuthError(null);
    try {
      const res = await loginUser({ identifier, password });
      // Fetch full profile from /get-me
      try {
        const profile = await getMe();
        setUser(profile);
        localStorage.setItem('verdant_user', JSON.stringify(profile));
        return profile;
      } catch {
        const fallbackUser = res.user || { username: identifier };
        setUser(fallbackUser);
        localStorage.setItem('verdant_user', JSON.stringify(fallbackUser));
        return fallbackUser;
      }
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      throw err;
    }
  };

  const handleRegister = async (username, email, password) => {
    setAuthError(null);
    try {
      const res = await registerUser({ username, email, password });
      // Registration sets cookie in backend: res.cookie("token", token)
      try {
        const profile = await getMe();
        setUser(profile);
        localStorage.setItem('verdant_user', JSON.stringify(profile));
        return profile;
      } catch {
        const newUser = {
          username,
          email,
          id: res?.['account created']?.id,
        };
        setUser(newUser);
        localStorage.setItem('verdant_user', JSON.stringify(newUser));
        return newUser;
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('verdant_user');
    // Clear cookies client-side
    document.cookie = 'token=; Max-Age=0; path=/;';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        setAuthError,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        refreshUser: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
