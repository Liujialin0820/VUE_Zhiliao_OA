<script setup name="login">
import login_image from "@/assets/image/login.png";
import axios from "axios";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { login } from "@/apis/authHttp";

const authStore = useAuthStore();
const router = useRouter();

let form = reactive({
  email: "",
  password: "",
});

const onSubmit = async () => {
  // 版本1 直接使用axios
  // axios
  //   .post("http://localhost:8000/auth/login/", form)
  //   .then((res) => {
  //     let data = res.data;
  //     let user = data.user;
  //     let token = data.token;
  //     authStore.setUserToken(user, token);
  //     router.push("/");
  //   })
  //   .catch((err) => {
  //     let detail = err;
  //     alert(detail);
  //   });
  // 版本2 使用封装的axios
  // login(form.email, form.password)
  //   .then((res) => {
  //     let data = res.data;
  //     let user = data.user;
  //     let token = data.token;
  //     authStore.setUserToken(user, token);
  //     router.push("/");
  //   })
  //   .catch((err) => {
  //     let detail = err;
  //     alert(detail);
  //   });

  // 服务器不够快, 所以用.then 来做回调, 但是不够优雅
  // 用async await 来做
  // 可以封装的时候 返回一个promise对象
  // 版本3 异步调用
  try {
    let data = await login(form.email, form.password);
    let user = data.user;
    let token = data.token;
    authStore.setUserToken(user, token);
    router.push("/");
  } catch (err) {
    let detail = err;
    alert(detail);
  }
};
</script>

<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img :src="login_image" alt="IMG" />
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title"> 员工登陆 </span>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="邮箱"
              v-model="form.email"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              name="password"
              placeholder="密码"
              v-model="form.password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="onSubmit">登陆</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/css/login.css"></style>
<style scoped src="@/assets/iconfont/iconfont.css"></style>
