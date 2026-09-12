// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000/api"
// });

// export default api;


// frontend/src/services/api.js
import axios from "axios";

// This reads from .env (local) or .env.production (Netlify)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;