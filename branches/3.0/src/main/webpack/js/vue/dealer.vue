<template>
        <div class="dealer">
            <vheader :headermsg="header"></vheader>

            <section class="well" style="padding: 10px 0px 0px 0px;">
                <div class="panel-heading"  id="merchantDetailFilters" data-auto="true">
                    <div class="form-inline">
                        开始时间：  <input  v-model="start"  type="date" @change="search(start,end)"/> <br/>
                        结束时间：  <input  v-model="end"  type="date"  @change="search(start,end)"/> <br/>
                    </div>
                </div>
            </section>
            <section class="well">
                <p class="Dealer_title">商户交易明细报表</p>
                <table width="100%" border="1" cellpadding="0" cellspacing="0" align="center">
                    <tr>
                        <td rowspan="2" scope="col">编号</td>
                        <td rowspan="2" scope="col">商户名称</td>
                        <td scope="col">交易量</td>
                        <td scope="col">预审量</td>
                        <td scope="col">交易额</td>
                        <td scope="col">手续费</td>
                    </tr>
                    <tr>
                        <td><div align="center">（辆）</div></td>
                        <td><div align="center">（辆）</div></td>
                        <td><div align="center">（万元）</div></td>
                        <td><div align="center">（元）</div></td>
                    </tr>
                    <tr v-for="x in datalist">
                        <td >{{x.l}}</td>
                        <td>{{x.u}}</td>
                        <td>{{x.c}}</td>
                        <td>{{x.s}}</td>
                        <td>{{x.b}}</td>
                        <td>{{x.f}}</td>
                    </tr>
                    <tr>
                        <td height="33" scope="row"><div >合计</div></td>
                        <td></td>
                        <td>{{count1==0?null:count1}}</td>
                        <td>{{yushenliang1==0?null:yushenliang1}}</td>
                        <td>{{money1==0?null:money1}}</td>
                        <td>{{ServiceCharge1==0?null:ServiceCharge1}}</td>
                    </tr>
                </table>
            </section>
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
                        <img  class="img_detail2">
                    </div>
                    <div class="mint-tab-item-label">
                        交易明细
                        <!--<router-link to="/dealer">交易明细</router-link>-->
                    </div>
                </a>
                <a class="mint-tab-item" href="#/exam">
                    <mt-badge type="error" class="tipmsg" v-show="this.examNum>0">{{examNum}}</mt-badge>

                    <div class="mint-tab-item-icon">
                        <img  class="img_pencil">
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
            search: function(startDate,endDate) {
                if(startDate&&endDate) {
                    if (endDate < startDate) {
                        alert("结束时间不能小于开始时间");
                    } else {
                        this.$http.get("/statistics/dealer?startDate=" + startDate + "&endDate=" + endDate).then(function (res) {
                            this.datalist =res.body['list'];
                            for(var i=0;i<this.datalist.length;i++){
                                this.count=this.datalist[i].c;
                                this.yushenliang=this.datalist[i].s;
                                this.money=this.datalist[i].b;
                                this.ServiceCharge=this.datalist[i].f;
                                this.count1=parseFloat(this.count)+ parseFloat( this.count1);
                                this.money1=(parseFloat(this.money1)+parseFloat(this.money));
                                this.ServiceCharge1=parseFloat(this.ServiceCharge1)+parseFloat(this.ServiceCharge);
                                if(this.yushenliang){
                                    this.yushenliang1=parseFloat(this.yushenliang1)+parseFloat(this.yushenliang);
                                }
                                if(this.money1){
                                   this.money1=parseInt(this.money1);
                                }
                            }
                        }, function (e) {
                            console.log(e)
                        });
                    }
                }else{
                    alert("请选择时间");
                }
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
                header:"交易",
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
                examNum:0
            }

        },
        mounted (){

                var now = new Date();
//                var year = now.getFullYear();       //年
//                var month = now.getMonth() + 1;     //月
//                var day = now.getDate();            //日
//                this.endDate=now.getFullYear()+"-";
//                if(month<10)
//                    this.endDate+="0";
//                this.endDate+=month+"-";
//                if(day<10)
//                    this.endDate+="0";
//
//                this.endDate+=day;
                var dd = now.getDate();
                var mm = now.getMonth()+1;
                var yyyy = now.getFullYear();

                if(dd<10) {
                    dd = '0'+dd
                }

                if(mm<10) {
                    mm = '0'+mm
                }
                this.end=yyyy+"-"+mm+"-"+dd;
                this.start=yyyy+"-"+mm+"-"+dd;
                console.log( "开始时间"+this.start, "最后的时间"+this.end);
                this.$http.get("/statistics/dealer?startDate=" + this.start + "&endDate=" + this.end).then(function (res) {
                    this.datalist =res.body['list'];
                    for(var i=0;i<this.datalist.length;i++){
                        this.count=this.datalist[i].c;
                        this.yushenliang=this.datalist[i].s;
                        this.money=this.datalist[i].b;
                        this.ServiceCharge=this.datalist[i].f;
                        this.count1=parseFloat(this.count)+ parseFloat( this.count1);
                        this.money1=(parseFloat(this.money1)+parseFloat(this.money));
                        this.ServiceCharge1=parseFloat(this.ServiceCharge1)+parseFloat(this.ServiceCharge);
                        if(this.yushenliang){
                            this.yushenliang1=parseFloat(this.yushenliang1)+parseFloat(this.yushenliang);
                        }
                        if(this.money1){
                            this.money1=parseInt(this.money1);
                        }
                    }
                }, function (e) {
                    console.log(e)
                });
            },
        created(){
            //TIP数量
            this.getTip();
        }


    }
</script>
<style>
    .dealer{
        padding: 8px;
        margin-bottom: 55px;
    }
    .Dealer_title{
        font-size: 1.2rem;
        text-align: center;
    }
    table tr td{
        text-align: center;
    }
    .img_chart{
        background:url("./img/graph chart.png")  center no-repeat;
        background-size:contain;
    }
    .img_chart2{
        background:url("./img/unselected_graph chart.png")  center no-repeat;
        background-size:contain;
    }
    .img_detail{
        background:url("img/unselected_detail.png")  center no-repeat;
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

