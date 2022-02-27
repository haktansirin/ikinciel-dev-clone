import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/main.scss";
import httpRequest from "@/utilities/httpRequest";
import moment from "moment";

const app = createApp(App);
app.config.globalProperties.$http = httpRequest;
app.config.globalProperties.$filters = {
  numberFormatter(number) {
    return Intl.NumberFormat().format(number);
  },
  dateFormatter(number) {
    return moment(number).locale("tr").startOf("minute").fromNow();
  },
};
app.use(store).use(router).mount("#app");
