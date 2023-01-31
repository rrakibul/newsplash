import { ref, watch } from "vue";

export function useStorage(key, val = null) {
  let storedVal = read();

  if (storedVal) {
    val = ref(storedVal);
  } else {
    val = ref(val);
  }

  function read() {
    return JSON.parse(localStorage.getItem(key));
  }

  watch(val, write, { deep: true });

  function write() {
    if (val.value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(val.value));
    }
  }

  return val;
}
