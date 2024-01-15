# Solana Bootcamp 23Q4 Project

1. Run `npm install` inside the project directory

2. Set your wallet inside Anchor.toml

```
[provider]
cluster = "Devnet"
wallet = "~/.config/solana/id.json"
```

3. Set your Solana config to devnet. Run the command below in your terminal

```
solana config set --url devnet
```

4. Run the command below in turn

```zsh
anchor build
anchor deploy
anchor run test
```

Or you can run `anchor test` to build, deploy and test with single command

Make sure you have enough funds inside your wallet. You can get solana faucet from: https://faucet.solana.com/
