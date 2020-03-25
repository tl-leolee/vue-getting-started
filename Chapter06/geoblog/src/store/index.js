import Vue from "vue";
import Vuex from "vuex";
import { $fetch } from "../plugins/fetch";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state() {
    return {
      user: null
    };
  },
  mutations: {
    user: (state, user) => {
      state.user = user;
    }
  },
  getters: {
    user: state => state.user,
    userPicture: (state, getters) => {
      const user = getters.user;
      if (user) {
        const { photos } = user.profile;
        if (photos.length != 0) {
          return photos[0].value;
        }
      }
    }
  },
  actions: {
    async login({ commit }) {
      try {
        const user = await $fetch("/user");
        commit("user", user);

        if (user) {
          router.replace(
            router.currentRoute.params.wantedRoute || { name: "home" }
          );
        }
      } catch (e) {
        console.warn(e);
      }
    },
    logout({ commit }) {
      commit("user", null);
      $fetch("logout");
      if (router.currentRoute.matched.some(r => r.meta.private)) {
        router.replace({
          name: "login",
          params: {
            wantedRoute: router.currentRoute.fullPath
          }
        });
      }
    },
    async init({ dispatch }) {
      await dispatch("login");
    }
  }
});

export default store;
