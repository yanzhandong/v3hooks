<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> 网络状态:{{ state }}</p>
  </div>
</template>

<script lang="ts">
import { useNetwork } from "../../../dist/index.js";

export default {
  
  setup() {
    // 获取query中的a
    const state = useNetwork();

    // useVirtualList测试
    return {
      state
    };
  },
};
</script>