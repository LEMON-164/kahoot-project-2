import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: API_BE_URL,
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });