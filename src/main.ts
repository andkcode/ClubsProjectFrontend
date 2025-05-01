import { createApp } from "vue";
import "./style.css";
import App from "../src/App.vue";
import axios from 'axios';
import router from './router';
import { useAuth } from './composables/useAuth';

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = '/login'; 
    }
    return Promise.reject(err);
  }
);

const { refreshAuth } = useAuth();
refreshAuth();

createApp(App).use(router).mount("#app");
