import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Authentication APIS
// -----------------

//login api 
export const loginUser = (data)=>{
    return api.post("/auth/login",data);
}

//Register Api
export const registerUser = (data)=>{
    return api.post("/auth/register",data);
}


// Videos APIS 
// -----------------

// Get videos by category
export const getVideo = (category) => {
    return api.get(`/videos?category=${category}`)
}

// Get single video by id
export const getVideoById = (id) => {
    return api.get(`/videos/${id}`)
}

// User APIS
//-----------

// Get current user (with favourites & watchLater populated)
export const getMe = () => {
    return api.get("/user/me")
}

// Toggle favourite for a video
export const toggleFavourite = (videoId) => {
    return api.post(`/user/favourite/${videoId}`)
}

// Toggle watch later for a video
export const toggleWatchLater = (videoId) => {
    return api.post(`/user/watchlater/${videoId}`)
}

export default api;
