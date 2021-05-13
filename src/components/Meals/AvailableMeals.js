import React, { useEffect,useState,useCallback } from 'react'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import Card from '../UI/Card'



const AvailableMeals = (props) => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-4bf51-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      
      const loadedMeals = []

      for(const key in data)
      {
        loadedMeals.push({
          id:key,
          name: data[key].name,
          description: data[key].description,
          price: +data[key].price
        })
      }

      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

    const mealslist = meals.map(meal => (
      <MealItem 
        id= {meal.id}
        key={meal.id}
        name= {meal.name}
        description= {meal.description}
        price= {meal.price}
      />));

    return (
        <>
            <section className={classes.meals}>
              <Card>
                {isLoading && !error && <p>LOADING .. </p>}
                {!isLoading && error && <p>Error Occured, Please Reload</p>}
                <ul>{mealslist}</ul>
              </Card>
            </section>
        </>
    );
}
export default AvailableMeals;


// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];