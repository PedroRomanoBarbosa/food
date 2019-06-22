import { getAllMealsPopulated } from '../db';

export async function getMeals(req, res) {
  const meals = await getAllMealsPopulated();
  res.send(meals);
}