import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Account from "../contracts/Account.json";
import axios from "axios";
import TxInterface from "../interfaces/txInterface";
import NavBar from "../components/NavBar/NavBar";
import Table from "../components/Table/Table";
import './home.scss';

const { REACT_APP_API_KEY, REACT_APP_DEFAULT_ADDRESS, REACT_APP_URL_BASE } =
  process.env;

export default function Home() {
  let contractAddress = "0x3C6C34eCA4341d857745F89696335aEAfA22eDB4";

  //transaction list
  const [txList, setTxList] = useState<TxInterface[]>([]);

  //account and error state
  const [defaultAccount, setDefaultAccount] = useState<string | undefined>(
    REACT_APP_DEFAULT_ADDRESS
  );
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //ethers provider, contract, and signer
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // connect to wallet
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
  const accountChangedHandler = (newAccount: string | undefined) => {
    setDefaultAccount(newAccount);
    getTxList();
    updateEthers();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  // update ethers provider and signer
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      Account.abi,
      tempSigner
    );
    setContract(tempContract);
  };

  // get transaction list
  const getTxList = async () => {
    let txListAux = await axios.get(
      `${REACT_APP_URL_BASE}&address=${defaultAccount}&apikey=${REACT_APP_API_KEY}`
    );

    setTxList(txListAux.data.result);
  };

  // reset account
  const resetAccountHandler = async () => {
    accountChangedHandler(REACT_APP_DEFAULT_ADDRESS);
  };

  useEffect(() => {
    getTxList();
  }, []);

  return (
    <div className="home">
      <div className="home__navbar">
        <NavBar resetAccountHandler={resetAccountHandler} />
      </div>
      <div>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>
        <button onClick={connectWalletHandler}>{connButtonText}</button>
        {errorMessage}
      </div>
      <div className="home__table">
        <Table txList={txList} address={defaultAccount}/>
      </div>
      <br />
    </div>
  );
}
