import styles from './Shop.module.css'
import CartButton from './CartButton';
import NavBar from '../navbar/nav';
import ProductCard from './ShopCard';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { LoaderCircle } from 'lucide-react';

const API_URL = 'https://fakestoreapi.com/products';

function Shop() {
    const [initalProducts, setInitialProducts] = useState([]);
    const [products, setProducts] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');
    const cart = useContext(CartContext);

    const { name } = useParams();
    useEffect(() => {
        fetch(API_URL, {mode: 'cors'})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((data) => {
            setInitialProducts(data);
            setProducts(data);
        })
    }, []);

    const handleCategory = (event) => {
        const categoryselector = event.target.textContent;
        setActiveCategory(categoryselector);

        if (categoryselector === 'Show all products') {
            setProducts(initalProducts);
            return;
        }

        // Create category filter functionality with JS Array filter function
        const categoryfilter = initalProducts.filter((product) => {
            console.log(product.category);
            return product.category === categoryselector.toLowerCase() && product;
        });

        setProducts(categoryfilter);
    };

    return (
        <div>
            
            {!name ? ( // if block
                <>
                <NavBar />
                <div className={styles.cart_container}>
                    <CartButton onClick={() => name !== 'cart'}
                    counter={cart.counter}
                    />
                </div>
                </>
            // else block
            ) : (
                <LoaderCircle size={43} color='#393432' strokeWidth={2}
            )}
            // if block
            ) : name === "cart" ? (
                <Cart />

            // else block    
            ) : (
                <>
                    <NavBar/>
                    <div>
                        <h1>Page Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
                    </div>
                </>
            )}
            
        </div>
    )
}

export default Shop;