import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Button,
  Snackbar,
  Alert,
  TextField,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, PersonAdd, Search } from "@mui/icons-material";
import { getAllUsers } from "../../utils/apiFunctions";
import { useNavigate } from "react-router-dom";

const roleColors = {
  ETUDIANT: "#4caf50",
  PROFESSEUR: "#1e88e5",
  EDITEUR: "#ff9800",
  ADMIN: "#d32f2f",
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageTotal, setPageTotal] = useState(0);

  const navigate = useNavigate();


  const fetchUsers = async () => {
    const data = await getAllUsers(page, rowsPerPage);
    setUsers(data.data);
    setPageTotal(data.total);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleEdit = (user) => {
    setSuccessMessage(`Modification de ${user.firstName} en cours...`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      setUsers(users.filter((user) => user.id !== id));
      setSuccessMessage("Utilisateur supprimé avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleButton = ()=>{
    navigate("/espace-admin/add"); 
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4, px: 2 }}>
      {/* Message de succès */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          size="small"
          id="standard-basic"
          variant="standard"
          label="Rechercher par email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "250px", marginBottom: "10px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* En-tête */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#004f8b">
          Gestion des utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          sx={{
            backgroundColor: "#004f8b",
            "&:hover": { backgroundColor: "#003a66" },
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={handleButton}
        >
          Ajouter un utilisateur
        </Button>
      </Box>

      {/* Tableau responsive */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead sx={{ bgcolor: "#004f8b" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Prénom
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Nom
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Rôle
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        backgroundColor: roleColors[user.role],
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        display: "inline-block",
                        width: "100px",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      {user.role.toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Modifier">
                      <IconButton
                        sx={{ color: "#004f8b" }}
                        onClick={() => handleEdit(user)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Improved Pagination Design */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count}`}
          
          sx={{
            "& .MuiTablePagination-toolbar": {
              padding: "0px",
            },
            "& .MuiTablePagination-select": {
              fontSize: "14px",
              height: "35px",
            },
            "& .MuiTablePagination-caption": {
              fontSize: "14px",
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ManageUsers;
