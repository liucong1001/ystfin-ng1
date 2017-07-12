<template>
        <div>
            <div class="page-header-main header">
                <header class="mint-header is-fixed">
                    <div class="mint-header-button is-left"></div>
                    <h1 class="mint-header-title">交易明细</h1>
                    <div class="mint-header-button is-right"></div>
                </header>
            </div>
            <section class="well" style="padding: 10px 0px 0px 0px;">
                <div class="panel-heading"  id="merchantDetailFilters" data-auto="true">
                    <div class="form-inline">
                        开始时间：  <input  v-model="start"  type="date"/> <br/>
                        结束时间：  <input  v-model="end"  type="date" /> <br/>
                        <button class="mint-button mint-button--primary mint-button--normal" type="button" v-on:click="search(start,end)"> 查询</button>
                    </div>
                </div>
            </section>
            <section class="well">
                <h2 align="center">商户交易明细报表</h2>
                <table width="100%" border="1" cellpadding="0" cellspacing="0" align="center">
                    <tr>
                        <th rowspan="2" scope="col">编号</th>
                        <th rowspan="2" scope="col">商户名称</th>
                        <th scope="col">交易量</th>
                        <th scope="col">预审量</th>
                        <th scope="col">交易额</th>
                        <th scope="col">手续费</th>
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
                        <th height="33" scope="row"><div align="center">合计</div></th>
                        <td></td>
                        <td>{{count1==0?null:count1}}</td>
                        <td>{{yushenliang1==0?null:yushenliang1}}</td>
                        <td>{{money1==0?null:money1}}</td>
                        <td>{{ServiceCharge1==0?null:ServiceCharge1}}</td>
                    </tr>
                </table>
            </section>
            <div class="mint-tabbar is-fixed" style="margin-top: 50px">
                <a class="mint-tab-item">
                    <div class="mint-tab-item-icon">
                        <img src="./img/unselected_graph chart.png">
                    </div>
                    <div class="mint-tab-item-label">
                        <router-link to="/year"> 报表查询</router-link>
                    </div>
                </a>
                <a class="mint-tab-item  is-selected">
                    <div class="mint-tab-item-icon">
                        <img src="./img/detail.png">
                    </div>
                    <div class="mint-tab-item-label">

                        <router-link to="/dealer">交易明细</router-link>
                    </div>
                </a>
                <a class="mint-tab-item">
                    <div class="mint-tab-item-icon">
                        <img src="./img/unselected_pencil.png">
                    </div>
                    <div class="mint-tab-item-label">
                        领导审批
                    </div>
                </a>
                <a class="mint-tab-item">
                    <div class="mint-tab-item-icon">
                        <img src="./img/unselected_settings.png">
                    </div>
                    <div class="mint-tab-item-label">
                        设置
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
                        alert("结束时间不能小于开始时间")
                    } else {
                        this.$http.get("/statistics/dealer?startDate=" + startDate + "&endDate=" + endDate).then(function (res) {
                            this.datalist =res.body['list'];
                            for(var i=0;i<this.datalist.length;i++){
                                this.count=this.datalist[i].c;
                                this.yushenliang=this.datalist[i].s;
                                this.money=this.datalist[i].b;
                                this.ServiceCharge=this.datalist[i].f;
                                this.count1=parseFloat(this.count)+ parseFloat( this.count1);
                                this.money1=(parseFloat(this.money1)+parseFloat(this.money))
                                this.ServiceCharge1=parseFloat(this.ServiceCharge1)+parseFloat(this.ServiceCharge);
                                if(this.yushenliang){
                                    this.yushenliang1=parseFloat(this.yushenliang1)+parseFloat(this.yushenliang);
                                };
                                if(this.money1){
                                   this.money1=parseInt(this.money1);
                                }
                            }
                        }, function (e) {
                            console.log(e)
                        });
                    }
                }else{
                    alert("请选择开始时间或结束时间");
                }
            }
        },
        data(){
            return{
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
                ServiceCharge1:0
            }

        },
        mounted (){
            if(this.startDate==null&&this.endDate==null){
                var now = new Date()
                var year = now.getFullYear();       //年
                var month = now.getMonth() + 1;     //月
                var day = now.getDate();            //日
                this.endDate=now.getFullYear()+"-";
                if(month<10)
                    this.endDate+="0";
                this.endDate+=month+"-";
                if(day<10)
                    this.endDate+="0";
                this.endDate+=day;
                this.startDate=this.endDate;
                this.$http.get("/statistics/dealer?startDate=" + this.startDate + "&endDate=" + this.endDate).then(function (res) {
                    this.datalist =res.body['list'];
                    for(var i=0;i<this.datalist.length;i++){
                        this.count=this.datalist[i].c;
                        this.yushenliang=this.datalist[i].s;
                        this.money=this.datalist[i].b;
                        this.ServiceCharge=this.datalist[i].f;
                        this.count1=parseFloat(this.count)+ parseFloat( this.count1);
                        this.money1=(parseFloat(this.money1)+parseFloat(this.money))
                        this.ServiceCharge1=parseFloat(this.ServiceCharge1)+parseFloat(this.ServiceCharge);
                        if(this.yushenliang){
                            this.yushenliang1=parseFloat(this.yushenliang1)+parseFloat(this.yushenliang);
                        };
                        if(this.money1){
                            this.money1=parseInt(this.money1);
                        }
                    }
                }, function (e) {
                    console.log(e)
                });
            }
        }

    }
</script>
<style>
    table tr td{
        text-align: center;
    }

</style>

