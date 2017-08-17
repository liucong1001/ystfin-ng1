<template>
    <div class="month">
        <vheader :headermsg="header"></vheader>
        <div style="font-size: 1.2rem;width:100%">
            <table  align="center">
                <tr>
                    <td>  <selectlist  :queryList="select_list"></selectlist> </td>
                </tr>
            </table>
        </div>
        开始时间：  <input  v-model="start"  type="month"  @change="search(start,end)" /> <br/>
        结束时间：  <input  v-model="end"  type="month"  @change="search(start,end)"/> <br/>

        <!--<button class="mint-button mint-button&#45;&#45;primary mint-button&#45;&#45;normal" type="button" v-on:click="search(start,end)"> 查询</button>-->


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
    .selectList{
        position: absolute;
        right: 0;
        top: 3rem;
    }
    .month{
        padding: 8px;
        margin-bottom: 55px;
    }
</style>
<script>
    import chart from 'vue-echarts'
    import vheader from './vheader.vue';
    import vfooter from './vfooter.vue';
    import selectlist from './selectlist.vue';
    import { DatetimePicker } from 'mint-ui';

    Vue.component(DatetimePicker.name, DatetimePicker);

    console.log("12");
    console.log(DatetimePicker.name);
    module.exports = {
        name: "test",
//        props:{
//            select_list:"2"
//        },
        components: {
            chart,vheader,vfooter,selectlist,DatetimePicker
        },
        methods:{
            openPicker() {
                this.$refs.picker.open();
            },
            yearI:function (i) {
                return  (this.yearData[i]/this.yearData[7]*100).toFixed(2)
            },
            search: function(startDate,endDate) {
                if(startDate&&endDate) {
                    if (endDate < startDate) {
                        alert("结束时间不能小于开始时间")
                    } else {

                        this.$http.get("/statistics/vehicleTypeReport?startMonth=" + startDate + "&endMonth=" + endDate).then(function (res) {
//                            this.datamap = res.body['map'];
                              this.yearData = res.body['list'][0].reverse();

//                             console.log((this.yearData[6]/this.yearData[7]*100).toFixed(2));

                               console.log(this.yearI(6),this.yearI(5));
                               console.log("车型对比11");
                               console.log(res);
                               console.log(this.yearData);

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
            var now = new Date();
            for(var i = 0; i < 10; i++){
                this.yearList.push(now.getFullYear() - i)
            }
            this.maxYear = this.year = now.getFullYear();
            this.minYear = this.year - 9;
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            if(month<10){
                month="0"+month;
            }
            this.end=year+"-"+month;
            this.start=year+"-01";
            this.search( this.start,this.end);

        },
        data()
        {
            return {
                header:"交易车型分析",
                select_list:"7",
                curData: [],
                curDataFee: [],
                maxYear:0,
                minYear:0,
                yearList:[],
                start:"",
                end:"",
                datalist:[],//时间年月
                datamap:{},  //相对应时间数据
                yearData:[],
                lastYearData:[],
                pickerVisible:"",

            }
        },
        computed:{
            chartData(){
                return{
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',

                        }
                    },
                    legend: {
                        data:['2016年','2017年']
                    },

                    grid: [{
                        left: '20%',
                        right: '50%',
                        bottom: '15%',
                        containLabel: false
                    },{
                        left: '50%',
                        right: '10%',
                        bottom: '15%',
                        containLabel: false
                    }],
                    xAxis : [
                        {
                            type : 'value',
                            inverse:true,
                            min:0,
                            max:100,
                            axisLabel:{
                                formatter:"{value}%",
                                showMinLabel:false
                            },
                            splitNumber:2,
                        },
                        {
                            gridIndex:1,
                            type : 'value',
                            min:0,
                            max:100,
                            axisLabel:{
                                formatter:"{value}%",
                                showMinLabel:true
                            },
                            splitNumber:2,
                        }
                    ],
                    yAxis : [
                        {
                            show:false,

                            type : 'category',
//                            position:'top',
                            data : ['低速车','挂车','摩托车','其他车型','货车','客车','基本型'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        {

                            type : 'category',
                            nameLocation:"middle",
                            position:'left',
                            data : ['低速车','挂车','摩托车','其他车型','货车','客车','基本型'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        {
                            show:false,
                            gridIndex:1,
                            position:'left',
                            type : 'category',
//                            data : ['低速载货车','挂车','摩托车','其他车型','货车','客车','基本型'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        {
                            gridIndex:1,
                            position:'right',
                            type : 'category',
//                            data : ['低速载货车','挂车','摩托车','其他车型','货车','客车','基本型'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    series : [
                        {
                            name:'2017年',
                            type:'bar',
                            barWidth: '60%',
                            label:{
                                normal:{
                                    position:'left',
                                    show:true,
                                    formatter:"{c}%"
                                }
                            },
                            data:[this.yearI(0), this.yearI(1), this.yearI(2), this.yearI(3), this.yearI(4), this.yearI(5),this.yearI(6) ]
                        },
                        {
                            xAxisIndex:1,
                            yAxisIndex:2,
                            name:'2016年',
                            type:'bar',
                            barWidth: '60%',
                            label:{
                                normal:{
                                    position:'right',
                                    show:true,
                                    formatter:"{c}%"
                                }
                            },
                            data:[20, 52, 60, 40, 40, 23, 42]
                        }
                    ]
                }
            }
        }
    }
</script>