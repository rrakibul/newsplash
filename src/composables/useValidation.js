import { ref } from "vue";

export function useValidation() {
  let rules = {},
    fields = {},
    messages = {},
    errors = ref({}),
    defaultMessages = {
      required: "This field is required",
      min: "Minimum range {value}",
      max: "Maximum range {value}",
      email: "This is not a valid email address",
      alphanumeric: "Only alphabet (A-Z or a-z) or any number (0-9) is allowed",
      confirm_password: "Password does not match with confirm password",
    };

  function setOptions(_rules = {}, _fields = {}, _messages = {}) {
    rules = _rules;
    fields = _fields;
    messages = _messages;
  }

  function setRules(_rules) {
    rules = _rules;
  }

  function setFields(_fields) {
    fields = _fields;
  }

  function setMessages(_messages) {
    messages = _messages;
  }

  function validate() {
    errors.value = {};

    for (let key in rules) {
      let ruleSet = rules[key];

      if (!objectKeyExists(fields, key)) {
        continue;
      }

      ruleSet.split("|").forEach(function (value) {
        if (value.toLowerCase() === "required") {
          if (isEmpty(fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("min:")) {
          if (!rangeCheck("min", value, fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("max:")) {
          if (!rangeCheck("max", value, fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase() === "email") {
          if (!isValidEmail(fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (
          !ignoreErrorChecking(key) &&
          value.toLowerCase() === "alphanumeric"
        ) {
          if (!isAlphanumeric(fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (
          !ignoreErrorChecking(key) &&
          value.toLowerCase().includes("confirm_password:")
        ) {
          if (!confirmPassword(value, fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }
      });
    }

    return !hasError();
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

  function isEmpty(value) {
    return !(value !== null && value !== undefined && value.length >= 1);
  }

  function rangeCheck(rule, ruleDef, value) {
    if (value === null || value === undefined) {
      return false;
    }

    let parts = ruleDef.split(":");
    switch (rule) {
      case "min":
        return minRuleCheck(value, parts[1]);
      case "max":
        return maxRuleCheck(value, parts[1]);
    }
  }

  function minRuleCheck(value, limit) {
    return value.length >= limit;
  }

  function maxRuleCheck(value, limit) {
    return value.length <= limit;
  }

  function isValidEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }

  function confirmPassword(ruleDef, value) {
    let parts = ruleDef.split(":");

    if (!objectKeyExists(fields, parts[1])) {
      return;
    }

    return value === fields[parts[1]].value;
  }

  function isAlphanumeric(value) {
    return /^[0-9a-zA-Z]+$/.test(value);
  }

  function handleErrorMessage(key, value) {
    let parts = value.split(":");

    if (messageExists(key + "|" + value)) {
      errors.value[key] = messages[key + "|" + value].replace(
        "{value}",
        parts[1]
      );
    } else {
      errors.value[key] = defaultMessages[parts[0]].replace(
        "{value}",
        parts[1]
      );
    }
  }

  function fieldError(name) {
    return errors.value[name];
  }

  function hasFieldError(name) {
    return objectKeyExists(errors.value, name);
  }

  return {
    rules,
    fieldError,
    hasFieldError,
    validate,
    setOptions,
    setRules,
    setFields,
    setMessages,
  };
}
