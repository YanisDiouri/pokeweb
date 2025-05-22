# PokéWeb

Een moderne webapplicatie waarmee je Pokémon kunt ontdekken, filteren, bekijken en opslaan in je favorieten. De app is gebouwd met moderne JavaScript (ES6+), volledig als een Single Page Application (SPA), zonder backend en volledig gevoed door de PokéAPI.

---

## I. Projectbeschrijving en functionaliteiten

### I. Haalt automatisch 50 Pokémon op via de PokéAPI
- Haalt 50 Pokémon op via de PokéAPI.

### II. Toont elke Pokémon als kaart met afbeelding, naam en types
- Elke Pokémon wordt weergegeven als een kaart met afbeelding, naam en types.

### III. Detailpagina
- Je kunt op een kaart klikken om een gedetailleerde Pokédex-pagina te openen.

### IV. Moderne data-ophaling
- Gebruikt `async/await` voor API-aanroepen (zie `home.js` en `detail.js`).

### V. Favorieten
- Voeg Pokémon toe aan je favorieten, opgeslagen via `localStorage`.

### VI. SPA Navigatie
- Navigatie tussen de hoofdpagina en favorieten zonder herladen van de pagina.

### VII. Statistieken
- Geanimeerde voortgangsbalken tonen de basisstatistieken van de Pokémon.

### VIII. Type-badges
- Gekleurde type-badges (bijv. water = blauw, vuur = oranje, ...).

### IX. Zoekfunctie
- Dynamisch zoeken op naam.

### X. Sorteerfunctie
- Sorteren op naam, gewicht of lengte.

### XI. Filterfunctie
- Filteren op type via een dropdownmenu.

### XII. Responsive design
- Responsieve en nette interface (raster op desktop, kolommen op mobiel).

### XIII. Gestructureerde architectuur
- Overzichtelijke structuur in `src/` met gescheiden componenten (`router`, `pages`, `utils`...).


## II. Gebruikte API:

PokéAPI --> https://pokeapi.co/api/v2/pokemon?limit=50

## III. Technische vereisten + lijnnummers 

    A. Routing SPA (src/routes.js)
        Le fichier définit des routes statiques (/, /favorites) ainsi qu’une route dynamique pour afficher les détails d’un Pokémon (/pokemon/:id) (lijn 3-6, 15-17). 
        Lors d’un changement d’URL, la fonction handleRoute importe dynamiquement le module correspondant et appelle sa fonction render (lijn 10-23). 
    
    B. Listes des pokémon (src/pages/home.js)
        Pour chaque Pokémon, une requête détaillée est faite via l’URL fournie (lijn 9), et chaque fiche est rendue dynamiquement en DOM à l’aide de la fonction createPokemonCard (lijn 17). 
        La liste est ensuite stockée dans une variable globale (allPokemon) pour le tri et filtrage (lijn 18).

    C. Détails Pokémon (src/pages/details.js)
        Lorsqu’un utilisateur accède à une route de type /pokemon/:id, cette page est chargée. 
        Elle effectue une requête API pour récupérer les informations détaillées d’un Pokémon (lijn 3), puis construit une interface complète incluant ses stats, types, taille et poids, avec des barres de progression animées (lijn 5-37).

    D. Favorites Page (src/pages/favorites.js)
        Ce composant récupère les identifiants des Pokémon favoris depuis localStorage (lijn 7), effectue les requêtes nécessaires auprès de la PokéAPI (lijn 10), puis utilise createPokemonCard pour les afficher dans une grille (lijn 11). 
        Si aucun favori n’est enregistré, un message informatif est affiché (lijn 15-17).
    
    D. Pokémon Card (src/utils/createCard.js)
        Ce fichier contient la logique de construction d’un composant DOM représentant un Pokémon (image, nom, type, bouton favori). 
        Il intègre la gestion des favoris via localStorage (lijn 33-44) et permet la navigation vers la page de détail en cliquant sur la carte(lijn 46-48).

    E. Main
        Ce fichier gère les interactions utilisateur : champ de recherche par nom, options de tri (par nom, taille, poids), et filtrage par type. Chaque événement déclenche un traitement sur le tableau allPokemon, puis régénère les cartes à l’écran. 
        Il inclut aussi la logique pour alterner entre la vue principale et celle des favoris (lijn 13-19).
    
## IV. Installatiehandleiding

    - `git clone https://github.com/YanisDiouri/pokeweb.git`

    ```shell
    cd pokeweb
    npm i 
    npm run dev
    ```
    - open browser op http://localhost:3000

## V. Screenshots van de applicatie 

* Homepage  
![Homepage](images/homepage.png)

* Favorites  
  ![Favorites](images/fav.png)

* Tri par Taille  
  ![Sort by Size](images/size.png)

* Tri par Poids  
  ![Sort by Weight](images/weight.png)

* Filtrage par Type  
  ![Filter by Type](images/type.png)

* Recherche  
  ![Search](images/search.png)

* Page de Détail  
  ![Detail Page](images/detail.png)

### VI. Gebruikte bronnen

PokéAPI --> https://pokeapi.co/api/v2/pokemon?limit=50

ChatGPT 
    ![ChatGPT](images/chatgpt1.png)
    ![ChatGPT](images/chatgpt2.png)
    ![ChatGPT](images/chatgpt3.png)
    ![ChatGPT](images/chatgpt4.png)
    ![ChatGPT](images/chatgpt5.png)
    ![ChatGPT](images/chatgpt6.png)
    ![ChatGPT](images/chatgpt7.png)
    ![ChatGPT](images/chatgpt8.png)
    ![ChatGPT](images/chatgpt9.png)
    ![ChatGPT](images/chatgpt10.png)

WebAdvancedEhbLes (cursus)





        
