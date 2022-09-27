import Vue from 'vue'
import { registerMicroApps, start, LifeCycleFn, setDefaultMountApp, runAfterFirstMounted } from 'qiankun'

import router from './router'
import App from './App.vue'

import microAppRoutes from './router/microAppRoutes';

/**
 * 接入主应用
 */
new Vue({
    router,
    render: h => h(App)
}).$mount('#MicroApplicationRoot')

interface Fn {
    (string?: any): void
}

const Before: LifeCycleFn<any> = (): any => {}
registerMicroApps(
    [
        ...microAppRoutes,
    ],
    {
        beforeLoad: (app) => {
            console.log('before load app.name====>>>>>', app.name)
            return Promise.resolve()
        },
        beforeMount: [
            app => {
                console.log('[LifeCycle] before mount %c%s', 'color: green;', app)
                return Promise.resolve()
            },
        ],
        afterMount: [
            app => {
                console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
                return Promise.resolve()
            }
        ],
        afterUnmount: [
            app => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
                return Promise.resolve()
            }
        ]
    }
)
setDefaultMountApp('/subvue')
start({
    prefetch: true, // 预加载
});

runAfterFirstMounted(() => {
    console.log('第一个微应用被调用啦')
})
