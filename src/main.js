import './style.css'

'use strict';

const getPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await response.json();
  const pokeList = data.results;

  pokeList.forEach(async (pokemon) => {
    const dataPokemon = await fetch(pokemon.url);
    const pokemonDetails = await dataPokemon.json();
    console.log(pokemonDetails)

  });
};

getPokemon();