import { useContext} from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../context/CartContext'
import { MoveLeft, ShoppingBag, Trash2} from 'lucide-react';
import InputCounter from '../shop/InputCounter';
import { useNavigate } from 'react-router-dom';


function Cart() {
    const { cart, setCart, removeFromCart } = useContext(CartContext);
    const navigateTo = useNavigate();
    

    // use reduce method to get a single constant subtotal value
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    

    const handleItemRemove = (item) => {
        removeFromCart(item);
    };

    const updateItemQuantity = (id, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.cart_name}>
                <header>
                    <ShoppingBag size={28} color='#333333' strokeWidth={2} />
                    <h1>Your Shopping Cart</h1>
                </header>
            </div>
            <div className={styles.cart_items_container}>
                <ul>
                    {/* If Block*/}
                    {cart.length === 0 ? (
                        <p className={styles.emptyCart}>Your Cart is Empty</p>
                    // Else Block
                    ) : (
                        // map function iterates each item to a li element
                        cart.map((item) => (
                            <li key={item.id}>
                                <div className={styles.srcimg_container}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <p className={styles.item_title}>{item.title}</p>
                                <div className={styles.item_counter}>
                                <InputCounter
                                    value={item.quantity}
                                    setValue={(newQuantity) => updateItemQuantity(item.id, newQuantity)}
                                />
                                </div>
                                <p className={styles.item_price}>${item.price}</p>
                                <button
                                    className={styles.removeCart_Button}
                                    onClick={() => handleItemRemove(item)}
                                >
                                    <Trash2 color='red' strokeWidth={2} />
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className={styles.footer_container}>
                <button onClick={() => navigateTo('/shop')} className={styles.BackShop_Btn}>
                    <MoveLeft size={25} color='black' strokeWidth={2} />
                    Back to Shop
                </button>
                <p>Subtotal: <span>$ {subtotal.toFixed(2)}</span></p>
                
            </div>
            <div className={styles.cart_end_container}>
            <button className={styles.checkout_button} onClick={() => navigateTo('/checkout')}>
                    Confirm & Pay
                </button> 
            </div>
            
        </div>
    );
}

export default Cart;
