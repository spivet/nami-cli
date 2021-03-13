<template>
  <div class="SideBar-root">
    <MenuList :is-collapse="isCollapse" />

    <div class="collapse-box" @click="isCollapse = !isCollapse">
      <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" />
    </div>
  </div>
</template>

<script>
import MenuList from './MenuList.vue';

export default {
  name: 'SideBar',
  components: {
    MenuList,
  },
  props: {},
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.SideBar-root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.el-menu-vertical-demo{
  border-right: 0;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

.collapse-box {
  padding: 4px;
  background-color: #001529;
  color: #fff;
  text-align: center;
}
</style>
