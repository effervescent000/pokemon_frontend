import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const PokemonDetailPage = (props) => {
    const [pokemon, setPokemon] = useState({});
    const { permalink } = useParams();

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${permalink}`)
            .then((response) => {
                setPokemon(response.data);
            })
            .catch((error) => console.log(error.response));
    }, []);

    return (
        <div className="detail-wrapper">
            {Object.keys(pokemon).length > 0 ? (
                <>
                    <h2>{`${pokemon.name.slice(0, 1).toUpperCase()}${pokemon.name.slice(1)}`}</h2>
                    <div className="images-wrapper">
                        <div className="main-image">
                            <img
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={pokemon.name}
                            />
                        </div>
                        <div className="sub-images">
                            <img src={pokemon.sprites.front_default} alt="" />
                            <img src={pokemon.sprites.back_default} alt="" />
                            <img src={pokemon.sprites.front_shiny} alt="" />
                            <img src={pokemon.sprites.back_shiny} alt="" />
                        </div>
                    </div>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
};

export default PokemonDetailPage;
