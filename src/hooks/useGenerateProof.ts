import type { ZkLoginProof } from '@mysten/sui/client';
import { useEffect, useState } from 'react';
import { fetchProof } from '../api/fetchProof';
import { useAuth } from '../providers/AuthProvider';
import type { ZkLoginSession } from './useZkLoginSession';

export const useGenerateProof = (salt: bigint | null, zkLoginSession: ZkLoginSession | null) => {
  const { isLoggedIn, jwt } = useAuth();
  const [zkProof, setZkProof] = useState<ZkLoginProof | null>(null);
  const [proofLoading, setProofLoading] = useState(false);

  useEffect(() => {
    const getProof = async () => {
      if (!isLoggedIn || !jwt || !salt || !zkLoginSession || zkProof || proofLoading) return;
      setProofLoading(true);
      try {
        const proof = await fetchProof(
          jwt,
          zkLoginSession.extEpPublicKey,
          zkLoginSession.maxEpoch,
          zkLoginSession.randomness.toString(),
          salt.toString(),
          'sub'
        );
        setZkProof(proof);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setProofLoading(false);
      }
    };

    void getProof();
  }, [isLoggedIn, jwt, salt, zkLoginSession, zkProof, proofLoading]);

  return { zkProof, proofLoading };
};
