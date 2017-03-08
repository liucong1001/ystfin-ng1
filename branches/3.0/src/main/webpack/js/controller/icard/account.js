/**
 * Created by peter on 2017/1/10.
 */
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/account/manager",{
        controller:"accountController",
        template:require("./html/account.html")
    });
}]);

app.controller("accountController",["$scope","$routeParams","$http",function ($scope,$routeParams,$http) {
    $scope.filter = {"dealers.id":$routeParams.id};
    $scope.tableColumns = [
        {title:"卡号",template:"{{row.cardNo}}", width:20,thClass:"text-center",tdClass:"text-center"},
        {title:"商户代号",template:"{{row.dealers.loginName}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"商户名称",template:"{{row.dealers.name}}", width:25,thClass:"text-center",tdClass:"text-center"},
        {title:"余额",template:"{{row.dealers.balance / 100 | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"状态",template:"<ng-convert code='account_status' value='{{row.status}}' ></ng-convert>",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"详情",template:"<a href='/ng#/icard/{{row.id}}/details?balance={{row.dealers.balance}}&dealersId={{row.dealers.id}}'>查看</a>",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"操作",template:"<a href='/ng#/icard/recharge' ng-if='row.status != 02'>充值</a>&nbsp;&nbsp;<a href='' ng-if='row.status != 02' ng-click='instance.lossCard(row.dealers.id,row.cardNo)'>挂失</a>",width:10,thClass:"text-center",tdClass:"text-center"}
    ]
    $scope.rowClass = function (row) {
        switch(row.status){
            case "01":return "success"
            case "02":return "danger"
            default: return "info"
        }
    }
    $scope.ngTable = {lossCard:function (delars,cardNo) {
        if(confirm("是否确定此操作？")){
            $http.post("/icard/cardLoss",{delars:delars,cardNo:cardNo}).then(function () {
                $scope.ngTable.reload();
            })
        }
    }}
}]);