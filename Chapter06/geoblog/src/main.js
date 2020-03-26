import "babel-polyfill";
import Vue from "vue";
import VueFetch, { $fetch } from "./plugins/fetch";
import App from "./components/App.vue";
import router from "./router";
import * as filters from "./filters";
import store from "./store";
import { sync } from "vuex-router-sync";
import VueGoogleMaps from "vue-googlemaps";

console.log(filters);
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(VueFetch, {
  baseUrl: "http://localhost:3000"
});

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: "AIzaSyCE1TMVyv6fXkF8nT0ANsS2z4FutUSK3FM",
    libraries: ["places"]
  }
});

sync(store, router);

async function main() {
  await store.dispatch("init");
  new Vue({
    ...App,
    el: "#app",
    router,
    store
  });
}

main();
