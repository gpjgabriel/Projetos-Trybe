import fetchRecipesCategoriesAPI from '../../services/fetchRecipesCategoriesAPI';

// ESSE ARQUIVO NÃO ESTÁ SENDO USADO,
// MAS QUE FOI DEIXADO AQUI PRA USAR FUTURAMENTE SE PRECISAR.

const fetchAllRecipesFromContext = async (typeOfRecipes, categories) => {
  try {
    const filteredRecipes = [];
    let index = 0;
    // console.log('typeOfRecipes from fetchAllRecipesFromContext: ', typeOfRecipes);
    const testFunction = async () => {
      // console.log(
      //   'Link ---> ',
      //   `https://www.the${typeOfRecipes}db.com/api/json/v1/1/filter.php?c=${categories[index].strCategory}`,
      // );
      await fetchRecipesCategoriesAPI(
        `https://www.the${typeOfRecipes}db.com/api/json/v1/1/filter.php?c=${categories[index].strCategory}`,
      ).then((data) => {
        filteredRecipes.push(...data[
          typeOfRecipes === 'meal'
            ? 'meals' : 'drinks'
        ]);
        // console.log('fetchAllRecipesFromContext ---> data: ', data);
      });
      if (index !== categories.length - 1) {
        index += 1;
        await testFunction();
      }
    };
    await testFunction();
    // console.log('return fetchAllRecipesFromContext ---> ', filteredRecipes);

    return filteredRecipes;
  } catch (error) {
    // console.log('ERROR from fetchAllRecipesFromContext: ', error);
  }
};

export default fetchAllRecipesFromContext;
