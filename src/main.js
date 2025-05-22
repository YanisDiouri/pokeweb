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

// Recherche
document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// Tri
document.getElementById("sortOptions").addEventListener("change", async (e) => {
  if (location.pathname !== '/') return; // Ne tri que sur la page d'accueil

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

// Filtrage par type
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

/*
let showingFavorites = false;

const getPokemon = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) throw new Error("Erreur lors de la récupération des Pokémon de base.");
    
    const data = await response.json();
    const pokeList = data.results;

    for (const pokemon of pokeList) {
      try {
        const dataPokemon = await fetch(pokemon.url);
        if (!dataPokemon.ok) throw new Error(`Erreur sur ${pokemon.name}`);

        const pokemonDetails = await dataPokemon.json();
        allPokemon.push(pokemonDetails);
        createPokemonCard(pokemonDetails);
      } catch (err) {
        console.error(`Erreur interne pour ${pokemon.name}:`, err);
      }
    }
  } catch (err) {
    console.error("Erreur principale lors du chargement des Pokémon:", err);
  }
};

const createPokemonCard = (pokemon) => {
  try {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.id = `card-${pokemon.id}`;

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    const name = document.createElement("h3");
    name.textContent = `${pokemon.name.toUpperCase()}`;

    const favBtn = document.createElement("button");
    favBtn.textContent = "⭐";
    favBtn.classList.add("fav-btn");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(pokemon.id)) {
      favBtn.classList.add("active");
    }

    favBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (favorites.includes(pokemon.id)) {
        favorites = favorites.filter(f => f !== pokemon.id);
        favBtn.classList.remove("active");
        if (showingFavorites) {
          const card = document.getElementById(`card-${pokemon.id}`);
          if (card) card.remove();
        }
      } else {
        favorites.push(pokemon.id);
        favBtn.classList.add("active");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(favBtn);

    // Ouverture en mode "focus"
    card.addEventListener("click", () => {
      try {
        document.getElementById("pokemonList").style.display = "none";

        const container = document.getElementById("focusedCard");
        container.innerHTML = " ";
        container.style.display = "flex";

        const focusedCard = document.createElement("div");
        focusedCard.classList.add("focused-card");

        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;

        const info = document.createElement("div");
        info.classList.add("focused-info");

        const title = document.createElement("h2");
        title.textContent = pokemon.name.toUpperCase();

        const type = document.createElement("p");
        type.textContent = "Type(s): " + pokemon.types.map(t => t.type.name).join(", ");

        const height = document.createElement("p");
        height.textContent = `Taille : ${pokemon.height / 10} m`;

        const weight = document.createElement("p");
        weight.textContent = `Poids : ${pokemon.weight / 10} kg`;

        const stats = document.createElement("ul");
        pokemon.stats.forEach(stat => {
          const li = document.createElement("li");
          li.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
          stats.appendChild(li);
        });

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-focused-btn");
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", () => {
          container.style.display = "none";
          document.getElementById("pokemonList").style.display = "grid";
        });

        info.appendChild(title);
        info.appendChild(type);
        info.appendChild(height);
        info.appendChild(weight);
        info.appendChild(stats);

        focusedCard.appendChild(img);
        focusedCard.appendChild(info);
        container.appendChild(closeBtn);
        container.appendChild(focusedCard);
      } catch (err) {
        console.error("Erreur lors de l'affichage des détails :", err);
      }
    });

    document.getElementById("pokemonList").appendChild(card);
  } catch (err) {
    console.error("Erreur lors de la création de la carte Pokémon :", err);
  }
};

// Recherche
document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// Filtre par type
document.getElementById("typeFilter").addEventListener("change", (e) => {
  const selectedType = e.target.value;
  document.querySelectorAll(".pokemon-card").forEach(card => {
    const types = card.querySelector("p")?.textContent.toLowerCase() || "";
    card.style.display = types.includes(selectedType) || !selectedType ? "block" : "none";
  });
});

// Tri
document.getElementById("sortOptions").addEventListener("change", (e) => {
  const criterion = e.target.value;
  try {
    allPokemon.sort((a, b) => {
      if (criterion === "name") return a.name.localeCompare(b.name);
      return a[criterion] - b[criterion];
    });

    document.getElementById("pokemonList").innerHTML = "";
    allPokemon.forEach(createPokemonCard);
  } catch (err) {
    console.error("Erreur lors du tri :", err);
  }
});

// Toggle favoris
document.getElementById("toggleFavoritesBtn").addEventListener("click", () => {
  try {
    const btn = document.getElementById("toggleFavoritesBtn");
    const container = document.getElementById("pokemonList");
    container.innerHTML = "";

    if (!showingFavorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (favorites.length === 0) {
        const noPokemon = document.createElement("h5");
        noPokemon.textContent = "No favorited Pokémon";
        noPokemon.classList.add("no-fav-message");
        container.appendChild(noPokemon);
      } else {
        for (let i = 0; i < allPokemon.length; i++) {
          if (favorites.includes(allPokemon[i].id)) {
            createPokemonCard(allPokemon[i]);
          }
        }
      }

      btn.textContent = "Show All Pokémon";
      showingFavorites = true;
    } else {
      allPokemon.forEach(createPokemonCard);
      btn.textContent = "Show All Fav";
      showingFavorites = false;
    }
  } catch (err) {
    console.error("Erreur lors du basculement des favoris :", err);
  }
});

getPokemon();
*/
