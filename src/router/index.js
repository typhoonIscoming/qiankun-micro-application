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
    {
        path: '/main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '../views/Main'),
        meta: {
            whiteList: true,
        },
    },
    // 主应用设置通配路由配置之后，qiankun.js基于路由匹配子应用的方式会导致url是子应用时，主应用没有该url
    // 的配置，就会重定向到/home路由
    // {
    //     path: '*',
    //     redirect: '/Home',
    // },
];
const router = new Router({
    mode: 'history',
    base: '/',
    routes,
});

guards(router)

export default router;
