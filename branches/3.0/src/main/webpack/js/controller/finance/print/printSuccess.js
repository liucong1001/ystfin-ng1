/**
 * Created by 10973 on 2017/4/17.
 */
/**
 * Created by 扬 on 2017/2/14.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/finance/printSuccess',{
        template:require("./html/printSuccess.html"),
        controller:"printSuccessCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("printSuccessCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location", "$routeParams",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams) {
    // 初始化打印控件
    $printer.init()
    $scope.gconfig = gconfig;
    $scope.newNo=$routeParams.newNo;
    $scope.nextBillNo=$scope.newNo;
    $scope.lastBill=$routeParams.lastBill;
    $scope.billNo=$routeParams.billNo;
    //定义修改之前的发票号
    $scope.saveBill=function(){
        var bill = new $bill();
        bill.$save({
            action: "updateBillNo",
            nextBillNo:$scope.nextBillNo ,
            newNo: $scope.newNo
        }, function (result) {
            alert("修改成功");
            $scope.back();

        });
    };
    $scope.returnBill=function() {
        var bill = new $bill();
        bill.$save({
            action: "returnLastBill",
            nextBillNo: $scope.nextBillNo,
            lastBill: $scope.lastBill,
            billNo:$scope.billNo
        }, function (result) {
            $location.path('/finance/remove');
        });
    }

    //点击页面返回
    $scope.back=function(){
        $location.path('/finance/print').search({nextBillNo:$scope.nextBillNo});
    }
}])