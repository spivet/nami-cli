<template>
  <el-container class="LeftRightLayout-container">
    <el-aside width="auto" class="aside">
      <SideBar />
    </el-aside>

    <el-container>
      <el-header>
        <NavBar />
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar/index.vue';

export default {
  name: 'LeftRightLayout',
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      isSideBarCollapse: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #001529;
}

.el-aside {
  background-color: #001529;
}

.el-main {
  background-color: #F6F6F6;
}
</style>
