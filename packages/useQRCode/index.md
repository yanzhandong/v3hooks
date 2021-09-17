# useQRCode

一个用来生成二维码的 Hook 。

## 使用Demo

```vue
<template>
  <div class="hello">
    <div> 二维码:</div>
    <img :src="state" alt="">
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQRCode } from "../../../dist/index.js";

const logo = require('../../assets/logo.png')

export default {
  
  setup() {
    const text = ref<string>('https://www.baidu.com/')
    // let text2 = 'https://www.baidu.com/';

    const state = useQRCode(text,{
      logo: logo.default,
      colorDark: '#000000'
    });

    setTimeout(()=>{
      text.value = 'https://www.acfun.cn/'
    },2000)

    return {
      state
    };
  },
};
</script>
```

usQRCide接受一个静态url，也可以是一个被Ref包裹的url，当Ref值发生变化时，二维码会跟随内容进行变化。


## Api
```
type Text = Ref<string> | string;
interface useQRCodeOptions {
    onRenderingStart?: (qrCodeOptions: any) => void;
    onRenderingEnd?: (qrCodeOptions: any, dataURL: string) => void;
    [key: string]: any;
}
const useQRCode: (text: Text, options?: useQRCodeOptions | undefined) => Ref<string | undefined>;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| text |  需要生成二维码的url或text	| `string` \| `Ref<string>` | - |
| options |  二维码配置项	| Options | - |

### Options

Options配置项可以参考<a href="https://github.com/ushelp/EasyQRCodeJS#qrcode-api">EasyQRCodeJS</a>useQRCode的底层是使用了EasyQRCodeJS来作为二维码的实现。

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state	 | base64格式的二维码图片	 | string |
