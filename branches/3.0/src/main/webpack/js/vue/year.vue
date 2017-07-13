<template>
    <div>
        <header>
            <vheader :headermsg="header"></vheader>
        </header>
        <div class="page-wrap">
            <div class="mint-tab-container page-tabbar-container">
                <div class="main-list">
                    <div style="font-size: 30px;width:100%">
                        <table  align="center">
                            <tr>
                                <td>年交易量查询</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <!--<button :disabled="year <= minYear" @click="year&#45;&#45;">上一年</button>-->

                        <mt-button type="primary"  :disabled="year <= minYear" @click="year--"  size="small">上一年</mt-button>
                        <select v-model="year" class="select">
                            <option v-for="y in yearList">{{y}}</option>
                        </select>
                        <mt-button type="primary" :disabled="year >= maxYear" @click="year++" size="small">下一年</mt-button>
                        <selectlist  :queryList="select_list"></selectlist>
                    </div>
                    <div class="testChart">
                        <chart :options="chartData"></chart>
                    </div>
                </div>
            </div>
        </div>
      <vfooter></vfooter>
    </div>
</template>
<style>
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
    .testChart .echarts {
        width: 100%;
        height: 441px;
        background-color: grey;
    }
   .mint-tab-item {
    display: block;
    padding: 7px 0;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    text-decoration: none
}
.mint-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px
}
.mint-tab-item-icon:empty {
    display: none
}
.mint-tab-item-icon > * {
    display: block;
    width: 100%;
    height: 100%
}
.mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1
}


</style>
<script>
    import chart from 'vue-echarts'
    import Button from 'mint-ui/lib/button';
    import 'mint-ui/lib/button/style.css';
    import 'mint-ui/lib/button/style.css';
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';
    import selectlist from './selectlist.vue';


    Vue.component(Button.name, Button);
    module.exports = {
        name: "test",
//        props:{
//            select_list:"1"
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
            handleClick: function() {
                this.$toast('Hello world!')
            },
            chooseList:function(val){
                if(val=='1'){this.$router.push({path:'/year'})}
                if(val=='2'){this.$router.push({path:'/month'})}
                if(val=='3'){this.$router.push({path:'/yearOnYear'});}
                if(val=='4'){this.$router.push({path:'/monthOnMonth'});}
            },
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
//                headermsg:"year",
                select_list:'1',
                header:"列表",
                curData: [],
                preData: [],
                curDataFee: [],
                preDataFee: [],
                year: 0,
                maxYear:0,
                minYear:0,
                yearList:[],
//                queryList:"1"
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
                        data:[this.year + '年交易量', this.year + '年交易额']
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
                            type:'bar',
//                            stack: '交易量',
                            //areaStyle: {normal: {}},
                            data:this.curData,
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
                    ]
                }
            }
        }
    }
</script>

