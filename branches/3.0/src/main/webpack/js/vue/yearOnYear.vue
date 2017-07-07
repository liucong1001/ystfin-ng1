<template>
    <div>
        <div style="font-size: 30px;width:100%">
            <table  align="center">
                <tr>
                    <td>每月交易量及同比去年同月比值（%）</td>
                </tr>
            </table>
        </div>
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
        watch:{
            year(val){
                this.loadData()
            }
        },
        methods:{
            loadData(){
                if(this.year == 0) return
                this.$http.get("/statistics/yearOnYear?type=year&year=" + this.year).then(function (res) {
                    this.cList = res.body.cList;
                    this.sList = res.body.sList;
                    this.list = res.body.list;
                    this.curData=[];
                    this.curDataFee=[];
                    this.perDataFee=[];
                    for (var i = 0; i < this.cList.length; i++) {
                        this.curData.push(this.cList[i]);
                    }
                    for (var j = 0; j < this.sList.length; j++) {
                        this.curDataFee.push(this.sList[j]);
                    }
                    for (var k = 0; k < this.list.length; k++) {
                        this.perDataFee.push(this.list[k]);
                    }
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
                curDataFee: [],
                perDataFee: [],
                year: 0,
                maxYear:0,
                minYear:0,
                yearList:[],
                cList:[],
                sList:[]
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
                        data:[this.year + '每月交易量同比去年（%）',this.year + '每月交易量',(this.year - 1) + '每月交易量']
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
                            boundaryGap : true,
                            data : [  '1月','2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月','总比值'],
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
                            name:this.year + '每月交易量同比去年（%）',
                            type:'line',
//                            stack: '交易量',
                            //areaStyle: {normal: {}},
                            data:this.curData,
                            connectNulls:true,
                            yAxisIndex:0
                        },
                        {
                            name:this.year + '每月交易量',
                            type:'line',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                            data:this.curDataFee,
                            connectNulls:true,
                            yAxisIndex:1
                        },
                        {
                            name:(this.year - 1) + '每月交易量',
                            type:'line',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                            data:this.perDataFee,
                            connectNulls:true,
                            yAxisIndex:1
                        },
                    ]
                }
            }
        }
    }
</script>
