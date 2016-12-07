/**
 * Created by 扬 on 2016/11/28.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/pay/order/:id/pay",{
        controller:"payOrderController",
        template:require("./html/order/pay.html")
    })
}])
app.controller("payOrderController",["$scope","Order","$routeParams","$http","$icard","$filter",function ($scope,Order,$routeParams,$http,$icard,$filter) {
    Order.get({id:$routeParams.id},function (order) {
        $scope.order = order
        if(order.status != "01") return
        $scope.intv = 0
        $scope.initCardWriter = function () {
            $icard.init().then(function () {
                $scope.icardWriterReady = true
            }, function () {
                $scope.icardWriterReady = false
            })
        }
        $scope.initCardWriter()
        $scope.$watch("intv", function (val, old) {
            if (old) clearInterval(old)
        })
        $scope.$on("$destroy", function () {
            if ($scope.intv) clearInterval($scope.intv)
        })
        function scanCard() {
            $scope.intv = $icard.scanCard(function (cardNo) {
                $scope.$apply(function () {
                    $scope.cardNo = cardNo
                })
            })
        }

        $scope.$watch("icardWriterReady", function (val, old) {
            scanCard()
        })
        $scope.$watch("cardNo", function (val) {
            if (val) {
                $http.get("/icard/cardNo/" + val).then(function (result) {
                    $scope.account = result.data
                    $scope.accountLoadMessge = ""
                }, function (result) {
                    $scope.accountLoadMessge = result.data.message
                })
            } else {
                $scope.account = {}
                $scope.accountLoadMessge = ""
            }
        })
        $scope.$on("$destroy", function () {
            console.log("********", $scope.intv)
            if ($scope.intv) clearInterval($scope.intv)
        })
    })
    $scope.pay = function () {
        clearInterval($scope.intv)
        $scope.intv = 0
        var date = $filter("date")(Date.now(),"yyyyMMdd")
        var time = $filter("date")(Date.now(),"HHmmss")
        var amount = $scope.order.amount;
        var tag = $icard.pay(amount,time,date,time)
        if(!tag){
            $scope.payMessage = "写卡失败"
            scanCard()
        }else{
            $http.post("/icard/pay",{cardNo:$scope.cardNo,amount:amount,tac:tag, date:date,time:time,orderNo:$scope.order.orderNo}).then(function (result) {
                $scope.account = result.data
                $scope.payMessage = "success"
                $scope.order.status = "02"
                scanCard()
            },function (result) {
                $scope.payMessage =  result.data.message
                scanCard()
            })
        }
    }
}])