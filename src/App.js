import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header";
import { UserContext } from "./components/user-context";
import BrowsePage from "./components/browse/browse-page";
import PokemonDetailPage from "./components/pokemon-detail/pokemon-detail-page";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogin = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <Router>
            <div className="App">
                <UserContext.Provider value={{ loggedIn, toggleLogin, user, setUser }}>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <BrowsePage />
                        </Route>
                        <Route path="/pokemon/:permalink">
                            <PokemonDetailPage />
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </div>
        </Router>
    );
}

export default App;
