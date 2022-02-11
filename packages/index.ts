import useRequest from './useRequest/index';
import useDate from './useDate/index';
import useDebounce from './useDebounce/index';
import useDebounceFn from './useDebounceFn/index';
import useThrottle from './useThrottle/index';
import useThrottleFn from './useThrottleFn/index';
import useBoolean from './useBoolean/index';
import useToggle from './useToggle/index';
import useVirtualList from './useVirtualList/index';
import useDynamicList from './useDynamicList/index';
import useLocalStorage from './useLocalStorage/index';
import useSessionStorage from './useSessionStorage/index';
import useNetwork from './useNetwork/index';
import useCookie from './useCookie/index';
import useLockFn from './useLockFn/index';
import useSet from './useSet/index';
import useMap from './useMap/index';
import useMediaQuery from './useMediaQuery/index';
import useExternal from './useExternal/index';
import useFullscreen from './useFullscreen/index';
import useDocumentVisibility from './useDocumentVisibility/index'
import useTextSelection from './useTextSelection/index'
import useInterval from './useInterval/index'
import useTimeout from './useTimeout/index'
import useQRCode from './useQRCode/index'
import useWebSocket from './useWebSocket/index'
import useUnmount from './useUnmount/index'

// 暂时无法@/分包 未引入vue-router会导致都不能用
// import useRouteQuery from './useRouteQuery/index';


export {
    // Async
    useRequest,

    // Side
    useDebounce,
    useDebounceFn,
    useThrottle,
    useThrottleFn,
    useInterval,
    useTimeout,

    // State
    useBoolean,
    useToggle,
    useDate,
    useCookie,
    useLocalStorage,
    useSessionStorage,
    // useRouteQuery,
    useNetwork,
    useSet,
    useMap,
    useWebSocket,

    // UI
    useVirtualList,
    useDynamicList,
    useMediaQuery,
    useExternal,
    useFullscreen,
    useDocumentVisibility,
    useTextSelection,
    useQRCode,

    //Advanced
    useLockFn,
    useUnmount

}