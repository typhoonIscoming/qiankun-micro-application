import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import StoreJs from 'storejs';

NProgress.configure({
    showSpinner: false
})

export default (router) => {
    
    router.beforeEach((to, from, next) => {
        NProgress.start()
        next()
    })

    router.afterEach((to, from) => {
        NProgress.done()
    })
}
