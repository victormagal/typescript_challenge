import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/tractian/fake-api/',
});

export default instance;
