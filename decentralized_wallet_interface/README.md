# solana-test-dev
Creating accounts, minting tokens and realising an exhange between account.


### Create your container

Generate the image;
```bash
sudo docker build -t img_dwi .
```

```bash
sudo docker run -it -v /PathToMyProject/:/workspace --name cont_dwi img_dwi
```

### Initiate the project:
```bash
npx create-react-app my-solana-wallet
```

From the my-solana-wallet
```bash
yarn add @solana/web3.js
```

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
