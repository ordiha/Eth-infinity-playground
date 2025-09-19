# 📖 Usage Guide — Eth-Infinity-Playground

This guide shows how to interact with the contracts directly.

---

## 1. Open BaseScan
Go to [https://basescan.org](https://basescan.org).  
Paste the contract address from the list (see `contracts.txt`).

---

## 2. Read Contract
- Open the **Read Contract** tab.  
- Example:
  - `name()` → shows the name of NFT or token.  
  - `balanceOf(0xYourWallet)` → check your holdings.  
  - `ownerOf(1)` → check owner of token ID 1.  

---

## 3. Write Contract
- Connect your wallet (MetaMask or Coinbase Wallet).  
- Pick a function. Examples:

### 🎨 NFT contracts
- `mint("Hello")` → Mint a new NFT with text "Hello".  
- `giveawayMint(["0xabc...","0xdef..."])` → Send NFTs to multiple users.

### 💰 Token contracts
- `mint(1000)` → Mint 1000 tokens to your wallet.  
- `burn(500)` → Burn 500 tokens.

### 🗳 Voting / Poll contracts
- `vote(1)` → Vote for option 1 (you can vote unlimited times).  
- `createPoll("Best Color?")` → Start a new poll.

### 🎲 Fun contracts
- `spin()` → Spin the roulette.  
- `guessNumber(7)` → Submit guess.  

---

## 4. No Restrictions
- You can interact as many times as you want.  
- You can send **any ETH amount** (even zero).  
- Everything is designed for **playground use**.  

---

## 5. Network
- Make sure your wallet is on **Base Mainnet** (ChainID: `8453`).  
- RPC: `https://mainnet.base.org`  
- Block Explorer: [https://basescan.org](https://basescan.org)
