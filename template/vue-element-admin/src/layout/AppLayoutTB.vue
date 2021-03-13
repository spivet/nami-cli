<template>
  <el-container class="TopBottomLayout-container">
    <el-header>
      <NavBar />
    </el-header>

    <el-container class="main-container">
      <el-aside width="auto" class="aside">
        <SideBar />
      </el-aside>

      <el-main>
        <RouterView />
        <!-- <MainContent /> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar/index.vue';
// import MainContent from './MainContent.vue';

export default {
  name: 'TopBottomLayout',
  components: {
    NavBar,
    SideBar,
    // MainContent,
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
  background-color: #304156;
}

.main-container {
  overflow: hidden;
}

.el-aside {
  background-color: #304156;
}

.el-main {
  background-color: #F6F6F6;
}
</style>
