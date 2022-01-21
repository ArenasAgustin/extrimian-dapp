import React, { useState, ChangeEvent, FormEvent } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "../contracts/SimpleStorage_abi.json";

const SimpleStorage = () => {
  // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = "0x3C6C34eCA4341d857745F89696335aEAfA22eDB4";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [input, setInput] = useState<string>("");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: string[0]) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error: any) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      SimpleStorage_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const setHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("sending " + input + " to the contract");
    contract?.set(input);
    await contract?.deployTransaction.wait()
  };

  const getCurrentVal = async () => {
    console.log(contract);
    
     let val = await contract?.get();
    /*setCurrentContractVal(val); */
    
  };

  return (
    <div>
      <h4> {"Get/Set Contract interaction"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <form onSubmit={setHandler}>
        <input onChange={handleInputChange} type="text" />
        <button type={"submit"}> Update Contract </button>
      </form>
      <div>
        <button onClick={getCurrentVal} style={{ marginTop: "5em" }}>
          {" "}
          Get Current Contract Value{" "}
        </button>
      </div>
      {currentContractVal}
      {errorMessage}
    </div>
  );
};

export default SimpleStorage;
