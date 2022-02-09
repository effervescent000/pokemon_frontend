import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = ({ pokemon }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error.response));
    }, [pokemon]);

    return (
        <>
            {Object.keys(data).length > 0 ? (
                <div className="card-wrapper">
                    <div className="image-wrapper">
                        <img src={data.sprites.other["official-artwork"].front_default} />
                    </div>
                </div>
            ) : (
                <div className="card-wrapper">Loading...</div>
            )}
        </>
    );
};

export default PokemonCard;
