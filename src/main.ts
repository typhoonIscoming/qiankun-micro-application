import Vue from 'vue'
import { registerMicroApps, start, LifeCycleFn, setDefaultMountApp } from 'qiankun'

import router from './router'
import App from './App.vue'

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
        {
            name: 'vueApp',
            // entry: 'http://www.typhooniscoming.cn/home',
            entry: 'http://127.0.0.1:5501/microApplication/microApp.html',
            // entry: 'http://127.0.0.1:5501/macDialog.html',
            container: '#container',
            activeRule: '/subvue'
        },
        {
            name: 'detail',
            // entry: 'http://www.typhooniscoming.cn/home',
            entry: 'http://127.0.0.1:5501/microApplication/detail.html',
            // entry: 'http://127.0.0.1:5501/macDialog.html',
            container: '#box',
            activeRule: '/subDetail'
        },
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
})
