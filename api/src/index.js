import express from 'express';

import {
  getMonthlyShoppingList,
  getMeals,
} from './routes';

async function initialize() {
  const app = express();
  app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
  );

  app.get('/', (req, res) => {
    res.send('This is the Food Project. Hungry?');
  });
  app.get('/month-shopping-list', getMonthlyShoppingList);
  app.get('/meals', getMeals);
}

initialize();