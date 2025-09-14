import type { CoinBalance, SuiClient } from '@mysten/sui/client';
import { useEffect, useState } from 'react';

export const Balance = ({
  suiClient,
  address,
}: {
  suiClient: SuiClient | undefined;
  address: string | null;
}) => {
  const [balance, setBalance] = useState<CoinBalance | null>(null);
  useEffect(() => {
    const fetchBalance = async () => {
      if (!suiClient || !address) return 0;
      const balance = await suiClient.getBalance({ owner: address });
      setBalance(balance);
    };
    fetchBalance();
  }, [suiClient, address]);

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center justify-between">
        <div className="font-semibold">SUI Balance</div>
        <div className="font-semibold text-xs">{balance?.totalBalance || 0} SUI</div>
      </div>
    </div>
  );
};
