import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
