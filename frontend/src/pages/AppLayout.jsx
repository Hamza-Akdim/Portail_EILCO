import Navbar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { Container, Box, Typography } from "@mui/material";

function AppLayout() {
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
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default AppLayout;
