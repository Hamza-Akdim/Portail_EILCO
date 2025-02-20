import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8081"
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