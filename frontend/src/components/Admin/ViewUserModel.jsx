import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const roleColors = {
  ETUDIANT: "#4caf50",
  PROFESSEUR: "#1e88e5",
  EDITEUR: "#ff9800",
  ADMIN: "#d32f2f",
};

const ViewUserModal = ({ open, user, onClose, onEdit, onDelete }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{"Détails de l'utilisateur"}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Prénom:</strong> {user.firstname}</Typography>
          <Typography><strong>Nom:</strong> {user.lastname}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Rôle:</strong>{" "}
            <span
              style={{
                backgroundColor: roleColors[user.role],
                color: "white",
                padding: "4px 10px",
                borderRadius: "12px",
                marginLeft: "8px",
              }}
            >
              {user.role.toLowerCase()}
            </span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => {
              onEdit(user);
              onClose();
            }}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => onDelete(user.id)}
          >
            Supprimer
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;
