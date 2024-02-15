use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Transfer};

declare_id!(""); // Replace this with your program's ID.

#[program]
pub mod my_token_transfer_project {
    use super::*;

    pub fn transfer(ctx: Context<TransferContext>, amount: u64) -> Result<()> {
        // Construct the CpiContext for the transfer operation
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info(),
            to: ctx.accounts.to.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        
        // Call the SPL Token transfer instruction
        token::transfer(cpi_context, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TransferContext<'info> {
    #[account(mut)]
    pub from: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    #[account(address = token::ID)]
    /// CHECK: This is safe because it is a test that will no longer
    pub token_program: AccountInfo<'info>,
}
