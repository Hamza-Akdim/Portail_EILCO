import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8081"
})


export const auth = async(email, password)=>{
    const formData = new FormData()
    formData.append("email", email)
    formData.append("encryptedPassword", password)
    
    const response = await api.get("api/auth/get-user",  {
        params: {
            email: email,
            encryptedPassword: password,
        },
    })

    console.log(response)

    if (response.status === 200) return true

    return false
}


const API_URL = "http://localhost:8081/api/news";


//Recuperer toutes les news
export const getNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des news :", error);
    return [];
  }
};

//ajouter une news
export const addNews = async (news) => {
  try {
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("content", news.content);
    formData.append("fullContent", news.fullContent);
    formData.append("category", news.category);
    if (news.imageFile) {
      formData.append("image", news.imageFile);
    }

    const response = await axios.post(`${API_URL}/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la news :", error);
    throw error;
  }
};

//supprimer une news
export const deleteNews = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la news :", error);
  }
};

//mettre a jour une news
export const updateNews = async (id, news) => {
  try {
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("content", news.content);
    formData.append("fullContent", news.fullContent);
    formData.append("category", news.category);
    if (news.imageFile) {
      formData.append("image", news.imageFile);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la news :", error);
    throw error;
  }
};