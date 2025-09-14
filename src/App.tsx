import { Clipboard } from 'lucide-react';
import { AddFunds } from './components/AddFunds';
import { Balance } from './components/Balance';
import { Card } from './components/Card';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { SendTx } from './components/SendTx';
import { useClipboard } from './hooks/useClipboard';
import { useGenerateAddress } from './hooks/useGenerateAddress';
import { useGenerateProof } from './hooks/useGenerateProof';
import { useHandleCallback } from './hooks/useHandleCallback';
import { useSalt } from './hooks/useSalt';
import { useZkLoginSession } from './hooks/useZkLoginSession';
import { useAuth } from './providers/AuthProvider';

const NETWORK_URL = import.meta.env.VITE_SUI_DEVNET_URL;

function App() {
  const { isLoggedIn, jwt } = useAuth();

  useHandleCallback();
  const { copied, handleCopy } = useClipboard();
  const { salt } = useSalt();
  const { zkLoginSession, loading: zkLoginSessionLoading } = useZkLoginSession({
    networkUrl: NETWORK_URL,
  }); // ** Fetches on mount
  const { address } = useGenerateAddress(jwt, salt);
  const { zkProof, proofLoading } = useGenerateProof(salt, zkLoginSession);

  return (
    <div className="flex flex-col h-screen w-screen bg-base-200">
      <Navbar networkUrl={NETWORK_URL} />
      <div className="flex flex-1 items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl p-6">
          {!isLoggedIn ? (
            <Login
              isLoading={zkLoginSessionLoading || !zkLoginSession?.zkNonce}
              zkLoginSession={zkLoginSession}
            />
          ) : (
            <Card>
              <div className="flex items-baseline-last justify-between  w-full">
                {/* Address and copy btn */}
                <span className="truncate text-xs">
                  <span className="font-semibold text-gray-400">Wallet Address</span> <br />
                  {address}
                </span>
                <div
                  className="tooltip"
                  data-tip={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
                >
                  <button
                    className="btn btn-ghost btn-xs btn-square mb-1"
                    onClick={() => handleCopy(address)}
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divider my-0"></div>
              <Balance suiClient={zkLoginSession?.suiClient} address={address} />
              <div className="divider my-0"></div>
              <h3 className="text-lg font-bold">Send Transaction</h3>
              {zkLoginSession && address && salt && zkProof && (
                <SendTx
                  zkLoginSession={zkLoginSession}
                  address={address}
                  salt={salt}
                  zkProof={zkProof}
                />
              )}
              {proofLoading && (
                <div className="flex w-full flex-col gap-4">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              )}

              {/* <div className="divider my-0"></div> */}
              {/* Add funds button with input */}
              <h3 className=" text-lg font-bold mt-2">Add Funds</h3>
              <AddFunds networkUrl={NETWORK_URL} address={address ?? ''} />

              <div className="divider my-0"></div>
              <div className="btn btn-ghost w-full" onClick={() => handleCopy(salt?.toString())}>
                <Clipboard className="w-4 h-4" />
                Copy Salt to Clipboard
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
