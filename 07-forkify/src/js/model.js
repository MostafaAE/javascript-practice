import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    // Loading recipe
    const data = await getJSON(`${API_URL}${recipeId}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    // Load search results
    const data = await getJSON(`${API_URL}?search=${query}`);

    const { recipes } = data.data;

    state.search.query = query;

    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};
