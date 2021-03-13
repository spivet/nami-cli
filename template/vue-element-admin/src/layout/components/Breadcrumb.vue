<template>
  <div class="Breadcrumb-container">
    <el-breadcrumb separator="/">
      <template v-for="(route, index) in breadcrumbList">
        <el-breadcrumb-item
          v-if="showPath && (index !== breadcrumbList.length - 1)"
          :key="route.name"
          :to="{ path: route.path || null}"
        >
          {{ route.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="route.name">
          {{ route.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    showPath: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    breadcrumbList() {
      const matchedRoutes = this.$route.matched;
      // 路由配置中，跟路由 '/' 这一级不展示
      return this.$route.meta.breadcrumb || matchedRoutes.splice(1);
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.Breadcrumb-container {
  margin-bottom: 20px;
}
</style>
