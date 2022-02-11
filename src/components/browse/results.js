import React, { useState, useEffect } from "react";
import axios from "axios";
import sortArray from "sort-array";

import PokemonCard from "./pokemon-card";
import PageTracker from "./page-tracker";

const Results = ({ filters }) => {
    const [allListings, setAllListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [currentPageListings, setCurrentPageListings] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [listingOffset, setListingOffset] = useState(0);

    useEffect(() => {
        if (allListings.length === 0) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon-species?limit=898`)
                .then((response) => {
                    setAllListings(response.data.results);
                    if (Object.keys(filters).length === 0) {
                        setFilteredListings(response.data.results);
                    }
                })
                .catch((error) => console.log(error.response));
        }
    }, [allListings]);

    useEffect(() => {
        setCurrentPageListings(
            filteredListings.slice(listingOffset, listingOffset + parseInt(itemsPerPage))
        );
    }, [itemsPerPage, listingOffset, filteredListings]);

    useEffect(() => {
        const applyFilters = async () => {
            const filteredByType = [];
            let filteredByColor = [];
            if (filters.type) {
                await axios
                    .get(`https://pokeapi.co/api/v2/type/${filters.type}`)
                    .then((response) => {
                        for (const pokemon of response.data.pokemon) {
                            filteredByType.push(pokemon.pokemon);
                        }
                    })
                    .catch((error) => console.log(error.response));
            }
            if (filters.color) {
                await axios
                    .get(`https://pokeapi.co/api/v2/pokemon-color/${filters.color}`)
                    .then((response) => {
                        filteredByColor = response.data.pokemon_species;
                    })
                    .catch((error) => console.log(error.response));
            }
            if (filteredByType.length > 0 && filteredByColor.length > 0) {
                setFilteredListings(
                    allListings.filter((pokemon) => {
                        let hasType = false;
                        let hasColor = false;
                        for (const filtered of filteredByType) {
                            if (filtered.name === pokemon.name) {
                                hasType = true;
                                break;
                            }
                        }
                        for (const filtered of filteredByColor) {
                            if (filtered.name === pokemon.name) {
                                hasColor = true;
                                break;
                            }
                        }
                        return hasType && hasColor ? true : false;
                    })
                );
            } else if (filteredByType.length > 0) {
                setFilteredListings(filteredByType);
            } else if (filteredByColor.length > 0) {
                setFilteredListings(filteredByColor);
            } else {
                setFilteredListings(allListings);
            }
        };

        applyFilters();
    }, [filters]);

    const renderResults = () => {
        return currentPageListings.map((pokemon) => {
            return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        });
    };

    const handleChange = (event) => {
        if (event.target.name === "items-per-page-select") {
            setItemsPerPage(event.target.value);
        }
    };

    const handleSortClick = (event) => {
        if (event.target.name === "id-btn") {
            const sortedArray = sortArray([...filteredListings], {
                by: "id",
                computed: {
                    id: (listing) => parseInt(listing.url.match(/\/(\d+)\//)[1]),
                },
            });
            setFilteredListings(sortedArray);
        } else if (event.target.name === "name-btn") {
            setFilteredListings(
                sortArray([...filteredListings], {
                    by: "name",
                })
            );
        }
    };

    return (
        <div className="results-wrapper">
            <div className="interaction-wrapper">
                <div className="sort-wrapper">
                    <span className="label">Sorting</span>
                    <button name="id-btn" onClick={handleSortClick}>
                        By ID#
                    </button>
                    <button name="name-btn" onClick={handleSortClick}>
                        By Name
                    </button>
                </div>
                <div className="pagination-wrapper">
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
                        filteredListings={filteredListings}
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
