import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export const useHandleCallback = () => {
  const { setJwtData, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (window.location.pathname === '/callback') {
      const query = new URLSearchParams(window.location.hash.substring(1));

      const token = query.get('id_token');
      if (!token) {
        console.error('No token found');
        return;
      }
      setJwtData(token);
      setIsLoggedIn(true);
      window.history.replaceState({}, '', '/');
    }
  }, [setJwtData, setIsLoggedIn]);
};
