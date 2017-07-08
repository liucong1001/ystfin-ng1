<template>
    <div>
        <div style="font-size: 30px;width:100%">
            <table  align="center">
                <tr>
                    <td>每日交易量查询</td>
                </tr>
            </table>
        </div>
        开始时间：  <input  v-model="start"  type="date"/> <br/>
        结束时间：  <input  v-model="end"  type="date" /> <br/>
        <button class="mint-button mint-button--primary mint-button--normal" type="button" v-on:click="search(start,end)"> 查询</button>
        <div class="testChart">
            <chart :options="chartData"></chart>
        </div>
        <div class="mint-tabbar is-fixed">
            <a class="mint-tab-item is-selected">
                <div class="mint-tab-item-icon">
                    <img src="./img/graph chart.png">
                </div>
                <div class="mint-tab-item-label">
                    报表查询
                </div>
            </a>
            <a class="mint-tab-item">
                <div class="mint-tab-item-icon">
                    <img src="./img/unselected_detail.png">
                </div>
                <div class="mint-tab-item-label">
                    交易明细
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
<style>
    .testChart .echarts {
        width: 100%;
        height: 400px;
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
                        this.$http.get("/statistics/day?startDate=" + startDate + "&endDate=" + endDate).then(function (res) {
                            this.datamap = res.body['map'];
                            this.datalist =this.datamap['dateList'];
                            this.newMap=this.datamap['newMap'];
                            for( var i=0;i<this.datalist.length;i++){
                                this.curDataFee.push(this.newMap[this.datalist[i]].dayCount);
                                this.curData.push(this.newMap[this.datalist[i]].dayServiceCharge);
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
            var now = new Date()
            for(var i = 0; i < 10; i++){
                this.yearList.push(now.getFullYear() - i)
            }
            this.maxYear = this.year = now.getFullYear()
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
                datalist:[],//时间年月日
                datamap:{},  //相对应时间数据
                newMap:{}
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
                            saveAsImage: {}
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
                            xAxisIndex:0
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
