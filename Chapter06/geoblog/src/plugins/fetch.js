import router from "../router";
import store from "../store";

let baseUrl;

export default {
  install(Vue, options) {
    console.log("Installed", options);
    baseUrl = options.baseUrl;

    Vue.prototype.$fetch = $fetch;
  }
};

export async function $fetch(url, options) {
  const finalOptions = Object.assign(
    {},
    {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    },
    options
  );

  const res = await fetch(`${baseUrl}${url}`, finalOptions);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status == 403) {
    store.dispatch("logout");
  } else {
    const message = await res.text();
    const error = new Error(message);
    error.response = res;
    throw error;
  }
}
