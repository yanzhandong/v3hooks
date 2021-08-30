# useCookie

一个用来操作Cookie的 Hook 。

## 使用Demo

```vue
<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> value:{{ state }}</p>
    <button @click="handlerUpdateState">修改Cookie</button>
  </div>
</template>

<script lang="ts">
import { useCookie } from "v3hooks";

export default {
  
  setup() {
    // 获取cookie中的a
    const state = useCookie('a',{
        defaultValue: '1111',
        watch: true,
        path: '/useCookie',
        expires: 1,

    });

    const handlerUpdateState = ()=>{
      state.value = String( Math.random() );
    };

    // useVirtualList测试
    return {
      state,
      handlerUpdateState
    };
  },
};
</script>
```

useCookie接受一个key是cookie中的键名。 修改返回的state可直接修改cookie.

## 注意点
* state等于undefined或者null可用于删除本地Cookie  例：`state.value = undefined;`

## Api
```

interface Options{
    watch?: boolean,
    defaultValue?: string | undefined,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'strict' | 'lax' | 'none'
}

const state = useCookieState(
  key: string,
  options?: Options,
)
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| key | 存储在本地 cookie 的 key 值 | string	 | - |
| options |可选项，配置 cookie 属性，详见 Options | Options	 | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state | 本地 cookie 值 | Ref<any> |


### Options

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| defaultValue | 可选，定义 cookie 默认值，但不同步到本地 cookie | string	 | undefined |
| expires |可选，定义 cookie 存储有效时间 | number | Date	 | - |
| path | 可选，定义 cookie 可用的路径 | string 	| / |
| domain | 可选，定义 cookie 可用的域，默认为 cookie 创建的域名 | string | - |
| secure | 可选，cookie 传输是否需要 https 安全协议 | boolean | - |
| sameSite | 可选，cookie 不能与跨域请求一起发送 | `strict` | `lax` | `none`	 | - |