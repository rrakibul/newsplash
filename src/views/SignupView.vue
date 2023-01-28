<script>
export default {
  data() {
    return {
      title: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: [],
    };
  },
  mounted() {
    this.title = "Sign Up";
  },
  methods: {
    formError(name) {
      if (this.errors[name] !== "undefined") {
        return this.errors[name];
      }

      return null;
    },
    rules() {
      return {
        "form.firstName": "required|min:2",
        "form.lastName": "required|max:5",
      };
    },
    validate() {
      let rules = this.rules();
      this.errors = [];

      for (let key in rules) {
        let ruleSet = rules[key];

        ruleSet.split("|").forEach(
          function (value) {
            if (value === "required") {
              if (!this.requiredRuleCheck(this.propValue(key))) {
                this.errors[key] = key + " is required";
              }
            }

            if (value.toLowerCase().includes("min:")) {
              let parts = value.split(":");
              if (!this.minRuleCheck(this.propValue(key), parts[1])) {
                this.errors[key] = key + " minimum range: " + parts[1];
              }
            }

            if (value.toLowerCase().includes("max:")) {
              let parts = value.split(":");
              if (!this.maxRuleCheck(this.propValue(key), parts[1])) {
                this.errors[key] = key + " maximum range: " + parts[1];
              }
            }
          }.bind(this)
        );
      }
    },
    propValue(name) {
      let parts = name.split(".");

      //todo: make it dynamic
      switch (parts.length) {
        case 2:
          return this.$data[parts[0]][parts[1]];
        case 3:
          return this.$data[parts[0]][parts[1]][parts[2]];
        case 4:
          return this.$data[parts[0]][parts[1]][parts[2]][parts[3]];
        default:
          return null;
      }
    },
    requiredRuleCheck(value) {
      return value.length >= 1;
    },
    minRuleCheck(value, limit) {
      return value.length >= limit;
    },
    maxRuleCheck(value, limit) {
      return value.length <= limit;
    },
    submit() {
      this.validate();
      console.log(this.errors);
    },
  },
};
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
      <form @submit.prevent="submit">
        <div class="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >First name</label
            >
            <input
              type="text"
              v-model="form['firstName']"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
            />
            <p class="mt-2 text-sm text-green-600 dark:text-green-500">
              <span class="font-medium" :v-if="formError('form.firstName')">
                {{ formError("form.firstName") }}
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
              v-model="form['lastName']"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              :v-if="formError('form.lastName')"
            >
              <span class="font-medium">{{ formError("form.lastName") }}</span>
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <!--        <div class="mb-6">-->
        <!--          <label-->
        <!--            for="password"-->
        <!--            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"-->
        <!--            >Password</label-->
        <!--          >-->
        <!--          <input-->
        <!--            type="password"-->
        <!--            id="password"-->
        <!--            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
        <!--            placeholder="•••••••••"-->
        <!--            required-->
        <!--          />-->
        <!--        </div>-->
        <!--        <div class="mb-6">-->
        <!--          <label-->
        <!--            for="confirm_password"-->
        <!--            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"-->
        <!--            >Confirm password</label-->
        <!--          >-->
        <!--          <input-->
        <!--            type="password"-->
        <!--            id="confirm_password"-->
        <!--            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
        <!--            placeholder="•••••••••"-->
        <!--            required-->
        <!--          />-->
        <!--        </div>-->
        <!--        <div class="flex items-start mb-6">-->
        <!--          <div class="flex items-center h-5">-->
        <!--            <input-->
        <!--              id="remember"-->
        <!--              type="checkbox"-->
        <!--              value=""-->
        <!--              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"-->
        <!--              required-->
        <!--            />-->
        <!--          </div>-->
        <!--          <label-->
        <!--            for="remember"-->
        <!--            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"-->
        <!--            >I agree with the-->
        <!--            <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"-->
        <!--              >terms and conditions</a-->
        <!--            >.</label-->
        <!--          >-->
        <!--        </div>-->
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
