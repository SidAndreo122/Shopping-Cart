import App from '../../App.jsx';
import Checkout from '../cart/Checkout.jsx';
import Shop from '../shop/Shop';

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'shop/:name?',
        element: <Shop />,
    },
    {
        path: 'checkout',
        element: <Checkout/>,
    }
];

export default routes;