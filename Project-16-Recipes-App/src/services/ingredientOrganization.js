function IngredientOrganization(recipe) {
  const MAX_INGREDIENT = 20;
  const orderIngredients = [];

  for (let count = 1; count <= MAX_INGREDIENT; count += 1) {
    if (recipe[`strIngredient${count}`]) {
      orderIngredients.push({
        ingredient: recipe[`strIngredient${count}`],
        measure: recipe[`strMeasure${count}`] || '',
      });
    }
  }
  return orderIngredients;
}

export default IngredientOrganization;
