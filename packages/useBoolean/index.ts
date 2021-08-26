import { Ref } from 'vue';
import useToggle from '../useToggle';

// 默认值
const defaultValue = false;

interface Actions{
    toggle: ()=> void;
    setTrue: ()=> void;
    setFalse: ()=> void;
}

function useBoolean(
    value?: boolean
): [Ref<boolean>,Actions]
/**
 * 
 * @param defaultValue
 * @returns 
 */
function useBoolean (value?: boolean){

    value = value || defaultValue;

    const [ state, [ toggle ]] = useToggle(value,!value);
    
    const setTrue = () => toggle(true);
    const setFalse = () => toggle(false);

    const actions: Actions = { toggle, setTrue, setFalse }
    return [state, actions ]
}

export default useBoolean