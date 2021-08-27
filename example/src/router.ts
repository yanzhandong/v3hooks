import {
    createRouter as _createRouter,
    createWebHashHistory
} from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// @ts-ignore
// const pages = import.meta.glob('./pages/*/index.vue')

// const routes = Object.keys(pages).map((path) => {
//     // @ts-ignore
//     const name = path.match(/\.\/pages(.*)\/index\.vue$/)[1].toLowerCase();
//     console.log(name,'name');
//     return {
//         path: name === '/home' ? '/' : name,
//         component: pages[path] // () => import('./pages/*.vue')
//     }
// })

export function createRouter() {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: createWebHashHistory(),
        routes:[
            {
                path:'/',
                component: () => import('./pages/home/index.vue')
            },
            {
                path:'/useVirtualList',
                component: () => import('./pages/useVirtualList/index.vue')
            },
            {
                path:'/useDynamicList',
                component: () => import('./pages/useDynamicList/index.vue')
            },
            {
                path:'/useLocalStorage',
                component: () => import('./pages/useLocalStorage/index.vue')
            },
            {
                path:'/useSessionStorage',
                component: () => import('./pages/useSessionStorage/index.vue')
            },
            // {
            //     path:'/useRouteQuery',
            //     component: () => import('./pages/useRouteQuery/index.vue')
            // },
            {
                path:'/useCookie',
                component: () => import('./pages/useCookie/index.vue')
            },
            {
                path:'/useDate',
                component: () => import('./pages/useDate/index.vue')
            },
            {
                path:'/useNetwork',
                component: () => import('./pages/useNetwork/index.vue')
            },
            {
                path:'/useLockFn',
                component: () => import('./pages/useLockFn/index.vue')
            },
            {
                path:'/useSetAndUseMap',
                component: () => import('./pages/useSetAndUseMap/index.vue')
            },
            {
                path:'/useMediaQuery',
                component: () => import('./pages/useMediaQuery/index.vue')
            },
            {
                path:'/useExternal',
                component: () => import('./pages/useExternal/index.vue')
            },
            {
                path:'/useFullscreen',
                component: () => import('./pages/useFullscreen/index.vue')
            },
            {
                path:'/useTextSelection',
                component: () => import('./pages/useTextSelection/index.vue')
            },
            {
                path:'/useInterval',
                component: () => import('./pages/useInterval/index.vue')
            },
            {
                path:'/useQRCode',
                component: () => import('./pages/useQRCode/index.vue')
            },
            {
                path:'/useToggle',
                component: () => import('./pages/useToggle/index.vue')
            },
            {
                path:'/useBoolean',
                component: () => import('./pages/useBoolean/index.vue')
            },
            {
                path:'/useWebSocket',
                component: () => import('./pages/useWebSocket/index.vue')
            }
        ]
    })
}