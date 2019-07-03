import moment from 'moment';

import getMealListBySeed from '../utils/getMealListBySeed';

export async function getWeeklyShoppingList(req, res) {
  const seed = moment(new Date()).format('YYYYWW');
  const meals = await getMealListBySeed(seed, 7);
  res.send(meals);
}
