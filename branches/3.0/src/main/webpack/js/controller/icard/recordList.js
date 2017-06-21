/**
 * Created by peter on 2017/6/21.
 */
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/recordList",{
        controller:"recordListController",
        template:require("./html/recordList.html")
    });
}]);

app.controller("recordListController",["$scope","$routeParams","$filter",function ($scope,$routeParams,$filter) {
    $scope.filter = {
        "account.dealers.loginName":$routeParams.name,
        "type":$routeParams.type,
        "startDate":$routeParams.startDate,
        "endDate":$routeParams.endDate
    };
    $scope.tableColumns = [
        {title:"订单",template:"{{row.orderNo}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"金额",template:"{{row.amount / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"充值",template:"{{row.recharge / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"赠送",template:"{{row.give / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"处理时间",template:"{{row.createTime | date:'yyyy-MM-dd HH:mm:ss'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"类型",template:"<ng-convert code='account_record_type' value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"订单详情",template:"<a href='/ng#/pay/order/query?orderNo={{row.orderNo}}&accountId={{row.account.id}}&balance="+ $scope.balance+"'>{{row.orderNo ? '查看':''}}</a>",width:10,thClass:"text-left",tdClass:"text-left"}
    ];
    $scope.rowClass = function (row) {
        switch(row.type){
            case "01":return "danger text-danger"
            case "02":return "success text-success"
            default: return "info"
        }
    }

    //查询起始日期(查询截止日期)
    $scope.Deal=function(){
        if($scope.startDate&&$scope.endDate){$scope.changetime()}
        if($scope.startDate==null&&$scope.filter.endDate==null){$scope.changetime()}
    };
    //时间格式变换
    $scope.changetime=function(){
        $scope.filter.startDate=$filter('date')($scope.startDate,'yyyy-MM-dd');//查询起始日期
        $scope.filter.endDate=$filter('date')($scope.endDate,'yyyy-MM-dd');//查询截止日期
        $scope.ngTable.reload();
    };
}]);