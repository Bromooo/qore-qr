<template>
  <div class="hld auth">
    <h4 class="mb-3">Sign Up</h4>
    <form @submit.prevent="submit">
      <div class="form-group mt-3">
        <label for="fname">First Name</label>
        <input
          type="text"
          id="fname"
          class="form-control shadow-none"
          placeholder="John"
          v-model="fname"
        />
      </div>
      <div class="form-group mt-3">
        <label for="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          class="form-control shadow-none"
          placeholder="Doe"
          v-model="lname"
        />
      </div>
      <div class="form-group mt-3">
        <label for="email">Email Address</label>
        <input
          type="text"
          id="email"
          class="form-control shadow-none"
          placeholder="example@domain.com"
          v-model="email"
        />
      </div>
      <div class="form-group mt-3">
        <label for="pasw">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="pasw"
          class="form-control shadow-none"
          v-model="password"
        />
        <p v-if="password.length && !password.match(passwordRegex)" class="err">
          Passwords must be up to 8 characters and must include numbers and
          special characters between !@#$%^&
        </p>
      </div>
      <div class="form-group mt-3">
        <label for="cpasw">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="cpasw"
          class="form-control shadow-none"
          v-model="cpassword"
        />
        <p v-if="cpassword.length && cpassword !== password" class="err">
          Passwords must match
        </p>
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
      Already have an account? <router-link to="login">Login</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
      passwordRegex: /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[!@#$%^&*.,])(?=.{8,})/,
    };
  },
  computed: {
    valid() {
      var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      var passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[!@#$%^&*.,])(?=.{8,})/;
      return (
        this.email.match(validRegex) &&
        this.password.match(passwordRegex) &&
        // this.cpassword.length &&
        this.fname.length &&
        this.lname.length &&
        this.password === this.cpassword
      );
    },
  },
  methods: {
    submit() {
      if (this.valid) {
        var payload = {
          path: "/users/signup",
          data: {
            firstname: this.fname,
            lastname: this.lname,
            email: this.email,
            password: this.password,
          },
        };

        // console.log(payload);
        // return;
        this.$store
          .dispatch("authRequest", payload)
          .then((resp) => {
            // console.log(resp.data.message);
            this.$toast.success(
              "Sign Up",
              resp.data.message + ". Kindly check your mail to confirm before proceeding to login",
              this.$toastPosition
            );
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          })
          .catch((err) => {
            // console.log(err);
            if (err.response) {
              this.$toast.error(
                "Sign Up",
                err.response.data.error.message,
                this.$toastPosition
              );
            } else {
              this.$toast.error(
                "Sign Up",
                "Something went wrong",
                this.$toastPosition
              );
            }
          });
      } else {
        this.$toast.error(
          "Sign Up",
          "Details not complete",
          this.$toastPosition
        );
      }

      // localStorage.setItem("token", "Yogee");
      // setTimeout(() => {
      //   // this.$router.push("/");
      //   window.location.href = "/";
      // }, 1000);
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