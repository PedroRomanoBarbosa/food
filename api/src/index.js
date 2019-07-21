import express from 'express';
import {
  getMonthlyShoppingList,
  getMeals,
  getWeeklyShoppingList,
  insertMeal,
  getAllItems,
} from './routes';

async function initialize() {
  const app = express();
  app.use(express.json());
  app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
  );

  app.get('/', (req, res) => {
    res.send('This is the Food Project. Hungry?');
  });
  app.get('/month-shopping-list', getMonthlyShoppingList);
  app.get('/weekly-shopping-list', getWeeklyShoppingList);
  app.get('/meals', getMeals);
  app.get('/items', getAllItems);
  app.post('/insertMeal', insertMeal);
}

initialize();