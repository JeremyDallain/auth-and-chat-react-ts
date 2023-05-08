import { auth } from '../config/firebase';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

export const PrivateRoutes = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet  />
}
