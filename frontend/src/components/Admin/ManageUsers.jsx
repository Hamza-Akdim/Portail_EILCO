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
  useTheme,
} from "@mui/material";
import { Edit, Delete, PersonAdd, Search } from "@mui/icons-material";
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
} from "../../utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import EditUserModal from "./EditUserModel";
import ViewUserModal from "./ViewUserModel";
import { useMediaQuery } from "@mui/system";

const roleColors = {
  ETUDIANT: "#4caf50",
  PROFESSEUR: "#1e88e5",
  EDITEUR: "#ff9800",
  ADMIN: "#d32f2f",
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageTotal, setPageTotal] = useState(0);
  const [editUser, setEditUser] = useState(null);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers(page, rowsPerPage);
      setUsers(data.data);
      setPageTotal(data.total);
    };

    fetchUsers();
  }, [page, rowsPerPage, openEditUser]);

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenEditUser(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        setSuccessMessage("Utilisateur supprimé avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButton = () => {
    navigate("/espace-admin/add");
  };

  const searchUser = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      try {
        const data = await getUserByEmail(query);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    } else {
      const allUsers = await getAllUsers(page, rowsPerPage);
      setUsers(allUsers.data);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4, px: 2 }}>
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
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          size="small"
          id="standard-basic"
          variant="standard"
          label="Rechercher par email"
          value={searchTerm}
          onChange={searchUser}
          sx={{ width: "250px", marginBottom: "10px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          width: "100%",
          mb: 2,
        }}
      >
        <TextField
          size="small"
          id="standard-basic"
          variant="standard"
          label="Rechercher par email"
          value={searchTerm}
          onChange={searchUser}
          fullWidth
          sx={{
            maxWidth: { xs: "100%", sm: "300px" },
          }}
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
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Rôle
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  color: "#fff",
                  fontWeight: "bold",
                }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <TableRow
                  hover
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenViewModal(true);
                  }}
                  sx={{ cursor: isMobile ? "pointer" : "default" }}
                >
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  {/* Hide these on small screens */}
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
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

                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    <Tooltip title="Modifier">
                      <IconButton
                        sx={{ color: "#004f8b" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(user);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user.id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>

              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <EditUserModal
          open={openEditUser}
          editUser={editUser}
          onClose={() => setOpenEditUser(false)}
          onSuccess={() => {
            setSuccessMessage("Utilisateur modifié avec succès !");
            setOpenEditUser(false);
            setTimeout(() => setSuccessMessage(""), 3000);
          }}
          onError={(errMsg) => {
            setErrorMessage(errMsg || "Erreur lors de la modification.");
            setTimeout(() => setErrorMessage(""), 3000);
          }}
        />

        <ViewUserModal
          open={openViewModal}
          user={selectedUser}
          onClose={() => setOpenViewModal(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} sur ${count}`
          }
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
