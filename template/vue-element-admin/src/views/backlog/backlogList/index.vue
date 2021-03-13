<template>
  <div>
    <page-block title="待办列表">
      <div class="action">
        <el-button
          type="primary"
          @click="addBacklog"
        >
          添加
        </el-button>
      </div>

      <el-table :data="backlogList" border>
        <el-table-column
          v-for="item in TABLECOLUMN"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <div v-if="item.prop === 'action'">
              <el-button type="text" @click="handleBacklogEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="text" @click="handleBacklogDelete(scope.row)">
                删除
              </el-button>
            </div>
            <span v-else class="">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="backlogList.length" @search="handlePagination" />
    </page-block>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';
import PageBlock from '@/components/PageBlock.vue';
import TABLECOLUMN from './fileds';

export default {
  name: 'BacklogList',
  components: {
    Pagination,
    PageBlock,
  },
  data() {
    return {
      TABLECOLUMN,
      backlogList: [
        {
          level: '1',
          content: '看看书',
          updateTime: '2021-01-17 16:33:05',
        },
        {
          level: '2',
          content: '写写代码',
          updateTime: '2021-01-18 16:33:05',
        },
        {
          level: '3',
          content: '玩玩游戏',
          updateTime: '2021-01-16 16:33:05',
        },
      ],
      total: 100,
      formData: {},
      pageNum: 1,
      size: 10,
    };
  },
  created() {},
  methods: {
    addBacklog() {
      this.$router.push('/backlog/edit');
    },
    handlePagination(pageNum, size) {
      this.pageNum = pageNum;
      this.size = size;
    },
  },
};
</script>
<style scoped>
.action {
  text-align: right;
  padding: 15px 0;
}
</style>
