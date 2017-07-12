<template>
    <div>
        <vheader></vheader>
        <div style="font-size: 1.5rem;width:100%">
            <table  align="center">
                <tr>
                    <td>月交易量查询</td>
                </tr>
            </table>
        </div>
        开始时间：  <input  v-model="start"  type="date"  /> <br/>
        结束时间：  <input  v-model="end"  type="date"  @change="search(start,end)"/> <br/>
        <!--<button class="mint-button mint-button&#45;&#45;primary mint-button&#45;&#45;normal" type="button" v-on:click="search(start,end)"> 查询</button>-->
        <selectlist></selectlist>
        <div class="testChart">
            <chart :options="chartData"></chart>
        </div>
       <vfooter></vfooter>
    </div>
</template>
<style>
    .testChart .echarts {
        width: 100%;
        height: 400px;
    }
</style>
<script>
    import chart from 'vue-echarts'
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';
    import selectlist from './selectlist.vue';
    import { DatetimePicker } from 'mint-ui';

    Vue.component(DatetimePicker.name, DatetimePicker);

    module.exports = {
        name: "test",
        props: ["msg"],
        components: {
            chart,vheader,vfooter,selectlist
        },
        methods:{
            openPicker() {
                this.$refs.picker.open();
            },
            search: function(startDate,endDate) {

                console.log(  this.$route.params.i);
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
            var now = new Date()
            for(var i = 0; i < 10; i++){
                this.yearList.push(now.getFullYear() - i)
            }
            this.maxYear = this.year = now.getFullYear()
            this.minYear = this.year - 9;
            console.log("creatderimg");
            console.log("end"+new Date());
//            this.end='2016-03-01';

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
                datamap:{},  //相对应时间数据
                queryList:"2",
                pickerValue:""
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
        },
        ready:function () {
            console.log("i"+this.$route.params.i);
            console.log("route");
        }
    }
</script>