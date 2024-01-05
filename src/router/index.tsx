import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import { routes } from './routes';
import ProtectedRoute from '../configs/ProtectedRoute';

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element:
      route.layout === 'blank' ? (
        <BlankLayout>{route.element}</BlankLayout>
      ) : (
        <ProtectedRoute>
          <DefaultLayout>{route.element}</DefaultLayout>
        </ProtectedRoute>
      ),
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
