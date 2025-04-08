import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateUser } from "../../utils/apiFunctions";

const EditUserModal = ({ open, editUser, onClose, onSuccess, onError }) => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newRole, setNewRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  useEffect(() => {
    if (editUser && open) {
      const fetchUser = () => {
        setLoading(true);
        try {
          setNewFirstname(editUser.firstname || "");
          setNewLastname(editUser.lastname || "");
          setEmail(editUser.email || "");
          setNewRole(editUser.role || "");
          setNewPassword("");
        } catch (err) {
          console.error("Erreur de récupération :", err);
        }
        setLoading(false);
      };

      fetchUser();
    }
  }, [editUser, open]);

  const handleRole = (e) => {
    setNewRole(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(
        newFirstname,
        newLastname,
        email,
        newRole,
        newPassword,
        editUser.id
      );
      onClose();

      if (response.status === 200) {
        onSuccess?.();
      } else {
        onError?.("Échec de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      onError?.("Une erreur s’est produite pendant la mise à jour.");
    }
  };



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">{"Modifier l'utilisateur"}</Typography>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" p={6}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Prénom"
              name="firstname"
              value={newFirstname}
              onChange={(e) => setNewFirstname(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Nom"
              name="lastname"
              value={newLastname}
              onChange={(e) => setNewLastname(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={email}
              fullWidth
              required
              type="email"
              disabled
            />

            <TextField
              select
              label="Rôle"
              name="role"
              value={newRole}
              onChange={handleRole}
              fullWidth
              required
            >
              <MenuItem value="ETUDIANT">Étudiant</MenuItem>
              <MenuItem value="PROFESSEUR">Professeur</MenuItem>
              <MenuItem value="EDITEUR">Éditeur</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
            <TextField
              label="Nouveau mot de passe"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              placeholder="Laisser vide pour ne pas modifier"
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
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          disabled={loading}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
