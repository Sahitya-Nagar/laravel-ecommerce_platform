import { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuth';
import { Navigate } from 'react-router-dom';

export const AdminRequireAuth = ({ children }) => {
  const { user } = useContext(AdminAuthContext);

  // Redirect if no admin is logged in
  return user ? children : <Navigate to="/admin/login" replace />;
};
