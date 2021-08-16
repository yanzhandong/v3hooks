<h1 align="center">
  V3Hooks
</h1>
<h4 align="center">针对 Vue3 的实用Hooks集合</h4>


<h4  align="center">
  V3Hooks也可以说是<a href="https://github.com/alibaba/hooks">ahooks</a>的Vue实现，绝大部分Api是保持一致的
</h4>
<br>

<h4 align="center">
  <pre>npm i <a href="https://www.npmjs.com/package/v3hooks">v3hooks</a>
  <i>or</i>
  yarn add <a href="https://www.npmjs.com/package/v3hooks">v3hooks</a></pre>
</h4>

<h4 align="center">
  GitBook
  <a href="https://yanzhandong868.gitbook.io/v3hooks/">文档链接</a>
</h4>

<br>

## ⚡使用

- **Async**
  - `useRequest` — 一个完整的管理异步数据请求的Hook,<a href="https://ahooks.js.org/zh-CN/hooks/async">aHook useRequest</a>的Vue3实现，Api完全一致，如果你使用过aHook这将无缝衔接到Vue3.
- **Side**
  - `useDebounce` — 用于处理防抖值的 Hook.
  - `useDebounceFn` — 用于处理防抖函数的 Hook.
  - `useThrottle` — 用于处理节流值的 Hook.
  - `useThrottleFn` — 用于处理节流函数的 Hook.
  - `useInterval` — 用于处理interval的 Hook.
  - `useTimeout` — 用于处理timeout的 Hook.
<!-- - **Browser** -->
- **State**
  - `useToggle` — 用于在两个状态值间切换的 Hook.
  - `useBoolean` — 优雅的管理 boolean 值的 Hook.
  - `useDate` — 用于处理时间格式化 Hook.
  - `useLocalStorage` — 简单高效管理localStorage的 Hook.
  - `useSessionStorage` — 简单高效管理SessionStorage的 Hook.
  - `useCookie` — 用于管理本地Cookie Hook.
  - `useNetwork` — 用于获取网络状态 Hook.
  - `useSet` — 用于管理Set的 Hook.
  - `useMap` — 用于管理Map的 Hook.
  <!-- - `useRouteQuery` — 用于获取url query值的 Hook. -->
- **UI**
  - `useVirtualList` — 用于长列表虚拟化列表的 Hook.
  - `useDynamicList` — 用于管理列表状态 Hook.
  - `useMediaQuery` — 用于监听 mediaQuery 状态的 Hook。
  - `useExternal` — 用于加载异步资源的 Hook.
  - `useFullscreen` — 一个用于处理 dom 全屏的 Hook.
  - `useDocumentVisibility` — 可以获取页面可见状态的 Hook.
  - `useTextSelection` — 实时获取用户当前选取的文本内容及位置Hook.
- **Advanced**
  - `useVirtualList` — 用于增加异步函数增加竞态锁，防并发 Hook.

## 常见问题

### setup中使用data为undefined
因为data是被Ref嵌套的响应式, 直接return到Template中使用没问题，如果想要在Setup中使用需要嵌套一层watchEffect来获取异步数据。
```
const { data, run, cancel } = useRequest(
    () => {
      return axios.get(
          `https://xxx.com/application/list`
      );
    }
);

watchEffect(()=>{
  console.log( data?.value );
})
```
可以看到下面demo中React中Ahooks也是需要这么使用的
https://codesandbox.io/s/determined-glitter-m77g6?file=/src/App.js
### 在tsx中使用useRequest
  在一个tsx项目中使用useRequest，不能直接使用data返回值到html中，因为data是一个被Ref嵌套的响应式数据，在html中使用便利需要使用.value来获取真实数据，可以参考以下例子做法
```
import { defineComponent, watchEffect, ref } from 'vue';
import { useRequest,useTimeout } from 'v3hooks';

// 模拟列表请求
const mockRequest = ()=>{
  return new Promise((resolve,reject)=>{
    useTimeout(()=>{
      resolve({code:200,data:[{name:'aaa'},{name:'bbbbb'},{name:'ccccc'}]})
    },ref(500))
  })
};

interface MockDataItem{
  name:string
}

export default defineComponent({
  name: 'App',
  setup() {
    const content = ref<MockDataItem[]>([]);
    const { data } = useRequest<any>(() => mockRequest() );

    watchEffect(()=>{
      if(data?.value && data.value.code === 200){
        content.value = data.value.data;
      }
    })
  
    return () => (
      <>
        <h1>姓名表</h1>
        {
          content.value.map((item:MockDataItem)=>{
            return (
              <h3>{item.name}</h3>
            )
          })
        }
      </>
    );
  }
});
```

## 🤝 感谢
如果这个项目对您有帮助，欢迎Star