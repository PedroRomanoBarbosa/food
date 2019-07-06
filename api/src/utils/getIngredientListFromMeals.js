export default function getIngredientListFromMeals(meals) {
  return Object.values(meals.reduce((items, meal) => {
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
  }, {}));
}