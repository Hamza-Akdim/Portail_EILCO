import * as React from "react";
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
import { Link } from "@mui/material";

const pages = [{ id: 1, title: "Emploi du temps", lien: "https://edt.univ-littoral.fr/direct/index.jsp?data=6b052c86649c89d6314052e0c2e2410df63f1816a4b0a6ae41893446ff37497ec55ef35a53135e002df1531698f94af0a3ec2aaf9a1c38d06b44c36d8361b35011a10a238b0a823699328a9323a95a07c004deba0e9910a95c5e72a718a33d6e", },
 { id: 2, title: "NextCloud", lien: "https://cloudeilco.univ-littoral.fr/index.php/login", }, 
 { id: 3, title: "Moodle", lien: "https://portail.eilco.fr:28/", }];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between", 
            alignItems: "center", 
          }}>
          {/* Menu icon for smaller screens */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
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
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={page.lien} target="_blank" rel="noopener noreferrer">
                      {page.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box
            component="img"
            src="EILCO-LOGO.png"
            alt="EILCO Logo"
            sx={{
              height: { xs: "40px", md: "50px" }, 
              width: "auto",
              display: "block",
              margin: { xs: "0 auto", md: "0" }, 
            }}
          />

          {/* Navigation links for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button style={{marginLeft:"20px"}}
                key={page.id} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, 
                  color: "white", 
                  display: "block",
                  "&:hover": {
                backgroundColor: "rgba(96, 158, 165, 0.69)",
              }, }}>
                  
                  <Link href={page.lien}></Link>
                {page.title}
              </Button>
            ))}
          </Box>

          {/* User settings */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
