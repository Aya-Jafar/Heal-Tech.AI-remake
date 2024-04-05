// TODO: Convert this to lazy loading imports

import * as React from "react";
import logo from "../images/healai-icon.png";
import { Link } from "react-router-dom";
import { linkStyle } from "../dynamicStyles";
import { Link as ScrollLink } from "react-scroll";
import LoginModal from "./LoginModal";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import SignUpModal from "./SignUpModal";
import { app } from "../Firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logoutIcon from "../images/logout.png";
import { signOutUser } from "../Firebase/auth";
import MobileNav from "./MobileHeader";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const {
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
    currentUser,
    setCurrentUser,
  } = useAuth() as AuthSchema;

  const auth = getAuth(app);

  const [menuActive, setMenuActive] = React.useState(false);
  const toggleMenu = () => setMenuActive(!menuActive);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("token", (user as any)?.accessToken);
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <>
      <LoginModal />
      <SignUpModal />

      <div className="header">
        <Link to="/" style={{ ...linkStyle }}>
          <div className="logo">
            <img src={logo} alt="" />
            <h2>Heal Tech.AI</h2>
          </div>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

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
        {currentUser !== null && currentUser !== undefined ? (
          <div className="logout">
            <Link to="/profile/1" style={{ ...linkStyle }}>
              {(currentUser as any).displayName}
            </Link>
            <img
              src={logoutIcon}
              alt=""
              className="logout-icon"
              onClick={signOutUser}
            />
          </div>
        ) : (
          <div className="header-btns">
            <button className="btn" onClick={() => setIsSignUpModalOpen(true)}>
              <h4>Sign Up</h4>
            </button>
            <button id="login-btn" onClick={() => setIsLoginModalOpen(true)}>
              <h4>Log in</h4>
            </button>
          </div>
        )}
      </div>

      <MobileNav menuActive={menuActive} />

      <hr />
    </>
  );
}
