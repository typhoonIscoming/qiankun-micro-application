<template>
    <div id="app">
        <router-view />
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    name: 'App',
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
#app {
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    font-size: 14px;
    overflow-x: hidden;
    margin: 0 auto;
}
</style>
