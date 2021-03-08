import TokenService from './token.service'
import axios from 'axios'

const configs = {
  development: {
    SERVER_URI: "http://localhost:5000/api",
  },
  production: {
    SERVER_URI: "https://dqueue97.herokuapp.com/api",
  },
};

const base_url = configs[process.env.NODE_ENV].SERVER_URI;

const ApiService = {

  setAuthHeader() {
    /**
     * Set default header which will be sent with every request
     */
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource, params = null) {
    return axios.get(`${base_url+resource}`, { params })
  },

  post(resource, data) {
    return axios.post(`${base_url + resource}`, data);
  },

  put(resource, data) {
    return axios.put(`${base_url + resource}`, data);
  },

  delete(resource) {
    return axios.delete(`${base_url + resource}`);
  }

}

export default ApiService