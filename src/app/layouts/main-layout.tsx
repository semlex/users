import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib';
import { removeUser } from '@/entities/user';
import { AccountBox, Logout } from '@mui/icons-material';
import { getAuth, signOut } from 'firebase/auth';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
    });
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">USERS</Typography>
          </Link>
          <Box>
            <Link to="/user">
              <IconButton>
                <AccountBox />
              </IconButton>
            </Link>
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ mt: '80px' }}>
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default MainLayout;
