import { getCurrentInstance } from "vue";
import globalHelpers from "../helpers/globalHelpers";

export function useGlobalHelpers() {
  const vm = getCurrentInstance();
  return (vm.appContext.config.globalProperties.$globalHelpers = globalHelpers);
}

// example
// import { useGlobalHelpers } from './composables/useGlobalHelpers'
// const gHelpers = useGlobalHelpers()
// gHelpers.helperName()
