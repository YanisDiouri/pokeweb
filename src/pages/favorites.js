import { createPokemonCard } from '../utils/createCard.js';

export async function render(container) {
  container.innerHTML = '<div id="pokemonList" class="pokemon-container"></div>';

  const pokemonList = container.querySelector('#pokemonList');
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  for (const id of favorites) {
    const detail = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
    const card = createPokemonCard(detail);
    pokemonList.appendChild(card);
  }

  if (favorites.length === 0) {
    pokemonList.innerHTML = "<h5>Aucun favori pour l’instant.</h5>";
  }
}
