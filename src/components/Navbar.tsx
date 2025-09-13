import { WalletMinimal } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  const { handleLogout, isLoggedIn } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <WalletMinimal />
          zkLogin Wallet
        </h1>
      </div>

      <div className="flex-none flex gap-2">
        {isLoggedIn && (
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
};
