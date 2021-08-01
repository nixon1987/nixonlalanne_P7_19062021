import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.Authorization = "Bearer " + user.token;

    // instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      nom: "",
      prenom: "",
      email: "",
    },
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = "Bearer " + user.token;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      // instance.defaults.headers.common["Authorization"] =
      //   "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function(state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function(state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/user/login", userInfos)
          .then(function(response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/user/createAccount", userInfos)
          .then(function(response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      instance
        .get("/posts")
        .then(function(response) {
          commit("userInfos", response.data.infos);
        })
        .catch(function() {});
    },
  },
});

export default store;
