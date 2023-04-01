import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function PublicAdmin({ children }) {
  const isUserLoggedIn = useAuth();

  return !isUserLoggedIn ? children : <Navigate to="/admin" />;
}
