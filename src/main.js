import { ssrImportKey } from 'vite/module-runner';
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
  card.id = `card-${pokemon.id}`;
  
  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name;

  const name = document.createElement("h3");
  name.textContent = `${pokemon.name.toUpperCase()}`;

  const types = document.createElement("p");
  types.textContent = "Type(s): " + pokemon.types.map(t => t.type.name).join(", ");

  const details = document.createElement("div");
  details.classList.add("pokemon-details");
  details.style.display = "none";

  const height = document.createElement("p");
  height.textContent = `Taille : ${pokemon.height / 10} m`;

  const weight = document.createElement("p");
  weight.textContent = `Poids : ${pokemon.weight / 10} kg`;

  const stats = document.createElement("ul");
  stats.textContent = "Stats :";
  pokemon.stats.forEach(stat => {
    const li = document.createElement("li");
    li.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
    stats.appendChild(li);
  });

  details.appendChild(height);
  details.appendChild(weight);
  details.appendChild(stats);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(types);
  card.appendChild(details);

  card.addEventListener("click", () => {
    const allCards = document.querySelectorAll(".pokemon-card .pokemon-details");
    allCards.forEach((el) => {
      if (el !== details) {
        el.style.display = "none";
        console.log(allCards);
      }
      details.style.display = details.style.display === "none" ? "block" : "none";
    });

  });

  document.getElementById("pokemonList").appendChild(card);
};

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

getPokemon();