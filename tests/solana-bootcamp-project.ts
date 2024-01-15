import * as anchor from "@coral-xyz/anchor";
import { SolanaBootcampProject } from "../target/types/solana_bootcamp_project";

describe("solana-bootcamp-project", () => {
  const provider = anchor.AnchorProvider.env();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace
    .SolanaBootcampProject as anchor.Program<SolanaBootcampProject>;
  const payer = provider.wallet.publicKey;
  const btc_usd_price_feed = "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J";
  const sol_usd_price_feed = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";
  const eth_usd_price_feed = "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw";
  const inch_usd_price_feed = "2iRhuHfXDLmSqxSDo2Gyv59ZMaPDkensHHF2cJwWhaqW";
  const aave_usd_price_feed = "FT7Cup6ZiFDF14uhFD3kYS3URMCf2RZ4iwfNEVUgndHW";
  const bnb_usd_price_feed = "GwzBgrXb4PG59zjce24SF2b9JXbLEjJJTBkmytuEZj1b";
  const cake_usd_price_feed = "5DcE5KDEN44w6gqqMvfBQXXD18nJ6Zm54o2j1BEtn24b";
  const dai_usd_price_feed = "A8XFp1YSUqyDDvTwRXM1vmhPHCLxzncG45t1ZH9CMYq7";

  it("Fetch BTC Price", async () => {
    const tx = await program.methods
      .fetchPrice("BTC")
      .accounts({ signer: payer, priceFeed: btc_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch SOL Price", async () => {
    const tx = await program.methods
      .fetchPrice("SOL")
      .accounts({ signer: payer, priceFeed: sol_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch ETH Price", async () => {
    const tx = await program.methods
      .fetchPrice("ETH")
      .accounts({ signer: payer, priceFeed: eth_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch 1INCH Price", async () => {
    const tx = await program.methods
      .fetchPrice("1INCH")
      .accounts({ signer: payer, priceFeed: inch_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch AAVE Price", async () => {
    const tx = await program.methods
      .fetchPrice("AAVE")
      .accounts({ signer: payer, priceFeed: aave_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch BNB Price", async () => {
    const tx = await program.methods
      .fetchPrice("BNB")
      .accounts({ signer: payer, priceFeed: bnb_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch CAKE Price", async () => {
    const tx = await program.methods
      .fetchPrice("CAKE")
      .accounts({ signer: payer, priceFeed: cake_usd_price_feed })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  // This should fail
  it("Fetch DAI Price", async () => {
    const tx = await program.methods
      .fetchPrice("DAI")
      .accounts({ signer: payer, priceFeed: dai_usd_price_feed })
      .rpc();
    console.log("This test should fail because DAI wasn't listed", tx);
  });
});
