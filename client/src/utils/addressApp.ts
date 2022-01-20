import getWeb3 from "./getWeb3";
import getContract from "./getContracts";

export const getAddress = async () => {
    const web3 = await getWeb3();
    const contract = await getContract(web3);

    const address = await contract.methods.getAddressWallet().call();

    return address;
};

export const upgradeAddress = async (input: string) => {
    const web3 = await getWeb3();
    const contract = await getContract(web3);
    const accounts = await web3.eth.getAccounts();

    await contract.methods
        .setAddressWallet(input)
        .send({ from: accounts[0], gas: 40000 });

    getAddress();
};