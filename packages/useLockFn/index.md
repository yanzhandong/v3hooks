# useLockFn

用于给一个异步函数增加竞态锁，防止并发执行。


## 使用Demo

```vue
<template>
  <div class="hello">
    <div>value:{{ data }}</div>
    <button @click="submit">submit</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useLockFn } from "v3hooks";

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
```

useLockFn接受一个异步的函数， 并返回一个具有执行锁的函数

## Api
```
const useLockFn: (fn: Fn) => (...args: ArgsAny) => Promise<any>;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| fn	 | 需要增加竞态锁的函数	 | (...args: any[]) => any | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| fn	 | 增加了竞态锁的函数 | (...args: any[]) => any |