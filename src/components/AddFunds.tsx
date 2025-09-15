import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';
import { WalletMinimal } from 'lucide-react';
import { toast } from 'react-toastify';

export const AddFunds = ({ networkUrl, address }: { networkUrl: string; address: string }) => {
  const host = networkUrl.includes('testnet') ? 'testnet' : 'devnet';
  const faucetHost = getFaucetHost(host);
  const handleAddFunds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await requestSuiFromFaucetV2({
        host: faucetHost,
        recipient: address,
      });
      toast.success('Funds added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add funds');
    }
  };
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleAddFunds}>
      <button className="btn btn-outline w-full" type="submit">
        Add Funds
        <WalletMinimal className="w-4 h-4" />
      </button>
    </form>
  );
};
