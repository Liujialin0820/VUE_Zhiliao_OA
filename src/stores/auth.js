import { computed, ref } from "vue";
import { defineStore } from "pinia";

const USER_KEY = "OA_USER_KEY";
const TOKEN_KEY = "OA_TOKEN_KEY";

export const useAuthStore = defineStore("auth", () => {
  let _user = ref(null);
  let _toekn = ref(null);

  function setUserToken(user, token) {
    _user.value = user;
    _toekn.value = token;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  }

  let user = computed(() => {
    if (!_user.value) {
      _user.value = JSON.parse(localStorage.getItem(USER_KEY));
    }
    return _user.value;
  });

  let token = computed(() => {
    if (!_toekn.value) {
      _toekn.value = localStorage.getItem(TOKEN_KEY);
    }
    return _toekn.value;
  });

  return {
    setUserToken, // 设置用户和token
    user,
    token,
  };
});
