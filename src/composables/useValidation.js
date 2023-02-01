import { ref } from "vue";

export function useValidation() {
  let rules = {},
    fields = {},
    messages = {},
    errors = ref({}),
    defaultMessages = {
      required: "this is required",
      min: "min range {value}",
      max: "max range {value}",
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

      ruleSet.split("|").forEach(function (value) {
        if (value === "required") {
          if (isEmpty(fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("min:")) {
          let parts = value.split(":");
          if (!rangeCheck("min", parts[1], fields[key].value)) {
            handleErrorMessage(key, value);
          }
        }

        if (!ignoreErrorChecking(key) && value.toLowerCase().includes("max:")) {
          let parts = value.split(":");
          if (!rangeCheck("max", parts[1], fields[key].value)) {
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

  function rangeCheck(rule, limit, value) {
    if (value === null || value === undefined) {
      return false;
    }

    switch (rule) {
      case "min":
        return minRuleCheck(value, limit);
      case "max":
        return maxRuleCheck(value, limit);
    }
  }

  function minRuleCheck(value, limit) {
    return value.length >= limit;
  }

  function maxRuleCheck(value, limit) {
    return value.length <= limit;
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
