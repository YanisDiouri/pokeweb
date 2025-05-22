import './style.css';

'use strict';
import { handleRoute, navigateTo } from './router.js';
import { createPokemonCard } from './utils/createCard.js';
import { allPokemon } from './pages/home.js';

document.addEventListener("DOMContentLoaded", handleRoute);

document.getElementById("toggleFavoritesBtn").addEventListener("click", () => { 
  const currentPath = location.pathname;

  if (currentPath === '/favorites') {
    navigateTo('/'); 
    document.getElementById("toggleFavoritesBtn").textContent = "Show Favorite";
  } else {
    navigateTo('/favorites');
    document.getElementById("toggleFavoritesBtn").textContent = "Show All";
  }
});


document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});


document.getElementById("sortOptions").addEventListener("change", async (e) => {
  if (location.pathname !== '/') return;

  const criterion = e.target.value;
  try {
    allPokemon.sort((a, b) => {
      if (criterion === "name") return a.name.localeCompare(b.name);
      return a[criterion] - b[criterion];
    });

    const container = document.getElementById("pokemonList");
    container.innerHTML = "";
    allPokemon.forEach(p => {
      const card = createPokemonCard(p);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erreur lors du tri :", err);
  }
});

document.getElementById("typeFilter").addEventListener("change", (e) => {
  if (location.pathname !== '/') return;

  const selectedType = e.target.value;
  const cards = document.querySelectorAll(".pokemon-card");
  const list = selectedType ? allPokemon.filter(p =>
    p.types.some(t => t.type.name === selectedType)
  ) : allPokemon;

  const container = document.getElementById("pokemonList");
  container.innerHTML = "";
  list.forEach(p => container.appendChild(createPokemonCard(p)));
});
