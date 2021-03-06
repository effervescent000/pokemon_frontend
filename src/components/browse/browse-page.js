import React, { useState } from "react";

import Results from "./results";
import PokemonForm from "./pokemon-form";

const BrowsePage = (props) => {
    const [filters, setFilters] = useState({});

    return (
        <div className="content-wrapper">
            <Results filters={filters} />
            <PokemonForm setFilters={setFilters} />
        </div>
    );
};

export default BrowsePage;
