import moment from 'moment';

import getMealListBySeed from '../utils/getMealListBySeed';
import getIngredientListFromMeals from '../utils/getIngredientListFromMeals';

export async function getWeeklyShoppingList(req, res) {
  const seed = moment(new Date()).format('YYYYWW');
  const meals = await getMealListBySeed(seed, 7);
  const itemsList = getIngredientListFromMeals(meals);
  res.send({
    meals,
    itemsList,
  });
}
