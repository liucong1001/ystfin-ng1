<template>
    <div class="page-header-main header">
        <header class="mint-header is-fixed topheader">
            <div class="mint-header-button is-left"></div>
            <h1 class="mint-header-title topheader"><br>  {{headermsg}}</h1>
            <div class="mint-header-button is-right"></div>
        </header>
    </div>
</template>
<style>
  .header{
      /*padding-top: 3px;*/
      margin-bottom: 40px;
  }
  .topheader{
      padding: 0px;
      margin: 0px;
  }
</style>
<script>
    module.exports = {
        components:{},
        props: {
            headermsg: String  //定义传值的类型<br>    }
        },
//        data:function(){
////            return{
////                headermsg:"列表"
////            }
//        },

       watch:{

        }
    }

</script>