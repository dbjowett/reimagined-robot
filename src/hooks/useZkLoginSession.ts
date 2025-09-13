import { SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateNonce as generateNonceZkLogin, generateRandomness } from '@mysten/sui/zklogin';
import { useEffect, useState } from 'react';

// TODO: Update to mainnet(?)
const FULLNODE_URL = 'https://fullnode.devnet.sui.io';

export type ZkLoginSession = {
  zkNonce: string;
  randomness: string;
  maxEpoch: number;
  ephemeralKeyPair: Ed25519Keypair;
  epoch: string;
  suiClient: SuiClient;
};

const createZkLoginSession = async (): Promise<ZkLoginSession> => {
  try {
    const suiClient = new SuiClient({ url: FULLNODE_URL });
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const zkNonce = generateNonceZkLogin(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

    return {
      zkNonce,
      randomness,
      maxEpoch,
      ephemeralKeyPair,
      epoch,
      suiClient,
    };
  } catch (error) {
    console.error('Failed to generate login session', error);
    throw error;
  }
};

export const useZkLoginSession = () => {
  const [zkLoginSession, setZkLoginSession] = useState<ZkLoginSession | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchZkLoginSession = async () => {
        const zkLoginSession = await createZkLoginSession();
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
  }, [setZkLoginSession]);

  return { zkLoginSession, loading };
};
