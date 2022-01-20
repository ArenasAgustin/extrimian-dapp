import Web3 from "web3";

let selectedAccount = null;

export const init = () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log("accounts", selectedAccount);
      })
      .catch((error) => {
        console.log("error", error);
      });

    window.ethereum.on("accountsChanged", (accounts) => {
      selectedAccount = accounts[0];
      console.log("accountsChanged", selectedAccount);
    });
  }

  const web3 = new Web3(provider);
};
