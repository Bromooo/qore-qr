export const mutations = {
  logout(state) {
    state.token = "";
  },
  redir(state) {
    state.redirect = localStorage.getItem("re");
  }
}