import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUsersFromExcel, signUp } from "../../utils/apiFunctions";
import * as XLSX from "xlsx";

const AddUsers = () => {
  const [firstNameEtud, setFirstNameEtud] = useState("");
  const [lastNameEtud, setLastNameEtud] = useState("");
  const [emailEtud, setEmailEtud] = useState("");
  const [passwordEtud, setPasswordEtud] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const [excelFile, setExcelFile] = useState(null);
  const [excelUploadMessages, setExcelUploadMessages] = useState([]);

  const roles = [
    { label: "Etudiant", value: "ETUDIANT" },
    { label: "Professeur", value: "PROFESSEUR" },
    { label: "Editeur", value: "EDITEUR" },
    { label: "Admin", value: "ADMIN" },
  ];

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Veuillez sélectionner un rôle.");
      return;
    }

    if (passwordEtud !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError("");
    setApiError("");

    try {
      await signUp(firstNameEtud, lastNameEtud, emailEtud, passwordEtud, role);
      setSuccessMessage("Inscription réussie !!");

      setFirstNameEtud("");
      setLastNameEtud("");
      setEmailEtud("");
      setPasswordEtud("");
      setConfirmPassword("");
      setRole("");
    } catch (error) {
      if (error.response) {
        setApiError(
          error.response.data ||
            "Une erreur s'est produite. Veuillez réessayer."
        );
      } else {
        setApiError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  // const handleExcelUpload = async () => {
  //   if (!excelFile) {
  //     setApiError("Veuillez sélectionner un fichier Excel.");
  //     return;
  //   }

  //   try {
  //     const response = await registerUsersFromExcel(excelFile);
  //     setSuccessMessage("Utilisateurs ajoutés avec succès !");
  //     setExcelFile(null);
  //   } catch (err) {
  //     setApiError("Erreur lors de l'importation du fichier.");
  //   }
  // };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      setApiError("Veuillez sélectionner un fichier Excel.");
      return;
    }

    try {
      const response = await registerUsersFromExcel(excelFile);
      setExcelUploadMessages(
        response.data.map((msg) => {
          const email = msg.email;
          const status = msg.status;
          const error = msg.error;

          return { email, status, error };
        })
      );
      setSuccessMessage("Fichier traité avec succès !");
      setExcelFile(null);
    } catch (err) {
      console.log(err)
      setApiError("Erreur lors de l'importation du fichier.");
    }
  };

  const downloadResultsAsExcel = () => {
    const worksheetData = [
      ["Email", "Statut", "Message d'erreur"],
      ...excelUploadMessages.map((msg) => [
        msg.email,
        msg.status,
        msg.error,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Résultats Import");

    XLSX.writeFile(workbook, "resultats_importation_utilisateurs.xlsx");
  };

  return (
    <Container component="main" maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Ajouter des utilisateurs
      </Typography>

      {/* {successMessage && (
        <Alert severity="success" sx={{ mb: 2, textAlign: "center" }}>
          {successMessage}
        </Alert>
      )}

      {apiError && (
        <Alert severity="error" sx={{ mb: 2, textAlign: "center" }}>
          {apiError}
        </Alert>
      )} */}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!apiError}
        autoHideDuration={3000}
        onClose={() => setApiError("")}
      >
        <Alert onClose={() => setApiError("")} severity="error">
          {apiError}
        </Alert>
      </Snackbar>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: "600px",
          margin: "0 auto",
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <TextField
          label="Prénom"
          value={firstNameEtud}
          onChange={(e) => setFirstNameEtud(e.target.value)}
          required
        />
        <TextField
          label="Nom"
          value={lastNameEtud}
          onChange={(e) => setLastNameEtud(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={emailEtud}
          onChange={(e) => setEmailEtud(e.target.value)}
          required
        />

        <FormControl required>
          <InputLabel id="role-label">Rôle</InputLabel>
          <Select
            labelId="role-label"
            id="demo-simple-select"
            value={role}
            label="Rôle"
            onChange={handleRole}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          value={passwordEtud}
          onChange={(e) => setPasswordEtud(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirmer le mot de passe"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          fullWidth
        >
          Ajouter
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 5, mb: 2 }} align="center">
        Ou ajouter plusieurs utilisateurs avec un fichier Excel :
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setExcelFile(e.target.files[0])}
        />
        <Button
          variant="contained"
          sx={{ px: 2, mr: 3 }}
          color="secondary"
          onClick={handleExcelUpload}
        >
          Importer Excel
        </Button>

        {excelUploadMessages.length > 0 && (
          <Button
            variant="outlined"
            color="success"
            onClick={downloadResultsAsExcel}
          >
            Télécharger le résultat
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default AddUsers;
