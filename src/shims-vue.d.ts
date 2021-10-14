import Vue, { VNode } from 'vue';
import VueRouter from 'vue-router';
import { Route } from 'vue-router';
import { Store } from 'vuex';

declare module '*.vue' {
    export default Vue
}

// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
        $store: Store<any>;
        $api: any;
    }
}

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}

