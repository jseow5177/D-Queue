import TokenService from './token.service'
import axios from 'axios'

const customAxios = axios.create({
  baseURL: "/api"
})

const ApiService = {
  setAuthHeader() {
    /**
     * Set default header which will be sent with every request
     */
    customAxios.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`
  },

  removeHeader() {
    customAxios.defaults.headers.common = {}
  },

  get(resource, params = null) {
    return customAxios.get(resource, { params })
  },

  post(resource, data) {
    return customAxios.post(resource, data)
  },

  put(resource, data) {
    return customAxios.put(resource, data)
  },

  delete(resource) {
    return customAxios.delete(resource)
  }
}

export default ApiService