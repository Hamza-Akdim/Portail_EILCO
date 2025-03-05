import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8081",
    withCredentials: true,  // To allow the sent and recieve of cookies

})


export const auth = async(email, password)=>{
    const requestBody = {
        "email" : email ,
        "password" :  password
    }
    
    const response = await api.post("api/auth/login",  
        requestBody,{ 
        headers: {
            "Content-Type": "application/json"
          }
    })
    return response
}


export const getUserDetails = async () => {
    try {
        const response = await api("api/auth/me")  

        return response.data; 
    } catch (error) {
        console.error("Failed to fetch user details", error);
        return null;
    }
};