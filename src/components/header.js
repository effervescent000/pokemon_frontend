import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "./user-context";
import SignupModal from "./auth/signup-modal";
import LoginModal from "./auth/login-modal";

const Header = (props) => {
    const { loggedIn, user, setUser, toggleLogin } = useContext(UserContext);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

    const toggleLoginModal = () => {
        setLoginModalIsOpen(!loginModalIsOpen);
    };

    const toggleSignupModal = () => {
        setSignupModalIsOpen(!signupModalIsOpen);
    };

    const handleLogout = () => {
        axios
            .delete(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                toggleLogin();
                setUser({});
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="header">
            <div className="left-side">
                <span className="logo">PokeViewer</span>
            </div>
            <div className="right-side">
                {loggedIn ? (
                    <div className="logged-in-header">
                        <span>Hi, {user.username}</span>{" "}
                        <button className="link-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
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
