import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true
})

// get videos by category 
export const getVideo = (category) =>{
    return api.get(`/videos?category=${category}`)
}


// getting only single video
export const getVideoById = (id) =>{
    return api.get(`/videos/${id}`)
}


export default api;

