<template>
    <div>
        <vheader></vheader>
        <div style="font-size: 30px;width:100%">
            <table  align="center">
                <tr>
                    <td>年交易量查询</td>
                </tr>
            </table>
        </div>
        <div>
            <!--<button :disabled="year <= minYear" @click="year&#45;&#45;">上一年</button>-->

            <mt-button type="primary"  :disabled="year <= minYear" @click="year--"  size="normal">上一年</mt-button>
            <select v-model="year" >
                <option v-for="y in yearList">{{y}}</option>
            </select>
            <mt-button type="primary" :disabled="year >= maxYear" @click="year++" size="normal">下一年</mt-button>

        </div>
        <div class="testChart">
            <chart :options="chartData"></chart>
        </div>
        <!--固定底部-->
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
    // requiring the UMD module
    import chart from 'vue-echarts'


    // or with vue-loader you can require the src directly
    // and import ECharts modules manually to reduce bundle size
    //    import chart from 'vue-echarts/components/ECharts.vue'
    //   import bar from 'echarts/lib/chart/bar'
    //  import tooltip from 'echarts/lib/component/tooltip'
    import Button from 'mint-ui/lib/button';
    import 'mint-ui/lib/button/style.css';
    import 'mint-ui/lib/button/style.css';

    Vue.component(Button.name, Button);
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
