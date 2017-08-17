<template>
    <div style="display: inline-block">
        <!--固定底部-->
        <select name="" id="" class="select"  v-model="queryList2" @change="chooseList(queryList2)">
            <option value="1">年查询</option>
            <option value="2">月查询 </option>
            <option value="5">天查询 </option>
            <option value="3">同比 </option>
            <option value="4">环比</option>
            <!--<option value="6">交易均价</option>-->
            <!--<option value="7">交易车型</option>-->
        </select>
    </div>
</template>
<style>
    a{
        color: #000000;
        text-decoration: none;
    }
    .select{
        /*margin-top: 10px;*/
        height: 30px;
        /*-webkit-appearance: none;*/
        /*appearance: none;*/
        border: none;
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
    module.exports = {
        components:{},
        props:{
            queryList:String
        },
        data()
    {
        return {
            queryList2:this.queryList
        }
    },
        methods:{
            chooseList:function(val){
                if(val=='1'){this.$router.push({path:'/year'});}
                if(val=='2'){this.$router.push({path:'/month'});}
                if(val=='3'){this.$router.push({path:'/yearOnYear'});}
                if(val=='4'){this.$router.push({path:'/monthOnMonth'});}
                if(val=='5'){this.$router.push({path:'/day'});}
                if(val=='6'){this.$router.push({path:'/price'});}
                if(val=='7'){this.$router.push({path:'/carType'});}
                console.log(this.queryList);
            },
        },
        watch:{

        }
    }

</script>