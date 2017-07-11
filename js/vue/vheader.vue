<template>
    <div class="page-header-main header">
        <header class="mint-header is-fixed">
            <div class="mint-header-button is-left"></div>
            <h1 class="mint-header-title">{{headermsg}}</h1>

            <div class="mint-header-button is-right"></div>
        </header>
    </div>
</template>
<style>
  .header{
      margin-bottom: 40px;
  }
</style>
<script>
    module.exports = {
        components:{},
        data:function(){
            return{
                headermsg:"列表"
            }
        },

       watch:{

        }
    }

</script>