// wc-scripts.js — WalletConnect + MetaMask/Rabby integration

let web3;
let provider;
let account;
const projectId = "a1172cd3024e252eb241f9ac3c9076fb"; // your WalletConnect Project ID

const actions = {};

// Connect Wallet button
document.getElementById("btnConnect")?.addEventListener("click", async () => {
  try {
    // If window.ethereum exists, prefer injected wallet first
    if (window.ethereum) {
      provider = window.ethereum;
      await provider.request({ method: "eth_requestAccounts" });
      web3 = new Web3(provider);
      account = (await web3.eth.getAccounts())[0];
      updateUIConnected();
    } else {
      // WalletConnect QR
      const WalletConnectProvider = window.WalletConnectProvider.default;
      provider = new WalletConnectProvider({
        projectId,
        showQrModal: true,
        chains: [8453], // Base chain ID
        rpc: { 8453: "https://base-mainnet.rpc.gateway.fm" }
      });
      await provider.enable();
      web3 = new Web3(provider);
      account = (await web3.eth.getAccounts())[0];
      updateUIConnected();
    }
  } catch (err) {
    console.error("Connection failed:", err);
    alert("Wallet connection failed. Check console.");
  }
});

function updateUIConnected() {
  document.getElementById("addr").innerText = account;
  document.getElementById("chain").innerText = "Connected to Base";
  console.log("Connected account:", account);
}

// --- Example Actions for your first 5 cards ---
// OpenMintNFT
actions.mintOpen = async () => {
  try {
    const contract = new web3.eth.Contract(
      [ { "inputs":[{"internalType":"string","name":"_text","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function" } ],
      "0x79f6e18a8376b02b35C1D5C02DA86Ec03cA6d57d"
    );
    const val = document.getElementById("openMintText").value;
    const tx = await contract.methods.mint(val).send({ from: account });
    document.getElementById("statusOpen").innerText = "TX Success: " + tx.transactionHash;
  } catch (err) {
    console.error(err);
    document.getElementById("statusOpen").innerText = "Error: " + err.message;
  }
};

// DonationTracker2
actions.donate = async () => {
  try {
    const contract = new web3.eth.Contract(
      [ { "inputs":[],"name":"donate","outputs":[],"stateMutability":"payable","type":"function" } ],
      "0x9dDAf52D93FE53715dC510190b2DDD1d1CafA8fB"
    );
    const val = document.getElementById("donateEth").value;
    const tx = await contract.methods.donate().send({ from: account, value: web3.utils.toWei(val, "ether") });
    document.getElementById("statusDonate").innerText = "TX Success: " + tx.transactionHash;
  } catch (err) {
    console.error(err);
    document.getElementById("statusDonate").innerText = "Error: " + err.message;
  }
};

// Lottery
actions.buyTicket = async () => {
  try {
    const contract = new web3.eth.Contract(
      [ { "inputs":[],"name":"buyTicket","outputs":[],"stateMutability":"payable","type":"function" } ],
      "0x2eDb3668A8c37a1b1D1934e4247da47FA2c73daf"
    );
    const val = document.getElementById("lotteryEth").value;
    const tx = await contract.methods.buyTicket().send({ from: account, value: web3.utils.toWei(val, "ether") });
    document.getElementById("statusLottery").innerText = "TX Success: " + tx.transactionHash;
  } catch (err) {
    console.error(err);
    document.getElementById("statusLottery").innerText = "Error: " + err.message;
  }
};

// OpinionRegistry
actions.addOpinion = async () => {
  try {
    const contract = new web3.eth.Contract(
      [ { "inputs":[{"internalType":"string","name":"_text","type":"string"}],"name":"addOpinion","outputs":[],"stateMutability":"nonpayable","type":"function" } ],
      "0xE74706982Be1c7223E5855EA42DCF96F1104215B"
    );
    const val = document.getElementById("opinionText").value;
    const tx = await contract.methods.addOpinion(val).send({ from: account });
    document.getElementById("statusOpinion").innerText = "TX Success: " + tx.transactionHash;
  } catch (err) {
    console.error(err);
    document.getElementById("statusOpinion").innerText = "Error: " + err.message;
  }
};

// GuessNumber
actions.guessNumber = async () => {
  try {
    const contract = new web3.eth.Contract(
      [ { "inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"guess","outputs":[],"stateMutability":"nonpayable","type":"function" } ],
      "0xe5c4636C0249312fda74492A1a68094C1c08dA54"
    );
    const val = document.getElementById("guessNumber").value;
    const tx = await contract.methods.guess(val).send({ from: account });
    document.getElementById("statusGuess").innerText = "TX Success: " + tx.transactionHash;
  } catch (err) {
    console.error(err);
    document.getElementById("statusGuess").innerText = "Error: " + err.message;
  }
};
