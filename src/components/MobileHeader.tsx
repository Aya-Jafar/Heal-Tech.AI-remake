import React from "react";
import logoutIcon from "../images/logout.png";
import { Link as ScrollLink } from "react-scroll";
import { linkStyle } from "../utils/dynamicStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { app } from "../Firebase/config";
import { signOutUser } from "../Firebase/auth";

interface MobileHeaderProps {
  menuActive: boolean;
}

function MobileNav({ menuActive }: MobileHeaderProps) {
  const auth = getAuth(app);
  const {
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
    currentUser,
    setCurrentUser,
  } = useAuth() as AuthSchema;

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
    <div className={menuActive ? "drop-down-menu open" : "drop-down-menu"}>
      <li>
        <ScrollLink
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          style={{ ...linkStyle }}
        >
          About
        </ScrollLink>
      </li>

      <li>
        <ScrollLink
          to="services"
          spy={true}
          smooth={true}
          duration={500}
          style={{ ...linkStyle }}
        >
          Services
        </ScrollLink>
      </li>

      <li>
        <ScrollLink
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          style={{ ...linkStyle }}
        >
          Contact Us
        </ScrollLink>
      </li>

      <>
        {currentUser !== null && currentUser !== undefined ? (
          <li>
            <div className="logout mobile">
              <h3>{(currentUser as any).displayName}</h3>
              <img
                src={logoutIcon}
                alt=""
                className="logout-icon"
                onClick={signOutUser}
              />
            </div>
          </li>
        ) : (
          <>
            <li style={{ color: "white" }}>
              <button
                className="btn mobile"
                onClick={() => setIsSignUpModalOpen(true)}
              >
                <h4>Sign Up</h4>
              </button>
            </li>
            <li>
              <button
                id="login-btn"
                style={{ width: "100%", paddingRight: "15px" }}
                onClick={() => setIsLoginModalOpen(true)}
              >
                <h4>Log in</h4>
              </button>
            </li>
          </>
        )}
      </>
    </div>
  );
}

export default MobileNav;
