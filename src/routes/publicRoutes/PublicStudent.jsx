import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function PublicStudent({ children }) {
  const isUserLoggedIn = useAuth();

  return !isUserLoggedIn ? children : <Navigate to="/videos/1" />;
}
