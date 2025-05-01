# Use Case: Telegram Group Sale with Bidding and Buy Now

## Use Case ID
TG-UC-002

## Use Case Name
Telegram Group Sale

## Description
This use case outlines how a seller transfers Telegram group ownership to a buyer using EVM smart contracts and a secure enclave-based agent, with auction-style bidding and a preset Buy Now price. The seller’s ownership is confirmed before bidding starts to ensure trust. Agents (Escrow, Ownership Verification, Telegram Bot) manage ownership confirmation, funds, and user communication for a secure sale.

## Actors
- **Seller**: The group owner, selling the group.
- **Buyer(s)**: Individuals bidding or buying the group.
- **Escrow Agent**: An EVM smart contract handling bids, Buy Now payments, and fund release.
- **Ownership Verification Agent**: A secure enclave-based agent confirming the seller’s ownership before the auction and verifying ownership transfer after the auction.
- **Telegram Bot Agent**: An agent providing a Telegram bot for communication and updates.

## Preconditions
- The seller is the group owner with two-factor authentication (2FA) enabled for at least seven days.
- The seller sets a minimum bid, Buy Now price, and auction duration (e.g., 48 hours).
- The Ownership Verification Agent confirms the seller’s ownership before bidding.
- Buyers are group members (required for ownership transfer).
- Buyers have EVM-compatible wallets (e.g., MetaMask) with sufficient funds (e.g., ETH or ERC20 tokens).
- Agents (Escrow, Ownership Verification, Telegram Bot) are deployed and interoperable.
- The Ownership Verification Agent runs in a secure enclave (e.g., Intel SGX) with attested code.
- The Telegram Bot Agent uses Telegram’s API.

## Postconditions
- If ownership is confirmed and a buyer wins the auction or uses Buy Now, and ownership transfers, funds go to the seller, and the buyer becomes the owner.
- If ownership confirmation fails, the auction is canceled.
- If no bids meet the minimum or ownership transfer fails, funds are refunded.
- Transactions are recorded on the EVM blockchain.

## Basic Flow
1. **Ownership Confirmation and Auction Setup**:
   - The seller initiates the sale via the Telegram Bot Agent, providing group details, minimum bid (e.g., 0.5 ETH), Buy Now price (e.g., 2 ETH), and auction duration.
   - The Ownership Verification Agent confirms the seller’s ownership of the group.
   - The Telegram Bot Agent shares proof of ownership (e.g., blockchain hash, group invite link) with buyers.
   - The Escrow Agent deploys an EVM smart contract for the auction.
2. **Bidding**:
   - Buyers place bids via the Telegram Bot Agent, submitting funds to the Escrow Agent using their EVM wallets.
   - The Escrow Agent ensures bids exceed the current highest and minimum, locks funds, and logs them on the blockchain.
   - The Telegram Bot Agent updates group members on bids.
3. **Buy Now Option**:
   - A buyer pays the Buy Now price, ending the auction early.
   - The Escrow Agent locks funds, selects the buyer, and the Telegram Bot Agent notifies all.
4. **Auction End**:
   - If no Buy Now, the Escrow Agent picks the highest bidder.
   - The Telegram Bot Agent informs the seller and winner, refunding others.
5. **Ownership Transfer**:
   - The Telegram Bot Agent instructs the seller to transfer ownership to the winner via Telegram’s process (promote to admin, select “Transfer Group Ownership,” enter 2FA password).
   - The seller completes the transfer.
6. **Ownership Transfer Verification**:
   - The Ownership Verification Agent confirms the winner’s Telegram ID as the new owner via Telegram’s API.
   - A signed proof is generated in the secure enclave.
7. **Fund Release**:
   - The proof is sent to the Escrow Agent, which releases funds to the seller.
   - The Telegram Bot Agent notifies both parties.
8. **Finalization**:
   - The Escrow Agent logs the transaction.
   - The Telegram Bot Agent confirms completion.

## Alternative Flows
- **A1: Ownership Confirmation Failure**:
  - If the Ownership Verification Agent cannot confirm the seller’s ownership, the Escrow Agent cancels the auction, and the Telegram Bot Agent notifies the seller to retry or contact support.
- **A2: Low Bid**:
  - If a bid is too low, the Escrow Agent rejects it, and the Telegram Bot Agent prompts a higher bid.
- **A3: No Bids or Buy Now**:
  - If no valid bids or Buy Now, the Escrow Agent closes the auction, and the Telegram Bot Agent advises relisting.
- **A4: Transfer Failure**:
  - If ownership isn’t transferred within 24 hours, the Ownership Verification Agent signals a refund, and the Telegram Bot Agent notifies both.
- **A5: Enclave Issue**:
  - If the secure enclave fails attestation, the Escrow Agent pauses, and the Telegram Bot Agent requests a retry.

## Exceptions
- **E1: Telegram API Downtime**:
  - The Ownership Verification Agent retries, and the Telegram Bot Agent informs users.
- **E2: Invalid Proof**:
  - If the Ownership Verification Agent’s proof is tampered, the Escrow Agent refunds, and the Telegram Bot Agent logs it.
- **E3: Blockchain Failure**:
  - The Escrow Agent retries, and the Telegram Bot Agent notifies users.
- **E4: Multiple Buy Now Attempts**:
  - The Escrow Agent accepts the first valid Buy Now, refunds others, and the Telegram Bot Agent notifies all.

## Assumptions
- Secure agent communication via signed messages.
- Trusted secure enclave attestation.
- Secure Telegram Bot Agent interface.
- Users understand EVM wallets, Telegram admin tasks, and bidding.
- Seller follows Telegram’s 2FA rules.
- Audited Escrow Agent contract.

## Flow Diagram

```mermaid
sequenceDiagram
    actor Seller
    actor Buyer
    participant TelegramBotAgent
    participant EscrowAgent
    participant OwnershipVerificationAgent
    participant Blockchain

    Seller->>TelegramBotAgent: Start auction (min bid, Buy Now price, duration)
    TelegramBotAgent->>OwnershipVerificationAgent: Request ownership confirmation
    OwnershipVerificationAgent->>TelegramBotAgent: Confirm ownership
    TelegramBotAgent->>EscrowAgent: Register auction
    EscrowAgent->>Blockchain: Deploy contract, log proof
    TelegramBotAgent-->>Buyer: Share proof, invite link
    loop Bidding
        Buyer->>TelegramBotAgent: Place bid
        TelegramBotAgent->>EscrowAgent: Submit bid
        EscrowAgent->>Blockchain: Lock bid, emit event
        Blockchain-->>EscrowAgent: Confirm bid
        TelegramBotAgent-->>Buyer: Notify bid
    end
    alt Buy Now
        Buyer->>EscrowAgent: Pay Buy Now
        EscrowAgent->>Blockchain: Lock funds, end auction
        Blockchain-->>EscrowAgent: Confirm
        TelegramBotAgent-->>Buyer: Notify auction closed
        TelegramBotAgent-->>Seller: Notify winner
    else Auction End
        EscrowAgent->>Blockchain: Select highest bidder
        Blockchain-->>EscrowAgent: Confirm winner
        TelegramBotAgent-->>Buyer: Notify winner, refund others
    end
    TelegramBotAgent->>Seller: Prompt transfer
    Seller->>Seller: Transfer ownership
    OwnershipVerificationAgent->>TelegramBotAgent: Check group
    OwnershipVerificationAgent->>OwnershipVerificationAgent: Confirm new owner
    OwnershipVerificationAgent->>EscrowAgent: Send proof
    EscrowAgent->>Blockchain: Release funds
    Blockchain-->>EscrowAgent: Confirm
    EscrowAgent->>TelegramBotAgent: Notify success
    TelegramBotAgent-->>Seller: Confirm funds
    TelegramBotAgent-->>Buyer: Confirm ownership
    alt Transfer fails
        OwnershipVerificationAgent->>EscrowAgent: Signal no transfer
        EscrowAgent->>Blockchain: Refund
        TelegramBotAgent-->>Seller: Notify refund
        TelegramBotAgent-->>Buyer: Confirm refund
    end