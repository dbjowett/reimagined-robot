import { useEffect, useState } from 'react';

const randomSalt = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return BigInt(
    '0x' +
      Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
  );
};

export const useSalt = () => {
  const [salt, setSalt] = useState<bigint | null>(null);

  useEffect(() => {
    if (salt) return;
    const storedSalt = localStorage.getItem('salt');
    if (storedSalt) {
      setSalt(BigInt(storedSalt));
    } else {
      const newSalt = randomSalt();
      setSalt(newSalt);
      localStorage.setItem('salt', newSalt.toString());
    }
  }, []);

  console.log('Salty', salt);
  return { salt };
};
