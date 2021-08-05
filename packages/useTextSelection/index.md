# useTextSelection

实时获取用户当前选取的文本内容及位置的hook。


## 使用Demo

### 基础用法
```vue
<template>
  <div style="text-align: center">
    <p ref="p"> 可选择区域: 123111111111111aaaaaaaaaaabbbbbbbbbbb eeeeeeeeeeeeeeee</p>
    <p>已选择的值：{{ text }}</p>
    <p>位置信息：rect: {{ rect }}</p>
    <p>left: {{ rect.left }}</p>
  </div>
</template>

<script lang="ts">
import { useTextSelection } from "v3hooks";
export default {
  setup() {
    const { text, rect } = useTextSelection();
    return {
        text,
        rect
    };
  },
};
</script>
```
没有传值默认为document， 页面上可选择的文本都会被计算

### 监听特定区域文本选择
```vue
<template>
  <div style="text-align: center">
    <p ref="p"> 可选择区域: 123111111111111aaaaaaaaaaabbbbbbbbbbb eeeeeeeeeeeeeeee</p>
    <p>已选择的值：{{ text }}</p>
    <p>位置信息：rect: {{ rect }}</p>
    <p>left: {{ rect.left }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useTextSelection } from "v3hooks";

export default {
  setup() {
    const p = ref();
    const { text, rect } = useTextSelection(p);

    return {
        text,
        p,
        rect
    };
  },
};
</script>
```
传值为Ref的P标签，只会监听特定区域。


## 介绍
useTextSelection接受一个HTMLElement, 导出已选择的文本和位置信息。

## Api
```
const useTextSelection: (
  target?: HTMLElement | Ref<HTMLElement> | (() => HTMLElement) | Document
) => vue.ToRefs<{
    text: string;
    rect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        height: number;
        width: number;
    };
}>;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| target |  原生Dom或者被Ref嵌套的Dom	|  `HTMLElement or Ref<HTMLElement> or (() => HTMLElement) or Document` | document |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| text	 | 用户选取的文本值	 | string |
| rect	 | 位置信息	 | Rect |


### Rect

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| left	 | 文本的左坐标	 | number |
| right	 | 文本的右坐标		 | number |
| top	 | 文本的顶坐标		 | number |
| bottom	 | 文本的底坐标		 | number |
| height	 | 文本的高度		 | number |
| width	 | 文本的宽度		 | number |