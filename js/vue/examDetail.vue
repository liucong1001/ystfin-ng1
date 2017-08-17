<template>
    <div class="examDetail">
        <div class="page-header-main header">
            <div class="wraptop"></div>
            <header class="mint-header is-fixed">
                <div class="mint-header-button is-left">
                    <a href="#/exam" class="router-link-active">
                        <button class="mint-button mint-button--default mint-button--normal"><span
                                class="mint-button-icon"><i class="mintui mintui-back"></i></span> <label
                                class="mint-button-text">返回</label></button>
                    </a>
                </div>
                <h1 class="mint-header-title"><br>领导审批</h1>
                <div class="mint-header-button is-right"></div>
            </header>
        </div>
        <div style="height: 20px"></div>
        <p class="center">详情页面</p>
        <table>
             <tbody>
              <tr>
                  <td>车牌号：</td> <td>{{this.$route.query.data.plateNumber}} </td>
              </tr>
              <tr>
                  <td>流水号：</td> <td>{{this.$route.query.data.archivesNo}} </td>
              </tr>
              <tr>
                  <td>旧评估价格：</td> <td>{{this.$route.query.data.oldBargainPrice}} </td>
              </tr>
              <tr>
                  <td>新评估价格：</td> <td>{{this.$route.query.data.newBargainPrice}} </td>
              </tr>
              <tr>
                  <td>旧评估费：</td> <td>{{this.$route.query.data.oldEvaluateFees}} </td>
              </tr>
              <tr>
                  <td>新评估费：</td> <td>{{this.$route.query.data.newEvaluateFees}} </td>
              </tr>
              <tr>
                  <td>创建时间：</td> <td>{{this.$route.query.data.createTime}} </td>
              </tr>
              <tr>
                  <td>修改原因：</td> <td>{{this.$route.query.data.reason}} </td>
              </tr>
              <!--<tr>-->
                  <!--<td>状态：</td> <td>{{this.$route.query.data.status=='01'?'未通过':'通过'}} </td>-->
              <!--</tr>-->
             </tbody>
        </table>
        <div class="form-line">
            <mt-button size="large"  class="pass mint-button mint-button--primary mint-button--normal" @click="passed($route.query.data)">通过</mt-button>
            <mt-button size="large"  class="pass mint-button mint-button--danger mint-button--normal" @click="refuse($route.query.data)">拒绝</mt-button>
        </div>
        <!--固定底部-->
        <div class="mint-tabbar is-fixed" style="margin-top: 50px">
            <a class="mint-tab-item ">
                <div class="mint-tab-item-icon">
                    <img class="img_chart2">
                </div>
                <div class="mint-tab-item-label">
                    <router-link to="/year"> 报表查询</router-link>
                </div>
            </a>
            <a class="mint-tab-item">
                <div class="mint-tab-item-icon">
                    <img  class="img_detail">
                </div>
                <div class="mint-tab-item-label">

                    <router-link to="/dealer">交易明细</router-link>
                </div>
            </a>
            <!--<a class="mint-tab-item">-->
                <!--<mt-badge type="error" class="tipmsg" v-show="this.examNum>0">{{examNum}}</mt-badge>-->
                <!--<div class="mint-tab-item-icon">-->
                    <!--<img  class="img_pencil2">-->
                <!--</div>-->
                <!--<div class="mint-tab-item-label">-->
                    <!--<router-link to="/exam">领导审批</router-link>-->
                <!--</div>-->
            <!--</a>-->
            <a class="mint-tab-item" href="#/person">
                <div class="mint-tab-item-icon">
                    <img  class="img_person">
                </div>
                <div class="mint-tab-item-label">
                    我
                </div>
            </a>
        </div>

    </div>
</template>
<script>
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';

    module.exports = {
        components:{vheader,vfooter},
        methods:{
            goDetail:function (item) {
                console.log("车牌号："+item.plateNumber);
            },
            goBack:function () {
                this.$router.push({path:'/exam'});
            },
            passed:function (item) {

                this.$http.post("/evaluation/pass?id="+item.id).then(function(result){
                    this.getTip();
                    this.$toast(item.plateNumber+"审核通过！");
                    this.goBack();
                },function(response){
                    console.info(response);
                    this.getTip();
                    this.$toast(item.plateNumber+"审核失败！");

                })

            },
            refuse:function (item) {
                this.$http.post("/evaluation/notPass?id="+item.id).then(function(result){
                    this.$toast(item.plateNumber+"已拒绝");
                    this.goBack();
                },function(response){
                    console.info(response);
                })

            },
            getTip:function () {
                this.$http.post("/evaluation/list",{}).then(function(result){
                    console.log(result.data);
                    function getHsonLength(json){
                        var jsonLength=0;
                        for (var i in json) {
                            jsonLength++;
                        }
                        return jsonLength;
                    }
                    this.examNum=getHsonLength(result.data);
                },function(response){
                    console.info(response);
                });
            }

        },
        data(){
            return{
                header:"领导审批",
                start:'',//開始時間
                end:'',//結束時間
                datalist:[],
                count1:0,
                count:'',
                yushenliang:'',
                yushenliang1:0,
                money:'',
                money1:0,
                ServiceCharge:'',
                ServiceCharge1:0,
                examList:"",
                carNum:"",
                examNum:0
            }

        },
        created(){
           this.getTip();

        },


    }
</script>
<style  scoped>
    .examDetail{
        padding: 8px;
    }
    .pass{
        margin-bottom: 15px;
    }
    .examDetail table{
        margin-bottom: 15px;
    }
    .examDetail  table tr td:first-child{
        text-align: right;
    }
    .examDetail  table tr td:nth-child(2){
        text-align: left;
    }
    .center{
        text-align: center;
        font-size: 1.2rem;
    }
    .img_chart{
        background:url('./img/graph chart.png')  center no-repeat;
        background-size:contain;
    }
    .img_chart2{
        background:url('./img/unselected_graph chart.png')  center no-repeat;
        background-size:contain;
    }
    .img_detail{
        background:url('img/unselected_detail.png')  center no-repeat;
        background-size:contain;
    }
    .img_detail2{
        background:url("img/detail.png")  center no-repeat;
        background-size:contain;
    }
    .img_pencil{
        background:url("img/unselected_pencil.png")  center no-repeat;
        background-size:contain;
    }
    .img_pencil2{
        background:url("img/pencil.png")  center no-repeat;
        background-size:contain;
    }


</style>

