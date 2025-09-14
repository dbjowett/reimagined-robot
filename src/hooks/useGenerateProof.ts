import type { ZkLoginProof } from '@mysten/sui/client';
import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';
import { useEffect, useState } from 'react';
import { fetchProof } from '../api/fetchProof';
import { useAuth } from '../providers/AuthProvider';
import { getEphemeralKeypair, type ZkLoginSession } from './useZkLoginSession';

export const useGenerateProof = (salt: bigint | null, zkLoginSession: ZkLoginSession | null) => {
  const { isLoggedIn, jwt } = useAuth();
  const [zkProof, setZkProof] = useState<ZkLoginProof | null>(null);
  const [proofLoading, setProofLoading] = useState(false);

  useEffect(() => {
    const getProof = async () => {
      if (
        !jwt ||
        !salt ||
        !zkLoginSession ||
        zkProof ||
        proofLoading ||
        !zkLoginSession.ephemeralKeyPair
      )
        return;
      const ephemeralKeyPair = getEphemeralKeypair(zkLoginSession.ephemeralPrivateKey);
      const extEpPublicKey = getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey());

      setProofLoading(true);
      try {
        const proof = await fetchProof(
          jwt,
          extEpPublicKey,
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
