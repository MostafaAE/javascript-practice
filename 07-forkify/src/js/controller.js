import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import 'core-js/stable'; // Polyfillnig everything else

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    // Render spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(recipeId);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
