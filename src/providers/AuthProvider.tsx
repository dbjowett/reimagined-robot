/* eslint-disable react-refresh/only-export-components */
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
  handleLogout: () => void;
  decodedJwt: JwtPayload | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const [decodedJwt, setDecodedJwt] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (!jwt) return;
    setDecodedJwt(jwtDecode<JwtPayload>(jwt));
  }, [jwt]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setJwt(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, jwt, setJwt, handleLogout, decodedJwt }}
    >
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
