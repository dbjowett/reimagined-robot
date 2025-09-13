import type { ZkLoginSession } from '../hooks/useZkLoginSession';
import type { Provider } from '../types';
import { getProviderUrl } from '../utils/getProviderUrl';
import { Card } from './Card';

export const Login = ({
  isLoading,
  zkLoginSession,
}: {
  isLoading: boolean;
  zkLoginSession: ZkLoginSession | null;
}) => {
  const handleSignInWithProvider = (provider: Provider) => {
    if (!zkLoginSession?.zkNonce) {
      console.error('Nonce is not set');
      return;
    }

    const signInUrl = getProviderUrl(zkLoginSession.zkNonce, provider);
    window.location.href = signInUrl;
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
    </Card>
  );
};
