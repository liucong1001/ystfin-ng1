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
        选择时间：  <input  v-model="start"  type="month"  @change="search(start)" /> <br/>
        <!--结束时间：  <input  v-model="end"  type="month"  @change="search(start,end)"/> <br/>-->

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
            search: function(startDate) {
                if(startDate) {
                        this.$http.get("/statistics/priceReport?month=" + startDate ).then(function (res) {
                            this.datalist = res.body['obj'];
                            console.log("执行了");
                        }, function (e) {
                            console.log(e)
                        });

                }else{
                    alert("请选择时间");
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
            this.start=year+"-"+month;

            this.$http.get("/statistics/priceReport?month=" + this.start).then(function (res) {
                this.datalist = res.body['obj'];
//                console.log("初始化");
                console.log(this.datalist);
            }, function (e) {
                console.log(e)
            });
            this.search( this.start,this.end);

        },
        data()
        {
            return {
                header:"月交易均价分析",
                select_list:"6",
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
//                queryList:"2",
//                pickerValue:"",
                pickerVisible:"",

            }
        },
        computed:{
            chartData(){
                return{
                    title: {
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
//                        axisPointer: {
//                            type: 'cross',
//                            label: {
//                                backgroundColor: '#6a7985'
//                            }
//                        }
                    },
                    legend: {
//                        orient: 'vertical',
                        left: 'left',
                        data: ['3W及以下','3W-5W','5W-8W','8W-12W','12W-15W','15W-30W','30W以上']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    series : [
                        {
                            name:'交易均价',
                            type:'pie',
                            radius : '50%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.datalist[1], name:'3W及以下'},
                                {value:this.datalist[2], name:'3W-5W'},
                                {value:this.datalist[3], name:'5W-8W'},
                                {value:this.datalist[4], name:'8W-12W'},
                                {value:this.datalist[5], name:'12W-15W'},
                                {value:this.datalist[6], name:'15W-30W'},
                                {value:this.datalist[7], name:'30W以上'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        },


                    ]
                }
            }
        }
    }
</script>