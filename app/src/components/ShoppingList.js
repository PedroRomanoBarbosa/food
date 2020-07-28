import React from "react";
import "./ShoppingList.css";
import moment from "moment";

const ShoppingList = props => {
  const { itemsList } = props;
  return (
    <>
      <div className="ShoppingList">
        <p className="ShoppingListDate">{`${moment()
          .startOf("week")
          .format("DD-MM-YYYY")} / ${moment()
            .endOf("week")
            .format("DD-MM-YYYY")}`}</p>
        <h1 className="ShoppingListTitle">Carrinho de Compras</h1>
        <div className="ShopingListIngr">
          {itemsList.map(ingredient => {
            return (
              <p className="ShoppingListIngrText" key={ingredient.name}>{`${
                ingredient.quantity
                } ${ingredient.quantityType} ${ingredient.name}`}</p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
