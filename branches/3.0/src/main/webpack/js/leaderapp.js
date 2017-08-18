/**
 * Created by 扬 on 2017/6/16.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);
Vue.use(VueResource);

import monthOnMonth from "./vue/monthOnMonth.vue"
import yearOnYear from "./vue/yearOnYear.vue"
import year from "./vue/year.vue"
import month from "./vue/month.vue"
import day from "./vue/day.vue"
import dealer from "./vue/dealer.vue"
import main from "./vue/main.vue"
import exam from "./vue/exam.vue"
import examDetail from "./vue/examDetail.vue";
import  login from "./vue/login.vue"
import  price from "./vue/price.vue"
import  carType from "./vue/carType.vue"
import  person from "./vue/person.vue"

//import vheader from './vue/vheader.vue';

const NotFound = { template: '<p>Page not found</p>' };
const About = { template: '<p>二手车报表查询</p>' };
const routes = [
    {path:'/',component:login},
    {path:'/about',component:About},
    {path:'/dealer',component:dealer},
    {path:'/monthOnMonth',component:monthOnMonth},
    {path:'/yearOnYear',component:yearOnYear},
    {path:'/year',component:year},
    {path:'/month',component:month},
    {path:'/day',component:day},
    {path:'/exam',component:exam},
    {path:'/examDetail',component:examDetail},
    {path:'/price',component:price},
    {path:'/carType',component:carType},
    {path:'/person',component:person},

];
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

// const app = new Vue({
//     router
// }).$mount('#app');
const app = new Vue({
    router,
    created(){
        Vue.http.interceptors.push(function (request,next) {
            next(function (response) {
                console.log(response);
                if(response.status != 200 && response.body.code == "9901"){ // 未登录
                    console.log(this.$router);
                    this.$router.push('/')
                }
                return response
            })
        })
    }
}).$mount('#app');

Vue.filter("intNum", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return  Math.round(value);
});