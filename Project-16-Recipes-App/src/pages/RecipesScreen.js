import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import Context from '../context/Context';
import { FIRST_12_RECIPES } from '../constants';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

const RecipesScreen = ({ match: { path } }) => {
  const {
    stateFoodsRecipes,
    stateFoodRecipesCategories,
    stateDrinksRecipes,
    stateDrinkRecipesCategories,
    editableStateRecipes,
    setEditableStateRecipes,
    stateActiveFilter,
    filterRecipesByCategory,
  } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const FIRST_5_CATEGORIES_RECIPES = 5;
  let recipesData = [];
  let typeOfRecipes = '';
  let recipesCategories = [];
  switch (pathname) {
  case '/foods':
    recipesData = [...stateFoodsRecipes];
    typeOfRecipes = 'Meal';
    recipesCategories = [...stateFoodRecipesCategories];
    break;

  case '/drinks':
    recipesData = [...stateDrinksRecipes];
    typeOfRecipes = 'Drink';
    recipesCategories = [...stateDrinkRecipesCategories];
    break;

  default:
    break;
  }
  // console.log('stateActiveFilter: ', stateActiveFilter);
  if (recipesData.length >= FIRST_12_RECIPES && stateActiveFilter === 'All') {
    const editableRecipeData = [];
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      editableRecipeData.push(recipesData[index]);
    }
    // console.log('editableRecipeData: ', editableRecipeData);
    // console.log('editableStateRecipes: ', editableStateRecipes);
    if (
      editableStateRecipes[editableStateRecipes.length - 1]
      !== editableRecipeData[editableRecipeData.length - 1]
    ) {
      setEditableStateRecipes(editableRecipeData);
      // console.log('EXECUTOU setEditableStateRecipes');
    }
  }

  if (recipesCategories.length >= FIRST_5_CATEGORIES_RECIPES) {
    const arrayCategories = [];
    for (let index = 0; index < FIRST_5_CATEGORIES_RECIPES; index += 1) {
      arrayCategories.push(recipesCategories[index].strCategory);
    }
    recipesCategories = [...arrayCategories];
  }
  recipesCategories.unshift('All');
  // console.log('stateDrinkRecipes: ', stateDrinksRecipes);
  // console.log('recipesData: ', recipesData);
  // console.log('pathName: ', pathname);
  // console.log('stateFoodsRecipes: ', stateFoodsRecipes);
  // console.log('stateDrinksRecipes: ', stateDrinksRecipes);
  // console.log('editableStateRecipes: ', editableStateRecipes);
  // console.log('recipesCategories: ', recipesCategories);

  return (
    <section>
      <Header />
      <section className="section-filters-recipes">
        {recipesCategories.map((category) => (
          <button
            key={ category }
            type="button"
            name={ `button-filter-type-recipes-${typeOfRecipes}` }
            id={ `button-filter-category-${category}` }
            className="button-filter"
            onClick={ filterRecipesByCategory }
            data-testid={ `${category}-category-filter` }
          >
            { category }
          </button>
        ))}
      </section>
      <section className="meals">
        {editableStateRecipes.map((element, index) => (
          <Link
            to={ `${path}/${element[`id${typeOfRecipes}`]}` }
            key={ `${index}-${element[`str${typeOfRecipes}`]}` }
          >
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ element[`str${typeOfRecipes}Thumb`] }
              recipeName={ element[`str${typeOfRecipes}`] }
            />
          </Link>
        ))}
      </section>
      <br />
      <br />
      <BottomMenu />
    </section>
  );
};

RecipesScreen.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }),
};

RecipesScreen.defaultProps = {
  match: {},
};

export default RecipesScreen;
