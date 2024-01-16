# Solana Bootcamp 23Q4 Project

1. Run `npm install` inside the project directory

2. Make sure to change the wallet to the right path inside Anchor.toml

```
[provider]
cluster = "Devnet"
wallet = "~/.config/solana/id.json"
```

3. Set Solana to use devnet

```
solana config set --url devnet
```

4. Run the command below in turn

```
anchor build
anchor deploy
anchor run test
```

Or you can run `anchor test` to build, deploy and test with single command

Get solana faucet at https://faucet.solana.com/
