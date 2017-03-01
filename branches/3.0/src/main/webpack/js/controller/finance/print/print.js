/**
 * Created by 扬 on 2017/2/14.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/finance/print',{
        template:require("./html/print.html"),
        controller:"printCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("printCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location",
function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location) {
    // 初始化打印控件
    $printer.init()
    $scope.gconfig = gconfig;
    //$scope.obj={};
    // 根据流水号读取
    $scope.$watch("archivesNo",function (newVal,oldVal) {
        if(newVal){
            $bill.query({archivesNo:newVal},function(result){

                $scope.arry = result;
                $scope.length=result.length;
                if( $scope.length>0){
                    //$scope.billnum=$scope.arry[$scope.length-1]['billNo'];
                    $scope.obj={
                        billnum:$scope.arry[$scope.length-1]['billNo']
                    }
                }
            });
            $trans.get({archivesNo:$scope.archivesNo},function (trans) {
                $scope.trans = trans
                $convert("Vehicle_type").then(function (c) {
                    $scope.selectedCarType = c[trans.vehicle.vehicleType]
                })
            },function (err) {
                $scope.trans = undefined;
                console.log("找不到的流水号");
            })
        }
    })
    // 车类型下拉数据
    $scope.convertList = function(code) {
        var defer = $q.defer()
        $convert(code).then(function (data) {
            var result = []
            for(var key in data){
                result.push(data[key])
            }
            defer.resolve(result)
        },function () {
            defer.resolve([])
        })
        return defer.promise
    }
    // 打印机下拉
    $scope.printerList = $printer.getPrinters();
    $scope.selectedPrinter = $printer.getSelected();

    $scope.carTypeList = $scope.convertList("Vehicle_type");
    //定义发票页面切换的变量
    $scope.tog=true;
    $scope.tog2=false;
    $scope.tog3=false;

    // 打印
    $scope.print = function (billType) {
        $scope.print_com();
        $printer.printBill($scope.trans,$scope.gconfig.printConfig).then(function () {
            var bill = new $bill($scope.trans);
            bill.billType = billType;
            // 用户修改的车类型
            bill.vehicle.vehicleType = $scope.selectedCarType.code;
            bill.$save({action:"print",billNo:$scope.obj.billnum,nextBill:$scope.nextBillNo,billDate:$filter("date")($scope.billDate,"yyyy-MM-dd")}).then(function () {

            });
        })
    };
    // 保存打印选择
    $scope.saveSelectedPrinter = function () {
        $printer.setSelected($scope.selectedPrinter)
    }
    // 读取下一个发票号
    $bill.get({action:"next"},function (next) {
        $scope.nextBillNo = next.billNo
    })
    $scope.billDate = new Date()



    //弹出框
    $scope.print_com=function(){
        $scope.tog=false;
        $scope.tog2=true;
    };
    $scope.print_com1=function(){
        $scope.tog=false;
        $scope.tog3=true;
    }


    //流水号改变
    $scope.numchange=function(){
        $scope.trans = undefined;
    }
}])