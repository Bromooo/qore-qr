export const state = {
  token: localStorage.getItem("token") || "",
  redirect: localStorage.getItem("re"),
}