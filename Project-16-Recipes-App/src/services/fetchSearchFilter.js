import {
  INGREDIENT_SEARCH_FILTER,
  NAME_SEARCH_FILTER,
  SEARCH_LATTER_SEARCH_FILTER,
  INGREDIENT_SEARCH_FILTER_DRINK,
  NAME_SEARCH_FILTER_DRINK,
  SEARCH_LATTER_SEARCH_FILTER_DRINK,
} from '../constants';

export const ingredientSearch = async (ingredient) => {
  try {
    const response = await fetch(`${INGREDIENT_SEARCH_FILTER}${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const nameLatterSearch = async (name) => {
  try {
    const response = await fetch(`${NAME_SEARCH_FILTER}${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const searchLatterSearch = async (latter) => {
  try {
    const response = await fetch(`${SEARCH_LATTER_SEARCH_FILTER}${latter}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const ingredientSearchDrink = async (ingredient) => {
  try {
    const response = await fetch(`${INGREDIENT_SEARCH_FILTER_DRINK}${ingredient}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};

export const nameLatterSearchDrink = async (name) => {
  try {
    const response = await fetch(`${NAME_SEARCH_FILTER_DRINK}${name}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};

export const searchLatterSearchDrink = async (latter) => {
  try {
    const response = await fetch(`${SEARCH_LATTER_SEARCH_FILTER_DRINK}${latter}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};
