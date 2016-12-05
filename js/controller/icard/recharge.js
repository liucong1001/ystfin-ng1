/**
 * Created by 扬 on 2016/12/1.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/recharge",{
        controller:"icardRechargeController",
        template:require("./html/recharge.html")
    })
}])

app.controller("icardRechargeController",["$scope","$http","$icard","$filter",function ($scope,$http,$icard,$filter) {
    $scope.intv = 0
    $scope.initCardWriter = function () {
        $icard.init().then(function () {
            $scope.icardWriterReady = true
        },function () {
            $scope.icardWriterReady = false
        })
    }
    $scope.initCardWriter()
    $scope.$watch("intv",function (val,old) {
        if(old) clearInterval(old)
    })
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    })
    function scanCard() {
        $scope.intv = $icard.scanCard(function (cardNo) {
            $scope.$apply(function () {
                $scope.cardNo = cardNo
            })
        })
    }
    $scope.$watch("icardWriterReady", function (val,old) {
        scanCard()
    })
    $scope.$watch("cardNo",function (val) {
        if(val){
            $http.get("/icard/cardNo/" + val).then(function (result) {
                $scope.account = result.data
                $scope.accountLoadMessge = ""
            },function (result) {
                $scope.accountLoadMessge = result.data.message
            })
        }else{
            $scope.account = {}
            $scope.accountLoadMessge = ""
        }
    })
    $scope.$on("$destroy",function () {
        console.log("********",$scope.intv)
        if($scope.intv) clearInterval($scope.intv)
    })
    $scope.recharge = function () {
        clearInterval($scope.intv)
        $scope.intv = 0
        var date = $filter("date")(Date.now(),"yyyyMMdd")
        var time = $filter("date")(Date.now(),"HHmmss")
        var amount = parseFloat($scope.amount) * 100;
        var tag = $icard.recharge(amount,time,date,time)
        if(!tag){
            $scope.rechargeMessage = "写卡失败"
            scanCard()
        }else{
            $http.post("/icard/recharge",{cardNo:$scope.cardNo,amount:amount,tac:tag,date:date,time:time}).then(function (result) {
                $scope.account = result.data
                $scope.rechargeMessage = "success"
                $scope.amount = ""
                scanCard()
            },function (result) {
                $scope.rechargeMessage =  result.data.message
                scanCard()
            })
        }
    }
}])