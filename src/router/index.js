import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

Vue.use(Router)


// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
        meta: {
            whiteList: true,
        },
    },
    // {
    //     path: '*',
    //     redirect: '/Home',
    // },
];
const router = new Router({
    mode: 'history',
    base: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? process.env.VUE_APP_BASE_PATH : '/',
    routes,
});

guards(router)

export default router;
