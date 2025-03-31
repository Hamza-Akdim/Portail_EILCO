import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
});

export const auth = async (email, password) => {
  const requestBody = {
    email: email,
    password: password,
  };
  const response = await api.post("api/auth/login", requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const signUp = async (firstName, lastName, email, password, role) => {
  const requestBody = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
    role: role,
  };

  const response = await api.post("api/auth/signup", requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};

export const getUserDetails = async () => {
  try {
    const response = await api("api/auth/me");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await api.post("api/auth/logout");
    return true;
  } catch (error) {
    console.error("Error while logging out:", error);
    return false;
  }
};

export const getAllUsers = async (page, size) => {
  console.log("page : ", page, "size : ", size)
  try {
    const paramsConfig = {
        page : page,
        size : size
    }

    const response = await api.get("/api/users", {params : paramsConfig});
    console.log(response)
    return {data : response.data.data, total : response.data.total};
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

//-------------------------------------------------------------------------

const API_URL = "http://localhost:8081/api/news";

// Récupérer toutes les news
export const getNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des news :", error);
    return [];
  }
};

// Ajouter une news
export const addNews = async (news) => {
  try {
    const formData = new FormData();
    // Créer un Blob avec le bon type MIME pour la partie JSON
    const newsBlob = new Blob(
      [
        JSON.stringify({
          title: news.title,
          content: news.content,
          fullContent: news.fullContent,
          category: news.category,
          expiryDate: news.expiryDate, // Format ISO attendu par le backend
        }),
      ],
      { type: "application/json" }
    );
    formData.append("news", newsBlob);
    if (news.imageFile) {
      formData.append("image", news.imageFile);
    }
    // Ne laissez pas axios forcer manuellement le header Content-Type
    const response = await axios.post(`${API_URL}/add`, formData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la news :", error);
    throw error;
  }
};

// Supprimer une news
export const deleteNews = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la news :", error);
  }
};

// Mettre à jour une news
export const updateNews = async (id, news) => {
  try {
    const formData = new FormData();
    const newsBlob = new Blob(
      [
        JSON.stringify({
          title: news.title,
          content: news.content,
          fullContent: news.fullContent,
          category: news.category,
          expiryDate: news.expiryDate,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("updatedNews", newsBlob);
    if (news.imageFile) {
      formData.append("image", news.imageFile);
    }
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la news :", error);
    throw error;
  }
};
