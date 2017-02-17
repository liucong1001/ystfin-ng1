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
app.controller("printCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig",function ($scope,$trans,$convert,$q,$printer,gconfig) {
    $printer.init()
    $scope.gconfig = gconfig
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
    $scope.printerList = $printer.getPrinters()
    $scope.selectedPrinter = $printer.getSelected()
    $scope.carTypeList = $scope.convertList("Vehicle_type")
    $scope.print = function () {
        $printer.printBill($scope.trans,$scope.gconfig.printConfig)
    }
    $scope.saveSelectedPrinter = function () {
        $printer.setSelected($scope.selectedPrinter)
    }
}])