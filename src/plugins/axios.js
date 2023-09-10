import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['auth'] = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
