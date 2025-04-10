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
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { getUserDetails, logout } from "../../utils/apiFunctions";


const settings = ["Profil", "Gestion Compte", "Ajouter News", "Déconnexion"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const location = useLocation();
  React.useEffect(() => {
    getUserDetails()
      .then((result) => {
        setFirstname(result.firstname);
        setLastname(result.lastname);
        setEmail(result.email);
        setRole(result.role);
      })
      .catch((err) =>
        console.log(`Error while fetchinf the user data : ${err}`)
      );
  }, [firstname, lastname, email]);

  
  const allPages = [
    { id: 0, title: "Accueil", lien: "/espace-eilco" },
    {
      id: 1,
      title: "Emploi du temps",
      lien: "https://edt.univ-littoral.fr/direct/index.jsp?data=...",
    },
    {
      id: 2,
      title: "NextCloud",
      lien: "https://cloudeilco.univ-littoral.fr/index.php/login",
    },
    { id: 3, title: "Moodle", lien: "https://portail.eilco.fr:28/" },
    { id: 4, title: "TodoList", lien: "/espace-eilco/todos" },
    { id: 5, title: "Contacts", lien: "/espace-eilco/contacts" },
    { id: 6, title: "Stages", lien: "/espace-eilco/stages" },
    { id: 7, title: "Services", lien: "/espace-eilco/services" },
  ];

  // Ajouter une page si le rôle est ADMIN ou EDITEUR
  if (role === "ADMIN" || role === "EDITEUR") {
    const basePath = role === "ADMIN" ? "/espace-admin" : "/espace-editeur";
    allPages.push({
      id: 8,
      title: "Ajouter Contacts",
      lien: `${basePath}/add-contact`,
    });
  }

  const pages = allPages;
  const navigate = useNavigate();

  const handleUserMenuClick = async (setting) => {
    handleCloseUserMenu();

    const basePath =
      role === "ADMIN"
        ? "/espace-admin"
        : role === "EDITEUR"
        ? "/espace-editeur"
        : "/espace-eilco";

    if (setting === "Profil") {
      navigate(`${basePath}/profile`);
    } else if (setting === "Déconnexion") {
      const response = await logout();
      if (response) {
        navigate("/");
      } else {
        console.error("La déconnexion a échoué");
      }
    } else if (setting === "Gestion Compte") {
      navigate(`${basePath}/manage`);
    } else if (setting === "Ajouter News") {
      navigate(`${basePath}/news-admin`);
    }
  };

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

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (path) => {
    if (path.startsWith('http')) return false;
    
    // Si c'est la page d'accueil, vérifier exactement
    if (path === "/espace-eilco") {
      return location.pathname === path;
    }
    
    // Pour les autres pages, vérifier si le chemin correspond ou commence par le lien
    return location.pathname === path || 
           (location.pathname.startsWith(path) && path !== "/espace-eilco");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth={false} sx={{}} className="bg-eilco-blue shadow-none">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Menu pour petits écrans */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.id} 
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor: isActiveLink(page.lien) ? "rgba(96, 158, 165, 0.2)" : "transparent",
                  }}
                >
                  <Typography textAlign="center">
                    {page.lien.startsWith("http") ? (
                      <a
                        href={page.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.title}
                      </a>
                    ) : (
                      <RouterLink
                        to={page.lien}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.title}
                      </RouterLink>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo cliquable pour revenir à la page principale */}
          <Box
            component={RouterLink}
            to="/espace-eilco"
            sx={{
              height: { xs: "40px", md: "50px" },
              width: "auto",
              display: "block",
              margin: { xs: "0 auto", md: "0" },
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/EILCO-LOGO.png"
              alt="EILCO Logo"
              sx={{
                height: "100%",
                width: "auto",
              }}
            />
          </Box>

          {/* Liens de navigation pour grands écrans */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                component={page.lien.startsWith("http") ? "a" : RouterLink}
                {...(page.lien.startsWith("http")
                  ? {
                      href: page.lien,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : { to: page.lien })}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "20px",
                  backgroundColor: isActiveLink(page.lien) ? "rgba(96, 158, 165, 0.5)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(96, 158, 165, 0.69)",
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Paramètres utilisateur */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className="relative">
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid white",
                      boxShadow: 2,
                      fontSize: 16,
                      fontWeight: "bold",
                      bgcolor: "#374151",
                    }}
                  >
                    {firstname?.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
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
              {settings
                .filter((setting) => {
                  // Admin a accès à toutes les options
                  if (role === "ADMIN") return true;
                  // Éditeur a accès à tout sauf "Gestion Compte"
                  if (role === "EDITEUR") return setting !== "Gestion Compte";
                  // Autres utilisateurs n'ont pas accès à "Gestion Compte" ni à "Ajouter News"
                  return (setting !== "Gestion Compte" && setting !== "Ajouter News");
                })
                .map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleUserMenuClick(setting)}
                  >
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
