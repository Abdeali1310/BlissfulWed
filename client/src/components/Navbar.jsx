/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Search, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElPopular, setAnchorElPopular] = useState(null);
  const [anchorElGallery, setAnchorElGallery] = useState(null);
  const [anchorElPackage, setAnchorElPackage] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenServices = (event) => setAnchorElServices(event.currentTarget);
  const handleCloseServices = () => setAnchorElServices(null);

  const handleOpenPopular = (event) => setAnchorElPopular(event.currentTarget);
  const handleClosePopular = () => setAnchorElPopular(null);

  const handleOpenGallery = (event) => setAnchorElGallery(event.currentTarget);
  const handleCloseGallery = () => setAnchorElGallery(null);

  const handleOpenPackage = (event) => setAnchorElPackage(event.currentTarget);
  const handleClosePackage = () => setAnchorElPackage(null);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#E73895", color: "white", }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BlissfulWed
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <SearchBar>
            <InputBase
              placeholder="Search…"
              sx={{ ml: 1, flex: 1, width: { xs: "250px", md: "500px" } }}
            />
            <Search sx={{ color: "white" }} />
          </SearchBar>
        </Box>

        <Box sx={{ mx: 2, cursor: "pointer" }} onMouseEnter={handleOpenPackage}>
          <Typography>Packages</Typography>
        </Box>
        <Menu
          anchorEl={anchorElPackage}
          open={Boolean(anchorElPackage)}
          onClose={handleClosePackage}
        >
          {["Basic", "Premium", "Luxury"].map((item) => (
            <MenuItem key={item} onClick={handleClosePackage}>
              <Link to={`/package/${item.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                {item}
              </Link>
            </MenuItem>
          ))}
        </Menu>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link to="/services" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography aria-haspopup="true" onMouseEnter={handleOpenServices} sx={{ mx: 2, cursor: "pointer" }}>
              Services
            </Typography>
          </Link>
          <Menu anchorEl={anchorElServices} open={Boolean(anchorElServices)} onClose={handleCloseServices}>
            {[
              "Haldi",
              "Mehndi",
              "Catering",
              "Decoration",
              "Music & DJ",
              "Bridal Makeup",
              "Photography",
            ].map((item) => (
              <MenuItem key={item} onClick={handleCloseServices}>
                <Link to={`/services/${item.toLowerCase().replace(/\s+/g, "-")}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {item}
                </Link>
              </MenuItem>
            ))}
          </Menu>

          <Link to="/popular" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography aria-haspopup="true" onMouseEnter={handleOpenPopular} sx={{ mx: 2, cursor: "pointer" }}>
              Popular
            </Typography>
          </Link>
          <Menu anchorEl={anchorElPopular} open={Boolean(anchorElPopular)} onClose={handleClosePopular}>
            {["Catering", "Music & Dance", "Bridal Makeup", "Photography"].map((item) => (
              <MenuItem key={item} onClick={handleClosePopular}>
                <Link to={`/popular/${item.toLowerCase().replace(/\s+/g, "-")}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {item}
                </Link>
              </MenuItem>
            ))}
          </Menu>

          <Link to="/gallery" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography aria-haspopup="true" onMouseEnter={handleOpenGallery} sx={{ mx: 2, cursor: "pointer" }}>
              Gallery
            </Typography>
          </Link>
          <Menu anchorEl={anchorElGallery} open={Boolean(anchorElGallery)} onClose={handleCloseGallery}>
            <MenuItem onClick={handleCloseGallery}>
              <Link to="/gallery/album" style={{ textDecoration: "none", color: "inherit" }}>
                Album
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        <IconButton color="inherit" sx={{ display: { xs: "block", md: "block" } }}>
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {["Home", "Services", "Popular", "Gallery", "Packages"].map((text) => (
              <ListItem button key={text} onClick={toggleDrawer}>
                <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {text}
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <Typography variant="h6">Services</Typography>
            </ListItem>
            {[
              "Haldi",
              "Mehndi",
              "Catering",
              "Decoration",
              "Music & DJ",
              "Bridal Makeup",
              "Photography",
            ].map((service) => (
              <ListItem button key={service} onClick={toggleDrawer}>
                <Link to={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {service}
                </Link>
              </ListItem>
            ))}
          </List>
          <hr />
          <List>
            <ListItem button onClick={toggleDrawer}>
              <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                Profile
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

const SearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: "4px 8px",
  borderRadius: "8px",
  width: "50%", // Default width

  // Responsive breakpoints
  [theme.breakpoints.down("md")]: {
    width: "80%", // Medium screens
  },
  [theme.breakpoints.down("sm")]: {
    width: "50%", // Small screens (mobile)
  },
  [theme.breakpoints.down("xs")]: {
    width: "50%", // Extra small screens
  },
}));

export default Navbar;
