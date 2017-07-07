/**
 * Created by 扬 on 2017/6/16.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import hello from "./vue/hello.vue"
import monthOnMonth from "./vue/monthOnMonth.vue"
import yearOnYear from "./vue/yearOnYear.vue"
const NotFound = { template: '<p>Page not found</p>' }
const About = { template: '<p></p>' }
const routes = [
    {path:'/home', component:hello},
    {path:'/about',component:About},
    {path:'/monthOnMonth',component:monthOnMonth},
    {path:'/yearOnYear',component:yearOnYear},
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

const app = new Vue({
    router
}).$mount('#app')