import { getDB } from '../db';
import { ObjectID } from 'mongodb';

export async function insertMeal(req, res) {
  const db = await getDB();
  try {
    let meal = req.body;
    meal = {
      ...meal,
      ingredients: meal.ingredients.map(ingredient => {
        return {
          ...ingredient,
          itemId: ObjectID(ingredient.itemId),
        };
      }),
    };
    const response = await db.collection('meals').insertOne(meal);
    res.send(response.ops[0]);
  } catch (error) {
    res.send(false);
  }
}