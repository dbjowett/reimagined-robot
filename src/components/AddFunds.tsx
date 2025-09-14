import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';
import { WalletMinimal } from 'lucide-react';

export const AddFunds = ({ networkUrl, address }: { networkUrl: string; address: string }) => {
  const host = networkUrl.includes('testnet') ? 'testnet' : 'devnet';
  const handleAddFunds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tx = await requestSuiFromFaucetV2({
      host: getFaucetHost(host),
      recipient: address,
    });
    console.log('Transaction:', tx);
  };
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleAddFunds}>
      <input min={1} type="number" placeholder="Amount" className="input input-bordered w-full" />
      <button className="btn btn-primary w-full" type="submit">
        Add Funds
        <WalletMinimal className="w-4 h-4" />
      </button>
    </form>
  );
};
