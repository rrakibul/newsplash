<script setup>
import { ref, onMounted, provide } from "vue";
import { useValidation } from "../composables/useValidation";
import { useStorage } from "../composables/useStorage";
import { useCounterStore } from "../stores/CounterStore";

let title = ref("");
let email = useStorage("email");
let password = ref();
let counter = useCounterStore();

let validation = useValidation();

validation.setOptions(
  {
    email: "min:3",
    password: "required|min:2|max:5",
  },
  { email, password },
  {
    "email|required": "this field is required",
    "email|min:3": "min {value} characters required",
    "password|max:5": "can't exceed {value} characters",
  }
);

onMounted(function () {
  title.value = "Login Page";
  console.log("mounted");
});

function submit() {
  console.log("submitted");
  //console.log(email.value);
  //console.log(password.value);

  validation.validate();
}
</script>

<template>
  <div>
    <!-- This is an example component -->
    <button @click="counter.increment()" :disabled="!counter.remaining">
      Increment ({{ counter.remaining }} Remaining)
    </button>
    <div class="max-w-2xl mx-auto bg-white p-16">
      <div class="mb-6">
        <h4 class="font-medium leading-tight text-3xl mt-0 text-green-600">
          {{ $globalHelpers.limitTo(title, 4) }}
        </h4>
      </div>
      <form @submit.prevent="submit" novalidate>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            v-model="email"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" :v-if="validation.formError('email')">
              {{ validation.formError("email") }}
            </span>
          </p>
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            v-model="password"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" :v-if="validation.formError('password')">
              {{ validation.formError("password") }}
            </span>
          </p>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
