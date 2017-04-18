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
app.controller("printCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location", "$routeParams",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams) {
    // 初始化打印控件
    $printer.init()
    $scope.gconfig = gconfig;
    $scope.num = "";
    // 根据流水号读取
    $scope.keyUp =function (newVal,$event) {
        if($event.keyCode ==13 && newVal){
            $bill.query({archivesNo:newVal},function(result){
                $scope.arry = result;
                $scope.length=result.length;
                if( $scope.length>0){
                    $scope.obj={
                        billnum:$scope.arry[$scope.length-1]['billNo']
                    };
                    var last=$scope.arry[$scope.length-1]['billDate'];
                    var dt = new Date(last.replace(/-/,"/"));
                    $scope.billDate=dt;
                }else{
                    $scope.obj={
                        billnum:null
                    };
                };
            });
            $trans.get({archivesNo:$scope.archivesNo},function (trans) {
                $scope.trans = trans;
                $convert("Vehicle_type").then(function (c) {
                    $scope.selectedCarType = c[trans.vehicle.vehicleType];
                });
            },function (err) {
                $scope.trans = undefined;
                console.log("找不到的流水号");
            });
        }
    }
    /*$scope.$watch("archivesNo",function (newVal,oldVal) {
        if(newVal){
            $bill.query({archivesNo:newVal},function(result){
                $scope.arry = result;
                $scope.length=result.length;
                if( $scope.length>0){
                    $scope.obj={
                        billnum:$scope.arry[$scope.length-1]['billNo']
                    };
                    var last=$scope.arry[$scope.length-1]['billDate'];
                    var dt = new Date(last.replace(/-/,"/"));
                    $scope.billDate=dt;
                }else{
                    $scope.obj={
                        billnum:null
                    };
                };
            });
            $trans.get({archivesNo:$scope.archivesNo},function (trans) {
                $scope.trans = trans;
                $convert("Vehicle_type").then(function (c) {
                    $scope.selectedCarType = c[trans.vehicle.vehicleType];
                });
            },function (err) {
                $scope.trans = undefined;
                console.log("找不到的流水号");
            });
        };
    });*/
    $scope.time=function(value){
        var time=value;
        var dt = new Date(time.replace(/-/,"/"));
        $scope.billDate=dt;
    }
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
    //定义发票页面切换的变量 true 显示 false隐藏
    $scope.top=true;
    $scope.bottom=false;
    $scope.buttomback=false;
    // 打印
    $scope.print = function (billType) {
        $printer.printBill($scope.trans,$scope.gconfig.printConfig).then(function () {
            var bill = new $bill($scope.trans);
            bill.billType = billType;
            // 用户修改的车类型
            bill.vehicle.vehicleType = $scope.selectedCarType.code;
            bill.$save({action:"print",billNo:$scope.obj.billnum,nextBillNo:$scope.nextBillNo,billDate:$filter("date")($scope.billDate,"yyyy-MM-dd")}).then(function (result) {
                $scope.billNo = result.billNo;
                $scope.newNo =$scope.nextBillNo;
                $location.path('/finance/printSuccess').search({newNo: $scope.nextBillNo,lastBill:$scope.lastBill,billNo:$scope.billNo});
            });
        })
    };
    //
    $scope.sel=function(x){
        console.log("日期"+x);
    }
    // 保存打印选择
    $scope.saveSelectedPrinter = function () {
        $printer.setSelected($scope.selectedPrinter);
    }
    // 获取当前发票号
    $bill.get({action:"next"},function (next) {
        $scope.nextBillNo = next.nextBillNo;

        //$scope.nextBillNo=$routeParams.nextBillNo;
     //if($routeParams!=null){
     //    $scope.nextBillNo=$routeParams.nextBillNo;
     //}else{
     //    $scope.nextBillNo = next.nextBillNo;
     //}
        $scope.lastBill=next.lastBill;
    })

    //获取开票时间
    $scope.billDate = new Date();

    //保存打印选择
    $scope.saveSelectedPrinter = function () {
        $printer.setSelected($scope.selectedPrinter);
    }

    //作废
    $scope.remove = function () {
        var bill = new $bill($scope.trans);
        bill.$save({action:"remove",billNo:$scope.obj.billnum}).then(function (result) {
            $location.path('/finance/remove')
        });
    };

    //退票
    $scope.back = function () {
        var bill = new $bill($scope.trans);
        bill.$save({action:"back",billNo:$scope.obj.billnum}).then(function (result) {
            $location.path('/finance/remove')
        });
    };

    //流水号改变
    $scope.numchange=function(){
        $scope.trans = undefined;
    }
    //定义修改之前的发票号

    $scope.saveBill=function(){
        var bill = new $bill();
        bill.$save({
            action: "updateBillNo",
            nextBillNo:$scope.nextBillNo ,
            newNo: $scope.newNo
        }, function (result) {

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

}])