import qrcode from "easyqrcodejs";
import { ref, Ref, watch, isRef } from "vue";

type Text = Ref<string> | string;

interface useQRCodeOptions{
    onRenderingStart?: (qrCodeOptions:any)=> void;
    onRenderingEnd?: (qrCodeOptions:any,dataURL:string)=>void;
    [key:string]: any;
}

const defaultUseQRCodeOptions = {
    onRenderingEnd:()=>{}
};

const useQRCode = (
    text:Text,
    options?: useQRCodeOptions
)=>{
    const state = ref<string>();

    const {
        onRenderingEnd,
        ...otherOptions
    } = {...defaultUseQRCodeOptions,...options};

    const Qrcode = new qrcode(document.createElement('div'),{
        text: isRef(text) ? text.value : text,
        ...otherOptions,
        onRenderingEnd(qrCodeOptions:any, dataURL:string){
            state.value = dataURL;
            onRenderingEnd(qrCodeOptions, dataURL)
        }
    })
    if(isRef(text)){
        watch(text,()=>{
            Qrcode.makeCode(text.value)
        })
    }

    return state
}


export default useQRCode