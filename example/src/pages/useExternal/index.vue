<template>
  <div class="hello">
    <div id="aa" ref="aa"></div>
    <div class="bd-example"><span class="badge badge-pill badge-primary">Primary</span><span class="badge badge-pill badge-secondary">Secondary</span><span class="badge badge-pill badge-success">Success</span><span class="badge badge-pill badge-danger">Danger</span><span class="badge badge-pill badge-warning">Warning</span><span class="badge badge-pill badge-info">Info</span><span class="badge badge-pill badge-light">Light</span><span class="badge badge-pill badge-dark">Dark</span></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useExternal } from "../../../dist/index.js";

export default {
  
  setup() {
    const aa = ref();
    const { load, unload } = useExternal(
        // 'http://img-steward-online.goodaa.com.cn/449c2e5dd6a948e3af67b69c4ece907a.js',
        // 'https://ahooks.js.org/useExternal/bootstrap-badge.css',
        'https://img-steward-test.goodaa.com.cn/99b2b706a5b942c2bcbfe211107c7b80.jpeg',
        (el)=>{ console.log(el) },
        {
            manual: true,
            target: aa
        }
    );

    setTimeout(()=>{
        load()
    },1000)

    setTimeout(()=>{
        unload()
    },8000)
    return {
      aa
    }
  },
};
</script>