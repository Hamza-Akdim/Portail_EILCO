import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import Weather from "../components/weather/Weather";
import NewsList from "../components/News/NewsList";
import { getNews, getUserDetails } from "../utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Main() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    loadNews();
    getUserDetails()
      .then((result) => {
        setRole(result.role);
        console.log(role);
      })
      .catch((err) =>
        console.log(`Erreur lors de la récupération des données utilisateur : ${err}`)
      );
  }, []);
  const handleNavigateToNewsAdmin = () => {
    if (role === "ADMIN") {
      navigate("/espace-admin/news-admin");
    } else if (role === "EDITEUR") {
      navigate("/espace-editeur/news-admin");
    }
  };
  const loadNews = async () => {
    try {
      const news = await getNews();
      setNewsList(news);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités", error);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "30% 70%" },
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <Weather />
        </Box>
        {newsList && newsList.length > 0 ? (
          <NewsList newsList={newsList} />
        ) : (
          <Typography variant="h6" align="center">
            Aucune actualité disponible
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        {(role === "ADMIN" || role === "EDITEUR") && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToNewsAdmin}
          >
            Accéder à l'administration des nouvelles
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Main;
