import { getAllMealsPopulated } from '../db';
import seedrandom from 'seedrandom';

export default async function getMealListBySeed(seed, days) {
  const allMeals = await getAllMealsPopulated();
  let meals = [...allMeals];
  var rng = seedrandom(seed);
  var mealsList = [];
  let counter = 0;
  let dayCounter = 0;
  while(dayCounter < days) {
    if (meals.length === 0) {
      meals = [...allMeals];
      counter = 0;
    }
    const index = Math.abs(rng.int32()) % (meals.length - counter);
    mealsList.push(meals[index]);
    meals.splice(index, 1);
    counter += 1;
    dayCounter += 1;
  }
  return mealsList;
}