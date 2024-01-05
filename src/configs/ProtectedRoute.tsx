import auth from './auth';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }: any) => {
  const token = auth.getToken();

  if (token) {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      auth.removeToken();
      return <Navigate to={'/auth/admin/login'} replace />;
    }
  }

  if (!token) {
    return <Navigate to={'/auth/admin/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
