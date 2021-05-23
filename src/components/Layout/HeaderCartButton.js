import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'


const HeaderCartButton = (props) => {

    const [btnisHighlighted,setBtnisHighlighted] = useState(false)

    const cxt = useContext(CartContext);

    const {items} = cxt;

    const numberofItems = items.reduce((curNumber,item)=> {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnisHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnisHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnisHighlighted(false)
        },300);

        return (() => {
            clearTimeout(timer);
        });
    }, [items]);

    return (
        <>
            <button className={btnClasses} onClick={props.onClick}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>
                    {numberofItems}
                </span>
            </button>
        </>
    );
}
export default HeaderCartButton