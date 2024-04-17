import React from 'react';

const ConnectWalletButton = ({ onConnect }) => {
  return (
    <button onClick={onConnect}>Connect Wallet</button>
  );
};

export default ConnectWalletButton;
