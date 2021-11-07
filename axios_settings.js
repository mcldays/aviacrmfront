var axios = require('axios');

var axiosInstance = axios.create({
    // baseURL: "http://89.108.103.251",
    baseURL: "https://localhost:5001",
    /* other custom settings */
});

module.exports = axiosInstance;