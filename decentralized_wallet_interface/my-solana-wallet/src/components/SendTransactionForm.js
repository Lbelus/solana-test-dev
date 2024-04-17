import React, { useState } from 'react';

const SendTransactionForm = ({ onSend }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(recipient, amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient's Public Key"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (SOL)"
        min="0.001"
        step="0.001"
        required
      />
      <button type="submit">Send SOL</button>
    </form>
  );
};

export default SendTransactionForm;
