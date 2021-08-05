<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
button{
  display: block;
  padding: 10px 20px;
}
</style>
