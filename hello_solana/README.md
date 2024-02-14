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

### deploying the program to solana devnet

Generate the project:

```bash
bash hello_solana_script.sh
```
Deploy your program:

```bash
solana program deploy hello_world/target/deploy/hello_world_solana.so >> program_transac_list.txt
# And PROGRAM_ID={Your program ID here} as env variable
```
Or use the ``deploy_program.sh`` script:
```bash
bash deploy_program.sh
```

### Executing your program

Check the logs for your program execution (real-time log monitoring) : 

```bash
solana logs --url devnet {Your program ID here}
```

Launch the client and activity should pop up in the logs:

```bash
node hello_world_client/index.js
```
