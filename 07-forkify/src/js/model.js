import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
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
    if (state.bookmarks.some(bookmark => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateRecipeServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const idx = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  // Remove bookmark
  state.bookmarks.splice(idx, 1);

  // Unmark current recipe as bookmarked
  if (state.recipe.id === id) state.recipe.bookmarked = false;
};
