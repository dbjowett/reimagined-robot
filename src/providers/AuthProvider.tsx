/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, jwt, setJwt, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('use useAuth inside Authprovider');
  return context;
};

export { AuthContext, useAuth };
