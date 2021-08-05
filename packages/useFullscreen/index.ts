import { ref, Ref, isRef, onMounted, onUnmounted } from 'vue';

interface Options{
    onFull?: ()=> void,
    onExitFull?: ()=> void
}
interface Actions{
    setFull: ()=> void,
    exitFull: ()=> void,
    toggle: ()=> void
}

type Target = HTMLElement | ( () => HTMLElement ) | Ref<HTMLElement>;

const defaultOptions = {
    onFull: function(){},
    onExitFull: function(){},
};

const useFullscreen = (
    target?: Target, 
    options?: Options
):[
    isFullscreen: Ref<boolean>,
    actions: Actions
]=>{
    const fullScreenElement = !!document.fullscreenElement;
    const isFullscreen = ref(fullScreenElement);

    const {
        onFull,
        onExitFull
    } = { ...defaultOptions, ...options};

    let el:HTMLElement = document.body;

    const getEl = ()=>{
        if( typeof target === 'function'){
            return target()
        }
        return isRef( target ) ? target.value : target;
    };

    const handler = ()=>{
        if(isFullscreen.value){
            onFull()
        }else{
            onExitFull()
        }
    };

    onMounted(()=>{
        el = getEl() || el;
        el.addEventListener('fullscreenchange',handler) 
    });

    onUnmounted(()=>{
        el.removeEventListener('fullscreenchange',handler) 
    });

    const actions:Actions = {
        setFull: ()=>{
            if( isFullscreen.value ) return
            el.requestFullscreen();
            isFullscreen.value = true;
        },
        exitFull: ()=>{
            if( !isFullscreen.value ) return
            document.exitFullscreen();
            isFullscreen.value = false;
        },
        toggle: ()=>{
            isFullscreen.value ? actions.exitFull(): actions.setFull()
        }
    };
    

    return [ isFullscreen, actions ]
};

export default useFullscreen