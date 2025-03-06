import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Divider, Link, Grid, useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Email, Phone, Work, Edit } from "@mui/icons-material";
import StageCompletionInfo from "./StageCompletionInfo";

const initialStages = [
  {
    year: "1ère année (Cycle Prépa)",
    description: "Pas de stage obligatoire, cette année est principalement dédiée aux bases académiques.",
    contact: { name: "Mme Dupont", role: "Responsable des Stages", email: "dupont@eilco.fr", phone: "01 23 45 67 89" },
  },
  {
    year: "2ème année (Cycle Prépa)",
    description: "Stage d'initiation (1 à 2 mois), découverte du monde professionnel et de l'entreprise.",
    contact: { name: "M. Leclerc", role: "Responsable des Stages", email: "leclerc@eilco.fr", phone: "01 23 45 67 90" },
  },
  {
    year: "3ème année (Cycle Ingénieur)",
    description: "Stage optionnel permettant d'acquérir une première expérience en entreprise.",
    contact: { name: "Mme Martin", role: "Responsable des Stages", email: "martin@eilco.fr", phone: "01 23 45 67 91" },
  },
  {
    year: "4ème année (Cycle Ingénieur)",
    description: "Stage assistant ingénieur obligatoire (2 à 4 mois), mise en pratique des compétences techniques.",
    contact: { name: "M. Lefevre", role: "Responsable des Stages", email: "lefevre@eilco.fr", phone: "01 23 45 67 92" },
  },
  {
    year: "5ème année (Cycle Ingénieur)",
    description: "Stage de fin d'études (6 mois), dernière étape avant l'entrée dans le monde du travail.",
    contact: { name: "M. Boulanger", role: "Responsable des Stages", email: "boulanger@eilco.fr", phone: "01 23 45 67 93" },
  },
];

export default function StageRoadmap() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [stages, setStages] = useState(initialStages);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  const handleClickOpen = (stage) => {
    setCurrentStage(stage);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentStage(null);
  };

  const handleSave = () => {
    const updatedStages = stages.map((stage) =>
      stage.year === currentStage.year ? currentStage : stage
    );
    setStages(updatedStages);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStage((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentStage((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Stages & Contacts
      </Typography>

      {isMobile ? (<div>
        <Grid container direction="column" spacing={2}>
          {stages.map((stage, index) => (
            <Grid item xs={12} key={index}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  bgcolor: "white",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 5 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    {stage.year}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {stage.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    <Work sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }} />
                    {stage.contact.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stage.contact.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Email sx={{ fontSize: 16, verticalAlign: "middle", mr: 1 }} />
                    <Link href={`mailto:${stage.contact.email}`} color="primary">
                      {stage.contact.email}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Phone sx={{ fontSize: 16, verticalAlign: "middle", mr: 1 }} />
                    <Link href={`tel:${stage.contact.phone}`} color="primary">
                      {stage.contact.phone}
                    </Link>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    sx={{ mt: 2 }}
                    onClick={() => handleClickOpen(stage)}
                  >
                    Modifier
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid><StageCompletionInfo></StageCompletionInfo>
        </div>
      ) : (<div>
        <Timeline position="alternate">
          {stages.map((stage, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  color={index % 2 === 0 ? "primary" : "secondary"}
                  sx={{ boxShadow: 3, width: 18, height: 18 }}
                />
                {index < stages.length - 1 && (
                  <TimelineConnector sx={{ bgcolor: "grey.500", height: 40 }} />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    bgcolor: "white",
                    maxWidth: "400px",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 5 },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      {stage.year}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {stage.description}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      <Work sx={{ fontSize: 20, verticalAlign: "middle", mr: 1 }} />
                      {stage.contact.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stage.contact.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Email sx={{ fontSize: 16, verticalAlign: "middle", mr: 1 }} />
                      <Link href={`mailto:${stage.contact.email}`} color="primary">
                        {stage.contact.email}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Phone sx={{ fontSize: 16, verticalAlign: "middle", mr: 1 }} />
                      <Link href={`tel:${stage.contact.phone}`} color="primary">
                        {stage.contact.phone}
                      </Link>
                    </Typography>
                    {/**si admin seulement */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                      sx={{ mt: 2 }}
                      onClick={() => handleClickOpen(stage)}
                    >
                      Modifier
                    </Button>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        <StageCompletionInfo></StageCompletionInfo>
        </div>
      )}

      {/* Dialog de modification */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Modifier les informations du stage</DialogTitle>
        <DialogContent>
          <TextField
            label="Année"
            name="year"
            value={currentStage?.year || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentStage?.description || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Nom du contact"
            name="name"
            value={currentStage?.contact.name || ""}
            onChange={handleContactChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rôle du contact"
            name="role"
            value={currentStage?.contact.role || ""}
            onChange={handleContactChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email du contact"
            name="email"
            value={currentStage?.contact.email || ""}
            onChange={handleContactChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Téléphone du contact"
            name="phone"
            value={currentStage?.contact.phone || ""}
            onChange={handleContactChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
