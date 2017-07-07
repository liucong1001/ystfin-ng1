/**
 * Created by 扬 on 2017/6/16.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import monthOnMonth from "./vue/monthOnMonth.vue"
import yearOnYear from "./vue/yearOnYear.vue"
import year from "./vue/year.vue"
import month from "./vue/month.vue"
import day from "./vue/day.vue"
import dealer from "./vue/dealer.vue"
const NotFound = { template: '<p>Page not found</p>' }
const About = { template: '<p>二手车报表查询</p>' }
const routes = [
    {path:'/about',component:About},
    {path:'/dealer',component:dealer},
    {path:'/monthOnMonth',component:monthOnMonth},
    {path:'/yearOnYear',component:yearOnYear},
    {path:'/year',component:year},
    {path:'/month',component:month},
    {path:'/day',component:day},
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

const app = new Vue({
    router
}).$mount('#app')