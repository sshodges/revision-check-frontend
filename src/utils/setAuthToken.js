import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Auth'] = token;
    return true;
  }

  delete axios.defaults.headers.common['Auth'];
  return false;
};

export default setAuthToken;
