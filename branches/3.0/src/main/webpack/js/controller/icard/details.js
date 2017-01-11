/**
 * Created by peter on 2017/1/3.
 */

var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/:id/details",{
        controller:"iCardDetailsController",
        template:require("./html/details.html")
    });
}]);

app.controller("iCardDetailsController",["$scope","$routeParams","AccountRecords",function ($scope,$routeParams,AccountRecords) {
    $scope.filter = {"account.id":$routeParams.id};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"订单",template:"{{row.orderNo}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"金额",template:"{{row.amount / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"处理时间",template:"{{row.createTime | date:'yyyy-MM-dd HH:mm:ss'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"类型",template:"<ng-convert code='account_record_type' value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"订单详情",template:"<a href='/ng#/pay/order/query?icardNo={{row.orderNo}}&accountId={{row.account.id}}&balance="+ $scope.balance+"'>{{row.orderNo ? '查看':''}}</a>",width:10,thClass:"text-left",tdClass:"text-left"}
    ]
    $scope.rowClass = function (row) {
        switch(row.type){
            case "01":return "danger text-danger"
            case "02":return "success text-success"
            default: return "info"
        }
    }
}]);