<template>
  <div v-if="loading" class="loding">
    <div>
      <span class="oneLod"></span>
      <span class="twoLod"></span>
    </div>
  </div>
  <div v-else class="about">
    <div class="success-checkmark">
      <div class="check-icon">
        <span class="icon-line line-tip"></span>
        <span class="icon-line line-long"></span>
        <div class="icon-circle"></div>
        <div class="icon-fix"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    if (this.$route.params.emailToken && !this.$store.getters.isLoggedIn) {
      this.$store
        .dispatch("verify", this.$route.params.emailToken)
        .then((resp) => {
          this.$toast.success(
            "Verify Email Address",
            resp.data.message,
            this.$toastPosition
          );
          this.$router.push("/login");
        })
        .catch((err) => {
          // console.log(err);
          if (err.response) {
            this.$toast.error(
              "Verify Email Address",
              err.response.data.error.message,
              this.$toastPosition
            );
          } else {
            this.$toast.error(
              "Verify Email Address",
              "Something went wrong",
              this.$toastPosition
            );
          }
          this.$router.push("/login");
        });
    } else {
      this.$router.push("/");
    }
    // if()
    // setTimeout(() => {
    //   this.loading = false;
    //   setTimeout(() => {
    //     this.$router.push("/");
    //   }, 2000);
    // }, 3000);
  },
};
</script>
<style lang="scss" scoped>
@keyframes lod1 {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.loding {
  div {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    span {
      background-color: #000;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      &.oneLod {
        animation: lod1 2s infinite;
      }
      &.twoLod {
        animation: lod1 2s alternate-reverse infinite;
        animation-delay: 0.8s;
      }
    }
  }
}
.success-checkmark {
  width: 80px;
  height: 115px;
  transform: scale(2.5);
  margin: 0 auto;

  .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #4caf50;

    &::before {
      top: 3px;
      left: -2px;
      width: 30px;
      transform-origin: 100% 50%;
      border-radius: 100px 0 0 100px;
    }

    &::after {
      top: 0;
      left: 30px;
      width: 60px;
      transform-origin: 0 50%;
      border-radius: 0 100px 100px 0;
      animation: rotate-circle 4.25s ease-in;
    }

    &::before,
    &::after {
      content: "";
      height: 100px;
      position: absolute;
      background: transparent;
      transform: rotate(-45deg);
    }

    .icon-line {
      height: 5px;
      background-color: #4caf50;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 10;

      &.line-tip {
        top: 46px;
        left: 14px;
        width: 25px;
        transform: rotate(45deg);
        animation: icon-line-tip 0.75s;
      }

      &.line-long {
        top: 38px;
        right: 8px;
        width: 47px;
        transform: rotate(-45deg);
        animation: icon-line-long 0.75s;
      }
    }

    .icon-circle {
      top: -4px;
      left: -4px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      box-sizing: content-box;
      border: 4px solid rgba(76, 175, 80, 0.5);
    }

    .icon-fix {
      top: 8px;
      width: 5px;
      left: 26px;
      z-index: 1;
      height: 85px;
      position: absolute;
      transform: rotate(-45deg);
      background-color: transparent;
    }
  }
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>