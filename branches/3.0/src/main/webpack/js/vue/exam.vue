<template>
    <div class="exam">
        <vheader :headermsg="header"></vheader>

        <section class="well" style="padding: 10px 0px 0px 0px;">
            <div class="panel-heading"  id="merchantDetailFilters" data-auto="true">
                <div class="form-inline">
                    <input type="text"  class="plateNum" v-model="carNum" placeholder="车牌号">
                    <button class="mint-button mint-button--primary mint-button--normal" type="button" v-on:click="search(carNum)"> 查询</button>
                </div>
            </div>
        </section>
        <section class="well">

            <p class="exam_Title">领导审批表</p>
            <table width="100%" border="1" cellpadding="0" cellspacing="0" align="center">
                <tbody>
                   <tr>
                       <td>车牌号</td>
                       <td>旧评估费</td>
                       <td>新评估费</td>
                   </tr>
                    <tr v-for="item in  examList"  @click="goDetail(item)">
                        <td>{{item.plateNumber}}</td>
                        <td>{{item.oldEvaluateFees}}</td>
                        <td>{{item.newEvaluateFees}}</td>
                    </tr>
                </tbody>
            </table>
        </section>


        <!--固定底部-->
        <div class="mint-tabbar is-fixed" style="margin-top: 50px">
            <a class="mint-tab-item " href="#/year">
                <div class="mint-tab-item-icon">
                    <img class="img_chart2">
                </div>
                <div class="mint-tab-item-label">
                    <!--<router-link to="/year"> 报表查询</router-link>-->
                    报表查询
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
            <a class="mint-tab-item" href="#/exam">
                <mt-badge type="error" class="tipmsg" v-show="this.examNum>0">{{examNum}}</mt-badge>
                <div class="mint-tab-item-icon">
                    <img  class="img_pencil2">
                </div>
                <div class="mint-tab-item-label">
                    领导审批
                    <!--<router-link to="/exam">领导审批</router-link>-->
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
            load:function () {
               console.log("开始加载数据ing");
            },
            search: function(plateNumber) {
                console.log("查找到了"+plateNumber);

                this.$http.post("/evaluation/list",{plateNumber:plateNumber}).then(function(result){
                    console.log("请求查到了"+plateNumber);
                    this.examList=result.data;
                },function(response){
                    console.info(response);
                })
            },
            goDetail:function (item) {
                 console.log("车牌号："+item.plateNumber);
                this.$router.push({path:'/examDetail', query: {data: item}});
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
                plateNumber:"",
                examNum:0
            }

        },
        created(){
        //获取表格数据
            this.$http.post("/evaluation/list",{}).then(function(result){
                console.log("请求成功!");
                console.log(result.data);
                this.examList=result.data;
            },function(response){
                console.info(response);
            });
         //获取tip数量
            this.getTip();

        },



    }
</script>
<style scoped>
    .exam{
        padding: 8px;
        margin-bottom: 55px;
    }
    .exam_Title{
        font-size: 1.2rem;
        text-align: center;
    }
    .tipmsg{
        position: absolute;
        right: 10px;
        bottom: 30px;
    }
    .exam table tr td{
        text-align: center;
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
    .plateNum{
        outline: none;
        height: 2rem;
        /*border: none;*/
    }
</style>

