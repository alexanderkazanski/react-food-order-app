import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import Button from "./UI/Button";
import { currencyFormatter } from "./util/formatting";

export default function MealItem({ meal }) {

  const { addItem } = useContext(CartContext);

  function handelAddMealToCart() {
    addItem(meal);
  }
  
  return <li className="meal-item">
    <article>
      <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
      <div>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
        <p className="meal-item-description">{meal.description}</p>
      </div>
      <p className="meal-item-actions">
        <Button onClick={handelAddMealToCart}>Add to Cart</Button>
      </p>
    </article>
  </li>
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired
}