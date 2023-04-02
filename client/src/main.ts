// import { dayjs } from "dayjs";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import fa from "element-plus/dist/locale/fa.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/tailwind.css";
const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(ElementPlus, {
  locale: fa,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
