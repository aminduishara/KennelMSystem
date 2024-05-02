// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/kennel', // backend domain
});

export default instance;
