import React from "react";
import "./navBar.scss";

export default function NavBar({
  resetAccountHandler,
}: {
  resetAccountHandler: () => void;
}) {
  return (
    <nav className="navbar">
      <div className="navbar__div-img">
        <img
          src={"https://www.extrimian.com/assets/img/extrimian_logo.svg"}
          alt="Extrimian logo"
          className="navbar__img"
        />
      </div>

      <div className="navbar__div-button">
        <button className="navbar__button" onClick={resetAccountHandler}>
          Reset Account
        </button>
      </div>
    </nav>
  );
}
