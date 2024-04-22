import { Stack } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Stack>
  );
};

export default AuthLayout;
