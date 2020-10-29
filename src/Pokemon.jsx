/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import './styles.css';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, height, weight, types, sprites, abilities } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className="cont">
        <Typography variant="h2">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          const upperName = toFirstCharUppercase(name);
          return <Typography key={name}> {upperName}</Typography>;
        })}
        <Typography variant="h6"> Abilities:</Typography>
        {abilities.map((abi) => {
          const {ability} = abi;
          const {name} = ability;
          const upperName = toFirstCharUppercase(name);
        return <Typography key={name}>{upperName}</Typography>
        })}
        <Typography></Typography>
      </div>
    );
  };

  return (
    <div className="cont">
      {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
        {pokemon === false && <Typography> Pokemon not found</Typography>}

        {pokemon !== undefined && (
          <Button className="buttn" variant="contained" onClick={() => history.push("/")}>
            back to pokedex
          </Button>
      )}
    </div>
      
  );
};

export default Pokemon;
