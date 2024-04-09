import * as React from "react";
import logo from "../../images/healai-icon.png";

export function Footer() {
  return (
    <div className="footer">
      <div className="header">
        {/* <hr /> */}
        <div className="logo">
          <img src={logo} alt="" />
          <p>© 2024 HEAL TECH.AI . All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
