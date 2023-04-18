export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    // Loading recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

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
    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
