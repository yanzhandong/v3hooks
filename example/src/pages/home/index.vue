<template>
  <div class="hello">
    <p>{{ loading ? "loading" : data }}</p>
    <button @click="run">发起</button>
    <button @click="cancel">取消</button>
    <button @click="handleMutate">突变测试</button>
    <button @click="handleRefreshDeps">refreshDeps测试</button>


    <!-- useDebounceFn demo测试 -->
    <p style="marginTop: 16"> Clicked count: {{debounceFnValue}} </p>
    <button type="button" @click="debounceFnRun">
      useDebounceFn测试
    </button>

    <!-- useDebounce demo测试 -->
    <br/>
    <input
      v-model="debounceCurrValue"
      placeholder="Typed value"
      style=" width: 280 "
    />
    <p style="marginTop: 16">DebouncedValue: {{debounceValue}}</p>

    <!-- useThrottleFn demo测试 -->
    <p style="marginTop: 16"> Clicked count: {{throttleFnValue}} </p>
    <button type="button" @click="throttleFnRun">
      useThrottleFn测试
    </button>

    <!-- useThrottle demo测试 -->
    <br/>
    <input
      v-model="throttleCurrValue"
      placeholder="Typed value"
      style=" width: 280 "
    />
    <p style="marginTop: 16">throttleValue: {{throttleValue}}</p>

    <!-- useToggle测试 -->
    <p>useToggleDemoState: {{useToggleDemoState}}</p>
    <button @click="handleUseTToggle">直接设置</button>
    <button @click="useTToggle">useTToggle</button>
    <button @click="useTSetLeft">useTSetLeft</button>
    <button @click="useTSetCenter">useTSetCenter</button>
    <button @click="useTSetRight">useTSetRight</button>

    <p>{{ useBooleanState }}</p>
    <button @click="useBooleanToggle">toggle</button>
    <button @click="setTrue">setTrue</button>
    <button @click="setFalse">setFalse</button>
    
  </div>
</template>

<script lang="ts">

import { 
  useRequest, 
  useDebounce, 
  useDebounceFn,
  useThrottleFn,
  useThrottle,
  useToggle,
  useBoolean
} from "../../../dist/index.js";

import { ref } from 'vue';
import axios from "axios";

export default {
  
  
  setup() {

    // useRequest demo测试
    const refreshTest = ref(11);
    // const refreshTest2 = ref(11);

    const { data, run, loading, cancel, mutate } = useRequest(
      (mobile:number, code:string) => {
        return axios.post(
          `https://dss-pre.xiongmaopeilian.com/student_app/auth/login?mobile=${mobile}&code=${code}`
        );
      },
      {
        // manual: true,
        defaultParams:[
          15652922446,
          '0000'
        ],
        refreshDeps: [ refreshTest ],
        refreshOnWindowFocus: true
      }
    );
    // run(1562922446,'0000');
    
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


    // useDebounceFn demo测试
    const debounceFnValue = ref<number>(1);
    const { run:debounceFnRun } = useDebounceFn((a,b)=>{
      console.log(a,b)
      debounceFnValue.value++
    },1000)

    // useDebounce demo测试
    const debounceCurrValue = ref(1);
    const debounceValue = useDebounce(debounceCurrValue);

    // useThrottleFn demo测试
    const throttleFnValue = ref(1);
    const { run:throttleFnRun } = useThrottleFn(()=>{
      throttleFnValue.value++
    })

    // useThrottle demo测试
    const throttleCurrValue = ref(1);
    const throttleValue = useThrottle(throttleCurrValue);

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

      debounceFnValue,
      debounceFnRun,

      debounceCurrValue,
      debounceValue,

      throttleFnValue,
      throttleFnRun,

      throttleCurrValue,
      throttleValue,

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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
