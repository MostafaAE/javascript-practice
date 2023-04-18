import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import 'core-js/stable'; // Polyfillnig everything else
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('TEST TEST');

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
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
