import { createStore } from "vuex";
import http from "../utilities/httpRequest";

export default createStore({
  state: {
    isLoginned: false,
    user: null,
    posts: [],
    categories: [],
    currencies: [],
    cities: [],
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    isLoginned(state) {
      return state.isLoginned;
    },
    user(state) {
      return state.user;
    },
    userId(state) {
      return state.user?.id;
    },
    currencies(state) {
      return state.currencies;
    },
    categories(state) {
      return state.categories;
    },
    cities(state) {
      return state.cities;
    },
    myPosts(state) {
      return state.posts.filter((post) => post.user_id === state.user?.id);
    },
  },
  mutations: {
    SET_IS_LOGINNED(state, login) {
      state.isLoginned = login;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_CURRENCIES(state, currencies) {
      state.currencies = currencies;
    },
  },
  actions: {
    isLoginned({ commit }, login) {
      commit("SET_IS_LOGINNED", login);
    },
    getUser({ commit }, user) {
      commit("SET_USER", user);
    },
    async getPosts({ commit }) {
      const posts = await http.get("/posts");
      commit("SET_POSTS", posts.data);
    },
    async getCategories({ commit }) {
      const categories = await http.get("/categories");
      commit("SET_CATEGORIES", categories.data);
    },
    async getCities({ commit }) {
      const cities = await http.get("/cities");
      commit("SET_CITIES", cities.data);
    },
    async getCurrencies({ commit }) {
      const currencies = await http.get("/currencies");
      commit("SET_CURRENCIES", currencies.data);
    },
  },
});
