<template>
  <div class="hello">
    <div>value:{{ data }}</div>
    <button @click="submit">submit</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useLockFn } from "../../../dist/index.js";

function mockApiRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
}

export default {
  
  setup() {
    const data = ref(1);
    const submit = useLockFn(async ()=> {
        await mockApiRequest();
        data.value++
    });

    return {
        data,
      submit,
    };
  },
};
</script>

<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
}
</style>