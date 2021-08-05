# useExternal

一个用于动态地向页面加载或卸载外部资源的 Hook。

## 使用Demo
### 基本使用
```vue
<script lang="ts">
import { useExternal } from "v3hooks";

export default {
  setup() {
    const { resources } = useExternal(
        'http://img-steward-online.goodaa.com.cn/449c2e5dd6a948e3af67b69c4ece907a.js',
        (el)=>{ console.log(el) }
    );
  },
};
</script>
```
页面上加载外部 javascript 文件，例如引入 449c2e5dd6a948e3af67b69c4ece907a.js

### 引入css
```vue
<template>
  <div class="hello">
    <div class="bd-example">
      <span class="badge badge-pill badge-primary">Primary</span>
      <span class="badge badge-pill badge-secondary">Secondary</span>
      <span class="badge badge-pill badge-success">Success</span>
      <span class="badge badge-pill badge-danger">Danger</span>
      <span class="badge badge-pill badge-warning">Warning</span>
      <span class="badge badge-pill badge-info">Info</span>
      <span class="badge badge-pill badge-light">Light</span>
      <span class="badge badge-pill badge-dark">Dark</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useExternal } from "v3hooks";

export default {
  setup() {
    const { load, unload } = useExternal(
        'https://ahooks.js.org/useExternal/bootstrap-badge.css',
        (el)=>{ console.log(el) },
        {
            manual: true
        }
    );

    setTimeout(()=>{
        load()
    },1000)

    setTimeout(()=>{
        unload()
    },8000)
  },
};
</script>
```
页面上加载外部 css 文件，例如引入 bootstrap-badge.css

### 引入图片
```vue
<template>
  <div class="hello">
    <div ref="parent"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useExternal } from "v3hooks";

export default {
  
  setup() {
    const parent = ref();
    const { load, unload } = useExternal(
        'https://img-steward-test.goodaa.com.cn/99b2b706a5b942c2bcbfe211107c7b80.jpeg',
        (el)=>{ console.log(el) },
        {
            manual: true,
            target: parent
        }
    );

    setTimeout(()=>{
        load()
    },1000)

    setTimeout(()=>{
        unload()
    },8000)
    return {
      parent
    }
  },
};
</script>
```
加载一个静态图片作为外部资源引入页面



useExternal接受一个src路径, 导出资源本身和操作方法.

## Api
```
interface Options {
    manual?: boolean;
    async?: boolean;
    crossOrigin?: 'anonymous' | 'use-credentials';
    referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    noModule?: boolean;
    defer?: boolean;
    media?: string;
    target?: HTMLElement | Ref<HTMLElement>;
}
const useExternal: (src: string, onLoaded?: ((el: Elements) => void) | undefined, options?: Options) => {
    resources: Ref<Elements | null>;
    load: () => Promise<unknown>;
    unload: () => void;
};
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| src |  外部资源 url 地址	| string | - |
| onLoaded |  资源加载成功回调  | (el: Elements) => void) | - |
| options |  参数  | Options | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| manual |  是否手动执行  | boolean | false |
| async |  script标签是否增加async属性  | boolean | - |
| crossOrigin |  script标签是否增加crossOrigin属性  | `'anonymous' - 'use-credentials'` | - |
| referrerPolicy |  script标签是否增加referrerPolicy属性  | 原生referrerPolicy |  | - |
| noModule |  script标签是否增加noModule属性  | boolean | - |
| defer |  script标签是否增加defer属性  | boolean | - |
| media |  引入外链样式表 <link> 的 media 属性, 如 all/screen/print/handheld  | string | all |
| target |  需插入外部图片资源 <img> 的父容器 DOM 节点或者 Ref  |  HTMLElement | Ref<HTMLElement> | - |


### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| resources	 | 加载后的资源	 | any |
| load	 | 开始加载外部资源	 | () => void |
| unload	 | 卸载外部资源	 | () => void |