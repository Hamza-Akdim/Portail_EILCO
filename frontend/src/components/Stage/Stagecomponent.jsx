import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Divider, Link, Grid, useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Email, Phone, Work, Edit } from "@mui/icons-material";
import StageCompletionInfo from "./StageCompletionInfo";
import { useEffect } from "react";
import { getUserDetails } from "../../utils/apiFunctions";

const initialStages = [
  {
    "year": "1ʳᵉ année du Cycle Préparatoire Intégré (CP1)",
    "description": "Durant cette première année, aucun stage n'est prévu. L'objectif principal est de te fournir des bases solides en sciences et techniques de l'ingénieur pour préparer la suite de ton parcours."
  },
  {
    "year": "2ᵉ année du Cycle Préparatoire Intégré (CP2)",
    "description": "Un stage obligatoire de découverte de l'entreprise, d'une durée minimale de 4 semaines, est prévu, généralement en février. Ce stage te permettra d'avoir une première immersion dans le monde professionnel, de comprendre le fonctionnement d'une entreprise et d'observer les réalités industrielles."
  },
  {
    "year": "1ʳᵉ année du Cycle Ingénieur (ING1)",
    "description": "En fin de première année du Cycle Ingénieur, il est recommandé d'effectuer un stage de découverte d'une entreprise à l'étranger. D'une durée minimale de 2 mois, ce stage vise à vous familiariser avec les environnements professionnels internationaux et à développer vos compétences interculturelles. Bien que fortement encouragé pour enrichir votre parcours, ce stage n'est pas obligatoire."
  },
  {
    "year": "2ᵉ année du Cycle Ingénieur (ING2)",
    "description": "Un stage d'assistant ingénieur (AI) d'une durée minimale de 2 mois est prévu entre la deuxième et la troisième année. Ce stage obligatoire te permettra d'assumer des responsabilités techniques et de gestion de projet, en appliquant les compétences acquises durant ta formation dans un contexte professionnel."
  },
  {
    "year": "3ᵉ année du Cycle Ingénieur (ING3)",
    "description": "Le projet de fin d'études (PFE) est un stage de 6 mois réalisé en fin de dernière année. Ce stage obligatoire te placera en situation d'initiative pour résoudre ou contribuer à la résolution d'un problème industriel, technique ou non technique, en gérant un projet et en animant une équipe."
  }
]

export default function StageRoadmap() {
  const [role, setRole] = useState("");
  useEffect(() => {
    getUserDetails()
      .then((result) => {
        setRole(result.role);
        console.log(role);
      })
      .catch((err) =>
        console.log(`Error while fetchinf the user data : ${err}`)
      );
  }, []);

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
                <CardContent sx={{textAlign: "center"}}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    {stage.year}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
                    {stage.description}
                  </Typography>
                  
                  {/* <Typography variant="subtitle1" fontWeight="bold">
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
                  </Typography> */}
                  {(role === 'ADMIN'|| role === 'EDITEUR')&&(<><Divider sx={{ my: 1 }} /><Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    sx={{ mt: 2 }}
                    onClick={() => handleClickOpen(stage)}
                  >
                    Modifier
                  </Button></>)}
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
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      {stage.year}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
                      {stage.description}
                    </Typography>
                    
                    {/* Autres éléments */}
                    {(role === 'ADMIN'|| role === 'EDITEUR')&& (<>
                      <Divider sx={{ my: 1 }} />
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        sx={{ mt: 2 }}
                        onClick={() => handleClickOpen(stage)}
                      >
                        Modifier
                      </Button></>
                    )}
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
