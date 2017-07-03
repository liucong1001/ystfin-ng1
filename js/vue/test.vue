<template>
    <div>
        <div style="font-size: 30px;width:100%">
            <table  align="center">
                <tr>
                    <td>汉西二手车交易量</td>
                </tr>
            </table>
        </div>
        开始时间：  <input  v-model="start"  type="date"/>
        结束时间：  <input  v-model="end"  type="date" />
        <button class="btn btn-success" type="button" v-on:click="search(start,end)"> 查询</button>
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
        methods:{
            search: function(startDate,endDate) {
                if(startDate&&endDate){
                    this.$http.get("/statistics/yearMonth?startDate="+startDate+"&endDate=" + endDate).then(function (res) {
                        this.datamap=res.body['map'];
                        this.datalist=res.body['list'];
                        for(var i=0;i<this.datalist.length;i++){
                            this.curDataFee.push(this.datamap[this.datalist[i]].count);
                            this.curData.push(this.datamap[this.datalist[i]].serviceCharge);
                        }
                    }, function (e) {
                        console.log(e)
                    });
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
                preData: [],
                curDataFee: [],
                preDataFee: [],
                year: 0,
                maxYear:0,
                minYear:0,
                yearList:[],
                start:"",
                end:"",
                datalist:[],
                datamap:{}
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
