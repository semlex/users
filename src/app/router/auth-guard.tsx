import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib';

interface AuthGuardProps {
  children: ReactElement;
}

function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useAppSelector((state) => state.user.id);

  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export default AuthGuard;
