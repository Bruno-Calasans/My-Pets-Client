
import axios from 'axios'

interface ServerConfig {
    hostname: string,
    port: number
}

const serverConfig: ServerConfig = JSON.parse(import.meta.env.VITE_serverConfig)
const { hostname, port } = serverConfig;

const api = axios.create({
    baseURL: `http://${hostname}:${port}`
})

export default api

