import React from "react";
import News from "../components/News/News";
import { Container, Box, Typography } from "@mui/material";
import Weather from "../components/weather/Weather";

function Main() {
  const mockNews = [
    {
      id: 1,
      title: "Conférence annuelle sur l'innovation",
      content:
        "Rejoignez-nous pour une journée dédiée à l'innovation et aux nouvelles technologies, avec des intervenants renommés du domaine.",
      fullContent:
        "Rejoignez-nous pour une journée inoubliable dédiée à l'innovation ...",
      category: "Événements",
      imageUrl:
        "https://eilco.univ-littoral.fr/wp-content/uploads/2022/01/EILCO-longuenesse1-1024x685.jpg",
      publishedAt: "2025-01-13T10:00:00",
      expiryDate: "2025-02-01T10:00:00",
    },
    {
      id: 2,
      title: "Portes ouvertes pour les nouveaux étudiants",
      content:
        "Découvrez notre campus, rencontrez nos professeurs et apprenez-en plus sur nos programmes de formation.",
      fullContent:
        "Lors de nos journées portes ouvertes, plongez dans l'univers unique ...",
      category: "Éducation",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_13C0-wPpCPOr_WrQ8xfCx8iE4ZTW3rIwg&s",
      publishedAt: "2025-01-10T09:00:00",
      expiryDate: "2025-01-31T18:00:00",
    },
    {
      id: 3,
      title: "Nouveau partenariat avec une entreprise tech",
      content:
        "Nous sommes fiers d'annoncer notre partenariat avec TechCorp ...",
      fullContent:
        "Nous sommes ravis de partager cette grande nouvelle : un partenariat ...",
      category: "Partenariats",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFGdLpSaXSkP2ZEP71RaRwZPreJSmd8O_6rQ&s",
      publishedAt: "2025-01-05T08:00:00",
      expiryDate: "2025-01-25T23:59:00",
    },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "30% 70%" },
          gap: 5,
        }}>
        {/* Section Météo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}>
          <Weather />
        </Box>

        {/* Section Actualités */}
        <Box
          sx={{
            backgroundColor: "lightgray",
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}>
          <Typography variant="h6" gutterBottom>
            Actualités
          </Typography>
          <News newsList={mockNews} />
        </Box>
      </Box>
    </Container>
  );
}

export default Main;
