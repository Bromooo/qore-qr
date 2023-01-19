export const state = {
  token: localStorage.getItem("token") || "",
  user: localStorage.getItem("user") || "",
  redirect: localStorage.getItem("re") || "",
}