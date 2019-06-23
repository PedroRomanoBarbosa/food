import { getDB } from './db';

export async function getAllMealsPopulated() {
  const db = await getDB();
  return await db.collection('meals').aggregate([
    {
      $unwind: {
        path: '$ingredients',
      },
    },
    {
      $lookup: {
        from: 'items',
        localField: 'ingredients.itemId',
        foreignField: '_id',
        as: 'ingredients.item'
      }
    },
    {
      $unwind: {
        path: '$ingredients.item',
      },
    },
    {
      $project: {
        name: "$name",
        ingredients: {
          id: '$ingredients.itemId',
          quantity: '$ingredients.quantity',
          name: '$ingredients.item.name',
          quantityType: '$ingredients.item.quantityType',
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        name: { "$first": "$name" },
        ingredients: {
          $push: "$ingredients",
        },
      },
    },
  ]).toArray();
}