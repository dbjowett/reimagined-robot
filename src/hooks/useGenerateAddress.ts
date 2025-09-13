import { jwtToAddress } from '@mysten/sui/zklogin';
import { useEffect, useState } from 'react';

export const useGenerateAddress = (jwt: string | null, salt: bigint | null) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!jwt || !salt) return;
    const fetchAddress = () => {
      const address = jwtToAddress(jwt, salt);
      setAddress(address);
    };
    fetchAddress();
  }, [jwt, salt]);

  return address;
};
