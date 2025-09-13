import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';
import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { useEphemeralKeyPair } from './hooks/useEphemeralKeyPair';
import { useGenerateAddress } from './hooks/useGenerateAddress';
import { useHandleCallback } from './hooks/useHandleCallback';
import { useSalt } from './hooks/useSalt';
import { useZkLoginSession } from './hooks/useZkLoginSession';
import { useAuth } from './providers/AuthProvider';

function App() {
  const [extEpPublicKey, setExtEpPublicKey] = useState<string | null>(null);

  const { isLoggedIn, handleLogout, jwt } = useAuth();

  useHandleCallback();
  const { salt } = useSalt();
  const { zkLoginSession, loading: zkLoginSessionLoading } = useZkLoginSession(); // ** Fetches on mount
  const { address } = useGenerateAddress(jwt, salt);
  const { ephemeralKeyPair } = useEphemeralKeyPair();

  useEffect(() => {
    if (ephemeralKeyPair) {
      setExtEpPublicKey(getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey()));
    }
  }, [ephemeralKeyPair]);

  return (
    <div className="flex flex-col h-screen w-screen bg-base-200">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl p-6">
          {!isLoggedIn ? (
            <Login
              isLoading={zkLoginSessionLoading || !zkLoginSession?.zkNonce}
              zkLoginSession={zkLoginSession}
            />
          ) : (
            <Card>
              <span className="text-truncate max-w-full overflow-hidden">Address: {address}</span>
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
