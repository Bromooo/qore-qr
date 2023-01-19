<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <div class="bod">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  background-color: #edeef0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.bod {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .hld {
    width: 300px;
    max-width: 350px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    /* &.auth {
      box-shadow: 1px 1px 10px #555;
    } */
  }
}
p.err {
  font-size: 0.9rem;
  font-weight: 500;
  color: red;
}
input[type="submit"]:disabled {
  cursor: not-allowed;
}
</style>
