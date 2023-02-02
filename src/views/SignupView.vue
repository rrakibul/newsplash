<script setup>
import { ref } from "vue";
import { useValidation } from "../composables/useValidation";
import { useStorage } from "../composables/useStorage";

let title = "Sign Up";
let firstName = useStorage("firstName");
let lastName = useStorage("lastName");
let email = useStorage("email");
let password = ref("");
let confirmPassword = ref("");

let validation = useValidation();
validation.setOptions(
  {
    firstName: "required|min:2|alphanumeric",
    lastName: "required|min:2",
    email: "required|email",
    password: "required|confirm_password:confirmPassword",
  },
  { firstName, lastName, email, password }
);

function submit() {
  if (validation.validate()) {
    console.log("validation success");
  }
}
</script>

<template>
  <div>
    <!-- This is an example component -->
    <div class="max-w-2xl mx-auto bg-white p-16">
      <div class="mb-6">
        <h4 class="font-medium leading-tight text-3xl mt-0 text-green-600">
          {{ title }}
        </h4>
        <h5>It's quick and easy.</h5>
      </div>
      <form @submit.prevent="submit" novalidate>
        <div class="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >First name</label
            >
            <input
              type="text"
              v-model="firstName"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              <span
                class="font-medium"
                :v-if="validation.hasFieldError('firstName')"
              >
                {{ validation.fieldError("firstName") }}
              </span>
            </p>
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Last name</label
            >
            <input
              type="text"
              v-model="lastName"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              <span
                class="font-medium"
                :v-if="validation.hasFieldError('lastName')"
              >
                {{ validation.fieldError("lastName") }}
              </span>
            </p>
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" :v-if="validation.hasFieldError('email')">
              {{ validation.fieldError("email") }}
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
            v-model="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" :v-if="validation.hasFieldError('password')">
              {{ validation.fieldError("password") }}
            </span>
          </p>
        </div>
        <div class="mb-6">
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Confirm password</label
          >
          <input
            type="password"
            id="confirm_password"
            v-model="confirmPassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >I agree with the
            <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
              >terms and conditions</a
            >.</label
          >
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Signup
        </button>
      </form>
    </div>
  </div>
</template>
