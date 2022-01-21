import React from "react";
import TxInterface from "../../interfaces/txInterface";
import "./table.scss";

export default function Table({
  txList,
  address,
}: {
  txList: TxInterface[];
  address: string | undefined;
}) {
  const parseEther = (ether: string) => {
    const parseEthers = parseFloat(ether) / 1000000000000000000;
    return parseEthers.toFixed(2);
  };

  const parseGasFee = (gas: string, gasPrice: string) => {
    const parseGasFee =
      (parseFloat(gas) * parseFloat(gasPrice)) / 1000000000000000000;
    return parseGasFee.toFixed(6);
  };

  return (
    <div className="table">
      <div className="table__div-columns-headers">
        <div className="table__container-column-header">
          <p className="table__column-header txn-hash">Txn Hash</p>
        </div>
        <div className="table__container-column-header">
          <p className="table__column-header block">Block</p>
        </div>
        <div className="table__container-column-header">
          <p className="table__column-header from">From</p>
        </div>
        <div className="table__container-column-header">
          <p className="table__column-header to">To</p>
        </div>
        <div className="table__container-column-header">
          <p className="table__column-header value">Value</p>
        </div>
        <div className="table__container-column-header">
          <p className="table__column-header txn-fee">Txn Fee</p>
        </div>
      </div>
      <div className="table__div-rows">
        {txList.map((tx: TxInterface) => (
          <div className="table__div-row" key={tx.hash}>
            <div className="table__container-column">
              <p className="table__column txn-hash">{tx.hash}</p>
            </div>
            <div className="table__container-column">
              <p className="table__column block">{tx.blockNumber}</p>
            </div>
            <div className="table__container-column">
              <p
                className={`table__column from ${
                  tx.from === address?.toLocaleLowerCase() ? "my-address" : ""
                }`}
              >
                {tx.from}
              </p>
            </div>
            <div className="table__container-column">
              <div className="table__column to">
                <p className={tx.to === address?.toLocaleLowerCase() ? "IN" : "OUT"}>{tx.to === address?.toLocaleLowerCase() ? "IN" : "OUT"}</p>
                <p
                  className={`to-text ${
                    tx.to === address?.toLocaleLowerCase() ? "my-address" : ""
                  }`}
                >
                  {tx.to? tx.to : "- - - - - - - - - - -"}
                </p>
              </div>
            </div>
            <div className="table__container-column">
              <p className="table__column value">
                {parseEther(tx.value)} Ether
              </p>
            </div>
            <div className="table__container-column">
              <p className="table__column txn-fee">
                {parseGasFee(tx.gas, tx.gasPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
