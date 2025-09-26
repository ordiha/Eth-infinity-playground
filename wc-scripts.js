// wc-scripts.js
let web3;
let provider;
let accounts = [];

const projectId = "a1172cd3024e252eb241f9ac3c9076fb"; // Eth-infinity-playground
const projectName = "Eth-infinity-playground";

async function connectWallet() {
  try {
    if (window.ethereum) {
      // MetaMask or Rabby
      provider = window.ethereum;
      await provider.request({ method: "eth_requestAccounts" });
      web3 = new Web3(provider);
      accounts = await web3.eth.getAccounts();
      document.getElementById("walletAddress").innerText = accounts[0];
      console.log("Connected with MetaMask/Rabby:", accounts[0]);
    } else {
      // WalletConnect QR
      provider = new WalletConnectProvider.default({
        projectId,
        qrcode: true,
      });
      await provider.enable();
      web3 = new Web3(provider);
      accounts = await web3.eth.getAccounts();
      document.getElementById("walletAddress").innerText = accounts[0];
      console.log("Connected with WalletConnect:", accounts[0]);
    }
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed. See console.");
  }
}

// Generic function to call contract write functions
async function callContract(address, abi, method, args = [], value = 0) {
  if (!web3 || !accounts.length) {
    alert("Connect wallet first!");
    return;
  }
  const contract = new web3.eth.Contract(abi, address);
  try {
    const tx = await contract.methods[method](...args).send({
      from: accounts[0],
      value: web3.utils.toWei(value.toString(), "ether"),
    });
    console.log("Transaction:", tx);
    alert("TX sent! Check BaseScan for details.");
  } catch (err) {
    console.error(err);
    alert("Transaction failed. See console.");
  }
}

// Expose for HTML onclick
window.actions = {
  connectWallet,
};
