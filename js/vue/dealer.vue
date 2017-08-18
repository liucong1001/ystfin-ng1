<template>
        <div class="dealer page-popup" >
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
                <table width="100%" border="1" cellpadding="0" cellspacing="0" align="center" class="page-popup-wrapper">
                    <tr>
                        <td rowspan="2" scope="col">编号</td>
                        <!--<td rowspan="2" scope="col">商户名称</td>-->
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
                        <tr v-for="x in datalist" @click="showTip(x.u)" size="large"  ref="button" >
                            <!--popupVisible1 = true-->
                            <td>{{x.l}}</td>
                            <!--<td>{{x.u}}</td>-->
                            <td>{{x.c}}</td>
                            <td>{{x.s}}</td>
                            <td>{{x.b}}</td>
                            <td>{{x.f}}</td>

                        </tr>
                    <mt-popup v-model="popupVisible1"   popup-transition="popup-fade" class="mint-popup-1" :style="{ top: buttonBottom + 10 + 'px' }">
                        <h3>{{name}}</h3>
                    </mt-popup>

                    <!--</mt-button>-->

                    <tr>
                        <td height="33" scope="row"><div >合计</div></td>
                        <!--<td></td>-->
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
    import { Popup } from 'mint-ui';
    import { Toast } from 'mint-ui';

    module.exports = {
        components:{vheader,vfooter, Popup},
        methods:{
            search: function(startDate,endDate) {
                if(startDate&&endDate) {
                    if (endDate < startDate) {
                        alert("结束时间不能小于开始时间");
                    } else {
                         /*将合计数量清空*/
                        this.count1=0;this.money1=0;this.yushenliang1=0;this.ServiceCharge1=0;
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
//            },
            showTip:function (name) {
                this.popupVisible1 = true;
                this.name=name;
            },
            onDateChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
                this.dateStart = values[0];
                this.dateEnd = values[1];
            }
        },
        data(){
            return{
                header:"交易明细",
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
                examNum:0,
                popupVisible1: false,
                popupVisible2: false,
                popupVisible3: false,
                popupVisible4: false,
                buttonBottom: 0,
                name:"",
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

//            this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;
            },
        created(){
            //TIP数量
//            this.getTip();
        },
        watch: {
            popupVisible1(val) {
                console.log(val);
//                if (val) {
//                    setTimeout(() => {
//                        this.popupVisible1 = false;
//                    }, 2000);
//                }
            }
        },

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
    .img_person2{
        background:url("img/person_check.png")  center no-repeat;
        background-size:contain;
    }
    .mint-popup-1 {
        width: 200px;
        border-radius: 8px;
        padding: 10px;
        transform: translate(-50%, 0);
    }
    .mint-popup-1::before {
        triangle: 10px top #fff;
        content: '';
        position: absolute;
        top: -20px;
        right: 50px;
    }
    .mint-popup-2 {
        width: 100%;
        height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,.7);
        backface-visibility: hidden;
    }
    .mint-popup-4 {
        width: 100%;}
    .picker-slot-wrapper, .picker-item {
        backface-visibility: hidden;
    }
</style>

