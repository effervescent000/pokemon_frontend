import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonCard = ({ pokemon }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
            .then((response) => {
                for (const variety of response.data.varieties) {
                    if (variety.is_default) {
                        axios
                            .get(variety.pokemon.url)
                            .then((response) => {
                                setData(response.data);
                            })
                            .catch((error) => console.log(error.response));
                    }
                }
            })
            .catch((error) => console.log(error.response));
    }, [pokemon]);

    return (
        <>
            {Object.keys(data).length > 0 ? (
                <Link to={`/pokemon/${data.id}`}>
                    <div className="card-wrapper">
                        <div className="image-wrapper">
                            <img src={data.sprites.other["official-artwork"].front_default} />
                        </div>
                        <div className="label">{`${data.name
                            .slice(0, 1)
                            .toUpperCase()}${data.name.slice(1)}`}</div>
                    </div>
                </Link>
            ) : (
                <div className="card-wrapper">Loading...</div>
            )}
        </>
    );
};

export default PokemonCard;
