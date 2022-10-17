
import axios from 'axios'

const API_SERVER: string = import.meta.env.VITE_API_SERVER
const api = axios.create({
    baseURL: API_SERVER
})

export default api

