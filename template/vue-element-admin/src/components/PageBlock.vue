<template>
  <div class="basic-info">
    <div class="subtitle-label">
      <div class="item-line" />
      <div class="form-title">
        {{ title }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.basic-info {
  background: #fff;
  border-radius: 5px;
  padding: 10px 24px;
  margin-top: 8px;
  .item-line {
    width: 4px;
    height: 18px;
    background: #06B880;
    border-radius: 2px;
    margin-right: 10px;
  }
  .subtitle-label {
    display: flex;
    align-items: center;
  }
  .form-title {
    font-weight: 700;
    font-size: 16px;
    padding: 16px 0;
  }
}
</style>
