<template>
    <div>
        <h1 class="alert">{{message}}, hello！</h1>
        <test :msg="message"></test>
    </div>
</template>
<script>
    var test = require("./test.vue")
    module.exports = {
        components:{test},
        data(){
          return {
              message: this.$route.query.msg
          }
        },
        watch:{
            "$route.query"(to,form){
                this.message = this.$route.query.msg
            }
        }
    }
</script>
<style scoped>
    h1{
        font-size:24px;
        color:#00a4d6;
    }
</style>
