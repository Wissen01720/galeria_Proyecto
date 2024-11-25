import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderAuthenticatedMenu = () => {
    if (!user) return null;

    switch (user.role?.toLowerCase()) {
      case 'artist':
        return (
          <>
            <IconButton
              component={RouterLink}
              to="/artist-dashboard"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/my-artworks"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              <ArtTrackIcon />
            </IconButton>
          </>
        );
      case 'admin':
        return (
          <>
            <IconButton
              component={RouterLink}
              to="/admin-dashboard"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/manage-users"
              sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
            >
              <ManageAccountsIcon />
            </IconButton>
          </>
        );
      default:
        console.warn('Unknown user role:', user.role);
        return null;
    }
  };

  const renderMenuItems = () => (
    <List>
      <ListItem button component={RouterLink} to="/">
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {user ? (
        <>
          {user.role?.toLowerCase() === 'artist' && (
            <>
              <ListItem button component={RouterLink} to="/artist-dashboard">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Artist Dashboard" />
              </ListItem>
              <ListItem button component={RouterLink} to="/my-artworks">
                <ListItemIcon><ArtTrackIcon /></ListItemIcon>
                <ListItemText primary="My Artworks" />
              </ListItem>
            </>
          )}
          {user.role?.toLowerCase() === 'admin' && (
            <>
              <ListItem button component={RouterLink} to="/admin-dashboard">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
              <ListItem button component={RouterLink} to="/manage-users">
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
            </>
          )}
          <ListItem button onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={RouterLink} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#34495e' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <IconButton
            component={RouterLink}
            to="/"
            sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
          >
            <HomeIcon />
          </IconButton>
          {user ? (
            <>
              {renderAuthenticatedMenu()}
              <IconButton
                onClick={logout}
                sx={{ color: '#ecf0f1', '&:hover': { color: '#c0392b' } }}
              >
                <LogoutIcon />
              </IconButton>
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
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderMenuItems()}
      </Drawer>
    </>
  );
};

export default Navbar;