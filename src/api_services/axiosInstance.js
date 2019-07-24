import axios from 'axios'

let baseURL = 'https://platzi-music-api.now.sh'

const axiosInstance = axios.create({
    baseURL: baseURL
})

export default axiosInstance