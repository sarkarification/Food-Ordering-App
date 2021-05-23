import React,{useContext, useState} from 'react'
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const[isCheckout, setIsCheckout] = useState(false)
    const[isSubmitting,setIsSubmitting]=useState(false)
    const[didSubmit,setDidSubmit]=useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1})
    }
    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id)
    }
    const orderHandler = () =>{
        setIsCheckout(true)
    }

    async function addDataHandler (mealOrder) {
        const response = await fetch('https://react-http-4bf51-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST', 
          body: JSON.stringify(mealOrder),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        const data = await response.json;
        console.log(data);
        setIsSubmitting(false)
        setDidSubmit(true);
        cartCtx.clearCart();
      }

    const submitOrderHandler =  (userData) => {
        setIsSubmitting(true)
        const order = {user: userData, orderedItems: cartCtx.items}
        addDataHandler(order)
        // cartCtx.clearCart();
    }

    const cartItems = (
    <ul className= {classes['cart-items']}>
        {cartCtx.items.map(
            (item) => (
            <CartItem 
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
            ))}
    </ul>);
    const modalActions= (<div className= {classes.actions}>
        <button className= {classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className= {classes.button} onClick={orderHandler}>Order</button>}
    </div>);

    const cartModalContent = (
        <>
        {cartItems}
            <div className= {classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler}onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </>
    )
    
    const isSubmittingModal = <p>Sending Order Data....</p>
    const didSubmitModal = (
        <>
        <p>Sent Successfully!</p>
        <div className= {classes.actions}>
            <button className= {classes.button} onClick={props.onClose}>Close</button>
        </div>
        </>
        )
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit &&cartModalContent}
            {isSubmitting && isSubmittingModal}
            {!isSubmitting && didSubmit && didSubmitModal}
        </Modal>
    );
}
export default Cart