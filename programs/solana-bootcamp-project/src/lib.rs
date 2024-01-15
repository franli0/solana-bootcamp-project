use anchor_lang::prelude::*;
use pyth_sdk_solana::load_price_feed_from_account_info;

declare_id!("4QKU2dkXGRTGFbR5e5tDQFitFrjVXLnWuKN71iHrZRBo");

const STALENESS_THRESHOLD: u64 = 60;
const BTC_USD_PRICE_FEED: &str = "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J";
const SOL_USD_PRICE_FEED: &str = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";
const ETH_USD_PRICE_FEED: &str = "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw";
const ENCH_USD_PRICE_FEED: &str = "2iRhuHfXDLmSqxSDo2Gyv59ZMaPDkensHHF2cJwWhaqW";
const AAVE_USD_PRICE_FEED: &str = "FT7Cup6ZiFDF14uhFD3kYS3URMCf2RZ4iwfNEVUgndHW";
const BNB_USD_PRICE_FEED: &str = "GwzBgrXb4PG59zjce24SF2b9JXbLEjJJTBkmytuEZj1b";
const CAKE_USD_PRICE_FEED: &str = "5DcE5KDEN44w6gqqMvfBQXXD18nJ6Zm54o2j1BEtn24b";

#[program]
pub mod solana_bootcamp_project {
    use super::*;

    pub fn fetch_price(ctx: Context<FetchPrice>, symbol: String) -> Result<()> {
        // Check if the provided symbol is allowed
        match symbol.as_str() {
            "BTC" | "ETH" | "SOL"  | "1INCH" | "AAVE" | "BNB" | "CAKE" => (),
            _ => return Err(CustomError::InvalidSymbol.into()),
        }

        // 1- Fetch latest price
        let price_account_info = &ctx.accounts.price_feed;
        let price_feed = load_price_feed_from_account_info(&price_account_info).unwrap();
        let current_timestamp = Clock::get()?.unix_timestamp;
        let current_price = price_feed
            .get_price_no_older_than(current_timestamp, STALENESS_THRESHOLD)
            .unwrap();

        // 2- Format display values rounded to nearest dollar
        let display_price =
            u64::try_from(current_price.price).unwrap() / 10u64.pow(u32::try_from(-current_price.expo).unwrap());
        let display_confidence =
            u64::try_from(current_price.conf).unwrap() / 10u64.pow(u32::try_from(-current_price.expo).unwrap());

        // 3- Log result
        msg!("{}/USD price: ({} +- {})", symbol, display_price, display_confidence);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct FetchPrice<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    /// CHECK: We will manually check this against the Pubkey of the price feed
    pub price_feed: AccountInfo<'info>,
}

#[error_code]
pub enum CustomError {
    #[msg("Invalid Price Feed")]
    InvalidPriceFeed,
    #[msg("Invalid Symbol")]
    InvalidSymbol
}
