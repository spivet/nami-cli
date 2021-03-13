<template>
  <div class="pagination_inner">
    <el-pagination
      background
      :page-sizes="pageSizes"
      :page-size="size"
      :small="small"
      :layout="layout"
      :total="total"
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
let pageNum = 1;
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    small: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  data() {
    return {
      size: '',
      currentPage: 1,
    };
  },
  created() {
    this.size = this.pageSize;
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.currentPage = 1;
      this.$emit('search', 1, this.size);
    },
    handleCurrentChange(val) {
      pageNum = val;
      this.$emit('search', pageNum, this.size);
    },
  },
};
</script>

<style lang="scss">
  .el-pagination .btn-prev .el-icon, .el-pagination .btn-next .el-icon{
    font-size: 18px;
  }
  .el-pagination .el-select .el-input .el-input__inner{
    width: 100px;
  }
  .el-pagination__editor.el-input .el-input__inner{
    width: 48px;
  }
  .pagination_inner {
    width: 100%;
    padding: 20px 0;
    text-align: right;
    border-radius: 0 0 4px 4px;
    background: #ffffff;
  }
</style>
