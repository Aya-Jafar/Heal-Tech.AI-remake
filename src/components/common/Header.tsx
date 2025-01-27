import React, { Suspense, startTransition } from "react";
import logo from "../../images/healai-icon.png";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/dynamicStyles";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../../store/auth";
import { AuthSchema } from "../../schema";
import { app } from "../../backend/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logoutIcon from "../../images/logout.png";
import { signOutUser } from "../../backend/auth";
import { FaBars } from "react-icons/fa";
import Loader from "./Loader";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import MobileNav from "./MobileHeader";

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
      <MobileNav menuActive={menuActive} />

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
            <Link
              to={`/profile/${(currentUser as any)?.uid}`}
              style={{ ...linkStyle }}
            >
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
