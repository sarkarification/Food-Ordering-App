import React, { useState } from 'react' 
import Cart from './components/Cart/Cart';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

const App =() => {
  const [showCart, setshowCart]= useState(false);

  const showCartHandler = () => {
    setshowCart(true)
  }

  const hideCartHandler = () => {
    setshowCart(false)
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <Header 
        onShowCart={showCartHandler}
        />
      <main>
        <Meals />
        
      </main>
    </CartProvider>
  );
}

export default App;
