/**
 * Created by 王佳飞 on 2017/8/2.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/transferAccounts/",{
        controller:"transferAccountsController",
        template:require("./html/transferAccounts.html")
    })
}])

app.controller("transferAccountsController",["$scope","$http","$routeParams","$icard","$filter","md5","$location",function ($scope,$http,$routeParams,$icard,$filter,md5,$location) {
    //$scope.dealersId = $routeParams.dealersId;
    $scope.intv = 0;
    $scope.initCardWriter = function () {
        $icard.init().then(function () {
            $scope.icardWriterReady = true
        },function () {
            $scope.icardWriterReady = false
        })
    }
    $scope.$watch("cardMessage",function (val) {
        $icard.showText(val)
    })
    $scope.initCardWriter()
    $scope.$watch("intv",function (val,old) {
        if(old) clearInterval(old)
    })
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    })
    function scanCard() {
        $scope.intv = $icard.scanCard(function (cardNo,balance) {
            $scope.$apply(function () {
                if(cardNo) $scope.cardNo = cardNo;
                if(!cardNo){
                    $scope.cardMessage = ""
                }
            })
        })
    }
    $scope.$watch("icardWriterReady", function (val,old) {
        scanCard()
    })
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    })

    $scope.jump=function(path){
        $location.path(path);
    };

    $scope.cardNo=$routeParams.cardNo;

    $scope.$watch("cardNo",function (val) {
        if(val&&val != null){
            $http.get("/icard/cardNo/" + val).then(function (result) {
                $scope.account = result.data
                $scope.accountLoadMessge = ""
            },function (result) {
                $scope.accountLoadMessge ="卡号" +$scope.cardNo+"的ic卡未绑定商户！";
            })
        }else{
            $scope.account = {}
            $scope.accountLoadMessge = ""
        }
    })

    $scope.cardNoIn=$routeParams.cardNoIn;

    $scope.$watch("cardNoIn",function (val) {
        if(val&&val != null){
            $http.get("/icard/cardNo/" + val).then(function (result) {
                $scope.accountIn = result.data
                $scope.accountLoadMessge = ""
            },function (result) {
                $scope.accountLoadMessge = "卡号" +$scope.cardNoIn+"的ic卡未绑定商户！"
            })
        }else{
            $scope.accountIn = {}
            $scope.accountLoadMessge = ""
        }
    })

    $scope.amount=$routeParams.amount;

    $scope.$watch("amount",function (val) {
        if(val&&val != null){
            var r=$scope.account.icCard.recharge/100;
            console.log(r,val);
            if(val>r){
                $scope.amountMessge = "输入的金额大于当前账号的充值余额！"
            }else{
                $scope.amountMessge="";
            }
        }
    })

    $scope.give=$routeParams.give;

    $scope.$watch("give",function (val) {
        if(val&&val != null){
            var g=$scope.account.icCard.give;
            if(val>g){
                $scope.giveMessge = "输入的金额大于当前账号的赠送余额！"
            }else{
                $scope.giveMessge ="";
            }
        }
    })

    $scope.transferAccounts = function () {
        clearInterval($scope.intv)
        $scope.intv = 0
        $icard.playVoice(4);
        var date = $filter("date")(Date.now(),"yyyyMMdd")
        var time = $filter("date")(Date.now(),"HHmmss")
        var amount = parseFloat($scope.amount) * 100;
        var give=parseFloat($scope.give)*100;
        $icard.getPassword().then(function (pwd) {
            if(pwd.length!=6){
                $icard.playVoice(8);
            }else{
                $icard.playVoice(14);
                $icard.getPassword().then(function(repwd){
                    if(repwd!=pwd){
                        $icard.playVoice(5);
                    }else{
                        var pwdMd5=md5.createHash(pwd);
                        $scope.cardData={
                            cardNoOut:$scope.cardNo,
                            password:pwdMd5,
                            cardNoIn:$scope.cardNoIn,
                            recharge:amount,
                            give:give,
                            date:date,
                            time:time,
                        };
                        $http.post("/icard/transferAccounts",$scope.cardData).then(function (result) {
                            $scope.account = result.data.oldAccount;
                            $scope.accountIn = result.data.newAccount;
                            $scope.accountLoadMessge = "转账成功";
                            $scope.amount = null;
                            $scope.give=null;
                            $scope.cardMessage = "充值金额:" + $filter("currency")(amount / 100) + "\n当前余额:" + $filter("currency")($scope.account.icCard.balance / 100)
                            scanCard();
                            $icard.playVoice(6);
                        },function (result) {
                            $scope.cardMessage = "转账失败";
                            $scope.accountLoadMessge =  result.data.message;
                            scanCard()
                        })
                    }
                })
            }
        },function () {
            console.log("输入密码失败！")
        });
    }
}])