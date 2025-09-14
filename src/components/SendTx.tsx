import type { ZkLoginProof } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { genAddressSeed, getZkLoginSignature } from '@mysten/sui/zklogin';
import { Currency, Send, WalletMinimal } from 'lucide-react';
import { useState } from 'react';
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!decodedJwt || !decodedJwt.sub || !decodedJwt.aud) return;
    const amount = (e.target as HTMLFormElement).amount.value;
    const recipient = (e.target as HTMLFormElement).recipient.value;

    try {
      const txb = new Transaction();

      txb.setSender(address);

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

      const res = await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // if (!suiClient.getAccountAddress()) {
  //   return <div>Please connect your wallet</div>;
  // }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="join w-full">
          <label className="input join-item  w-full">
            {/* TODO: Add SUI icon */}
            <Currency className="w-4 h-4" />
            <input min={1} required type="number" placeholder="Amount (SUI)" name="amount" />
          </label>
        </div>
        <div className="join w-full">
          <label className="input join-item  w-full">
            <WalletMinimal className="w-4 h-4" />
            <input required type="text" placeholder="Recipient Address" name="recipient" />
          </label>
        </div>
        <button className="btn btn-neutral w-full" type="submit">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs mr-1" />
              Loading...
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
