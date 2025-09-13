import { SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateNonce as generateNonceZkLogin, generateRandomness } from '@mysten/sui/zklogin';

// TODO: Update to mainnet(?)
const FULLNODE_URL = 'https://fullnode.devnet.sui.io';

export const generateNonce = async (): Promise<string> => {
  try {
    const suiClient = new SuiClient({ url: FULLNODE_URL });
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    return generateNonceZkLogin(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
  } catch (error) {
    console.error('Failed to generate nonce', error);
    throw error;
  }
};
