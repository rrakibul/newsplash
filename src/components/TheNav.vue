<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

let user = ref({});
let isLoggedIn = ref(false);
let router = useRouter();

onMounted(() => {
  let _user = JSON.parse(localStorage.getItem("userData"));
  if (_user) {
    isLoggedIn.value = true;
  }
});

function logout() {
  localStorage.removeItem("userData");
  isLoggedIn.value = false;
  router.push("/login")
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/signup" v-if="!isLoggedIn">Sign Up</RouterLink>
    <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <a @click.prevent="logout()" class="cursor-pointer" v-if="isLoggedIn">Logout</a>
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
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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