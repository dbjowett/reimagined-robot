import type { CoinBalance } from '@mysten/sui/client';

export const Balance = ({ balance }: { balance: CoinBalance | null }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="font-semibold">SUI Balance</div>
        <div className="font-semibold text-xs">{balance?.totalBalance || 0} SUI</div>
      </div>
    </div>
  );
};
