<template>
    <div>
        <!--固定底部-->
        <div class="mint-tabbar is-fixed" style="margin-top: 50px">
            <a class="mint-tab-item " href="#/year">
                <div class="mint-tab-item-icon">
                    <img class="img_chart">
                </div>
                <div class="mint-tab-item-label">
                     报表查询
                </div>
            </a>
            <a class="mint-tab-item" href="#/dealer">
                <div class="mint-tab-item-icon">
                    <img  class="img_detail">
                </div>
                <div class="mint-tab-item-label">
                    交易明细
                    <!--<router-link to="/dealer">交易明细</router-link>-->
                </div>
            </a>
            <!--<a class="mint-tab-item" href="#/exam">-->
                <!--<mt-badge type="error" class="tipmsg" v-show="this.examNum>0">{{examNum}}</mt-badge>-->
                <!--<div class="mint-tab-item-icon">-->
                    <!--<img  class="img_pencil">-->
                <!--</div>-->
                <!--<div class="mint-tab-item-label">-->
                    <!--领导审批-->
                    <!--&lt;!&ndash;<router-link to="/exam">领导审批</router-link>&ndash;&gt;-->
                <!--</div>-->
            <!--</a>-->
            <a class="mint-tab-item" href="#/person">
                <div class="mint-tab-item-icon">
                    <img  class="img_person">
                </div>
                <div class="mint-tab-item-label">
                   我
                </div>
            </a>
        </div>

    </div>
</template>
<style>
   a{
       color: #000000;
       text-decoration: none;
   }
   .tipmsg{
     position: absolute;
       right: 7rem;
       bottom: 30px;
   }
   .img_chart{
       background:url("./img/graph chart.png")  center no-repeat;
       background-size:contain;
   }
   .img_chart2{
       background:url("./img/unselected_graph chart.png")  center no-repeat;
       background-size:contain;
   }
    .img_detail{
        background:url("img/unselected_detail.png")  center no-repeat;
        background-size:contain;
    }
   .img_detail2{
       background:url("img/detail.png")  center no-repeat;
       background-size:contain;
   }
   .img_pencil{
       background:url("img/unselected_pencil.png")  center no-repeat;
       background-size:contain;
   }
   .img_pencil2{
       background:url("img/pencil.png")  center no-repeat;
       background-size:contain;
   }
   .img_person{
       background:url("img/person.png")  center no-repeat;
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
                examNum:0,
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
        },
        created(){
//            this.$http.post("/evaluation/list",{}).then(function(result){
//                console.log(result.data);
//                function getHsonLength(json){
//                    var jsonLength=0;
//                    for (var i in json) {
//                        jsonLength++;
//                    }
//                    return jsonLength;
//                }
//                this.examNum=getHsonLength(result.data);
//            },function(response){
//                console.info(response);
//            });

        },
    }

</script>