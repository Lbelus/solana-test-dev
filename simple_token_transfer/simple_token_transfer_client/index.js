const anchor = require('@project-serum/anchor');
const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const fs = require('fs');


const clusterUrl = process.env.ANCHOR_PROVIDER_URL || anchor.web3.clusterApiUrl('devnet');
const connection = new Connection(clusterUrl, 'confirmed');

const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync(process.env.ANCHOR_WALLET))));
const wallet = new anchor.Wallet(walletKeyPair);

const opts = {
    preflightCommitment: "confirmed",
    commitment: "confirmed",
};

// set the IDL, programid and provider to program
const provider = new anchor.AnchorProvider(connection, wallet, opts);
anchor.setProvider(provider);
const idl = require('../my_token_transfer_project/target/idl/my_token_transfer_project.json');
const programId = new PublicKey("");
const program = new anchor.Program(idl, programId, provider);

// Function to perform the token transfer
async function transferToken(fromPubkey, toPubkey, authorityKeypair, amount) {
    const tokenProgramId = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"); // SPL Token program ID per doc

    const bnAmount = new anchor.BN(amount);

    await program.rpc.transfer(bnAmount, {
        accounts: {
            from: fromPubkey,
            to: toPubkey,
            authority: authorityKeypair.publicKey,
            tokenProgram: tokenProgramId,
        },
        signers: [authorityKeypair],
    });
}


const fromPubkey = new PublicKey(""); // from mint account A
const toPubkey = new PublicKey(""); // from mint account B
const authorityKeypair = walletKeyPair;

const amount = 50;

transferToken(fromPubkey, toPubkey, authorityKeypair, amount)
    .then(() => console.log("Transfer successful"))
    .catch(err => console.error("Transfer failed", err));