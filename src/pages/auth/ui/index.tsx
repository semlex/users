import { useAppSelector } from '@/shared/lib';
import { Auth } from '@/widgets/auth';
import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
  const isAuthorized = useAppSelector((state) => state.user.id);

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <Container maxWidth="xs">
      <Auth />
    </Container>
  );
};

export default AuthPage;
