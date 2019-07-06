import moment from 'moment';

import getMealListBySeed from '../utils/getMealListBySeed';
import getIngredientListFromMeals from '../utils/getIngredientListFromMeals';

export async function getMonthlyShoppingList(req, res) {
  const seed = moment(new Date()).format('YYYYMM');
  const meals = await getMealListBySeed(seed, 30);
  const itemsList = getIngredientListFromMeals(meals);
  res.send({
    meals,
    itemsList,
  });
}
