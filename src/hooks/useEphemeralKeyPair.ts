import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { useEffect, useState } from 'react';

export const useEphemeralKeyPair = () => {
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair | null>(null);

  useEffect(() => {
    const ephemeralKeyPair = new Ed25519Keypair();
    setEphemeralKeyPair(ephemeralKeyPair);
  }, []);

  return { ephemeralKeyPair };
};
