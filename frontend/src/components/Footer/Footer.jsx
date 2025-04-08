import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid2 from "@mui/material/Grid2";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgb(227, 225, 225)",
        p: 2,
      }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={8}>
          <Grid2 item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              À propos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              École d'Ingénieurs du Littoral Côte d'Opale – 50 Rue Ferdinand
              Buisson
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CS 30613 – 62228 CALAIS CEDEX
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: Contact@eilco.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Téléphone: +33 3 21 17 10 05
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Suivez-nous
            </Typography>
            <Link
              href="https://www.facebook.com/eilco.ulco/?locale=fr_FR"
              color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/eilco_ulco/?hl=fr"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <Instagram />
            </Link>
            <Link
              href="https://twitter.com/ulco_univ/status/1068160457129803777"
              color="inherit">
              <Twitter />
            </Link>
          </Grid2>
        </Grid2>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
