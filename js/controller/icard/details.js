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

app.controller("iCardDetailsController",["$scope","$routeParams","AccountRecords","$http","$filter",function ($scope,$routeParams,AccountRecords,$http,$filter) {
    $scope.filter = {"account.id":$routeParams.id};
    //$scope.blan = $routeParams.balance;
    $scope.dealersId = $routeParams.dealersId;
    $scope.tableColumns = [
        {title:"订单",template:"{{row.orderNo}} ", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"金额",template:" <span ng-init='instance.getblan(row)' >{{row.amount / 100 | currency:''}}</span>  ",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"充值",template:"{{row.recharge / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"赠送",template:"{{row.give / 100 | currency:''}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"处理时间",template:"{{row.createTime | date:'yyyy-MM-dd HH:mm:ss'}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"类型",template:"<ng-convert code='account_record_type' value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"订单详情",template:"<a href='/ng#/pay/order/query?orderNo={{row.orderNo}}&accountId={{row.account.id}}&balance="+ $scope.balance+"'>{{row.orderNo ? '查看':''}}</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"管理",template:"<a href=''   ng-click='instance.cancel(row.createTime,row)'  ng-if='instance.checkDate(row.createTime)'  ng-hide='row.type==05||row.orderNo'> 撤销 </a> <span class='form-error'>{{row.type=='05' ? '已撤销':''}}</span>",width:10,thClass:"text-left",tdClass:"text-left"}
    ];
    $scope.rowClass = function (row) {
        switch(row.type){
            case "01":return "danger text-danger"
            case "02":return "success text-success"
            default: return "info"
        }
    };

    $scope.ngTable={
              cancel:function(time,row){
                      if(confirm("是否确定要撤销此项费用？")){
                          $http({
                              method:'post',
                              url:'icard/revoke',
                              params:{'id':row.id}
                          }).success(function(){
                              alert("撤销成功");
                              $scope.ngTable.reload();
                          }).error(function(result){
                              alert(result.message);
                          })
                      }
              },
              getblan:function(row){
                  $scope.blan=row.account.icCard.balance;
              },
             checkDate:function(time){
                  var ago=$filter('date')(time,'yyyy-MM-dd');   //2017-06-20
                  var  agotime=new Date(ago);
                  var todaysDate = new Date();
                  if(agotime.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                      return true;  //今天的日期
                  } else{
                      return false;  //不是今天的日期隐藏‘撤销’
                  }

              }
    }

}])