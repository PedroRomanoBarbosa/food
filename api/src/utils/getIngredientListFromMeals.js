export default function getIngredientListFromMeals(meals) {
  return meals.reduce((items, meal) => {
    console.log(meal);
    return meal.ingredients.reduce((acc, { id, name, quantity, quantityType }) => {
      if (items.hasOwnProperty(id)) {
        acc[id].quantity += quantity;
      } else {
        acc[id] = {
          name,
          quantityType,
          quantity,
        };
      }
      return acc;
    }, items);
  }, {});
}