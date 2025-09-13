import { Clipboard, LogOut } from 'lucide-react';
import { Card } from './components/Card';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { useClipboard } from './hooks/useClipboard';
import { useGenerateAddress } from './hooks/useGenerateAddress';
import { useGenerateProof } from './hooks/useGenerateProof';
import { useHandleCallback } from './hooks/useHandleCallback';
import { useSalt } from './hooks/useSalt';
import { useZkLoginSession } from './hooks/useZkLoginSession';
import { useAuth } from './providers/AuthProvider';

function App() {
  const { isLoggedIn, handleLogout, jwt } = useAuth();

  useHandleCallback();
  const { copied, handleCopy } = useClipboard();
  const { salt } = useSalt();
  const { zkLoginSession, loading: zkLoginSessionLoading } = useZkLoginSession(); // ** Fetches on mount
  const { address } = useGenerateAddress(jwt, salt);
  const { zkProof, proofLoading } = useGenerateProof(salt, zkLoginSession);

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
                  <button
                    className="btn btn-ghost btn-xs btn-square"
                    onClick={() => handleCopy(address)}
                  >
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
