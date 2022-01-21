import React from "react";
import "./navBar.scss";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__divimg">
        <img
          src={"https://www.extrimian.com/assets/img/extrimian_logo.svg"}
          alt="Extrimian logo"
          className="navbar__img"
        />
      </div>

      <div className="navbar__divbutton">
        <button className="navbar__button">Reset Account</button>
      </div>
    </nav>
  );
}
