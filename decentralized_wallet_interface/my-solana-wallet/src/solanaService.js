import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export const connectWallet = async () => {
  try {
    const response = await window.solana.connect();
    return response.publicKey.toString();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getBalance = async (publicKey) => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance;
};

export const sendSol = async (senderPublicKey, receiverPublicKey, amount) => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: new PublicKey(receiverPublicKey),
      lamports: amount,
    })
  );

  const { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = senderPublicKey;

  const signedTransaction = await window.solana.signTransaction(transaction);
  const transactionId = await connection.sendRawTransaction(signedTransaction.serialize());
  return transactionId;
};
