import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

// get videos by category 

export const getVideo = (category) =>{
    api.get(`/videos?category=${category}`)
}


export default api;

