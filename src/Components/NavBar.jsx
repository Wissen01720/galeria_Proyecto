import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}>
      <Toolbar>
        <RouterLink to="/" style={{ textDecoration: 'none', color: '#f1c40f' }}>
          <MotionTypography
            variant="h6"
            component="div"
            whileHover={{ scale: 1.1 }}
            sx={{ flexGrow: 1 }}
          >
            Virtual Gallery
          </MotionTypography>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          component={RouterLink}
          to="/"
          sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
        >
          Home
        </Button>
        {!user ? (
          <>
            <Button
              component={RouterLink}
              to="/login"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            {user.role === 'artist' && (
              <Button
                component={RouterLink}
                to="/artist-dashboard"
                sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
              >
                My Dashboard
              </Button>
            )}
            {user.role === 'admin' && (
              <Button
                component={RouterLink}
                to="/admin-dashboard"
                sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
              >
                Admin Panel
              </Button>
            )}
            <Button
              onClick={logout}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#f1c40f' } }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
