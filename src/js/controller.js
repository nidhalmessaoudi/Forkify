// MODEL AND VIEWS IMPORTS
import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

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

    // UPDATING BOOKMARKS VIEW
    bookmarksView.update(model.state.bookmarks);

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

const controlAddBookmark = function () {
  // ADD OR REMOVE BOOKMARK
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // UPDATE RECIPE VIEW
  recipeView.update(model.state.recipe);

  // RENDER BOOKMARKS
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // SHOW LOADING SPINNER
    addRecipeView.renderSpinner();

    // UPLOAD THE NEW RECIPE
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // RENDER THE NEW RECIPE
    recipeView.render(model.state.recipe);

    // SUCCESS MESSAGE
    addRecipeView.renderMessage();

    // RENDER BOOKMARK VIEW
    bookmarksView.render(model.state.bookmarks);

    // CHANGE ID IN URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`)

    // CLOSE FORM WINDOW
    setTimeout(function () {
      addRecipeView.toggleWindow();
      addRecipeView.renderMarkup();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error("💥", err);
    addRecipeView.renderError(err.message);
  }

}

const init = function () {

  bookmarksView.addBookmarksHandler(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

}
init();