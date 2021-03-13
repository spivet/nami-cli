<script>
import menuList from './menuLIst';

export default {
  name: 'SideBarMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuList,
    };
  },
  computed: {
    activatedMenu() {
      const { meta, name } = this.$route;
      return meta?.activeMenu ?? name;
    },
  },
  created() {},
  mounted() {},
  methods: {
    renderMenuItemValue(h, route) {
      const { icon } = route;
      const vnodes = [];
      if (icon) {
        vnodes.push(<i class={icon} />);
        vnodes.push(<span slot='title'>{route.name}</span>);
      } else {
        vnodes.push(<span slot='title'>{route.name}</span>);
      }
      return vnodes;
    },
    renderMenuItem(h, route) {
      const jsxNode = (
        <router-link to={{ path: route.path }}>
          <el-menu-item index={route.name}>
              {this.renderMenuItemValue(h, route)}
          </el-menu-item>
        </router-link>
      );
      return jsxNode;
    },
    renderSubmenu(h, route, children) {
      const jsxNode = (
        <el-submenu index={route.name}>
          <template slot='title'>
            {this.renderMenuItemValue(h, route)}
          </template>
          {this.renderItem(h, children)}
        </el-submenu>
      );
      return jsxNode;
    },
    renderItem(h, routes) {
      const menuItems = routes
        .filter((route) => !route.meta?.hideMenu)
        // eslint-disable-next-line arrow-body-style
        .map((route) => {
          return route?.children?.length
            ? this.renderSubmenu(h, route, route.children)
            : this.renderMenuItem(h, route);
        });
      return menuItems;
    },
  },
  render(h) {
    return h(
      'el-menu',
      {
        props: {
          defaultActive: this.activatedMenu,
          collapse: this.isCollapse,
          backgroundColor: '#1f2d3d',
          textColor: '#fff',
          activeTextColor: '#2b7f5d',
        },
        class: 'el-menu-vertical',
      },
      this.renderItem(h, this.menuList),
    );
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  border-right: 0;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
