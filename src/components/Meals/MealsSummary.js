  
import { useState } from 'react';
import AddMeal from './AddMeal';
import classes from './MealsSummary.module.css';

const MealsSummary = () => {

  const[openForm, setOpenForm] = useState(false);

  const addMealHandler = () => {
    setOpenForm(true);
  }
  const formCloseHandler = () => {
    setOpenForm(false);
  }

  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
      <button className={classes.button} onClick={addMealHandler}>Add Meals</button>

      {openForm && <AddMeal onClose= {formCloseHandler}/>}

    </section>
  );
};

export default MealsSummary;