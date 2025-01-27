import { ShoppingBasket } from "lucide-react";
import styles from "./nav.module.css";
import { Link } from 'react-router-dom';

// Navbar Component
function NavBar() {
    return (
        <div className={styles.nav_container}>
            <Link to="/">
                <h1 className={styles.logo_title}>
                    <ShoppingBasket size={35}/> Retailio
                </h1>
            </Link> 
            <ul className={styles.links_container}>
                <li>
                    <Link to="/" className={styles.nav_link}>Home</Link>
                </li>
                <li>
                    <Link to="/shop" className={styles.nav_link}>Shop</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;