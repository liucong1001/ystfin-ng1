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
    $scope.tableColumns = [
        {title:"订单",template:"{{row.orderNo}}", width:20,thClass:"text-center",tdClass:"text-center"},
        {title:"金额",template:"{{row.amount/100 | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"处理时间",template:"{{row.createTime | date:'yyyy-MM-dd'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"类型",template:"<ng-convert code='account_record_type' value='{{row.type}}' ></ng-convert>",width:20,thClass:"text-left",tdClass:"text-left"},
        {title:"订单详情",template:"<a href='/ng#/pay/order/query?icardNo={{row.orderNo}}'>{{row.orderNo ? '查看':''}}</a>",width:20,thClass:"text-left",tdClass:"text-left"}
    ]
    $scope.rowClass = function (row) {
        switch(row.status){
            case "01":return "warning"
            case "02":return "success"
            default: return "danger"
        }
    }
}]);