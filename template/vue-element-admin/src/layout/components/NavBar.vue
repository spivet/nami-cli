<template>
  <div class="NavBar-container">
    <div class="logo-box">
      <img src="@/assets/logo.png" class="logo">
      运荔枝 · 平台管理中心
    </div>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        {{ oaUserName }}
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item @click.native="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth';
import { localStorageGet, localStorageRemove } from '@/utils/localStorage';
import { USER } from '@/constant/storage';

export default {
  name: 'NavBar',
  data() {
    return {
      userInfo: localStorageGet(USER),
    };
  },
  computed: {
    oaUserName() {
      return this.userInfo?.ext?.oaUserName ?? '';
    },
  },
  created() {},
  mounted() {},
  methods: {
    logout() {
      removeToken();
      localStorageRemove(USER);
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.NavBar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: inherit;
}
.logo-box {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.logo {
  width: 36px;
  margin-right: 8px;
  margin-bottom: 6px;
}
.avatar-wrapper {
  cursor: pointer;
}

.avatar-wrapper {
  color: #fff;
}
</style>
