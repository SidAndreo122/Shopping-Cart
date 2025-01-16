import { useContext, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../context/CartContext'
import { CreditCard, MoveLeft, ShoppingBag, UserPenIcon, X } from 'lucide-react';
import InputCounter from '../shop/InputCounter';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Cart() {
    const { cart, values, removeFromCart } = useContext(CartContext);
    const navigateTo = useNavigate();
    const [modal, setModal] = useState(false);

    // use reduce method to get a single constant subtotal value
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent it from submitting form element
        setModal(true);
    }

    const handleItemRemove = (item) => {
        removeFromCart(item);
    }

    const handleClose = () => {
        setModal(false);
    };

    const updateItemQuantity = (id, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        values.setCart(updatedCart);
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
                                <InputCounter value={item.quantity} setValue={(newQuantity) => updateItemQuantity(item.id, newQuantity)}/>
                                <p className={styles.item_price}>${item.price}</p>
                                <button className={styles.removeCart_Button} onClick={handleItemRemove}>
                                    <X strokeWidth={2} />
                                </button>
                            </li>
                        ))
                          
                    )}
                </ul>
            </div>
            <div className={styles.footer_container}>
                <button onClick={() => navigateTo('/shop')} className={styles.BackShop_Btn}>
                    {">"}
                    <MoveLeft size={25} color='black' strokeWidth={2} />
                    Back to Shop
                </button>
                <p> Subtotal: <span>$ {subtotal}</span></p>
            </div>
            <form className={styles.checkout_container} onSubmit={handleSubmit}>
                <div className={styles.form_child_container}>
                    <h2> Personal Info <UserPenIcon /></h2>
                    <label htmlFor='FirstName'>
                        First Name
                    </label>
                    <input type="text" id='FirstName' required />
                    <label htmlFor='LastName'>
                        Last Name
                    </label>
                    <input type='text' id='LastName' required />
                    <label htmlFor='email'>
                        Email Address
                    </label>
                    <input type='email' id='email' required />
                    <label htmlFor='phoneNumber'>
                        Phone Number
                    </label>
                    <input type='phone' id='phoneNumber' required />
                    <label htmlFor='address'>
                        Shipping Address
                    </label>
                    <input type='text' id="address" required />
                    <h2> Card Details <CreditCard /></h2>
                    <label htmlFor='CardName'>
                        Name of Card
                    </label>
                    <input type='text' id='CardName' required />
                    <label htmlFor='cardNumber'>
                        Card Number
                    </label>
                    <input type='number' id="cardNumber" required />
                    <label htmlFor='ExpireDate'>
                        Valid Thru
                    </label>
                    <div className={styles.ExpireDate}>
                        <input type='number' placeholder='MM' required />
                        <span>/</span>
                        <input type='number' placeholder='DD' required />
                        <span>/</span>
                        <input type='number' maxLength={3} placeholder='YYYY' required />
                    </div>
                    <label htmlFor='cvv'>
                        CVV 
                    </label>
                    <input type='number' id="cvv" required />
                    
                </div>
                <button id='checkout_button'>Checkout</button>

            </form>
            <Modal isOpen={modal} OnClose={handleClose}>
                    {/* If block*/}
                    {cart.length !== 0 ? (
                        <>
                            <h2>Thank you for your purchase!</h2>
                            <p>Your order has been successfully placed.</p>
                        </>
                    // Else Block
                    ) : (
                        <>
                            <h2>Your cart is currently empty.</h2>
                            <p>Add some items to your cart and come back to checkout.</p>
                        </>
                    )}
            </Modal>
        </div>
        
    )
}

export default Cart;