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

app.controller("createOrderController",["$scope","TransRecord","Order","$location","Bills",function ($scope,TransRecord,Order,$location,Bills) {
    $scope.items = {}
    $scope.itemsLength = 0
    $scope.archivesNoKeyUp = function ($event) {
        if ($event.keyCode == 13 && $scope.archivesNo) {
            /*TransRecord.get({archivesNo:$scope.archivesNo},function (tr) {
                if(!tr.orderNo && tr.status == "11"){       // 未创建订单
                    if(!$scope.items[tr.archivesNo]) {
                        $scope.itemsLength++
                    }
                    $scope.items[tr.archivesNo] = tr
                    $scope.archivesNoError = ""
                } else if(tr.status != "11"){
                    $scope.archivesNoError = $scope.archivesNo + "未审核通过"
                } else{
                    $scope.archivesNoError = $scope.archivesNo + "已存在于订单[" + tr.orderNo + "]中"
                }
                $scope.archivesNo = ""
            })*/
            Bills.query({archivesNo:$scope.archivesNo},function (bills) {
                for(var i = 0 ; i < bills.length; i++){
                    if(!$scope.items[bills[i].id]){
                        $scope.itemsLength++
                    }
                    $scope.items[bills[i].id] = bills[i];
                }
            })
        }
    }
    $scope.removeItem = function(id){
        $scope.itemsLength--
        delete $scope.items[id]
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
            order.items.push({billNo:item.billNo,archivesNo:item.archivesNo,productType:"01",productName:"交易手续费",number:1, uprice:item.fee * 100,tprice:item.fee * 100})
        }
        order.$save().then(function (result) {
            $location.path("/pay/order/" + result.id + "/pay")
        })
    }
}])