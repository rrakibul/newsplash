import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import globalHelpers from "./helpers/globalHelpers";

import "./assets/main.css";
import "./app.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);

app.config.globalProperties.$globalHelpers = globalHelpers;

app.use(router);
app.use(pinia);

app.mount("#app");
