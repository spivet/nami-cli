<template>
  <div>
    <page-block title="编辑待办">
      <div class="">
        edit backlog
      </div>
    </page-block>
  </div>
</template>
<script>
import PageBlock from '@/components/PageBlock.vue';

export default {
  name: 'BacklogEdit',
  components: {
    PageBlock,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    onCancel() {},
    onSubmit() {},
  },
};
</script>
<style scoped>
.account-name {
  width: 50%;
}
</style>
