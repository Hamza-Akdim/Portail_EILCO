import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getNews, deleteNews, updateNews, addNews } from "../../utils/apiFunctions";

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({ title: "", content: "", fullContent: "", category: "", imageFile: null, imageUrl: "" });
  const [editNews, setEditNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadNews(); }, []);

  const loadNews = async () => {
    try {
      const news = await getNews();
      setNewsList(news);
      console.log(news);
    } catch (error) {
      console.error("Erreur lors du chargement des news", error);
    }
  };

  const handleChange = (e, type) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewNews((prev) => ({ ...prev, imageFile: file, imageUrl }));
    } else {
      if (type === "new") setNewNews((prev) => ({ ...prev, [name]: value }));
      if (type === "edit") setEditNews((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddNews = async () => {
    if (!newNews.title || !newNews.content || !newNews.fullContent) return;
    setLoading(true);
    try {
      await addNews(newNews);
      setSnackbar({ open: true, message: "News ajoutée !" });
      setNewNews({ title: "", content: "", fullContent: "", category: "", imageFile: null, imageUrl: "" });
      loadNews();
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    setLoading(true);
    try {
      await deleteNews(id);
      setSnackbar({ open: true, message: "News supprimée !" });
      loadNews();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNews = async () => {
    if (!editNews) return;
    setLoading(true);
    try {
      await updateNews(editNews.id, editNews);
      setSnackbar({ open: true, message: "News mise à jour !" });
      setOpenDialog(false);
      loadNews();
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Gestion des News</Typography>
      <Grid container spacing={2} sx={{ my: 3 }}>
        {Object.keys(newNews).map((key) => (
          key !== "imageFile" && key !== "imageUrl" && (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                fullWidth
                name={key}
                value={newNews[key]}
                onChange={(e) => handleChange(e, "new")}
                multiline={key.includes("content")}
                rows={key.includes("content") ? 2 : 1}
              />
            </Grid>
          )
        ))}
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={(e) => handleChange(e, "new")} />
          {newNews.imageUrl && <img src={newNews.imageUrl} alt="Prévisualisation" style={{ width: 100, marginTop: 10 }} />}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleAddNews} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Ajouter une news"}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {newsList.map((news) => (
          <Grid item xs={12} sm={6} md={4} key={news.id}>
            <Card>
              <CardMedia component="img" height="140" image={news.imageUrl} alt={news.title} />
              <CardContent>
                <Typography variant="h6">{news.title}</Typography>
                <Typography variant="body2" color="text.secondary">{news.content}</Typography>
                <Typography variant="caption">{news.category}</Typography>
              </CardContent>
              <div style={{ textAlign: "right", padding: "8px" }}>
                <IconButton onClick={() => { setEditNews(news); setOpenDialog(true); }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteNews(news.id)} color="error" disabled={loading}>
                  <Delete />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Modifier la News</DialogTitle>
        <DialogContent>
          {editNews && Object.keys(editNews).map((key) => (
            key !== "imageFile" && key !== "imageUrl" && (
              <TextField key={key} label={key} fullWidth name={key} value={editNews[key] || ""} onChange={(e) => handleChange(e, "edit")} />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleUpdateNews} variant="contained" disabled={loading}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} message={snackbar.message} onClose={() => setSnackbar({ open: false, message: "" })} />
    </Container>
  );
};

export default NewsAdmin;
