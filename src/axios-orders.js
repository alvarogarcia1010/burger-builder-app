import axios from "axios";

const instance = axios.create({
  baseURL: 'https://burger-builder-app-3a30d.firebaseio.com/'
});

export default instance;