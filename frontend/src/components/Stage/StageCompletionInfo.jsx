import React from 'react';
import { Box, Typography, Link, Button, Grid, Paper } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const StageCompletionInfo = () => (
  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', padding: 2 }}>
    <Paper sx={{
      p: 4,
      width: '100%',
      maxWidth: 600,
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
      Vous avez trouvé un stage ? 
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Voici ce que vous devez faire maintenant pour finaliser votre stage.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            <strong>1. </strong>
            Complétez votre{' '}
            <Link href="https://stages.eilco-ulco.fr/" target="_blank" color="primary">
              fiche de stage en ligne
            </Link>.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            <strong>2. </strong>
            Faites signer la convention de stage par vos tuteurs académiques et en entreprise.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            <strong>3. </strong>
            Envoyez les documents nécessaires à{' '}
            <Link href="mailto:secretariat-re@eilco-ulco.fr" color="primary">
              secretariat-re@eilco-ulco.fr
            </Link>.
          </Typography>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        href="mailto:secretariat-re@eilco-ulco.fr"
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'primary.dark',
            boxShadow: 6,
          },
        }}
      >
        <ArrowForward sx={{ mr: 1 }} /> Contactez le service des stages
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Pour toute question, contactez le service des stages au{' '}
        <Link href="tel:+33213885656" color="primary">
          03 21 38 85 56
        </Link>.
      </Typography>
    </Paper>
  </Box>
);

export default StageCompletionInfo;
