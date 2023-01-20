export const mutations = {
  logout(state) {
    state.token = "";
    state.user = "";
  },
  redir(state) {
    state.redirect = localStorage.getItem("re");
  },
}