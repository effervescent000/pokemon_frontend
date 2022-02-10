import React, { useState, useEffect } from "react";
import axios from "axios";

import PokemonCard from "./pokemon-card";
import PageTracker from "./page-tracker";

const Results = ({ filters }) => {
    const [pokemon, setPokemon] = useState([]);
    const [currentListings, setCurrentListings] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [listingOffset, setListingOffset] = useState(0);

    useEffect(() => {
        if (pokemon.length === 0) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon-species?limit=898`)
                .then((response) => {
                    setPokemon(response.data.results);
                })
                .catch((error) => console.log(error.response));
        } else {
            setCurrentListings(
                pokemon.slice(listingOffset, listingOffset + parseInt(itemsPerPage))
            );
        }
    }, [itemsPerPage, listingOffset, pokemon]);

    const renderResults = () => {
        return currentListings.map((pokemon) => {
            return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        });
    };

    const handleChange = (event) => {
        if (event.target.name === "items-per-page-select") {
            setItemsPerPage(event.target.value);
        }
    };

    return (
        <div className="results-wrapper">
            <div className="interaction-wrapper">
                <div className="sort-wrapper"></div>
                <div className="page-wrapper">
                    <select
                        name="items-per-page-select"
                        value={itemsPerPage}
                        onChange={handleChange}
                    >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={30}>30</option>
                    </select>
                    <PageTracker
                        pokemon={pokemon}
                        itemsPerPage={itemsPerPage}
                        setListingOffset={setListingOffset}
                    />
                </div>
            </div>
            <div className="results">{renderResults()}</div>
        </div>
    );
};

export default Results;
