import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, Container } from "reactstrap";

const Header = (props) => {
    return (
        <div className="header">
            <div className="left-side">
                <span className="logo">PokeViewer</span>
            </div>
            <div className="right-side"></div>
        </div>
    );
};

export default Header;
