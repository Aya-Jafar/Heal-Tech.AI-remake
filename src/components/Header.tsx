import * as React from "react";
import logo from "../images/healai-icon.png";
import { Link } from "react-router-dom";
import { linkStyle } from "../dynamicStyles";
import { Link as ScrollLink } from "react-scroll";
import LoginModal from "./LoginModal";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import SignUpModal from "./SignUpModal";
import { app } from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const {
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
    currentUser,
    setCurrentUser,
  } = useAuth() as AuthSchema;

  const auth = getAuth(app);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("token", (user as any).accessToken);
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
          <h3>{(currentUser as any).displayName}</h3>
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
      <hr />
    </>
  );
}
