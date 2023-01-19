export const getters = {
  isLoggedIn: state => !!state.token,
  user: state => state.user,
  redirect: state => state.redirect,
}