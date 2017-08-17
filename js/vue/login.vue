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

                <!--<mt-field label="市场" v-model="market">-->
                    <!--<select name="" class="selectMarket"  v-model="marketUrl" >-->
                        <!--<option value="">选择交易市场</option>-->
                        <!--<option v-bind:value="item.url"   v-for=" item in marketList " >{{item.market}}</option>-->
                    <!--</select>-->
                <!--</mt-field>-->
                <!--选择的市场：{{marketUrl}}-->
                <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
                <br>
                <div class="btn_login">

                    <button class="mint-button mint-button--primary mint-button--large" @click="login()"> <label class="mint-button-text">登录</label></button>
                    <div class="noteTip">
                        <span class="right"><a href="http://www.carexcn.com/app/leader.html?toggle=true" >切换市场</a></span>
                        <!--<span class="right"><a href="">忘记密码?</a></span>-->
                    </div>
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
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .selectMarket{
        height: 30px;
        /*-webkit-appearance: none;*/
        /*appearance: none;*/
        /*border: none;*/
        font-size: 18px;
        padding: 0px 5px;
        display: inline-block;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius: 4px;

    }
    .noteTip{
        margin-top: 1rem;
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
                password:"",
                market:"",
                marketUrl:"",
                marketList:[]
            }
        },
        methods:{

            login:function () {
                console.log("用户12名"+this.username);
                function Trim(str)
                {
                    return str.replace(/\s+/g,"");
                }
                this.username=Trim(this.username);
                console.log("去掉空格后————>",this.username);
                console.log("密码"+this.password);
                console.log("表单提交地址",'/login');
                this.$http.post('/login',{username:this.username,password:this.password},{emulateJSON:true}).then(function (result) {
                    console.log("登录成功");
                    this.$router.push({path:'/year'});
                    localStorage.setItem("username", this.username);
                    localStorage.setItem("password", this.password);

                },function (err) {
                    console.log(err.message);
                    console.log("登录失败");
                    Toast('用户名或密码错误');
                })

            }
        },
        created:function () {
            //获得本地存储的账号密码
            var name = localStorage.getItem("username");
            var pass= localStorage.getItem("password");
            console.log("pass",pass);
            if(name&&pass){
                //   初始化调用登录方法
                this.$http.post('/login',{username:name,password:pass},{emulateJSON:true}).then(function (result) {
                    console.log("初始化登录成功");
                    this.$router.push({path:'/year'});
                },function (err) {
                    console.log(err.message);
                    console.log("初始化登录失败");
                    Toast('用户名或密码错误');
                })
            }
            /* 请求市场数据*/
            console.log("开始请求json数据");

            this.$http({
                type: "POST",
                url: "http://www.carexcn.com/app/markets.json",
                dataType: 'json',
                crossDomain: true
            }).then(function (res) {
                this.marketList=res.data;
                console.log("json返回数据",this.marketList);
            })
        },
        watch:{

        }
    }

</script>