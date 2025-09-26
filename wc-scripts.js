let web3;
let accounts;
let provider;

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
    provider = new WalletConnectProvider({
      infuraId: "a1172cd3024e252eb241f9ac3c9076fb"
    });

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

// Contract interactions
const actions = {
  async mintOpen() {
    try {
      const txt = document.getElementById("openMintText").value;
      const contract = new web3.eth.Contract([{"inputs":[{"internalType":"string","name":"_text","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0x79f6e18a8376b02b35C1D5C02DA86Ec03cA6d57d");
      const tx = await contract.methods.mint(txt).send({ from: accounts[0] });
      document.getElementById("statusOpen").innerText = `Tx: ${tx.transactionHash}`;
    } catch(e) {
      document.getElementById("statusOpen").innerText = `Error: ${e.message}`;
    }
  },

  async mintColorNFT() {
    try {
      const txt = document.getElementById("colorNFTText").value;
      const contract = new web3.eth.Contract([{"inputs":[{"internalType":"string","name":"_color","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0x7e5b2523da5d63e500b9b050f45f993b811c6548");
      const tx = await contract.methods.mint(txt).send({ from: accounts[0] });
      document.getElementById("statusColorNFT").innerText = `Tx: ${tx.transactionHash}`;
    } catch(e) {
      document.getElementById("statusColorNFT").innerText = `Error: ${e.message}`;
    }
  },

  async mintTimeNFT() {
    try {
      const contract = new web3.eth.Contract([{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0x6a7b0fd9ea1809a5f0f4369e191a0b021d11bcd5");
      const tx = await contract.methods.mint().send({ from: accounts[0] });
      document.getElementById("statusTimeNFT").innerText = `Tx: ${tx.transactionHash}`;
    } catch(e) {
      document.getElementById("statusTimeNFT").innerText = `Error: ${e.message}`;
    }
  }

  // Extend
