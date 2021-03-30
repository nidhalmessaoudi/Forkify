// MODEL AND VIEWS IMPORTS
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

// CORE IMPORTS
import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}

// APPLICATION LOGIC
const controlRecipes = async function () {
  try {
    // GETTING ID
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    // LOADING RECIPE
    await model.loadRecipe(id);


    // RENDERING RECIPE
    recipeView.render(model.state.recipe);


  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }

}

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // LOAD SEARCH RESULTS
    await model.loadSearchResult(query);

    // RENDER SEARCH RESULTS
    resultsView.render(model.getSearchResultsPage());

    // RENDER INITIAL PAGINATION BTNS
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  // RENDER NEW SEARCH RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // RENDER NEW INITIAL PAGINATION BTNS
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {

  // UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings);

  // UPDATE THE RECIPE VIEW
  recipeView.update(model.state.recipe);

}

const init = function () {

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);

}
init();