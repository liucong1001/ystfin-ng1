<template>
    <div>
        <h2>{{msg}},world</h2>
        <div><button v-on:click="initData()">数据</button></div>
        <div>
            <chart :options="chartData"></chart>
         </div>
    </div>
</template>
<style>
    .echarts {
        height: 300px;
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
        methods:{
            initData(event){
                for (let i = 0; i <= 360; i++) {
                    let t = i / 180 * Math.PI
                    let r = Math.sin(2 * t) * Math.cos(2 * t)
                    this.dataArray.push([r, i])
                }
            }
        },
        created()
        {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.$http.get("/mobile/billTimeData?type=year&year=2016").then(function (res) {
                this.data16 = res.body.countTotal
            }, function (e) {
                console.log(e)
            })
            this.$http.get("/mobile/billTimeData?type=year&year=2017").then(function (res) {
                this.data17 = res.body.countTotal
            }, function (e) {
                console.log(e)
            })
        },
        data()
        {
            return {
                data16: [],
                data17: []
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
                        data:['2017年','2016年']
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
                        }
                    ],
                    series : [
                        {
                            name:'2017年',
                            type:'line',
//                            stack: '交易量',
                            areaStyle: {normal: {}},
                            data:this.data17
                        },
                        {
                            name:'2016年',
                            type:'line',
//                            stack: '交易量',
                            areaStyle: {normal: {}},
                            data:this.data16
                        },
                    ]
                }
            }
        }
    }
</script>
