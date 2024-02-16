# solana-test-dev
Creating accounts, minting tokens and realising an exhange between account.


### Create your container

Generate the image;
```bash
sudo docker build -t my_solana_img .
```

```bash
sudo docker run -it -v /PathToMyProject/:/workspace --name my_solana_container my_solana_img
```


### Setting up your solana environment

We will create two solana account
a token account from wich we will mint some tokens

Create a new keypair (Account A: sender):
```bash
solana-keygen new -o /root/.config/solana/id.json
```

Check key pair (Account A: sender): 
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

### Setup your SPL token and accounts

Create a SPL(Solana Program Library) token on solana which is going to be token mint address.


#### (Account A: sender).

Create a token adn save the address:
```bash
spl-token create-token
```
Create a token account:
```bash
spl-token create-account {Your token address}
```

Mint tokens into account:
```bash
spl-token mint {Your token address} {number of desired token}
```
#### (Account B: receiver)

Generate new solana account:
```bash
solana-keygen new -o /root/.config/solana/new_account.json
```

Tie the new solana account to the mint: 
```bash
spl-token create-account {mint_account_address} /root/.config/solana/new_account.json

solana account /root/.config/solana/new_account.json
```

Create mint account for the new solana Account:
```bash
spl-token create-account {mint_account_address} --owner {publickey from new_account.json} --fee-payer /root/.config/solana/id.json
```
Check balance of new address:
```bash
spl-token balance --address {newly created address} 
```

### Generate and run the project:

Initialize the anchor program:
```bash
anchor init my_token_transfer_project --javascript
cd my_token_transfer_project/
rm -r .git
echo 'anchor-spl = "0.29.0"' >> programs/my_token_transfer_project/Cargo.toml
echo 'spl-token = "3.2.0"' >>  programs/my_token_transfer_project/Cargo.toml
sed -i 's/\[programs.localnet\]/\[programs.devnet\]/g' Anchor.toml
sed -i 's/cluster = "Localnet"/cluster = "devnet"/g' Anchor.toml
```

Generate your program ID.
```bash
solana-keygen new --outfile prg_keypair.json
solana-keygen pubkey prg_keypair.json
```
Replace it in the lib.rs file and cpy the file to src
```bash
cp ../lib.rs programs/my_token_transfer_project/src/lib.rs
```
Build and deploy the project

/!\ MAKE SURE THAT IDL/my_transfer_project.json, lib.rs AND index.js HAVE THE SAME PROGRAM ID /!\

```bash
anchor build
cp ../my_transfer_project.json target/idl/my_transfer_project.json
anchor deploy
# for some reason the IDL does not want to generate itself
```

Setup anchor_wallet env variable:
```bash 
export ANCHOR_WALLET=/root/.config/solana/id.json
```

Setup the correct addresses in the ``index.js`` file:
- ``programId`` With the program id;
- ``fromPubkey`` With mint account A recipient address
- ``toPubkey`` With mint account B address

```bash
cd ../simple_token_transfer_client/
npm install 
node index.js
```
Check account b balance with : 
```bash
spl-token balance --address {mint account B address}
```
Check account info with : 
```bash
spl-token account-info {account address}
```