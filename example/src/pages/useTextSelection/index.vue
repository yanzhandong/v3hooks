<template>
  <div style="text-align: center">
    <p ref="p"> 可选择区域: 123111111111111aaaaaaaaaaabbbbbbbbbbb eeeeeeeeeeeeeeee</p>
    <p>已选择的值：{{ text }}</p>
    <p>位置信息：rect: {{ rect }}</p>
    <p>left: {{ rect.left }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useTextSelection } from "../../../dist/index.js";

export default {
  setup() {
    const p = ref();
    const { text, rect } = useTextSelection();

    return {
        text,
        p,
        rect
    };
  },
};
</script>