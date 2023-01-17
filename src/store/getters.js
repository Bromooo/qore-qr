export const getters = {
  isLoggedIn: state => !!state.token,
  redirect: state => state.redirect,
}