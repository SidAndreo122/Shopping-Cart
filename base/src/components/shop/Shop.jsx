import styles from './Shop.module.css'
import CartButton from '../cart/CartButton';
import NavBar from '../navbar/nav';
import ProductCard from './ShopCard';
import Cart from '../cart/CartPage';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { LoaderCircle } from 'lucide-react';

const API_URL = 'https://fakestoreapi.com/products';

function Shop() {
    const [initalProducts, setInitialProducts] = useState([]);
    const [products, setProducts] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');
    const cart = useContext(CartContext);

    const { name } = useParams();
    const navigateTo = useNavigate();

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

    // creating a unique collection (using set) of categories that can be used later
    const uniqueCategories = Array.from(
        new Set(initalProducts.map((product) => product.category.toLowerCase()))
    ).map(
        (category) => category.charAt(0).toUpperCase() + category.slice(1)
    );

    return (
        <div>
            
            {!name ? ( // if block
                <>
                <NavBar />
                {/* Making the cartbutton direct user to cart page*/}
                <div className={styles.cart_container}> 
                    <CartButton onClick={() => name !== 'cart' && navigateTo('cart')}
                    counter={cart.counter}
                    />
                </div>
                <aside className={styles.category_aside}>
                    <p>Category</p>
                    <ul>
                        {uniqueCategories.map((category, index) => (
                            <li key={index}>
                                <button onClick={handleCategory} className={activeCategory === category ? styles.activeCategory : ""}>
                                    
                                        {category}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={handleCategory} className={styles.allProducts_container}>
                                
                                    Show all products
                            </button>
                        </li>
                    </ul>
                </aside>
                <ul className={styles.listCards_container}>
                    {products ? (
                        products.map((product) => (
                            <li key={product.id}>
                                <ProductCard 
                                id = {product.id}
                                title = {product.title}
                                description = {product.description}
                                image = {product.image}
                                price = {product.price}
                                rating = {product.rating}
                                />
                            </li>
                        ))
                    // else block
                    ) : (
                        <LoaderCircle size={43} color='#393432' strokeWidth={2} />
                    )}
                </ul>
            </> 
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