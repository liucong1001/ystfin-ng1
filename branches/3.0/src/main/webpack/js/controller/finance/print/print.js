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
    $scope.gconfig = gconfig
    // 根据流水号读取
    $scope.$watch("archivesNo",function (newVal,oldVal) {
        if(newVal){
            $trans.get({archivesNo:$scope.archivesNo},function (trans) {
                $scope.trans = trans
                $convert("Vehicle_type").then(function (c) {
                    $scope.selectedCarType = c[trans.vehicle.vehicleType]
                })
            },function (err) {
                $scope.trans = undefined
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
    $scope.printerList = $printer.getPrinters()
    $scope.selectedPrinter = $printer.getSelected()

    $scope.carTypeList = $scope.convertList("Vehicle_type")
    // 打印
    $scope.print = function () {
        $printer.printBill($scope.trans,$scope.gconfig.printConfig).then(function () {
            var bill = new $bill($scope.trans)
            // 用户修改的车类型
            bill.vehicle.vehicleType = $scope.selectedCarType.code
            bill.bill = {
                billNo:$scope.nextBillNo,
                billDate: $filter("date")($scope.billDate,"yyyy-MM-dd")
            }
            bill.$save({action:"print"}).then(function () {
//                $location.path("/finance/print/success")
            })
        })
    }
    // 保存打印选择
    $scope.saveSelectedPrinter = function () {
        $printer.setSelected($scope.selectedPrinter)
    }
    // 读取下一个发票号
    $bill.get({action:"next"},function (next) {
        $scope.nextBillNo = next.billNo
    })
    $scope.billDate = new Date()
}])