import Vue from 'vue'

import router from './router';
import App from './App.vue'

/**
 * 接入主应用
 */
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
