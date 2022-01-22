import React from "react";
import "./addressConnect.scss";

export default function AddressConnect({
  account,
  buttonText,
  errorMessage,
  connectWalletHandler,
}: {
  account: string | undefined;
  buttonText: string;
  errorMessage: string | null;
  connectWalletHandler: () => void;
}) {
  return (
    <div className="address">
      <div className="address__div-address">
        <h3 className="address__address">Address: {account}</h3>
        <button className="address__button" onClick={connectWalletHandler}>{buttonText}</button>
      </div>
      <div className="address__error">{errorMessage}</div>
    </div>
  );
}
