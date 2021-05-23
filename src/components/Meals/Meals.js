import React from 'react'
import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'
// import classes from './Header.module.css'

const Meals = (props) => {
    return (
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    );
}
export default Meals