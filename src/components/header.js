import React, { useContext, useState } from "react";

import { UserContext } from "./user-context";
import SignupModal from "./auth/signup-modal";
import LoginModal from "./auth/login-modal";

const Header = (props) => {
    const { loggedIn } = useContext(UserContext);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

    const toggleLoginModal = () => {
        setLoginModalIsOpen(!loginModalIsOpen);
    };

    const toggleSignupModal = () => {
        setSignupModalIsOpen(!signupModalIsOpen);
    };

    return (
        <div className="header">
            <div className="left-side">
                <span className="logo">PokeViewer</span>
            </div>
            <div className="right-side">
                {loggedIn ? (
                    <div className="logged-in-header">{/* stuff here */}</div>
                ) : (
                    <div className="logged-out-header">
                        <button className="link-button" onClick={toggleLoginModal}>
                            Login
                        </button>
                        <LoginModal isOpen={loginModalIsOpen} toggle={toggleLoginModal} />
                        <button className="link-button" onClick={toggleSignupModal}>
                            Signup
                        </button>
                        <SignupModal isOpen={signupModalIsOpen} toggle={toggleSignupModal} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
