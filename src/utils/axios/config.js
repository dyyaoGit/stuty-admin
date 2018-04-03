import axios from 'axios'

var instance = axios.create({
  baseURL: '/api/',
  timeout: 15000
})

export default instance;
