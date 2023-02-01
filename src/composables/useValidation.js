import { ref } from "vue";

export function useValidation() {
  let rules = {};
  let fields = {};
  let messages = {};
  let errors = ref({});

  function setOptions(_rules = {}, _fields = {}, _messages = {}) {
    rules = _rules;
    fields = _fields;
    messages = _messages;
  }

  function validate() {
    errors.value = {};

    for (let key in rules) {
      let ruleSet = rules[key];

      ruleSet.split("|").forEach(function (value) {
        if (value === "required") {
          if (isEmpty(fields[key].value)) {
            if (messageExists(key + "|" + value)) {
              errors.value[key] = messages[key + "|" + value];
            } else {
              errors.value[key] = key + " is required";
            }
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("min:")) {
          let parts = value.split(":");
          if (!minRuleCheck(fields[key].value, parts[1])) {
            if (messageExists(key + "|" + value)) {
              errors.value[key] = messages[key + "|" + value].replace(
                "{value}",
                parts[1]
              );
            } else {
              errors.value[key] = key + " minimum range: " + parts[1];
            }
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("max:")) {
          let parts = value.split(":");
          if (!maxRuleCheck(fields[key].value, parts[1])) {
            if (messageExists(key + "|" + value)) {
              errors.value[key] = messages[key + "|" + value].replace(
                "{value}",
                parts[1]
              );
            } else {
              errors.value[key] = key + " maximum range: " + parts[1];
            }
          }
        }
      });
    }

    return hasError();
  }

  function hasError() {
    return !(Object.keys(errors.value).length === 0);
  }

  function ignoreErrorChecking(key) {
    return objectKeyExists(errors.value, key);
  }

  function messageExists(key) {
    return objectKeyExists(messages, key);
  }

  function objectKeyExists(obj, key) {
    return Object.keys(obj).indexOf(key) !== -1;
  }

  function formError(name) {
    return errors.value[name];
  }

  function isEmpty(value) {
    return !(value !== null && value !== undefined && value.length >= 1);
  }

  function rangeCheck(rule, limit, value) {
    if (value === null || value === undefined) {
      return false;
    }

    switch (rule) {
      case "min":
        return value.length >= limit;
      case "max":
        return value.length <= limit;
    }
  }

  function minRuleCheck(value, limit) {
    if (value === null || value === undefined) {
      return false;
    }

    return value.length >= limit;
  }

  function maxRuleCheck(value, limit) {
    if (value === null || value === undefined) {
      return false;
    }

    return value.length <= limit;
  }

  return { rules, formError, validate, setOptions };
}
