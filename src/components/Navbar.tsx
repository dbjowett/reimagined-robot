import { SuiIcon } from '../assets/SuiIcon';
import { useAuth } from '../providers/AuthProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = ({ networkUrl }: { networkUrl: string }) => {
  const { handleLogout, isLoggedIn } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <SuiIcon className="w-6 h-6 text-primary" />
          zkLogin Wallet
        </h1>
      </div>

      <div className="flex-none flex gap-4 items-center">
        <div className="badge badge-soft badge-success text-xs">{networkUrl.split('/').pop()}</div>
        {isLoggedIn && (
          <button className="btn btn-error text-white" onClick={handleLogout}>
            Logout
          </button>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
};
