import axios from 'axios'

var instance = axios.create({
  baseURL: '/api/adminApi/',
  timeout: 15000
})

export default instance;
