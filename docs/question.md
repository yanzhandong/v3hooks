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