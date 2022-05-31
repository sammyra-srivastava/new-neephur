import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import {
  AccountCircle,
  AppRegistration,
  Home,
  Login,
  MoreVert,
  Subscriptions,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const pages = [
  {
    name: "Catalogue",
    link: "/main/floristlist",
  },
  {
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    name: "Contact Us",
    link: "/main/contactUs",
  },
];

const guestUser = [
  {
    name: "Home",
    link: "/main/home",
    icon: <Home />,
  },
  {
    name: "Login",
    link: "/main/signin",
    icon: <Login />,
  },
  {
    name: "Signup",
    link: "/main/signup",
    icon: <AppRegistration />,
  },
  {
    name: "Cart",
    link: "/main/Cart",
    icon: <ShoppingCart />,
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElGuest, setAnchorElGuest] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, [user]);

  const navigate = useNavigate();

  const logout = () => {
    setAnchorElUser(null);
    sessionStorage.removeItem("user");
    navigate("/main/signin");
  };

  const userMenu = [
    {
      name: "Profile",
      icon: <AccountCircle />,
      link: "/profile",
    },
    {
      name: "Manage Vlogs",
      icon: <Subscriptions />,
      link: "/managevlog",
    },
    {
      name: "Logout",
      icon: <AccountCircle />,
      click: logout,
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#4e0263" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Neephur
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(({ name, link }) => (
                  <MenuItem key={name} onClick={(e) => navigate(link)}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              style={{ color: "white" }}
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Neephur
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, link }) => (
                <Button
                  key={name}
                  onClick={(e) => navigate(link)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {name}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {guestUser.map(({ name, link, icon }) => (
                <Tooltip title={name}>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(e) => navigate(link)}
                    sx={{ mr: 2 }}
                  >
                    {icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            {currentUser !== null && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenu.map(({ name, icon, link, click }) => (
                    <MenuItem
                      key={name}
                      onClick={link ? (e) => navigate(link) : click}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{name}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            <Box
              sx={{ flexGrow: 0, ml: 3, display: { xs: "flex", md: "none" } }}
            >
              <Tooltip title="User Options">
                <IconButton
                  onClick={(e) => setAnchorElGuest(e.currentTarget)}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElGuest}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElGuest)}
                onClose={(e) => setAnchorElGuest(null)}
              >
                {guestUser.map(({ name, icon, link }) => (
                  <MenuItem key={name} onClick={(e) => navigate(link)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Header;
