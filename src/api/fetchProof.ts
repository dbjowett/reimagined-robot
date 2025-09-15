import type { getZkLoginSignature } from '@mysten/sui/zklogin';

const PROVER_URL = import.meta.env.VITE_PROVER_URL;

export type PartialZkLoginSignature = Omit<
  Parameters<typeof getZkLoginSignature>['0']['inputs'],
  'addressSeed'
>;

export const fetchProof = async (
  jwt: string,
  extendedEphemeralPublicKey: string,
  maxEpoch: number,
  jwtRandomness: string,
  salt: string,
  keyClaimName: string
) => {
  const res = await fetch(PROVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jwt,
      extendedEphemeralPublicKey,
      maxEpoch,
      jwtRandomness,
      salt,
      keyClaimName,
    }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch proof');
  }
  const proof = await res.json();
  return proof as PartialZkLoginSignature;
};
