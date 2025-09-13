import { Shield, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { useFetchNonce } from './hooks/useFetchNonce';
import { useHandleCallback } from './hooks/useHandleCallback';
import { useAuth } from './providers/AuthProvider';
import type { Provider } from './types';
import { getProviderUrl } from './utils/getProviderUrl';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoggedIn, handleLogout } = useAuth();
  const { nonce } = useFetchNonce(); // ** Fetch on mount
  useHandleCallback(); // ** Handle cb from Google

  const handleSignInWithProvider = (provider: Provider) => {
    setLoading(true);
    if (!nonce) {
      console.error('Nonce is not set');
      return;
    }

    const signInUrl = getProviderUrl(nonce, provider);
    window.location.href = signInUrl;
    setLoading(false);
  };

  const Card = ({ children }: { children: React.ReactNode }) => {
    const Icon = isLoggedIn ? ShieldCheck : Shield;
    return (
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-4">
          <Icon />
          Secure Your Web3
        </h2>
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl p-6">
          {!isLoggedIn ? (
            <Card>
              <div>To use the wallet, you need to login with a provider.</div>
              <button
                className="btn btn-primary w-full"
                onClick={() => handleSignInWithProvider('google')}
                disabled={loading || !nonce}
              >
                {loading || !nonce ? (
                  <>
                    <span className="loading loading-spinner loading-xs mr-1" />
                    Loading...
                  </>
                ) : (
                  'Login with Google'
                )}
              </button>
            </Card>
          ) : (
            <Card>
              <span className="text-truncate max-w-full overflow-hidden">Logged in</span>
              <button className="btn btn-error w-full mt-4 text-white" onClick={handleLogout}>
                Logout
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
