export async function render(container) {
  const id = window.location.pathname.split('/').pop();
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());

  container.innerHTML = `
  <div class="dex-container">
    <div class="dex-left">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    </div>
    <div class="dex-right">
      <h1>${pokemon.name.toUpperCase()} <span class="dex-id">#${pokemon.id}</span></h1>

      <div class="types">
        ${pokemon.types.map(t => `<span class="type-badge ${t.type.name}">${t.type.name}</span>`).join('')}
      </div>

      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>

      <h2>Base Stats</h2>
      <div class="stats">
        ${pokemon.stats.map(stat => `
          <div class="stat">
            <span>${stat.stat.name}</span>
            <div class="bar">
              <div class="fill" style="width: ${(stat.base_stat / 255) * 100}%"></div>
            </div>
            <span class="stat-value">${stat.base_stat}</span>
          </div>
        `).join('')}
      </div>

      <button onclick="history.back()">← Back</button>
    </div>
  </div>
`;
}
