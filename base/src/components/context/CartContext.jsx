import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const CartContext = createContext();

// Context custom provider function
export function CartProvider({ children }) {
    // Building data states for cart
    const [cart, setCart] = useState([]);
    const [counter, setCounter] = useState(0);
    // const [values, setValues] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]); // ... is the spread operator that takes the new variable and allows all props to be applied
        // setValues((prevValues) => [
        //     ...prevValues, {id: item.id, quantity: item.quantity },
        // ]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const removeFromCart = (item) => {
        const newCart = cart.filter((product) => product.id !== item.id);
        // const newValues = values.filter((value) => value.id !== item.id);
        setCart(newCart);
        // setValues(newValues)
        setCounter(newCart.length);
    };

    return (
        // Essentially making props for a custom "function" that will be used later
        <CartContext.Provider value={{ cart, setCart, addToCart, counter, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
}

CartProvider.PropTypes = {
    children : PropTypes.node.isRequired,
}