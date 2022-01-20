import { type } from "os";
import Web3 from "web3";
import dataJson from "../contracts/Address.json"

type Web3Type = Web3

const getContract = async (web3: Web3Type) => {
    const data: any = dataJson;

    const netId = await web3.eth.net.getId();

    const deployedNetwork = data.networks[netId.toString()];

    const address = new web3.eth.Contract(
        data.abi,
        deployedNetwork && deployedNetwork.address
    );

    return address;
};

export default getContract;