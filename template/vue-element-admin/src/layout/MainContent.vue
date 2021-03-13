<template>
  <div class="MainContent-container">
    <Breadcrumb />

    <keep-alive :include="catchList">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb.vue';

export default {
  name: 'MainContent',
  components: {
    Breadcrumb,
  },
  data() {
    return {

    };
  },
  computed: {
    catchList() {
      const { routes } = this.$router.options;
      const catchList = [];
      this.findAllCatchableRoute(routes, catchList);
      return catchList;
    },
  },
  created() {},
  mounted() {},
  methods: {
    findAllCatchableRoute(routes, catchList) {
      routes.forEach((route) => {
        if (route.meta?.catchName) {
          catchList.push(route.meta.catchName);
        }
        if (route.children) {
          this.findAllCatchableRoute(route.children, catchList);
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
