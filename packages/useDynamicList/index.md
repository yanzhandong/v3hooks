# useDynamicList

一个帮助你管理列表状态，并能生成唯一 key 的 Hook。


## 使用Demo

```vue
<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <div style="width: 60vw">
      <p 
        v-for=" (active,index) in list" 
        :key="getKey(index)"
        style="width: 100%;height:60px;border:1px solid #cccccc;line-height:60px;"
      > value:{{ active }} uuid:{{getKey(index)}}</p>
    </div>
    <div style="width:39vw">
      <button @click="()=> insert(0,Math.random())">insert头部插入</button>
      <button @click="()=> resetList(['a','b','c'])">重置</button>
      <button @click="()=> merge(0, [Math.random(),Math.random()])">头部插入多个</button>
      <button @click="()=> replace(1, Math.random())">第二个替换</button>
      <button @click="()=> remove(1)">删除第二个</button>
      <button @click="()=> move(0,2)">一三互换位置</button>
      <button @click="()=> push(Math.random())">尾部插入</button>
      <button @click="()=> pop()">尾部删除</button>
      <button @click="()=> unshift(Math.random())">头部插入</button>
      <button @click="()=> shift()">头部删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useDynamicList } from "v3hooks";

export default {
  
  setup() {
    const defalutValue = ref(['a','b','c'])
    const { 
      list,
      insert,
      resetList,
      merge,
      replace,
      remove,
      move,
      getKey,
      push,
      pop,
      unshift,
      shift,
    } = useDynamicList(defalutValue);

    // useVirtualList测试
    return {
      list,
      insert,
      resetList,
      merge,
      replace,
      remove,
      move,
      getKey,
      push,
      pop,
      unshift,
      shift
    };
  },
};
</script>
```

useDynamicList接受一个数组，导出一个list及一系列操作数组的方法。


## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| initialValue | 列表的初始值		 | T[]	 | [] |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| list | 当前的列表	 | T[] |
| resetList | 重新设置 list 的值		 | (list: T[]) => void |
| insert | 在指定位置插入元素	 | (index: number, obj: T) => void	 |
| merge | 在指定位置插入多个元素 | (index: number, obj: T[]) => void	 |
| replace | 替换指定元素 | (index: number, obj: T) => void	 |
| remove | 删除指定元素	 | (index: number) => void	 |
| move | 移动元素	 | (oldIndex: number, newIndex: number) => void		 |
| getKey | 获得某个元素的 uuid | (index: number) => number |
| getIndex | 获得某个key的 index	 | (key: number) => number	 |
| push | 在列表末尾添加元素 | (obj: T) => void	|
| pop | 移除末尾元素 | () => void	 |
| unshift | 在列表起始位置添加元素 | (obj: T) => void	 |
| shift | 移除起始位置元素 | () => void	 |

