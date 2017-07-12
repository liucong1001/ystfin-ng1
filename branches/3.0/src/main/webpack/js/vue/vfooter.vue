<template>
    <div>
        <!--固定底部-->
        <div class="mint-tabbar is-fixed" style="margin-top: 50px">
            <a class="mint-tab-item is-selected">
                <div class="mint-tab-item-icon">
                    <img src="./img/graph chart.png">
                </div>
                <div class="mint-tab-item-label">
                    <router-link to="/year"> 报表查询</router-link>
                </div>
            </a>
            <a class="mint-tab-item">
                <div class="mint-tab-item-icon">
                    <img src="./img/unselected_detail.png">
                </div>
                <div class="mint-tab-item-label">

                    <router-link to="/dealer">交易明细</router-link>
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

        <!--<mt-tabbar v-model="selected">-->
            <!--<mt-tab-item id="chart">-->
                <!--<img slot="icon"  class="static" v-bind:class="{img_chart: noActive, 'img_chart2': isActive1 }">-->

                <!--<span >报表查询</span>-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="detail">-->
                <!--<img slot="icon" class="static" v-bind:class="{img_detail: noActive, 'img_detail2': isActive2 }"  >-->
                <!--交易明细-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="发现">-->
                <!--<img slot="icon" src="./img/unselected_pencil.png">-->
                <!--领导审批-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="我的">-->
                <!--<img slot="icon" src="./img/unselected_settings.png">-->
                <!--设置-->
            <!--</mt-tab-item>-->
        <!--</mt-tabbar>-->

    </div>
</template>
<style>
   a{
       color: #000000;
       text-decoration: none;
   }
   .img_chart{
       background:url(./img/graph chart.png)  center no-repeat;
       background-size:contain;
   }
   .img_chart2{
       background:url(./img/unselected_graph chart.png)  center no-repeat;
       background-size:contain;
   }
    .img_detail{
        background:url(./img/unselected_detail.png)  center no-repeat;
        background-size:contain;
    }
   .img_detail2{
       background:url(./img/detail.png)  center no-repeat;
       background-size:contain;
   }
</style>
<script>


    module.exports = {
        components:{},
         data:function () {
            return{
                selected:"",
                noActive:true,
                isActive1:false,
                isActive2:false,
            }
         },
        watch:{
            selected: {
                handler: function (newVal) {
//                     switch (newVal){
//                         case 'detail':this.img2='./img/detail.png';
//
//                     }

                    if(newVal=='chart'){
//                        this.noActive=false;
                        this.isActive1=true;
                        this.isActive2=false;
                    }

                    if(newVal=='detail'){
//                        this.noActive=false;
                        this.isActive1=false;
                        this.isActive2=true;
                    }
                },
                deep: true
            }
        }
    }

</script>