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
        {title:"订单",template:"{{row.orderNo}}", width:25,thClass:"text-center",tdClass:"text-center"},
        {title:"金额",template:"{{row.amount | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:25},
        {title:"类型",template:"<ng-convert code='icard_type' value='{{row.type}}' ></ng-convert>",width:25,thClass:"text-right",tdClass:"text-right"}
    ]
    $scope.rowClass = function (row) {
        switch(row.status){
            case "01":return "warning"
            case "02":return "success"
            default: return "danger"
        }
    }

}]);