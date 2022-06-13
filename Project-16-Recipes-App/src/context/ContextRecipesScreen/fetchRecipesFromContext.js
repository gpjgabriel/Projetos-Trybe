import { FIRST_12_RECIPES } from '../../constants';
import fetchRecipesCategoriesAPI from '../../services/fetchRecipesCategoriesAPI';

const fetchRecipesFromContext = async (typeOfRecipes, category) => {
  let filteredRecipes = [];
  await fetchRecipesCategoriesAPI(
    `https://www.the${typeOfRecipes}db.com/api/json/v1/1/filter.php?c=${category}`,
  ).then((data) => {
    filteredRecipes = data[
      typeOfRecipes === 'meal'
        ? 'meals' : 'drinks'
    ];
    const array = [];
    for (
      let index = 0;
      index < FIRST_12_RECIPES && filteredRecipes[index] !== undefined;
      index += 1
    ) {
      array.push(filteredRecipes[index]);
    }
    filteredRecipes = [...array];
  });

  return filteredRecipes;
};

export default fetchRecipesFromContext;
