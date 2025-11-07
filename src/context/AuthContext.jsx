import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const STORAGE_KEY = 'sgtprepper_auth';

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.accessToken && parsed?.user) {
          setIsAuthed(true);
          setUser(parsed.user);
        }
      }
    } catch {
      //
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        let msg = `Login failed: ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson?.message) {
            msg = errJson.message;
          }
        } catch {}
        throw new Error(msg);
      }

      const json = await res.json();
      if (!json?.accessToken || !json?.user) {
        throw new Error('Invalid login response');
      }

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken: json.accessToken,
          refreshToken: json.refreshToken,
          user: json.user,
        })
      );

      setIsAuthed(true);
      setUser(json.user);
      return { success: true, user: json.user };
    } catch (err) {
      setError(err.message || 'Login failed');
      setIsAuthed(false);
      setUser(null);
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthed(false);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, user, loading, error, login, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
