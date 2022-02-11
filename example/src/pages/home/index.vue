<template>
  <div class="hello">
    <h4>第一测试</h4>
    <p>{{ loading ? "loading" : data }}</p>
    <button @click="run">发起</button>
    <button @click="cancel">取消</button>
    <button @click="handleMutate">突变测试</button>
    <button @click="handleRefreshDeps">refreshDeps测试</button>
    
    <h4>第二Cache测试</h4>
    <p>{{ loading2 ? "loading" : data2 }}</p>
    <button @click="run2">发起</button>
  </div>
</template>

<script lang="ts">

import { 
  useRequest, 
  useTimeout
} from "v3hooks";

import { ref } from 'vue';
// import axios from "axios";


// 模拟列表请求
const mockRequest = ()=>{
  return new Promise((resolve)=>{
    console.log(1231)
    useTimeout(()=>{
      resolve({code:200,time:+(new Date()),data:[{name:'aaa'},{name:'bbbbb'},{name:'ccccc'}]})
    },500)
  })
};


export default {
  
  
  setup() {

    // useRequest demo测试
    const refreshTest = ref(11);
    // const refreshTest2 = ref(11);
    const isReady = ref(false);

    const { data, run, loading, cancel, mutate } = useRequest(
      () => {
        // return axios.post(
        //   `https://xxxx/auth/login`
        // );
        // 暂时使用mock
        return mockRequest();
      },
      {
        manual: true,
        pollingInterval: 1000,
        ready:isReady,
        // loadingDelay: 1000,
        refreshDeps: [ refreshTest ],
        onSuccess(data){
          console.log(data,'success')
        },
        refreshOnWindowFocus: true,
      }
    );

    setTimeout(()=>{
      console.log('isReady');
      isReady.value = true
    },1000)

    const { data:data2, run:run2, loading:loading2 } = useRequest(
      () => {
        return mockRequest();
      },
      {
        // manual: true,
        refreshDeps: [ refreshTest ],
        refreshOnWindowFocus: true,
        cacheKey: 'mock1',
        cacheTime: 6000,
        staleTime: 3000
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




    return {
      loading,
      data,
      run,
      cancel,
      handleMutate,
      handleRefreshDeps,


      data2,
      run2,
      loading2
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
