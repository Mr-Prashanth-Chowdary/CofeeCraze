import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Auth  from '../contextAPI/Auth'; // Import your Auth context

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Auth);

  if (isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
