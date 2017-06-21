<template>
    <div>
        <h2>{{msg}},world</h2>
        <div>
            <button :disabled="year <= minYear" @click="year--">上一年</button>
            <select v-model="year">
                <option v-for="y in yearList">{{y}}</option>
            </select>
            <button :disabled="year >= maxYear" @click="year++">下一年</button>
        </div>
        <div class="testChart">
            <chart :options="chartData"></chart>
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
    var chart = require('vue-echarts')
    // or with vue-loader you can require the src directly
    // and import ECharts modules manually to reduce bundle size
//    var ECharts = require('vue-echarts/components/ECharts.vue')
//    require('echarts/lib/chart/bar')
//    require('echarts/lib/component/tooltip')
    module.exports = {
        name: "test",
        props: ["msg"],
        components: {
            chart
        },
        watch:{
            year(val){
                this.loadData()
            }
        },
        methods:{
           loadData(){
               if(this.year == 0) return
               this.$http.get("/mobile/billTimeData?type=year&year=" + this.year).then(function (res) {
                   this.curData = res.body.countTotal
                   this.curDataFee = res.body.fillTotal
               }, function (e) {
                   console.log(e)
               })
               this.$http.get("/mobile/billTimeData?type=year&year=" + (this.year - 1)).then(function (res) {
                   this.preData = res.body.countTotal
                   this.preDataFee = res.body.fillTotal
               }, function (e) {
                   console.log(e)
               })
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
                preData: [],
                curDataFee: [],
                preDataFee: [],
                year: 0,
                maxYear:0,
                minYear:0,
                yearList:[]
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
                        data:[this.year + '年交易量', (this.year - 1) + '年交易量',this.year + '年交易额', (this.year - 1) + '年交易额']
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
                            data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                            name:this.year + '年交易量',
                            type:'line',
//                            stack: '交易量',
                            //areaStyle: {normal: {}},
                            data:this.curData,
                            connectNulls:true,
                            yAxisIndex:0
                        },
                        {
                            name:(this.year - 1) + '年交易量',
                            type:'line',
//                            stack: '交易量',
                            //areaStyle: {normal: {}},
                            data:this.preData,
                            connectNulls:true,
                            yAxisIndex:0
                        },
                        {
                            name:this.year + '年交易额',
                            type:'line',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                            data:this.curDataFee,
                            connectNulls:true,
                            yAxisIndex:1
                        },
                        {
                            name:(this.year - 1) + '年交易额',
                            type:'line',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                            data:this.preDataFee,
                            connectNulls:true,
                            yAxisIndex:1
                        },
                    ]
                }
            }
        }
    }
</script>
