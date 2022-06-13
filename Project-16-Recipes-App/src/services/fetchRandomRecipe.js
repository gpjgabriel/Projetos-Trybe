import { URL_DRINK_RANDOM, URL_FOOD_RANDOM } from '../constants';

export const fetchRandonFood = async () => {
  try {
    const response = await fetch(URL_FOOD_RANDOM);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchRandonDrink = async () => {
  try {
    const response = await fetch(URL_DRINK_RANDOM);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};
