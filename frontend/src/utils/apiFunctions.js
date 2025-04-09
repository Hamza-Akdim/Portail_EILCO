import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081/", // tu peux Utiliser le proxy Vite
  withCredentials: true,
});

export const getContacts = async (endpoint) => {
  try {
    const response = await api.get(`api/contacts${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Erreur contacts :", error);
    throw error;
  }
};

export const postContacts = async (data) => {
  try {
    const response = await api.post("api/contacts", data);
    return response.data;
  } catch (error) {
    console.error("Erreur contacts :", error);
    throw error;
  }
};

export const updateContacts = async (city, level, data) => {
  try {
    const response = await api.put(`api/contacts/${city}/${level}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating contacts:", error);
    throw error;
  }
};

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
  const setRole = () => {
    if (role === "ETUDIANT") return "ETUD";
    else if (role === "PROFESSEUR") return "PROF";
    else if (role === "EDITEUR") return "EDIT";
    else if (role === "ADMIN") return "ADM";
    else return "ETUD"; // Default role if none specified
  };

  const requestBody = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
    role: setRole(),
  };

  try {
    const response = await api.post("api/auth/signup", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get("api/auth/me");
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.log("Authentication required. Please log in.");
      return null;
    }
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
  try {
    const paramsConfig = {
      page: page,
      size: size,
    };

    const response = await api.get("/api/users", { params: paramsConfig });
    return { data: response.data.data, total: response.data.total };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await api.get("/api/users/search", {
      params: { email: email },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (
  newFirstname,
  newLastname,
  email,
  newRole,
  newPassword,
  id
) => {
  try {
    const setRole = () => {
      if (newRole === "ETUDIANT") return "ETUD";
      else if (newRole === "PROFESSEUR") return "PROF";
      else if (newRole === "EDITEUR") return "EDIT";
      else if (newRole === "ADMIN") return "ADM";
      else return null;
    };

    const requestBody = {
      firstname: newFirstname,
      lastname: newLastname,
      email: email,
      role: setRole(),
      password: newPassword,
    };
    const response = await api.put(`/api/users/${id}`, requestBody);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/users/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

//-------------------------------------
const NEWS_ENDPOINT = "api/news";

// Récupérer toutes les news
export const getNews = async () => {
  try {
    const response = await api.get(NEWS_ENDPOINT);
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
    // Utilisation de l'instance api pour faire la requête
    const response = await api.post(`${NEWS_ENDPOINT}/add`, formData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la news :", error);
    throw error;
  }
};

// Supprimer une news
export const deleteNews = async (id) => {
  try {
    await api.delete(`${NEWS_ENDPOINT}/${id}`);
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
    const response = await api.put(`${NEWS_ENDPOINT}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la news :", error);
    throw error;
  }
};

//

// Todo functions
export const getAllTodos = async () => {
  try {
    const response = await api.get("api/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const saveTodo = async (todo) => {
  try {
    const response = await api.post("api/todos", todo);
    return response.data;
  } catch (error) {
    console.error("Error saving todo:", error);
    throw error;
  }
};

export const getTodo = async (id) => {
  try {
    const response = await api.get(`api/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await api.put(`api/todos/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.delete(`api/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const completeTodo = async (id) => {
  try {
    const response = await api.patch(`api/todos/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error completing todo:", error);
    throw error;
  }
};

export const inCompleteTodo = async (id) => {
  try {
    const response = await api.patch(`api/todos/${id}/in-complete`);
    return response.data;
  } catch (error) {
    console.error("Error marking todo as incomplete:", error);
    throw error;
  }
};
