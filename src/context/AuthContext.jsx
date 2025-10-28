import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);

  const toggleAuth = () => {
    setIsAuthed(!isAuthed);
  };

  return <AuthContext.Provider value={{ isAuthed, toggleAuth }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
