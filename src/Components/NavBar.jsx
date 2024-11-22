import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const renderAuthenticatedMenu = () => {
    if (!user) return null;

    switch (user.role?.toLowerCase()) {
      case 'artist':
        return (
          <>
            <Button
              component={RouterLink}
              to="/artist-dashboard"
              startIcon={<DashboardIcon />}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Artist Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/my-artworks"
              startIcon={<ArtTrackIcon />}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              My Artworks
            </Button>
          </>
        );
      case 'admin':
        return (
          <>
            <Button
              component={RouterLink}
              to="/admin-dashboard"
              startIcon={<DashboardIcon />}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Admin Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/manage-users"
              startIcon={<ManageAccountsIcon />}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Manage Users
            </Button>
          </>
        );
      default:
        console.warn('Unknown user role:', user.role);
        return null;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#34495e' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
        >
          Home
        </Button>
        
        {user ? (
          <>
            {renderAuthenticatedMenu()}
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
