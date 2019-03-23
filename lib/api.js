import axios from 'axios'
import { getCookie } from './cookie';

const baseURL = process.env.APP_URL || 'http://localhost:3000/'

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  config => {
    const token = getCookie('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  }
)

const graphql = async (query) => {
  const result = await http.post('graphql', { query: query })
  if (!!result.data.errors) throw new Error(result.data.errors[0].message)
  return result.data.data
}

const post = async (url, body) => {
  try {
    const result = await http.post(url, body)
    return result.data
  } catch (err) {
    throw new Error(err.response.data)
  }
}

export default {
  http,
  graphql,
  post
}