import {reactive, ref} from "vue";

export function useValidation() {
  let rules = ref({});
  let errors = ref({});

  function validate() {
    for (let key in rules.value) {
      let ruleSet = rules.value[key];

      ruleSet.split("|").forEach(
        function (value) {
          if (value === "required") {
            if (!requiredRuleCheck(propValue(key))) {
              errors[key] = key + " is required";
            }
          }

          if (value.toLowerCase().includes("min:")) {
            let parts = value.split(":");
            if (!minRuleCheck(propValue(key), parts[1])) {
              errors[key] = key + " minimum range: " + parts[1];
            }
          }

          if (value.toLowerCase().includes("max:")) {
            let parts = value.split(":");
            if (!maxRuleCheck(propValue(key), parts[1])) {
              errors[key] = key + " maximum range: " + parts[1];
            }
          }
        }.bind(this)
      );
    }
  }

  function formError(name) {
    return errors[name];
  }

  function propValue(name) {
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
  }

  function requiredRuleCheck(value) {
    return value.length >= 1;
  }

  function minRuleCheck(value, limit) {
    return value.length >= limit;
  }

  function maxRuleCheck(value, limit) {
    return value.length <= limit;
  }

  return { rules, formError, validate };
}
