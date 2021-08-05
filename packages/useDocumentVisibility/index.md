# useDocumentVisibility

可以获取页面可见状态的 Hook。

## 使用Demo

### 基础用法
```vue
<script lang="ts">
import { watch } from 'vue';
import { useDocumentVisibility } from "v3hooks";

export default {
  setup() {
    const documentVisibility = useDocumentVisibility();
    watch(
      documentVisibility,
      (value)=>{
        if(value) console.log('重新触发active')
      }
    )
  }
};
</script>
```
监听 document 的可见状态


## Api
```
const useDocumentVisibility: () => Ref<boolean>;
```

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| documentVisibility |  判断 document 是否在是否处于可见状态	 | boolean |
