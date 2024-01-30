import * as React from "react";
import logo from "../images/healai-icon.png";
import { Link } from "react-router-dom";
import { linkStyle } from "../dynamicStyles";


interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <div className="header">
        <Link to="/" style={{ ...linkStyle }}>
          <div className="logo">
            <img src={logo} alt="" />
            <h2>Heal Tech.AI</h2>
          </div>
        </Link>

        <div className="header-links">
          <div>About</div>
          <div>Services</div>
          <div>Contact Us</div>
        </div>
        <div className="header-btns">
          <button className="btn">
            <h4>Sign Up</h4>
          </button>
          <button id="login-btn">
            <h4>Log in</h4>
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
