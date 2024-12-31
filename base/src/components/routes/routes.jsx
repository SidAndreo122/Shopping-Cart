import App from '../../App.jsx';
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
];

export default routes;