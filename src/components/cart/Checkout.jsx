import styles from './Cart.module.css'
import Modal from './Modal';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'
import { UserPenIcon, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const [modal, setModal] = useState(false);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setModal(true);
};

return (
    <>
     <div className={styles.checkout_wrapper}>
                
    <div className={styles.checkout_layout}>
    <button
                    className={styles.go_back_button}
                    onClick={() => navigate('/shop/cart')}
                >
                    ← Go Back to Cart
                </button>
    <form className={styles.checkout_container} onSubmit={handleSubmit}>
    <div className={styles.form_child_container1}>
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
    </div>
    <div className={styles.form_child_container2}>    
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
                <input type='number' maxLength={3} placeholder='YYYY' required />
        </div>
        <label htmlFor='cvv'>
            CVV 
        </label>
        <input type='number' id="cvv" required />
    
    </div>
<div className={styles.buy_button_div}>
<button className={styles.complete_checkout_button}>Checkout</button>
</div>


</form>
    </div>
    
<aside className={styles.cart_summary}>
    <h3>Order Summary</h3>
    <ul>
        {cart.map((item, index) => (
            <li key={index} className={styles.cart_item}>
                <span>{item.title}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
        ))}
    </ul>
    <li>
        <span>Tax:</span>
        <span>$0.00</span>
    </li>
    <li>
        <span>Shipping:</span>
        <span>$0.00</span>
    </li>
    <hr />
    <p className={styles.total_price}>
        Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
    </p>
</aside>
</div>
<Modal isOpen={modal} OnClose={() => setModal(false)}>
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
    </>
    
)
}

export default Checkout;