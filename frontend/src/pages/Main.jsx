import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import Weather from "../components/weather/Weather";
import NewsList from "../components/News/NewsList";
import { getNews } from "../utils/apiFunctions";
import NewsAdmin from "../components/News/NewsAdmin";

function Main() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const news = await getNews();
      setNewsList(news);
    } catch (error) {
      console.error("Erreur lors du chargement des news", error);
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
      
      {/* <NewsAdmin /> */}

    </Container>
  );
}

export default Main;
