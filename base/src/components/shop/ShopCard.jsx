import styles from './ShopCard.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CircleCheckBig, CirclePlus, Star } from 'lucide-react';
import InputCounter from './InputCounter';

function ProductCard(props) {
    const handleAddBtn = () => {
        const product = {
            id: props.id,
            title: props.title,
            image: props.image,
            qty: value,
            price: props.price,
        };
        
    };
    return (
        <div className={styles.product_card_container}>
            <img src={props.image} alt={props.title}/>
            {/*Button for reading product description, or link to a product page */}
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
                    <InputCounter value={value} setValue={setValue} />
                    <button className={} onClick={handleAddBtn}>
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