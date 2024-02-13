require('dotenv').config();
const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

async function main() {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    
    // Path to keypair ==> for devnet tests only
    const payerSecretKey = JSON.parse(fs.readFileSync('/root/.config/solana/id.json', 'utf8'));
    const payer = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(payerSecretKey));

    // program key ==> for devnet tests only
    const programId = new solanaWeb3.PublicKey(process.env.SOLANA_PROGRAM_ID);

    const instruction = new solanaWeb3.TransactionInstruction({
        keys: [], // Add any required keys here
        programId,
        data: Buffer.alloc(0), // expected input data
    });

    let transaction = new solanaWeb3.Transaction().add(instruction);
    transaction.feePayer = payer.publicKey;
    let blockhash = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;

    // Sign transaction with the payer's keypair
    let signedTransaction = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer], // The payer of the transaction fees
    );

    console.log("Transaction signature:", signedTransaction);
}

main().catch(err => console.error(err));
