<template>
    <div>
        <div style="font-size: 30px;width:100%">
            <table  align="center">
                <tr>
                    <td>每月交易量及同比上月比值（%）</td>
                </tr>
            </table>
        </div>
        <div>
            <!--<button :disabled="year <= minYear" @click="year&#45;&#45;">上一年</button>-->
            <mt-button type="primary"  :disabled="year <= minYear" @click="year--"  size="normal">上一年</mt-button>

            <select v-model="year">
                <option v-for="y in yearList">{{y}}</option>
            </select>
            <!--<button :disabled="year >= maxYear" @click="year++">下一年</button>-->
            <mt-button type="primary" :disabled="year >= maxYear" @click="year++" size="normal">下一年</mt-button>

        </div>
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
        watch:{
            year(val){
                this.loadData()
            }
        },
        methods:{
            loadData(){
                if(this.year == 0) return
                this.$http.get("/statistics/monthOnMonth?type=year&year=" + this.year).then(function (res) {
                    this.cList = res.body.cList;
                    this.sList = res.body.sList;
                    this.curData=[];
                    this.curDataFee=[];
                    for (var i = 0; i < this.cList.length; i++) {
                        this.curData.push(this.cList[i]);
                    }
                    for (var j = 0; j < this.sList.length; j++) {
                        this.curDataFee.push(this.sList[j]);
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
                        data:[this.year + '年交易量每月同比上个月（%）',this.year + '年交易量']
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
                            data : [ '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                            name:this.year + '年交易量每月同比上个月（%）',
                            type:'line',
//                            stack: '交易量',
                            //areaStyle: {normal: {}},
                            data:this.curData,
                            connectNulls:true,
                            yAxisIndex:0
                        },
                        {
                            name:this.year + '年交易量',
                            type:'bar',
//                            stack: '交易量',
//                            areaStyle: {normal: {}},
                            data:this.curDataFee,
                            connectNulls:true,
                            yAxisIndex:1
                        },
                    ]
                }
            }
        }
    }
</script>
