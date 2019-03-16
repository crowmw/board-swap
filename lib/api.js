import axios from 'axios'
import store from '../redux/index'

const baseURL = 'https://localhost:3000/graphql'

const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  config => {
    const token = store.getState().authorization.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default http