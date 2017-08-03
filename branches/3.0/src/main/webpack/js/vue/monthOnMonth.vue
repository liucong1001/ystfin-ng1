<template>
    <div class="monthOnMonth">
        <vheader :headermsg="header"></vheader>
        <div style="font-size:1.2rem;width:100%">
            <table  align="center">
                <tr>
                    <td>  <selectlist  :queryList="select_list"></selectlist> </td>

                    <!--<td>每月交易量及同比上月比值</td>-->
                </tr>
            </table>
        </div>
        <div>
            <!--<button :disabled="year <= minYear" @click="year&#45;&#45;">上一年</button>-->
            <mt-button type="primary"  :disabled="year <= minYear" @click="year--"  size="small">上一年</mt-button>

            <select v-model="year" class="select">
                <option v-for="y in yearList">{{y}}</option>
            </select>
            <!--<button :disabled="year >= maxYear" @click="year++">下一年</button>-->
            <mt-button type="primary" :disabled="year >= maxYear" @click="year++" size="small">下一年</mt-button>
        </div>
        <div class="testChart">
            <chart :options="chartData"></chart>
        </div>
         <vfooter></vfooter>
    </div>
</template>
<style>
    .monthOnMonth{
        padding: 8px;
        margin-bottom: 55px;
    }
    .testChart .echarts {
        width: 100%;
        height: 400px;
    }
    .select{
        height: 30px;
        /*-webkit-appearance: none;*/
        /*appearance: none;*/
        /*border: none;*/
        font-size: 18px;
        padding: 0px 5px;
        display: inline-block;
        /*width: 100%;*/
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius: 4px;
    }
</style>
<script>
    import chart from 'vue-echarts'
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';
    import selectlist from './selectlist.vue';

    module.exports = {
        name: "test",
//        props:{
//            queryList:"4"
//        },
        components: {
            chart,vheader,vfooter,selectlist
        },
        watch:{
            year(val){
                this.loadData()
            }
        },
        methods:{
            loadData(){
                if(this.year == 0) return;
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
                header:"每月交易量及同比上月比",
                select_list:"4",
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
