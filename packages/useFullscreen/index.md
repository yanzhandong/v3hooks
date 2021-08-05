# useFullscreen

一个用于处理 dom 全屏的 Hook。

## 使用Demo

### 基础用法
```vue
<template>
  <div class="hello">
    <div ref="fullScreen" style="background: white">
        <p>是否全屏: {{isFullscreen}}</p>
        <button @click="setFull" id="a">全屏</button>
        <button @click="exitFull">退出全屏</button>
        <button @click="toggle">toggle切换</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from "v3hooks";

export default {
  setup() {
    const [ isFullscreen, { setFull, exitFull, toggle } ] = useFullscreen();
    
    // useVirtualList测试
    return {
      isFullscreen,
      setFull,
      exitFull,
      toggle
    };
  }
};
</script>
```
没有传值默认为document.body

### 局部全屏
```vue
<template>
  <div class="hello">
    <div ref="fullScreen" style="background: white">
        <p>是否全屏: {{isFullscreen}}</p>
        <button @click="setFull" id="a">全屏</button>
        <button @click="exitFull">退出全屏</button>
        <button @click="toggle">toggle切换</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useFullscreen } from "../../../dist/index.js";

export default {
  setup() {
    const fullScreen = ref();
    const [ isFullscreen, { setFull, exitFull, toggle } ] = useFullscreen(fullScreen, {
        onFull: ()=>{
            console.log('全屏')
        },
        onExitFull: ()=>{
            console.log('非全屏')
        }
    });
    
    return {
      isFullscreen,
      setFull,
      exitFull,
      toggle,
      fullScreen
    };
  }
};
</script>
```
Ref传值为fullScreen的div标签，则只会此区域全屏

## 介绍
useFullscreen接受一个HTMLElement, 导出操作方法.

## Api
```
interface Actions {
    setFull: () => void;
    exitFull: () => void;
    toggle: () => void;
}
const useFullscreen: (
  target?: Target$1 | undefined, 
  options?: Options | undefined
) => [
  isFullscreen: Ref<boolean>,
  actions: Actions
];
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| target |  原生Dom或者被Ref嵌套的Dom	|  `HTMLElement or Ref<HTMLElement> or (() => HTMLElement)` | document.body |
| options |  设置(可选)	| Options  | - |

### Options

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| onExitFull | 	监听退出全屏	 | ()=>void |
| onFull	 | 监听全屏		 | ()=>void |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| isFullscreen	 | 是否全屏		 | boolean |
| setFull	 | 设置全屏		 | ()=>void |
| exitFull | 退出全屏 | ()=>void |
| toggleFull | 切换全屏 | ()=>void |
