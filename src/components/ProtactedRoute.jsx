import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Auth  from '../contextAPI/Auth'; // Import your Auth context

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(Auth);

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
