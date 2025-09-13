import { Shield, ShieldCheck } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
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
