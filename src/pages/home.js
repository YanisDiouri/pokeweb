import { createPokemonCard } from '../utils/createCard.js';

export let allPokemon = [];

export async function render(container) {
  container.innerHTML = '<div id="pokemonList" class="pokemon-container"></div>';
  
  const pokemonList = container.querySelector('#pokemonList');
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await response.json();

  allPokemon = [];

  for (const p of data.results) {
    const detail = await fetch(p.url).then(res => res.json());
    allPokemon.push(detail);
    const card = createPokemonCard(detail);
    pokemonList.appendChild(card);
  }
}
