import Navbar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { Container, Box, Typography } from "@mui/material";
import News from "../components/News/News";
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import NewsAdmin from "../components/News/NewsAdmin";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/apiFunctions";
function AppLayout() {
  const [newsList, setNewsList] = useState();
  useEffect(() => {
    loadNews();
  }, [])
  const loadNews = async () => {
    const news = await getNews();
    setNewsList(news);
  }
  // const mockNews = [
  //   {
  //     id: 1,
  //     title: "Conférence annuelle sur l'innovation",
  //     content:
  //       "Rejoignez-nous pour une journée dédiée à l'innovation et aux nouvelles technologies, avec des intervenants renommés du domaine.",
  //     fullContent:
  //       "Rejoignez-nous pour une journée inoubliable dédiée à l'innovation et aux nouvelles technologies. Au programme : des conférences passionnantes animées par des experts renommés, des ateliers pratiques pour explorer les dernières avancées dans des domaines comme l'intelligence artificielle, la robotique et la réalité augmentée. Vous aurez également l'opportunité de participer à des tables rondes où seront débattues les grandes questions de demain, tout en réseautant avec des professionnels du secteur et des passionnés. Ne manquez pas cette occasion de vous inspirer, d'apprendre et de rencontrer les acteurs de l'innovation mondiale.",
  //     category: "Événements",
  //     imageUrl:
  //       "https://eilco.univ-littoral.fr/wp-content/uploads/2022/01/EILCO-longuenesse1-1024x685.jpg",
  //     publishedAt: "2025-01-13T10:00:00",
  //     expiryDate: "2025-02-01T10:00:00",
  //   },
  //   {
  //     id: 2,
  //     title: "Portes ouvertes pour les nouveaux étudiants",
  //     content:
  //       "Découvrez notre campus, rencontrez nos professeurs et apprenez-en plus sur nos programmes de formation.",
  //     fullContent:
  //       "Lors de nos journées portes ouvertes, plongez dans l'univers unique de notre établissement. Explorez nos installations modernes, comme nos laboratoires high-tech et nos espaces collaboratifs conçus pour stimuler la créativité et l'apprentissage. Venez discuter avec nos professeurs, qui vous présenteront en détail nos programmes innovants, adaptés aux besoins du marché. Vous pourrez également échanger avec nos étudiants actuels pour découvrir la vie sur le campus, les associations et les opportunités à saisir. Une expérience immersive qui vous permettra de mieux visualiser votre avenir académique et professionnel.",
  //     category: "Éducation",
  //     imageUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_13C0-wPpCPOr_WrQ8xfCx8iE4ZTW3rIwg&s",
  //     publishedAt: "2025-01-10T09:00:00",
  //     expiryDate: "2025-01-31T18:00:00",
  //   },
  //   {
  //     id: 3,
  //     title: "Nouveau partenariat avec une entreprise tech",
  //     content:
  //       "Nous sommes fiers d'annoncer notre partenariat avec TechCorp pour offrir plus de stages et opportunités à nos étudiants.",
  //     fullContent:
  //       "Nous sommes ravis de partager cette grande nouvelle : un partenariat stratégique a été signé avec TechCorp, une entreprise de pointe dans le domaine de la technologie. Ce partenariat va au-delà des simples stages ; il inclut des programmes de mentorat, des projets collaboratifs entre nos étudiants et les équipes de TechCorp, et des événements réguliers tels que des hackathons et des conférences exclusives. Ce rapprochement nous permet de renforcer notre engagement envers l'innovation et d'assurer à nos étudiants un accès privilégié à des ressources et à des opportunités qui leur ouvriront les portes d'une carrière prometteuse. Préparez-vous à vivre une expérience unique et à repousser vos limites.",
  //     category: "Partenariats",
  //     imageUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFGdLpSaXSkP2ZEP71RaRwZPreJSmd8O_6rQ&s",
  //     publishedAt: "2025-01-05T08:00:00",
  //     expiryDate: "2025-01-25T23:59:00",
  //   },
  // ];

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: 'YOUR-API-KEY',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'M', // values are (M,S,I)
  });
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {/* CSS Grid for Weather and News Sections */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "30% 70%" },
            gap: 4,
          }}>
          {/* Weather Section */}
          <Box
            sx={{
              backgroundColor: "lightblue",
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}>
            <Typography variant="h6" gutterBottom>
              Weather
            </Typography>
            <Typography>Weather details go here...</Typography>
          </Box>

          {/* News Section */}

          {/*
=======
>>>>>>> origin/login-prototype
          <Box
            sx={{
              backgroundColor: "lightgray",
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}>
            <Typography variant="h6" gutterBottom>
              News
            </Typography>
            <Typography>News details go here...</Typography>
          </Box>
          */}
          {newsList && <News newsList={newsList} />}
        </Box>
      </Container>
       <NewsAdmin ></NewsAdmin>
      <Footer />
    </div>
  );
}

export default AppLayout;
