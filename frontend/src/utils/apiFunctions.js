import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080"
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