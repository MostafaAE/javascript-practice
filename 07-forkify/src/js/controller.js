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

const showRecipe = async function () {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09'
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
    };
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
