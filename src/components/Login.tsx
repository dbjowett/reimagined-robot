import type { ZkLoginSession } from '../hooks/useZkLoginSession';
import type { Provider } from '../types';
import { getProviderUrl } from '../utils/getProviderUrl';
import { Card } from './Card';

const DEV_NETWORK_URL = import.meta.env.VITE_SUI_DEVNET_URL;
const TEST_NETWORK_URL = import.meta.env.VITE_SUI_TESTNET_URL;

export const Login = ({
  isLoading,
  zkLoginSession,
  selectedNetwork,
  setSelectedNetwork,
}: {
  isLoading: boolean;
  zkLoginSession: ZkLoginSession | null;
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
}) => {
  const handleSignInWithProvider = (provider: Provider) => {
    if (!zkLoginSession?.zkNonce) {
      console.error('Nonce is not set');
      return;
    }

    const signInUrl = getProviderUrl(zkLoginSession.zkNonce, provider);
    window.location.href = signInUrl;
  };

  const handleSelectNetwork = (network: string) => {
    localStorage.setItem('selectedNetwork', network);
    setSelectedNetwork(network);
  };

  return (
    <Card>
      <div>To use the wallet, you need to login with a provider.</div>
      <button
        className="btn btn-primary w-full"
        onClick={() => handleSignInWithProvider('google')}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-xs mr-1" />
            Loading...
          </>
        ) : (
          'Login with Google'
        )}
      </button>
      <div className="divider my-0"></div>
      <div className="text-sm font-bold w-full text-left">Select Network</div>

      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedNetwork}
        onChange={(e) => handleSelectNetwork(e.target.value)}
      >
        <option value={DEV_NETWORK_URL}>Devnet</option>
        <option value={TEST_NETWORK_URL}>Testnet</option>
      </select>
    </Card>
  );
};
