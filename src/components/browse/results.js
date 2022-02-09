import React, { useState, useEffect } from "react";
import axios from "axios";

import PokemonCard from "./pokemon-card";
import PageTracker from "./page-tracker";

const Results = ({ filters }) => {
    const [currentListings, setCurrentListings] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [listingOffset, setListingOffset] = useState(0);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?offset=${listingOffset}&limit=${itemsPerPage}`)
            .then((response) => {
                console.log("Updating current listings");
                setCurrentListings(response.data.results);
            })
            .catch((error) => console.log(error.response));
    }, [itemsPerPage, listingOffset]);

    const renderResults = () => {
        return currentListings.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} />;
        });
    };

    return (
        <div className="results-wrapper">
            <div className="interaction-wrapper">
                <div className="sort-wrapper"></div>
                <div className="page-wrapper">
                    <PageTracker itemsPerPage={itemsPerPage} setListingOffset={setListingOffset} />
                </div>
            </div>
            <div className="results">{renderResults()}</div>
        </div>
    );
};

export default Results;
