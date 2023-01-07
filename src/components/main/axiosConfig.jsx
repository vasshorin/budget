import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004'
});

export default axiosInstance;
