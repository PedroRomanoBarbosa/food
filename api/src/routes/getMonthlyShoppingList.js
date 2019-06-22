import { getDB } from '../db';
import seedrandom from 'seedrandom';
import moment from 'moment';

export async function getMonthlyShoppingList(req, res) {
  // TODO
  const db = await getDB();
  const meals = await db.collection('meals').find({}).toArray();
  const mealsNumber = meals.length;
  const seed = moment(new Date()).format('YYYYMM');
  var rng = seedrandom(seed);
  var mealsList = [];
  let counter = 0;
  while(counter < mealsNumber) {
    const index = Math.abs(rng.int32()) % (mealsNumber - counter);
    mealsList.push(meals[index]);
    meals.splice(index, 1);
    counter += 1;
  }
  res.send(mealsList);
}
