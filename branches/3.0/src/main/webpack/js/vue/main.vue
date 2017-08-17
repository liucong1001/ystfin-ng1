<template>
    <div>
        <div class="bg_color">
            <router-link to="/about">首页 </router-link>
        </div>
        <div class="bg_color">
            <router-link to="/year">按年查询</router-link>
        </div>
        <div class="bg_color">
            <router-link to="/month">按月查询</router-link><br>
         </div>
        <div class="bg_color">
            <router-link to="/day">按天查询</router-link><br>
         </div>
        <div class="bg_color">
            <router-link to="/yearOnYear">同比</router-link><br>
         </div>
        <div class="bg_color">
            <router-link to="/monthOnMonth">环比</router-link><br>
         </div>
        <div class="bg_color">
           <router-link to="/dealer">商户交易明细表</router-link>
        </div>

        <div class="page-actionsheet"><h1 class="page-title">Action Sheet</h1>

            <div class="page-actionsheet-wrapper">
                <button class="mint-button mint-button--default mint-button--large"><!----> <label
                        class="mint-button-text">点击上拉 action sheet</label></button>
                <button class="mint-button mint-button--default mint-button--large"><!----> <label
                        class="mint-button-text">不带取消按钮的 action sheet</label></button>
            </div>
            <div class="mint-actionsheet" style="z-index: 2003; display: none;">
                <ul class="mint-actionsheet-list" style="margin-bottom: 5px;">
                    <li class="mint-actionsheet-listitem">拍照</li>
                    <li class="mint-actionsheet-listitem">从相册中选择</li>
                </ul>
                <a class="mint-actionsheet-button">取消</a></div>
            <div class="mint-actionsheet" style="display: none;">
                <ul class="mint-actionsheet-list" style="margin-bottom: 0px;">
                    <li class="mint-actionsheet-listitem">确定</li>
                    <li class="mint-actionsheet-listitem">返回上一步</li>
                </ul>
                <!----></div>
        </div>
        <!--<mt-actionsheet-->
                <!--:actions="actions"-->
                <!--v-model="sheetVisible">-->
        <!--</mt-actionsheet>-->

        <!--固定底部-->
        <div class="mint-tabbar is-fixed">
            <a class="mint-tab-item is-selected">
                <div class="mint-tab-item-icon">
                    <img src="img/graph chart.png">
                </div>
                <div class="mint-tab-item-label">
                    报表查询
                </div>
            </a>
            <a class="mint-tab-item">
                <div class="mint-tab-item-icon">
                    <img src="img/unselected_detail.png">
                </div>
                <div class="mint-tab-item-label">
                    交易明细
                </div>
            </a>
            <!--<a class="mint-tab-item">-->
                <!--<div class="mint-tab-item-icon">-->
                    <!--<img src="img/unselected_pencil.png">-->
                <!--</div>-->
                <!--<div class="mint-tab-item-label">-->
                    <!--领导审批-->
                <!--</div>-->
            <!--</a>-->
            <a class="mint-tab-item">
                <div class="mint-tab-item-icon">
                    <img src="img/unselected_settings.png">
                </div>
                <div class="mint-tab-item-label">
                    设置
                </div>
            </a>
        </div>
    </div>

</template>
<style>
    .testChart .echarts {
        width: 100%;
        height: 400px;
    }
    .bg_color{
        color: #fff;
        background-color: #26a2ff;
        margin-bottom: 5px;
        padding: 5px;
    }
    .bg_color a{
        color: white !important;
        text-decoration:none;
    }
</style>
<script>
    // requiring the UMD module
    import chart from 'vue-echarts'
    // or with vue-loader you can require the src directly
    // and import ECharts modules manually to reduce bundle size
    //    import chart from 'vue-echarts/components/ECharts.vue'
    //   import bar from 'echarts/lib/chart/bar'
    //  import tooltip from 'echarts/lib/component/tooltip'
    import { Actionsheet } from 'mint-ui';

    Vue.component(Actionsheet.name, Actionsheet);
    module.exports = {
        name: "test",
        props: ["msg"],
        components: {
            chart
        },
        methods:{
            search: function(startDate,endDate) {
                if(startDate&&endDate) {
                    if (endDate < startDate) {
                        alert("结束时间不能小于开始时间")
                    } else {
                        this.$http.get("/statistics/yearMonth?startDate=" + startDate + "&endDate=" + endDate).then(function (res) {
                            this.datamap = res.body['map'];
                            this.datalist = res.body['list'];
                            for (var i = 0; i < this.datalist.length; i++) {
                                this.curDataFee.push(this.datamap[this.datalist[i]].count);
                                this.curData.push(this.datamap[this.datalist[i]].serviceCharge);
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
        created()
    {
        var now = new Date();
        for(var i = 0; i < 10; i++){
            this.yearList.push(now.getFullYear() - i)
        }
        this.maxYear = this.year = now.getFullYear();
        this.minYear = this.year - 9
    },
    data()
    {
        return {
            curData: [],
//                preData: [],
            curDataFee: [],
//                preDataFee: [],
//                year: 0,
            maxYear:0,
            minYear:0,
            yearList:[],
            start:"",
            end:"",
            datalist:[],//时间年月
            datamap:{}  //相对应时间数据
        }
    },
    computed:{
        chartData(){
            return{
//                    title: {
//                        text: '堆叠区域图'
//                    },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['交易量','交易额']
                },
                toolbox: {
                    feature: {
//                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.datalist,
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    },
                    {
                        type: 'value'
                    }
                ],
                series : [
                    {
                        name:'交易量',
                        type:'bar',
//                            stack: '交易量',
                        //areaStyle: {normal: {}},
                        data:this.curDataFee,
                        connectNulls:true,
                        yAxisIndex:0
                    },

                    {
                        name:'交易额',
                        type:'line',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                        data:this.curData,
                        connectNulls:true,
                        yAxisIndex:1
                    },
                ]
            }
        }
    }
    }
</script>