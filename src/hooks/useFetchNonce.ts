import { useEffect, useState } from 'react';
import { generateNonce } from '../utils/generateNonce';

export const useFetchNonce = () => {
  const [nonce, setNonce] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchNonce = async () => {
        const nonce = await generateNonce();
        if (nonce) {
          setNonce(nonce);
        } else {
          console.error('Failed to fetch nonce');
        }
      };
      fetchNonce();
    } catch (error) {
      console.error('Failed to fetch nonce', error);
    }
  }, [setNonce]);

  return { nonce };
};
