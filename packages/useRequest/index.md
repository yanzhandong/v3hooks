# useRequest

专注于管理异步请求的Hook，加速你的日常开发

* 自动请求/手动请求
* SWR(stale-while-revalidate)
* 缓存/预加载
* 屏幕聚焦重新请求
* 轮询
* 防抖
* 节流
* 依赖请求
* 突变
* loading delay

## 请求方式
如果service是object,useRequest会使用 Fetch 来发送网络请求
```
const { data } = useRequest(
    {
    url: 'http://xxx.xx.com/api/userInfo',
    method: 'POST'
    }
);
```
如果service是async函数,useRequest会调用此函数来发送网络请求
```
const { data } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
);
```

## 使用
### 默认请求
```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
);
watchEffect(()=>{
    console.log( data?.value );
})
```
在这个例子中， useRequest 接收了一个异步函数 ，在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 loading , data 状态。你可以通过data和loading来实现你的需求


因为返回的data为响应式，js中获取data.value需要在watchEffect中使用，而在template中使用是不需要的。

### 手动触发

```
const { data, run, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        manual: true
    }
);
```
通过设置 options.manual = true , 则需要手动调用 run 时才会触发执行异步函数。

### 轮询
```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        pollingInterval: 1000
    }
);
```

通过设置 options.pollingInterval ，进入轮询模式，定时触发函数执行。

### 依赖请求
```
import { onMounted, ref } from 'vue'

const isReady = ref(false);
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        ready: isReady
    }
);
onMounted(() => {
    isReady.value = true;
})
```
只有当 options.ready 变为 true 时, 才会发起请求，基于该特性可以实现串行请求，依赖请求等。

### 防抖

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        debounceInterval: 1000
    }
);
```
通过设置 options.debounceInterval ，则进入防抖模式。此时如果频繁触发 run ，则会以防抖策略进行请求。


### 节流

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        throttleInterval: 1000
    }
);
```
通过设置 options.throttleInterval ，则进入节流模式。此时如果频繁触发 run ，则会以节流策略进行请求。



### 缓存 & SWR

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        caccacheKey: 'mock1'
    }
);
```
如果设置了 options.cacheKey ， useRequest 会将当前请求结束数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。你可以通过 cacheTime 设置缓存数据回收时间，也可以通过 staleTime 设置数据保持新鲜时间。


### 预加载

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        caccacheKey: 'mock1'
    }
);
```
同一个 cacheKey 的请求，是全局共享的，也就是你可以提前请求数据。后续请求会提前返回之前预加载的数据，利用该特性，可以很方便的实现预加载。


### 屏幕聚焦重新请求

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        refreshOnWindowFocus: true,
        focusTimespan: 2000
    }
);
```

如果你设置了 options.refreshOnWindowFocus = true ，则在浏览器窗口 refocus 和 revisible 时，会重新发起请求。你可以通过设置 options.focusTimespan 来设置请求间隔，默认无 。

### 突变

```
const { data, mutate } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    }
);

<button type="button" @click={() => mutate({code:'1',msg:'test'})}>
    突变测试
</button>
```
你可以通过 mutate ，直接修改 data.

### Loading Delay

```
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        loadingDelay: 300
    }
);
```
通过设置 options.loadingDelay ，可以延迟 loading 变成 true 的时间，有效防止闪烁。

### refreshDeps

开发中会经常碰到这个需求，当某些 state 变化时，我们需要重新执行异步请求，使用useRequest将很方便的实现此功能。

```
import { onMounted, ref } from 'vue'

const random = ref(1);
const { data, loading } = useRequest(
    () => {
        return axios.post(
            `http://xxx.xx.com/api/userInfo`
        );
    },
    {
        refreshDeps: [ random ]
    }
);

setInterval(()=>{
    random.value = Math.random()
},1000)
```

当例子中 random 发生变化时,会重新执行 service。

## Api

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| data | service 返回的数据，默认为 undefined | undefined / any |
| error | service 抛出的异常，默认为 undefined | undefined / Error |
| loading | service 是否正在执行 | boolean |
| run | 手动触发 service 执行，参数会传递给 service | (...args: any[]) => void |
| refresh | 使用上一次的 params，重新执行 service| () => void |
| cancel | 如果有轮询，停止 | () => void |
| mutate | 突变直接修改 data	 | (newData) => void |
| loading | service 是否正在执行 | boolean |

### Params
所有的 Options 均是可选的。

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| manual | 是否需要手动执行 | boolean | false |
| defaultParams | 如果 manual=false ，自动执行 run 的时候，默认带上的参数 | any[] | - |
| refreshDeps | 在 manual = false 时，refreshDeps 变化，会触发 service 重新执行 | any[] | [] |
| loadingDelay | 设置显示 loading 的延迟时间，避免闪烁 | number | - |
| pollingInterval | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run | number | - |
| pollingWhenHidden | 在页面隐藏时，是否继续轮询。默认为 true，即不会停止轮询 | boolean | true |
| refreshOnWindowFocus | 屏幕重新聚焦时间间隔，在当前时间间隔内，不会重新发起请求 | number | - |
| focusTimespan | 在页面隐藏时，是否继续轮询。默认为 true，即不会停止轮询 | boolean | true |
| debounceInterval | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。 | number | - |
| throttleInterval | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。 | number | - |
| ready | 只有当 ready 为 true 时，才会发起请求 | boolean | - |
| cacheKey | * 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制 * 我们会缓存每次请求的 data , error , params , loading在缓存机制下 * 同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新 | string | - |
| cacheTime | 设置缓存数据回收时间。默认缓存数据 5 分钟后回收，需要配和 cacheKey 使用 | number | 300000 |
| staleTime | 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求，需要配和 cacheKey 使用 | number | 0 |


## 致敬

因为本人之前React中一直使用 umi ，在 umi 中使用了useRequest, Api使用非常的顺手。到了vue3中没有此hook，所以实现一份Vue的简版 useRequest来供Vue3项目使用。

React Ahooks [原版链接](https://ahooks.js.org/zh-CN/hooks/async)
