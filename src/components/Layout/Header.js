import React from 'react'
import mealsImg from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
    return (
        <>
        <header className={classes.header}>
            <h1>Meal Ordering</h1>
            
            <HeaderCartButton onClick={props.onShowCart} />
            
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt='A table full of food'/>
        </div>
        </>
    );
}
export default Header