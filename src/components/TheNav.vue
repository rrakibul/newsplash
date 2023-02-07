<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";

let isLoggedIn = ref(false);
let auth = useAuthStore();

onMounted(() => {
  console.log("onMounted");
  isLoggedIn.value = auth.isLoggedIn();
});

onUpdated(() => {
  console.log("onUpdated");
  isLoggedIn.value = auth.isLoggedIn();
});

function logout() {
  auth.logoutUser();
  window.location.href = "/";
  // router.push("/login");
}
</script>

<template>
  <nav>
    <RouterLink to="/" v-if="isLoggedIn">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/signup" v-if="!isLoggedIn">Sign Up</RouterLink>
    <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <a @click.prevent="logout()" class="cursor-pointer" v-if="isLoggedIn"
      >Logout</a
    >
  </nav>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: yellowgreen;
}

nav a.router-link-exact-active:hover {
  /*background-color: transparent;*/
  background-color: greenyellow;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
