import Vue from 'vue'
import {
    registerMicroApps,
    start,
    LifeCycleFn,
    setDefaultMountApp
} from 'qiankun'

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
            entry: 'http://www.typhooniscoming.cn/home',
            container: '#container',
            activeRule: '/microvue'
        }
    ],
    {
        beforeLoad: Before,
        beforeMount: [
            Before,
        ]
    }
)
setDefaultMountApp('/microvue')
start({
    prefetch: true, // 预加载
})
