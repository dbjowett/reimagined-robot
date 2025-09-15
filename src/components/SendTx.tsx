import type { ZkLoginProof } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { genAddressSeed, getZkLoginSignature } from '@mysten/sui/zklogin';
import { Send, WalletMinimal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SuiIcon } from '../assets/SuiIcon';
import { type ZkLoginSession } from '../hooks/useZkLoginSession';
import { useAuth } from '../providers/AuthProvider';

export const SendTx = ({
  zkLoginSession,
  address,
  salt,
  zkProof,
}: {
  zkLoginSession: ZkLoginSession;
  address: string;
  salt: bigint;
  zkProof: ZkLoginProof;
}) => {
  const { decodedJwt } = useAuth();
  const { suiClient } = zkLoginSession;
  const [loading, setLoading] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<{ amount: string; recipient: string }>({
    amount: '',
    recipient: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!decodedJwt || !decodedJwt.sub || !decodedJwt.aud) return;
    const amount = formInput.amount;
    const recipient = formInput.recipient;

    try {
      const txb = new Transaction();

      txb.setSender(address);

      // Get balance
      // const coins = await suiClient.getCoins({
      //   owner: address,
      //   coinType: '0x2::sui::SUI',
      // });
      // const balance = coins.data[0].balance;

      // if (Number(balance) < Number(amount)) {
      //   throw new Error('Insufficient balance');
      // }
      // const coinId = coins.data[0].coinObjectId;

      // const coin = txb.splitCoins(txb.object(coinId), [txb.pure.u64(Number(amount))]);

      // txb.transferObjects([coin], txb.pure.address(recipient));

      const { bytes, signature: userSignature } = await txb.sign({
        client: suiClient,
        signer: zkLoginSession.ephemeralKeyPair,
      });

      const aud = Array.isArray(decodedJwt?.aud) ? decodedJwt?.aud[0] : decodedJwt?.aud;
      const sub = decodedJwt?.sub;

      const addressSeed = genAddressSeed(BigInt(salt), 'sub', sub, aud).toString();

      const zkLoginSignature = getZkLoginSignature({
        inputs: {
          ...zkProof, // partialZkLoginSignature??
          addressSeed,
        },
        maxEpoch: zkLoginSession.maxEpoch,
        userSignature,
      });

      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
      });
      setFormInput({ amount: '', recipient: '' });
      toast.success('Transaction sent successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="join w-full">
          <label className="input join-item  w-full">
            <SuiIcon className="w-4 h-4" />
            <input
              min={1}
              required
              type="number"
              placeholder="Amount (SUI)"
              name="amount"
              value={formInput.amount}
              onChange={(e) => setFormInput({ ...formInput, amount: e.target.value })}
            />
          </label>
        </div>
        <div className="join w-full">
          <label className="input join-item  w-full">
            <WalletMinimal className="w-4 h-4" />
            <input
              required
              type="text"
              placeholder="Recipient Address"
              name="recipient"
              value={formInput.recipient}
              onChange={(e) => setFormInput({ ...formInput, recipient: e.target.value })}
            />
          </label>
        </div>
        <button className="btn btn-neutral w-full" type="submit">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs mr-1" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </button>
      </form>
    </div>
  );
};
