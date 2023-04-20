import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import 'core-js/stable'; // Polyfillnig everything else

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;
    // Update results view
    resultsView.update(model.getSearchResultsPage());

    // Render spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(recipeId);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Render spinner
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render search results & pagination buttons
    controlPagination();
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (page = 1) {
  // Render search results
  resultsView.render(model.getSearchResultsPage(page));

  // Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  // Update recipe servings
  model.updateRecipeServings(servings);

  // Render the recipe view
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
