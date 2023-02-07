import { defineStore } from "pinia";

export let useAuthStore = defineStore("auth", {
  // data
  state() {
    return {
      user: null,
      loggedIn: false,
    };
  },
  // methods
  actions: {
    setUser(user) {
      this.user = user;
      this.loggedIn = true;
    },
    logoutUser() {
      this.user = null;
      this.loggedIn = false;
    },
    isLoggedIn() {
      return this.loggedIn;
    },
  },
  // computed
  getters: {
    userName() {
      return this.loggedIn ? this.user.name : "N/A";
    },
  },
  persist: true,
});

// example
// import {useCounterStore} from "@/stores/CounterStore"
// <button @click="counter.increment()" :disabled="! counter.remaining">Increment ({{ counter.remaining }} Remaining)</button>
