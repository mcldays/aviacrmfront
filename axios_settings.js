var axios = require('axios');

var axiosInstance = axios.create({
    // baseURL: "http://89.108.103.251:8080",
    //baseURL: "https://localhost:5001",
    // baseURL: "http://89.108.77.147:8080",
        baseURL: "https://api.cargo-rmgroup.ru/",
    /* other custom settings */
});

module.exports = axiosInstance;
