<template>
    <div id="MicroApplicationRoot">
        MicroApplicationRoot主应用
        <button @click="handleRoute('vueApp')">home</button>
        <button @click="handleRoute('detail')">detail</button>
        <router-view />
        <div id="container"></div>
        <div id="box"></div>
    </div>
</template>

<script>
import { loadMicroApp } from 'qiankun';
import microAppRoutes from '@/router/microAppRoutes';

export default {
    name: 'App',
    methods: {
        handleRoute(route) {
            console.log('route', route)
            const item = microAppRoutes.find(i => i.name === route);
            if (item) {
                loadMicroApp(item, {
                    singular: false,
                })
            }
        },
    },
}
</script>

<style lang="scss">
*{ margin: 0; padding: 0; box-sizing: border-box; }
body{
    // 防止 ios 中微信字体变大后布局错乱
    -webkit-text-size-adjust: 100% !important;
    height: 100%;
    box-sizing: border-box;
}
#MicroApplicationRoot {
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    font-size: 14px;
    overflow-x: hidden;
    margin: 0 auto;
}
#container{
    height: fit-content;
}
#box{
    min-height: 100px;
}
</style>
