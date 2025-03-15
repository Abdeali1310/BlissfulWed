/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import { Search, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../templates/SearchBox";

const Navbar = () => {
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElPopular, setAnchorElPopular] = useState(null);
  const [anchorElGallery, setAnchorElGallery] = useState(null);
  const [anchorElPackage, setAnchorElPackage] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const handleOpenServices = (event) =>
    setAnchorElServices(event.currentTarget);
  const handleCloseServices = () => setAnchorElServices(null);

  const handleOpenPopular = (event) => setAnchorElPopular(event.currentTarget);
  const handleClosePopular = () => setAnchorElPopular(null);

  const handleOpenGallery = (event) => setAnchorElGallery(event.currentTarget);
  const handleCloseGallery = () => setAnchorElGallery(null);

  const handleOpenPackage = (event) => setAnchorElPackage(event.currentTarget);
  const handleClosePackage = () => setAnchorElPackage(null);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const currentUser = async () => {
    const curr_userId = localStorage.getItem("user");

    if (curr_userId) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user",
          { curr_userId },
          {
            withCredentials: true, // Ensure cookies are sent (if using sessions)
          }
        );

        setUserProfilePic(response.data.user.profilePicUrl);
        setUserName(response.data.user.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#E73895", color: "white" }}
    >
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
          <Link to={"/"}>BlissfulWed</Link>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBox />
        </Box>

        

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link
            to="/services"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              aria-haspopup="true"
              onMouseEnter={handleOpenServices}
              sx={{ mx: 2, cursor: "pointer" }}
            >
              Services
            </Typography>
          </Link>
          <Menu
            anchorEl={anchorElServices}
            open={Boolean(anchorElServices)}
            onClose={handleCloseServices}
          >
            {[
              "Haldi",
              "Mehndi",
              "Catering",
              "Decoration",
              "Music & DJ",
              "Bridal Makeup",
              "Groom Wear",
              "Photography",
            ].map((item) => (
              <MenuItem key={item} onClick={handleCloseServices}>
                <Link
                  to={`/service/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item}
                </Link>
              </MenuItem>
            ))}
          </Menu>

          <Link
            to="/popular"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              aria-haspopup="true"
              onMouseEnter={handleOpenPopular}
              sx={{ mx: 2, cursor: "pointer" }}
            >
              Popular
            </Typography>
          </Link>
          <Menu
            anchorEl={anchorElPopular}
            open={Boolean(anchorElPopular)}
            onClose={handleClosePopular}
          >
            {["Catering", "Music & Dance", "Bridal Makeup", "Photography"].map(
              (item) => (
                <MenuItem key={item} onClick={handleClosePopular}>
                  <Link
                    to={`/popular/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item}
                  </Link>
                </MenuItem>
              )
            )}
          </Menu>

          <Link
            to="/gallery"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              aria-haspopup="true"
              onMouseEnter={handleOpenGallery}
              sx={{ mx: 2, cursor: "pointer" }}
            >
              Gallery
            </Typography>
          </Link>
          <Menu
            anchorEl={anchorElGallery}
            open={Boolean(anchorElGallery)}
            onClose={handleCloseGallery}
          >
            <MenuItem onClick={handleCloseGallery}>
              <Link
                to="/gallery/album/wedding"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Wedding
              </Link>
            </MenuItem>

            <MenuItem onClick={handleCloseGallery}>
              <Link
                to="/gallery/album/engagement"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Engagement
              </Link>
            </MenuItem>

            <MenuItem onClick={handleCloseGallery}>
              <Link
                to="/gallery/album/reception"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Reception
              </Link>
            </MenuItem>

            <MenuItem onClick={handleCloseGallery}>
              <Link
                to="/gallery/album/pre-wedding"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Pre Wedding
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          {userProfilePic ? (
            <Tooltip title="User Profile" arrow>
              <IconButton color="inherit">
                <Link to="/user/profile">
                  <Avatar
                    src={userProfilePic}
                    alt="Profile"
                    sx={{ width: 40, height: 40 }}
                  />
                </Link>
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              component={Link}
              to="/user/signin"
              variant="contained"
              sx={{
                backgroundColor: "#fd5da8",
                color: "white",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": { backgroundColor: "#ff69b4" },
              }}
            >
              Login
            </Button>
          )}

          {userName && (
            <Typography
              variant="caption"
              sx={{
                color: "white",
                mt: 0.5, // Adds spacing below the button/avatar
                textAlign: "center",
              }}
            >
              {userName}
            </Typography>
          )}
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {["Home"].map((text) => (
              <ListItem button key={text} onClick={toggleDrawer}>
                <Link
                  to={`/`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {text}
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />

          {/* Services Section */}
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
              "Groom Wear"
            ].map((service) => (
              <ListItem button key={service} onClick={toggleDrawer}>
                <Link
                  to={`/service/${service.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {service}
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />

          
          <Divider />

          {/* Albums Section */}
          <List>
            <ListItem>
              <Typography variant="h6">Albums</Typography>
            </ListItem>
            {["Wedding", "Engagement", "Reception", "Pre-Wedding"].map(
              (album) => (
                <ListItem button key={album} onClick={toggleDrawer}>
                  <Link
                    to={`/gallery/album/${album.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {album}
                  </Link>
                </ListItem>
              )
            )}
          </List>
          <Divider />

          {/* Profile/Login Section */}
          <List>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              {userProfilePic ? (
                <>
                  <Tooltip title="User Profile" arrow>
                    <IconButton color="inherit" onClick={toggleDrawer}>
                      <Link to="/user/profile">
                        <Avatar
                          src={userProfilePic}
                          alt="Profile"
                          sx={{ width: 40, height: 40 }}
                        />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  {userName && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "black",
                        mt: 0.5,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {userName}
                    </Typography>
                  )}
                </>
              ) : (
                <Button
                  component={Link}
                  to="/user/signin"
                  variant="contained"
                  sx={{
                    backgroundColor: "#fd5da8",
                    color: "white",
                    textTransform: "none",
                    fontSize: "14px",
                    "&:hover": { backgroundColor: "#ff69b4" },
                  }}
                  onClick={toggleDrawer}
                >
                  Login
                </Button>
              )}
            </Box>
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