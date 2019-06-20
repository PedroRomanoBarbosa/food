import { getDB } from './db';

export async function getMonthlyShoppingList(req, res) {
    // TODO
    res.send([
        {
          test: 'test',
        },
        {
          test: 'test',
        }
    ]);
}

export async function getMeals(req, res) {
    const db = await getDB();
    const meals = await db.collection('meals').find({}).toArray();
    res.send(meals);
}