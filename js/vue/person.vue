<template>
    <div class="year">
        <div class="page-header-main header">
            <div class="wraptop"></div>
            <header class="mint-header is-fixed">
                <div class="mint-header-button is-left">
                    <a href="#/year" class="router-link-active">
                        <button class="mint-button mint-button--default mint-button--normal"><span
                                class="mint-button-icon"><i class="mintui mintui-back"></i></span> <label
                                class="mint-button-text">返回</label></button>
                    </a>
                </div>
                <h1 class="mint-header-title"><br>个人中心</h1>
                <div class="mint-header-button is-right"></div>
            </header>
        </div>
        <div class="page-wrap">
            <!--<hr>-->
            <div style="height: 2rem"></div>
              当前账号：{{name}}
             <br>
             <div style="height: 5rem"></div>
            <div class="form-line">
                <mt-button size="large"  class="pass mint-button mint-button--primary mint-button--normal" @click="quit()">注销账号</mt-button>
                <!--<mt-button size="large"  class="pass mint-button mint-button&#45;&#45;danger mint-button&#45;&#45;normal" @click="refuse($route.query.data)">拒绝</mt-button>-->
            </div>
        </div>
        <div class="mint-tabbar is-fixed" style="margin-top: 50px">
            <a class="mint-tab-item " href="#/year">
                <div class="mint-tab-item-icon">
                    <img class="img_chart2">
                </div>
                <div class="mint-tab-item-label">
                    报表查询
                    <!--<router-link to="/year"> 报表查询</router-link>-->
                </div>
            </a>
            <a class="mint-tab-item" href="#/dealer">
                <div class="mint-tab-item-icon">
                    <img  class="img_detail">
                </div>
                <div class="mint-tab-item-label">
                    交易明细
                    <!--<router-link to="/dealer">交易明细</router-link>-->
                </div>
            </a>
            <!--<a class="mint-tab-item" href="#/exam">-->
                <!--<mt-badge type="error" class="tipmsg" v-show="this.examNum>0">{{examNum}}</mt-badge>-->

                <!--<div class="mint-tab-item-icon">-->
                    <!--<img  class="img_pencil">-->
                <!--</div>-->
                <!--<div class="mint-tab-item-label">-->
                    <!--领导审批-->
                    <!--&lt;!&ndash;<router-link to="/exam">领导审批</router-link>&ndash;&gt;-->
                <!--</div>-->
            <!--</a>-->
            <a class="mint-tab-item" href="#/person">
                <div class="mint-tab-item-icon">
                    <img  class="img_person2">
                </div>
                <div class="mint-tab-item-label">
                    我
                </div>
            </a>
        </div>
    </div>
</template>
<style>
    .year{
        padding: 8px;
        margin-bottom: 55px;
    }
    .select{
        height: 30px;
        /*-webkit-appearance: none;*/
        /*appearance: none;*/
        /*border: none;*/
        font-size: 18px;
        padding: 0px 5px;
        display: inline-block;
        /*width: 100%;*/
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius: 4px;
    }
    .testChart .echarts {
        width: 100%;
        height: 300px;
        background-color: grey;
    }
    .mint-tab-item {
        display: block;
        padding: 7px 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none
    }
    .mint-tab-item-icon {
        width: 24px;
        height: 24px;
        margin: 0 auto 5px
    }
    .mint-tab-item-icon:empty {
        display: none
    }
    .mint-tab-item-icon > * {
        display: block;
        width: 100%;
        height: 100%
    }
    .mint-tab-item-label {
        color: inherit;
        font-size: 12px;
        line-height: 1
    }


</style>
<script>
    import chart from 'vue-echarts'
    import Button from 'mint-ui/lib/button';
    import 'mint-ui/lib/button/style.css';
    import 'mint-ui/lib/button/style.css';
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';
    import selectlist from './selectlist.vue';
    import { Toast } from 'mint-ui';


    Vue.component(Button.name, Button);
    module.exports = {
        name: "test",
//        props:{
//            select_list:"1"
//        },
        components: {
            chart,vheader,vfooter,selectlist
        },
        watch:{

        },
        methods:{
            quit:function () {
                console.log("退出当前账号");
                localStorage.clear();

                this.$http.post('/logout').then(function (result) {
//                    console.log("初始化登录成功");
//                    this.$router.push({path:'/'});

                },function (err) {
                    console.log(err.message);
//                    console.log("初始化登录失败");
//                    Toast('退出失败');
                })




            },
//            getTip:function () {
//                this.$http.post("/evaluation/list",{}).then(function(result){
//                    console.log(result.data);
//                    function getHsonLength(json){
//                        var jsonLength=0;
//                        for (var i in json) {
//                            jsonLength++;
//                        }
//                        return jsonLength;
//                    }
//                    this.examNum=getHsonLength(result.data);
//                },function(response){
//                    console.info(response);
//                });
//            }
        },
        created()
        {
            this.name = localStorage.getItem("username");
//            this.getTip();

        },
        data()
        {
            return {
//                headermsg:"year",
                select_list:'1',
                header:"设置",
                name:"",
                examNum:0,

//                queryList:"1"
            }
        },
        computed:{

        }
    }
</script>

