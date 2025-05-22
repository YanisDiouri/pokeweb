// src/router.js

const routes = {
    '/': () => import('./pages/home.js'),
    '/favorites': () => import('./pages/favorites.js'),
  };
  
  const parseLocation = () => location.pathname.toLowerCase();
  
  export async function handleRoute() {
    const path = parseLocation();
  
    let route = routes[path];
    
    if (!route && path.startsWith("/pokemon/")) {
      route = () => import('./pages/detail.js');
    }
  
    const module = await route();
    const { render } = module;
  
    render(document.querySelector("#app"));
  }
  
  export function navigateTo(path) {
    history.pushState({}, '', path);
    handleRoute();
  }
  
  window.addEventListener('popstate', handleRoute);
  