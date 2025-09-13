import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export const useHandleCallback = () => {
  const { setJwt, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (window.location.pathname === '/callback') {
      const query = new URLSearchParams(window.location.hash.substring(1));

      const token = query.get('id_token');
      setJwt(token);
      setIsLoggedIn(true);

      window.location.hash = '';
    }
  }, [setJwt, setIsLoggedIn]);
};
