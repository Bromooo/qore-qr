<template>
  <div class="hld auth">
    <h4 class="mb-3">Sign In</h4>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="text"
          id="email"
          class="form-control shadow-none"
          placeholder="example@domain.com"
          v-model="email"
        />
      </div>
      <div class="form-group mt-4">
        <label for="pasw">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="pasw"
          class="form-control shadow-none"
          v-model="password"
        />
      </div>
      <div class="form-group mt-4">
        <input
          type="submit"
          value="Submit"
          :disabled="!valid"
          class="btn btn-primary outline-none shadow-none w-100"
        />
      </div>
    </form>
    <p class="redir">
      Don't have an account? <router-link to="register">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    valid() {
      var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return this.email.match(validRegex) && this.password.length;
    },
  },
  methods: {
    submit() {
      var payload = {
        path: "/users/login",
        data: {
          email: this.email,
          password: this.password,
        },
      };

      this.$store
        .dispatch("authRequest", payload)
        .then((resp) => {
          // console.log(resp.data.message);
          this.$toast.success(
            "Login",
            resp.data.message,
            this.$toastPosition
          );
          console.log(resp.data);
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("user", resp.data.userId);
          // this.$store.commit("token");
          // this.$store.commit("user");

          // console.log("/" + this.$store.getters.redirect);
          // return;
          setTimeout(() => {
            this.$store.commit("redir");
            if (this.$store.getters.redirect) {
              localStorage.removeItem("re");
              window.location.href = "/" + this.$store.getters.redirect;
            } else {
              window.location.href = "/";
            }
          }, 1000);
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(
              "Login",
              err.response.data.error.message,
              this.$toastPosition
            );
          } else {
            console.log(err);
            this.$toast.error(
              "Login",
              "Something went wrong",
              this.$toastPosition
            );
          }
        });

      // console.log(payload);
    },
  },
};
</script>

<style>
p.redir {
  margin: 0;
  margin-top: 12px;
  font-size: 0.9rem;
}
</style>