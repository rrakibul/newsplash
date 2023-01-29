export default {
  methods: {
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
  },
};
