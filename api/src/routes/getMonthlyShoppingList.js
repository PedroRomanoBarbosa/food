import moment from 'moment';

import getMealListBySeed from '../utils/getMealListBySeed';

export async function getMonthlyShoppingList(req, res) {
  const seed = moment(new Date()).format('YYYYMM');
  const meals = await getMealListBySeed(seed, 30);
  res.send(meals);
}
