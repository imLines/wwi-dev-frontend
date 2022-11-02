//AXIOS
//https://axios-http.com/docs/config_defaults
import hostName from '../../../config';

axios.defaults.baseURL = hostName;
axios.post('/', {}) 