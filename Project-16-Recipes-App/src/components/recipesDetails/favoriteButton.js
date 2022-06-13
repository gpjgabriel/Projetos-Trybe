import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../../context/Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton({ recipe }) {
  const {
    favorite,
    setFavorite,
  } = useContext(Context);

  const verifyFavorite = () => {
    const returnStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const searchIdFavorite = returnStorage.some(({ id }) => id === idRecipe);
    return searchIdFavorite;
  };

  useEffect(() => {
    setFavorite(verifyFavorite());
  }, []);

  const addFavoriteRecipeBtn = () => {
    console.log(recipe);
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const returnStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite) {
      // retira dos favoritos
      const filterIdfavorite = returnStorage.filter(({ id }) => id !== idRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterIdfavorite));
      setFavorite(false);
    } else {
      // adiciona aos favoritos
      const recipeStorage = [
        ...returnStorage, {
          id: recipe.idMeal || recipe.idDrink,
          type: recipe.idMeal ? 'food' : 'drink',
          nationality: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
      setFavorite(true);
    }
  };

  return (
    <button
      type="button"
      onClick={ () => addFavoriteRecipeBtn() }
    >
      <img
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="FavoriteButton"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default FavoriteButton;
