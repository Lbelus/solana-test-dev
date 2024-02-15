# solana-test-dev
Repository to test and train myself on solana bc.

### Setting up your solana environment

Create a new keypair:
```bash
solana-keygen new -o /root/.config/solana/id.json
```

Check key pair: 
```bash
solana-keygen pubkey /root/.config/solana/id.json
```

or

```bash
solana address
```

Set solana cluster:
```bash
solana config set --url https://api.devnet.solana.com
```
Request sol to fund your account (max 2 per call, up to 24 time per 24h):

```bash
solana airdrop 1 {Your solana address here} --url devnet
```

### Setup your SPL token and account

Create a SPL(Solana Program Library) token on solana which is going to be token mint address.

Create a token (save the address)
```bash
spl-token create-token
```
Create a token account 
```bash
spl-token create-account {Your token address}
```

Mint tokens into account
```bash
spl-token mint {Your token address} {number of desired token}
```

```bash
solana-keygen new -o /root/.config/solana/new_account.json
```
```bash
solana account new_account.json

spl-token create-account mint account address {new_account address}
```

### 

Generate the project:

```bash
anchor init my_token_transfer_project --javascript
# 

#spl-token = "3.2.0" >> programs/my_token_transfer_project/Cargo.toml
cp ../lib.rs programs/my_token_transfer_project/src/lib.rs
# change Anchor.toml to devnet
# programs.localnet > [programs.devnet]
# cluster = "Localnet" > cluster = "devnet"

anchor build
anchor deploy
cd ../simple_token_transfer_client/
npm install - y
npm install @project-serum/anchor
npm install @solana/web3.js
npm install @solana/spl-token
node index.js
```




Configure Anchor.toml for the right network: devnet, testnet, or mainnet-beta;

Deploy your program:

```bash

```

```bash

