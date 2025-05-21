import './style.css'

'use strict';

const getPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await response.json();
  const pokeList = data.results;

  pokeList.forEach(async (pokemon) => {
    const dataPokemon = await fetch(pokemon.url);
    const pokemonDetails = await dataPokemon.json();


    createPokemonCard(pokemonDetails);
  });
};

const createPokemonCard = (pokemon) => {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name;

  const name = document.createElement("h3");
  name.textContent = pokemon.name.toUpperCase(); 

  card.appendChild(img);
  card.appendChild(name);

  document.getElementById("pokemonList").appendChild(card);
};

getPokemon();