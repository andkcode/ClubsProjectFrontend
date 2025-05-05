import { createApp } from "vue";
import "./assets/style.css";
import App from "../src/App.vue";
import axios from 'axios';
import router from './router';

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = '/login'; 
    }
    return Promise.reject(err);
  }
);

createApp(App).use(router).mount("#app");

