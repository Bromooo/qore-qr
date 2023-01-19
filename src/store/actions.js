import axios from "@/axios";
export const actions = {
  authRequest({ commit, dispatch, getters }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: payload.path,
        data: payload.data,
        method: "POST"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  verify({ commit, dispatch, getters }, token) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/users/confirm?emailToken=' + token,
        method: "GET"
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    return Promise.resolve();
  },
}