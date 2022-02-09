import React, { useState } from "react";

import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";

import Header from "./components/header";
import { UserContext } from "./components/user-context";
import BrowsePage from "./components/browse/browse-page";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogin = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <div className="App">
            <UserContext.Provider value={{ loggedIn, toggleLogin, user, setUser }}>
                <Header />
                <BrowsePage />
            </UserContext.Provider>
        </div>
    );
}

export default App;
