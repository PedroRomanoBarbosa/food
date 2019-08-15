import { getDB } from '../db';

export async function getAllItems(req, res) {
  const db = await getDB();
  const ingredients = await db.collection('items').find({}).toArray();
  res.send(ingredients);
}