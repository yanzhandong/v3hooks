# useNetwork

一个用来获取网络状态的 Hook 。

## 使用Demo

```vue
<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> 网络状态:{{ state }}</p>
  </div>
</template>

<script lang="ts">
import { useNetwork } from "v3hooks";

export default {
  
  setup() {
    // 获取query中的a
    const state = useNetwork();

    // useVirtualList测试
    return {
      state
    };
  },
};
</script>
```

useNetwork返回网络状态信息


## Api
```
const useNetwork: () => {
    since?: number | Date,
    online?: boolean,
    rtt?: number,
    type?: string,
    downlink?: number,
    saveData?: boolean,
    downlinkMax?: number,
    effectiveType?: string,
};
```
### Result

| 属性 | 描述                                         | 类型                 |
|----------|--------------------------------------|----------------------|
| online  | 网络是否为在线 | `boolean` |
| since  | 在线与不在线最后改变时间 | `Date` |
| rtt  | 当前连接下评估的往返时延 | `number` |
| type  | 设备使用与所述网络进行通信的连接的类型 | `bluetooth` \| `cellular` \| `ethernet` \| `none` \| `wifi` \| `wimax` \| `other` \| `unknown` |
| downlink  | 有效带宽估算（单位：兆比特/秒） | `number` |
| downlinkMax  | 最大下行速度（单位：兆比特/秒） | `number` |
| saveData  | 用户代理是否设置了减少数据使用的选项 | `boolean`  |
| effectiveType  | 网络连接的类型 | `slow-2g` \| `2g` \| `3g` \| `4g`  |
