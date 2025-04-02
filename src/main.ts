import { createApp } from "vue";
import "./style.css";
import App from "../src/App.vue";
import PrimeVue from 'primevue/config';


createApp(App).mount("#app");
App.use(PrimeVue);
