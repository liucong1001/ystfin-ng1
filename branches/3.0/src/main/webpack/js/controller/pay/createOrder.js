/**
 * Created by 扬 on 2016/11/28.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/pay/order/create",{
        controller:"createOrderController",
        template:require("./html/order/create.html")
    })
}])

app.controller("createOrderController",["$scope","TransRecord","Order","$location",function ($scope,TransRecord,Order,$location) {
    $scope.items = {}
    $scope.itemsLength = 0
    $scope.archivesNoKeyUp = function ($event) {
        if ($event.keyCode == 13 && $scope.archivesNo) {
            TransRecord.get({archivesNo:$scope.archivesNo},function (tr) {
                if(!tr.orderNo){       // 未创建订单
                    $scope.items[tr.archivesNo] = tr
                    $scope.itemsLength++
                    $scope.archivesNoError = ""
                }else{
                    $scope.archivesNoError = $scope.archivesNo + "已存在于订单[" + tr.orderNo + "]中"
                }
                $scope.archivesNo = ""
            })
        }
    }
    $scope.removeItem = function(archivesNo){
        $scope.itemsLength--
        delete $scope.items[archivesNo]
    }
    $scope.orderTotalAmount = function () {
        var total = 0;
        for(var i in $scope.items){
            total += $scope.items[i].fee
        }
        return total
    }
    $scope.submit = function () {
        var order = new Order({})
        order.items = []
        for(var i in $scope.items){
            var item = $scope.items[i]
            order.items.push({archivesNo:item.archivesNo,productType:"01",productName:"交易手续费",number:$scope.itemsLength, uprice:item.fee * 100,tprice:item.fee * 100})
        }
        order.$save().then(function (result) {
            $location.path("/pay/order/" + result.id + "/pay")
        })
    }
}])