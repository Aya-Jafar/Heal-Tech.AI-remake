import * as React from "react";
import logo from "../images/healai-icon.png";
import { Link } from "react-router-dom";
import { linkStyle } from "../dynamicStyles";
import { Link as ScrollLink } from "react-scroll";

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
          <ScrollLink to="about" spy={true} smooth={true} duration={500}>
            About
          </ScrollLink>
          <ScrollLink to="services" spy={true} smooth={true} duration={500}>
            Services
          </ScrollLink>
          <ScrollLink to="contact" spy={true} smooth={true} duration={500}>
            Contact Us
          </ScrollLink>
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
