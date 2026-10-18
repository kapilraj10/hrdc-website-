import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: base,
    withCredentials: true,
});

// Attach Authorization header if token is present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;