<template>
  <div class="hello">
    <p>{{ loading ? "loading" : data }}</p>
    <button @click="run">发起</button>
    <button @click="cancel">取消</button>
    <button @click="handleMutate">突变测试</button>
    <button @click="handleRefreshDeps">refreshDeps测试</button>

    <!-- useToggle测试 -->
    <p>useToggleDemoState: {{useToggleDemoState}}</p>
    <button @click="handleUseTToggle">直接设置</button>
    <button @click="useTToggle">useTToggle</button>
    <button @click="useTSetLeft">useTSetLeft</button>
    <button @click="useTSetCenter">useTSetCenter</button>
    <button @click="useTSetRight">useTSetRight</button>

    <p>useBooleanState：{{ useBooleanState }}</p>
    <button @click="useBooleanToggle">toggle</button>
    <button @click="setTrue">setTrue</button>
    <button @click="setFalse">setFalse</button>
    
  </div>
</template>

<script lang="ts">

import { 
  useRequest, 
  useToggle,
  useBoolean,
  useTimeout
} from "../../../dist/index.js";

import { ref } from 'vue';
// import axios from "axios";


// 模拟列表请求
const mockRequest = ()=>{
  return new Promise((resolve)=>{
    useTimeout(()=>{
      resolve({code:200,data:[{name:'aaa'},{name:'bbbbb'},{name:'ccccc'}]})
    },ref(500))
  })
};


export default {
  
  
  setup() {

    // useRequest demo测试
    const refreshTest = ref(11);
    // const refreshTest2 = ref(11);

    const { data, run, loading, cancel, mutate } = useRequest(
      () => {
        // return axios.post(
        //   `https://xxxx/auth/login`
        // );
        // 暂时使用mock
        return mockRequest();
      },
      {
        // manual: true,
        refreshDeps: [ refreshTest ],
        refreshOnWindowFocus: true
      }
    );
    
    const handleRefreshDeps = ()=>{
      refreshTest.value = Math.random();
      console.log(refreshTest);
    }


    const handleMutate = ()=>{
      mutate({
        code: Math.random(),
        data: {
          id: +new Date()
        },
      });
    };

    //useToggle 测试
    const [ useToggleDemoState, [ useTToggle, useTSetLeft, useTSetCenter, useTSetRight]] = useToggle('left','center','right');
    const handleUseTToggle = ()=>{
      useTToggle('center')
    };

    //useBoolean 测试
    const [ useBooleanState,{ toggle: useBooleanToggle, setTrue, setFalse}] = useBoolean();



    return {
      loading,
      data,
      run,
      cancel,
      handleMutate,
      handleRefreshDeps,

      useToggleDemoState,
      handleUseTToggle,
      useTToggle,
      useTSetLeft,
      useTSetCenter,
      useTSetRight,

      useBooleanState,
      useBooleanToggle,
      setTrue,
      setFalse,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
}
</style>
