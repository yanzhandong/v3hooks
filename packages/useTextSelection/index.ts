import {
    Ref,
    isRef,
    reactive,
    onMounted,
    onUnmounted,
    toRefs
} from 'vue';

type Target = HTMLElement | Ref<HTMLElement> | (() => HTMLElement ) | Document;

const defaultReact = {
    left: NaN,
    right: NaN,
    top: NaN,
    bottom: NaN,
    height: NaN,
    width: NaN
};

const useTextSelection = (
    target:Target = document
)=>{
    let state = reactive({
        text: '',
        rect: defaultReact
    })

    let el:HTMLElement | Document = document;

    const getEl = ()=>{
        if( typeof target === 'function'){
            return target()
        }
        return isRef( target ) ? target.value : target;
    };

    const getRect = (selection: Selection | null)=>{
        if( !selection ) return defaultReact
        const range = selection.getRangeAt(0);
        const {  height, width, top, left, right, bottom } = range.getBoundingClientRect();
        return {
            height,
            width,
            top,
            left,
            right,
            bottom,
        };
    };

    const handleMouseup = ()=>{
        let currSelection: Selection | null = window.getSelection();
        let text = currSelection ? currSelection.toString() : '';
        let rect = getRect( currSelection );

        state.text = text;
        state.rect = rect;
    };

    const handleMousedown = ()=>{
        if( state.text ){
            state.text = ''
            state.rect = defaultReact;
        }
        const currSelection:Selection | null = window.getSelection();
        if (!currSelection) return;
        currSelection.removeAllRanges();
    };

    onMounted(()=>{
        el = getEl();
        el.addEventListener('mouseup',handleMouseup);
        document.addEventListener('mousedown', handleMousedown);
    })

    onUnmounted(()=>{
        el.removeEventListener('mouseup',handleMouseup);
        document.removeEventListener('mousedown', handleMousedown);
    })

    return toRefs( state )
};

export default useTextSelection
