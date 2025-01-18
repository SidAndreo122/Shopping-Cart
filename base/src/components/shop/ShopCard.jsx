import styles from './ShopCard.module.css';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CircleCheckBig, CirclePlus, Star } from 'lucide-react';
import InputCounter from './InputCounter';
import { CartContext } from '../context/CartContext';

function ProductCard(props) {
    const [ value, setValue ] = useState(1);
    const { cart, addToCart } = useContext(CartContext);

    const isAdded = cart.some((item) => item.id === props.id);

    const handleAddBtn = () => {
        const product = {
            id: props.id,
            title: props.title,
            image: props.image,
            quantity: value,
            price: props.price,
        };
        addToCart(product)
    };

    // const handleItemRemove = (item) => {
    //     removeFromCart(item);
    // };

    return (
        <div className={styles.product_card_container}>
            <img src={props.image} alt={props.title}/>
            {/*Button for reading product description, or link to a product page */}
            <div className={styles.product_title}>
                <p>{props.title}</p>
            </div>
            <div className={styles.product_stats}>
                <div>
                    <p className={styles.product_price}>$ {props.price}</p>
                    <div className={styles.product_rating}>
                        <p className={styles.product_stars}>
                            {props.rating.rate}{' '}
                            <Star size={18} strokewidth={2} color='black'/>
                        </p>
                        <p>{props.rating.count} ratings</p>
                    </div>
                </div>
                <div>
                    {/*Increment decrement react component button */}
                    <div className={styles.updowncounter}>
                    <InputCounter value={value} setValue={setValue} />
                    </div>
                    <button className={isAdded ? styles.addedtoCartBtn : styles.addtoCartBtn} onClick={handleAddBtn } disabled={isAdded}>
                        {isAdded ? (
                            <>
                                <CircleCheckBig size={18} strokewidth={2}/>
                                Added to Cart
                            </>
                        ): (
                            <>
                                <CirclePlus size={18} strokewidth={2}/>
                                Add to Cart
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

ProductCard.PropTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.object.isRequired,
};

export default ProductCard;