import styles from "./nav.module.css";
import { Link } from 'react-router-dom';

// Navbar Component
function NavBar() {
    return (
        <div className={styles.nav_container}>
            <Link to="/">
                <h1 className={styles.logo_title}>
                    Stop n`&apos` Shop
                </h1>
            </Link> 
            <ul className={styles.links_container}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;