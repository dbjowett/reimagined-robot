import type { ZkLoginProof } from '@mysten/sui/client';
import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';
import { Clipboard, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProof } from './api/fetchProof';
import { Card } from './components/Card';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { useGenerateAddress } from './hooks/useGenerateAddress';
import { useHandleCallback } from './hooks/useHandleCallback';
import { useSalt } from './hooks/useSalt';
import { getEphemeralKeypair, useZkLoginSession } from './hooks/useZkLoginSession';
import { useAuth } from './providers/AuthProvider';

function App() {
  const { isLoggedIn, handleLogout, jwt } = useAuth();
  const [extEpPublicKey, setExtEpPublicKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [zkProof, setZkProof] = useState<ZkLoginProof | null>(null);
  const [proofLoading, setProofLoading] = useState(false);

  useHandleCallback();
  const { salt } = useSalt();
  const { zkLoginSession, loading: zkLoginSessionLoading } = useZkLoginSession(); // ** Fetches on mount
  const { address } = useGenerateAddress(jwt, salt);

  useEffect(() => {
    if (zkLoginSession?.ephemeralPrivateKey) {
      const epKeyPair = getEphemeralKeypair(zkLoginSession.ephemeralPrivateKey);
      setExtEpPublicKey(getExtendedEphemeralPublicKey(epKeyPair.getPublicKey()));
    }
  }, [zkLoginSession]);

  useEffect(() => {
    const getProof = async () => {
      if (
        !isLoggedIn ||
        !jwt ||
        !salt ||
        !zkLoginSession ||
        !extEpPublicKey ||
        zkProof ||
        proofLoading
      )
        return;
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
  }, [isLoggedIn, jwt, salt, zkLoginSession, extEpPublicKey, zkProof, proofLoading]);

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

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
              <div className="flex items-center justify-between  w-full">
                {/* Address and copy btn */}
                <span className="truncate text-xs">
                  <b className="mr-1">Address:</b>
                  {address}
                </span>
                <div
                  className="tooltip"
                  data-tip={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
                >
                  <button className="btn btn-ghost btn-xs btn-square" onClick={handleCopy}>
                    <Clipboard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Logout */}
              <button
                className="btn btn-error w-full mt-4 text-white align-middle"
                onClick={handleLogout}
              >
                <span className="mr-2">Logout</span>
                <LogOut className="w-4 h-4 mt-0.5" />
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
