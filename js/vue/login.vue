<template>
    <div class="login">
        <header>
            <vheader :headermsg="header"></vheader>
        </header>
        <div>
            <div class="carBg">
                    <div class="car">
                    </div>
            </div>
            <div>

                    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
                    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
                    <br>
                    <div class="btn_login">
                        <button class="mint-button mint-button--primary mint-button--large" @click="login()"> <label class="mint-button-text">登录</label></button>
                        <p class="right"> 忘记密码? </p>
                    </div>


            </div>
        </div>
    </div>
</template>
<style>
    .header{
        margin-bottom: 40px;
    }
    .login{
        width: 100%;
        height: 100%;
        /*background-color: #4cae4c;*/
    }
    .btn_login{
        padding: 15px;
    }
    .car{
        width: 40%;
        height: 70%;
        /*background:;*/
        /*border-radius: 50%;*/
        background-color: white;
        background:url("img/user.png")  center no-repeat;
        background-size:contain;

        margin: auto;
    }
    .carBg{
        /*border-top: 1px white solid;*/
        width: 100%;
        background-color: #26a2ff;
        height: 10rem;
        padding-top: 2rem;
    }
    .right{
        text-align: right;
    }
</style>
<script>
    import vheader from './vheader.vue';
    import { Toast } from 'mint-ui';
    module.exports = {
        components:{vheader},

        data:function(){
            return{
                header:"登录",
                username:"",
                password:""
            }
        },
        methods:{
           login:function () {
               console.log("用户名"+this.username);
               console.log("密码"+this.password);
              this.$http.post('/login',{username:this.username,password:this.password},{emulateJSON:true}).then(function (result) {
                    console.log("登录成功");
                   this.$router.push({path:'/year'});

               },function (err) {
                  console.log(err.message);
                   console.log("登录失败");
                  Toast('用户名或密码错误');
               })

           }
        },

        watch:{

        }
    }

</script>