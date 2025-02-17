import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state for demonstration
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFD1DC' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { md: 'none' } }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <IconButton href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          <FavoriteIcon sx={{ color: '#C71585' }} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: 1, px: 1, width: { xs: '150px', sm: '200px', md: '300px' } }}>
          <SearchIcon sx={{ color: '#C71585' }} />
          <InputBase placeholder="Search..." sx={{ ml: 1, flex: 1 }} />
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#C71585', color: '#fff', ml: 2 }}
          onClick={handleAuthClick}
        >
          {isLoggedIn ? 'Dashboard' : 'Sign In'}
        </Button>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <IconButton href="/" color="inherit" sx={{ m: 2 }}>
            <FavoriteIcon sx={{ color: '#C71585' }} />
          </IconButton>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

