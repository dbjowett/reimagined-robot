import { SuiClient } from '@mysten/sui/client';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';
import { generateNonce as generateNonceZkLogin, generateRandomness } from '@mysten/sui/zklogin';
import { useEffect, useState } from 'react';

const LOGIN_SESSION_KEY = 'zkLoginSession';

type PersistedSession = {
  zkNonce: string;
  randomness: string;
  maxEpoch: number;
  ephemeralPublicKey: Ed25519PublicKey;
  ephemeralPrivateKey: string;
  ephemeralKeyPair: Ed25519Keypair;
  epoch: string;
};

export type ZkLoginSession = PersistedSession & {
  suiClient: SuiClient;
};

export function getEphemeralKeypair(base64Key: string): Ed25519Keypair {
  const { secretKey } = decodeSuiPrivateKey(base64Key);
  return Ed25519Keypair.fromSecretKey(secretKey);
}

const createZkLoginSession = async (networkUrl: string): Promise<ZkLoginSession> => {
  try {
    const suiClient = new SuiClient({ url: networkUrl });
    const prevSession = sessionStorage.getItem(LOGIN_SESSION_KEY);

    if (prevSession) {
      const persistedSession: PersistedSession = JSON.parse(prevSession);
      return {
        ...persistedSession,
        suiClient,
      };
    }

    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const zkNonce = generateNonceZkLogin(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

    const ephemeralPrivateKey = ephemeralKeyPair.getSecretKey();
    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();

    const newPersistedSession: PersistedSession = {
      zkNonce,
      randomness,
      maxEpoch,
      ephemeralKeyPair,
      ephemeralPrivateKey,
      ephemeralPublicKey,
      epoch,
    };

    sessionStorage.setItem(LOGIN_SESSION_KEY, JSON.stringify(newPersistedSession));

    const session: ZkLoginSession = {
      ...newPersistedSession,
      suiClient,
    };

    return session;
  } catch (error) {
    console.error('Failed to generate login session', error);
    throw error;
  }
};

export const useZkLoginSession = ({ networkUrl }: { networkUrl: string }) => {
  const [zkLoginSession, setZkLoginSession] = useState<ZkLoginSession | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchZkLoginSession = async () => {
        const zkLoginSession = await createZkLoginSession(networkUrl);
        if (zkLoginSession) {
          setZkLoginSession(zkLoginSession);
        } else {
          console.error('Failed to fetch zk login session');
        }
      };
      fetchZkLoginSession();
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch zk login session', error);
    }
  }, [setZkLoginSession, networkUrl]);

  return { zkLoginSession, loading };
};
