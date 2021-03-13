<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-box">
        <img src="@/assets/logo.png" class="title-logo">
        运荔枝·平台管理中心
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入OA邮箱"
          name="username"
          type="email"
          size="large"
          clearable
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入OA邮箱的密码"
          name="password"
          clearable
          size="large"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        native-type="submit"
        class="btn-submit"
        size="large"
        @click="handleLogin"
      >
        登录
      </el-button>
    </el-form>

    <footer class="footer">
      &copy; 版权所有：成都运荔枝科技有限公司    备案号：蜀ICP备19017829号-1
    </footer>
  </div>
</template>

<script>
import { login } from '@/api/user';
import { setToken } from '@/utils/auth';
import { localStorageSet } from '@/utils/localStorage';
import { USER } from '@/constant/storage';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'liuhz@newhope.cn',
        password: '111111',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs.loginForm.validate()
        .then(() => login(this.loginForm))
        .then((res) => {
          const { token } = res;
          setToken(token);
          localStorageSet(USER, res);
          this.$router.replace({ path: this.redirect || '/' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.title-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
}
.title-logo {
  width: 40px;
  margin-right: 20px;
}

.login-form {
  flex: 1;
  width: 460px;
  margin: 200px auto 0;
}
.btn-submit {
  width: 100%;
  font-size: 16px;
}

.footer {
  padding-bottom: 80px;
  color: #8590a6;
  text-align: center;
}
</style>
