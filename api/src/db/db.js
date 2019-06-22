import { MongoClient } from 'mongodb';

export async function getDB() {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017/food", { useNewUrlParser: true });
    return client.db('food');
  } catch (error) {
    console.error(error);
  }
}