import Web3 from "web3";

type Web3Type = Web3

const getWeb3 = (): Promise<Web3Type> => {
    return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            try {
                const web3 = new Web3("http://127.0.0.1:7545");

                resolve(web3);
            } catch (error) {
                reject(error);
            }
        });
    });
};


export default getWeb3;