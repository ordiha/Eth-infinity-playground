let web3;
let accounts;
let provider;

// Contract configurations
const contracts = [
  { name: "OpenMintNFT", address: "0x79f6e18a8376b02b35C1D5C02DA86Ec03cA6d57d", method: "mint", type: "string", inputId: "openMintText" },
  { name: "ColorNFT", address: "0x7e5b2523Da5D63e500b9b050f45f993b811c6548", method: "mint", type: "string", inputId: "colorText" },
  { name: "TimeNFT", address: "0x6A7b0FD9Ea1809a5F0F4369e191a0B021D11BCD5", method: "mint", type: "string", inputId: "timeText" },
  { name: "EvolvingNFT", address: "0xFAb4D080D6b1AF6d84685148f9D6a7195f86b829", method: "mint", type: "string", inputId: "evolvingText" },
  { name: "EmojiNFT", address: "0x2fdEf913F4a1bCD05ADA45F4556d54F6df5305e1", method: "mint", type: "string", inputId: "emojiText" },
  { name: "FreeBadgeNFT", address: "0x2533d3769d333f96D446f9035d025cf986773D83", method: "mint", type: "string", inputId: "freeBadgeText" },
  { name: "MessageNFT", address: "0xAC3fDF094d4167D8238ba980F70792E681b487A5", method: "mint", type: "string", inputId: "messageNFTText" },
  { name: "DonationTracker2", address: "0x9dDAf52D93FE53715dC510190b2DDD1d1CafA8fB", method: "donate", type: "eth", inputId: "donateEth" },
  { name: "Lottery", address: "0x2eDb3668A8c37a1b1D1934e4247da47FA2c73daf", method: "buyTicket", type: "eth", inputId: "lotteryEth" },
  { name: "GuessNumber", address: "0xe5c4636C0249312fda74492A1a68094C1c08dA54", method: "guess", type: "uint", inputId: "guessNumber" },
  { name: "KudosToken", address: "0x223412cEFFBfad0eEAc430635ef07A851990a18a", method: "claim", type: "none", inputId: "" },
  { name: "SimpleStable", address: "0x022443D36300CE9EB9b8539619b3D16b0cdF9827", method: "mint", type: "number", inputId: "stableAmount" },
  { name: "SoulboundNFT", address: "0x2e47AbE368cC21d33005174FcF3eF6b72FF21D28", method: "mint", type: "string", inputId: "soulText" },
  { name: "PixelArtNFT", address: "0x34D7857b4C843bDa08703d2B0BE9B4c163aE122a", method: "mint", type: "string", inputId: "pixelText" },
  { name: "VoteToken", address: "0xccCE9A2549f17e35998956A4f23fd34E9A084665", method: "vote", type: "number", inputId: "voteNumber" },
  { name: "OpenPolls", address: "0x427f7939832032FbF6D679E1B711d40b496BeFBb", method: "vote", type: "number", inputId: "pollNumber" },
  { name: "MessageBoardOpen", address: "0xDDfc28B2C3B760b415465C60a0184e73fdd58f8c", method: "postMessage", type: "string", inputId: "boardMsg" },
  { name: "SurveyBoard", address: "0x3fbf1Ec0B4794105480b946940c7DFF6704eF93f", method: "submitSurvey", type: "string", inputId: "surveyAnswer" },
  { name: "ReputationPoints", address: "0xF3Ca99eBB3309Cae06B6163a72801A7E236a531d", method: "increase", type: "number", inputId: "repPoints" },
  { name: "BadgeBoard", address: "0x3977E74324a40Fc36E66bD2841Bf5083fedA5f29", method: "award", type: "string", inputId: "badgeName" },
  { name: "OpenMintNFT2", address: "0xB98216021f341f33828aDE87FBF543428F564AeB", method: "mint", type: "string", inputId: "openMint2Text" },
  { name: "ProjectToken", address: "0x8A78A66E45dFb17A7d2C2f54c0c265d62336591F", method: "claim", type: "none", inputId: "" },
  { name: "BurnToken", address: "0xA94759CaeAD1b3b7bF5EAC55D70926b76d6F9788", method: "burn", type: "number", inputId: "burnAmount" },
  { name: "FaucetToken", address: "0x497C8C54B603b02Ab2a8f11387c5D6bEC19EE237", method: "claim", type: "none", inputId: "" },
  { name: "NameToken", address: "0x1da06bd89f7386E919934D396a18DfE123Ac2214", method: "claim", type: "none", inputId: "" },
  { name: "ArtToken", address: "0x791DCE76c244DBb72e99F5f87BD843fF229f8BdE", method: "mint", type: "string", inputId: "artText" },
  { name: "PraiseToken", address: "0xF98d56aCB775217409BA516c79ca5BAdf976125E", method: "claim", type: "none", inputId: "" },
  { name: "MemoToken", address: "0xa4125F4dD0369Fa7b4153B6Fb26931d16Ac159A1", method: "write", type: "string", inputId: "memoText" },
  { name: "KarmaToken", address: "0xF7147a1a15DaCe03308c57b6A8001a4E0dd5053a", method: "claim", type: "none", inputId: "" },
  { name: "EscrowOpen", address: "0x4e3DCAd4Cf1ac9cCdD93aC2b395C3fBA242c521b", method: "deposit", type: "eth", inputId: "escrowEth" },
  { name: "CrowdfundingOpen", address: "0x6d0615e1dd679314213D39D06E5175322fDcc346", method: "fund", type: "eth", inputId: "crowdEth" },
  { name: "RandomPay", address: "0x02c6F7CD3FC95c6895D1663FDF81882f680A43A8", method: "pay", type: "eth", inputId: "payEth" },
  { name: "VotingOpen", address: "0x79e18a4e4f07b38E13E6E537C209CaEB78652531", method: "vote", type: "number", inputId: "votingNumber" }
];

// Create UI dynamically
const cardsContainer = document.getElementById("cards");
contracts.forEach(c => {
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <h2>🖼 ${c.name}</h2>
    ${c.type !== "none" ? `<input id="${c.inputId}" placeholder="${c.type === 'eth' ? 'ETH amount' : 'Enter text/number'}"/>` : ""}
    <button id="btn_${c.name}">Call ${c.method}()</button>
    <div class="status" id="status_${c.name}"></div>
  `;
  cardsContainer.appendChild(card);
});

// Connect Wallet
document.getElementById("btnConnect").addEventListener("click", async () => {
  try {
    if (window.ethereum) {
      provider = window.ethereum;
      await provider.request({ method: "eth_requestAccounts" });
      web3 = new Web3(provider);
      accounts = await web3.eth.getAccounts();
      showWallet(accounts[0]);
      return;
    }

    const WalletConnectProvider = window.WalletConnectProvider.default;
    provider = new WalletConnectProvider({ infuraId: "5056a2b581e5962f9e3083d68053b5d8" });
    await provider.enable();
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    showWallet(accounts[0]);
  } catch (err) {
    console.error(err);
    alert("Failed to connect wallet!");
  }
});

function showWallet(addr) {
  document.getElementById("addr").innerText = addr;
  document.getElementById("chain").innerText = "Connected";
}

// Generate contract call functions dynamically
contracts.forEach(c => {
  document.getElementById(`btn_${c.name}`).addEventListener("click", async () => {
    try {
      const input = c.type !== "none" ? document.getElementById(c.inputId).value : null;
      const abi = [{ "inputs":[{"internalType":c.type === "string" ? "string" : c.type === "uint" || c.type === "number" ? "uint256" : "uint256","name":"_param","type":c.type === "eth" ? "uint256" : c.type === "string" ? "string" : "uint256"}],"name":c.method,"outputs":[],"stateMutability":c.type === "eth" ? "payable" : "nonpayable","type":"function"}];
      const contract = new web3.eth.Contract(abi, c.address);

      let tx;
      if (c.type === "eth") {
        tx = await contract.methods[c.method]().send({ from: accounts[0], value: web3.utils.toWei(input, "ether") });
      } else if (c.type === "none") {
        tx = await contract.methods[c.method]().send({ from: accounts[0] });
      } else if (c.type === "string") {
        tx = await contract.methods[c.method](input).send({ from: accounts[0] });
      } else if (c.type === "uint" || c.type === "number") {
        tx = await contract.methods[c.method](input).send({ from: accounts[0] });
      }
      document.getElementById(`status_${c.name}`).innerText = `Tx: ${tx.transactionHash}`;
    } catch (e) {
      console.error(e);
      document.getElementById(`status_${c.name}`).innerText = `Error: ${e.message}`;
    }
  });
});
