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

app.controller("recordListController",["$scope","$http","$routeParams","$filter",function ($scope,$http,$routeParams,$filter) {
    $scope.start = new Date($routeParams.startDate);
    $scope.end = new Date($routeParams.endDate);
    $scope.filter = {
        "account.dealers.loginName":$routeParams.name,
        "type":$routeParams.type,
        "startDate":$routeParams.startDate,
        "endDate":$routeParams.endDate
    };
    $scope.tableColumns = [
        {title:"订单号",template:"{{row.orderNo}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"卡号",template:"{{row.account.cardNo}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"账户名称",template:"{{row.account.icCard.name}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"金额",template:"{{row.amount / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"充值",template:"{{row.recharge / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"赠送",template:"{{row.give / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"当前余额",template:"{{row.newBalance / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"处理时间",template:"{{row.createTime | date:'yyyy-MM-dd HH:mm:ss'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"类型",template:"<ng-convert code='account_record_type' value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        /*{title:"订单详情",template:"<a href='/ng#/pay/order/query?orderNo={{row.orderNo}}&accountId={{row.account.id}}&balance="+ $scope.balance+"'>{{row.orderNo ? '查看':''}}</a>",width:10,thClass:"text-left",tdClass:"text-left"}*/
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
    //导出excel表
    $scope.exportOrder = function () {
        $http({
            url: 'icard/export/excel',
            method: "POST",
            params:{startDate:$scope.filter.startDate,endDate:$scope.filter.endDate,loginName:$routeParams.name,type:$routeParams.type},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.ms-excel"});
            var objectUrl = URL.createObjectURL(blob);
            var type = $routeParams.type=='01'?'充值':'消费';
            var filename="武汉爱之家长丰旧机动车交易市场"+type+"明细报表"+'.xls';
            if (window.navigator.msSaveOrOpenBlob) {// For IE:
                navigator.msSaveBlob(blob, filename);
            }else{ // For other browsers:
                URL.revokeObjectURL(objectUrl);
            }
        }).error(function(data){
            alert(data.message);
        });
    };


}]);