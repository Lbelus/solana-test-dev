
import React, { useState, useEffect } from 'react';
import ConnectWalletButton from './components/ConnectWalletButton';
import BalanceDisplay from './components/BalanceDisplay';
import SendTransactionForm from './components/SendTransactionForm';
import { connectWallet, getBalance, sendSol } from './utils/solanaService';

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (publicKey) {
      (async () => {
        const balance = await getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
      })();
    }
  }, [publicKey]);

  const handleConnect = async () => {
    try {
      const response = await connectWallet();
      if (response) {
        setIsConnected(true);
        // Fetch and display balance, etc.
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSend = async (recipient, amount) => {
    await sendSol(publicKey, recipient, amount * 1e9); // Convert SOL to lamports for sending
    // Update balance after sending
  };

  return (
    <div className="App">
      {!publicKey ? (
        <ConnectWalletButton onConnect={handleConnect} />
      ) : (
        <>
          <BalanceDisplay balance={balance} />
          <SendTransactionForm onSend={handleSend} />
        </>
      )}
    </div>
  );
}

export default App;
