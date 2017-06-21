/**
 * Created by 扬 on 2017/6/16.
 */
var Vue = require('vue')
var VueResource = require('vue-resource')
Vue.use(VueResource)

var hello = require("./vue/hello.vue")
const NotFound = { template: '<p>Page not found</p>' }
const About = { template: '<p>about page</p>' }
const routes = [
    {path:'/home', component:hello},
    {path:'/about',component:About},
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

const app = new Vue({
    router
}).$mount('#app')