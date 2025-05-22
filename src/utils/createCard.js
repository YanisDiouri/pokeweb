// src/utils/createCard.js
import { navigateTo } from '../router.js';



export function createPokemonCard(pokemon) {

    
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;

  const name = document.createElement("h3");
  name.textContent = pokemon.name.toUpperCase();

  const favBtn = document.createElement("button");
  favBtn.classList.add("fav-btn");

  const types = document.createElement("p");
  types.textContent = "Type(s): " + pokemon.types.map(t => t.type.name).join(", ");
  
  const svgStar = `
  <svg class="star-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 9 12 2"/>
  </svg>`;
  
  favBtn.innerHTML = svgStar;


  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(pokemon.id)) favBtn.classList.add("active");

  favBtn.addEventListener("click", e => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(pokemon.id)) {
      favorites = favorites.filter(f => f !== pokemon.id);
      favBtn.classList.remove("active");
    } else {
      favorites.push(pokemon.id);
      favBtn.classList.add("active");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  card.addEventListener("click", () => {
    navigateTo(`/pokemon/${pokemon.id}`);
  });

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(favBtn);

  return card;
}
