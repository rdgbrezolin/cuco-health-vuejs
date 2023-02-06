import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { VueMaskDirective } from "v-mask";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Paginate from "vuejs-paginate-next";

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
};

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
};

createApp(App)
  .use(Paginate)
  .use(router)
  .use(VueSweetalert2, options)
  .directive("mask", vMaskV3)
  .mount("#app");
