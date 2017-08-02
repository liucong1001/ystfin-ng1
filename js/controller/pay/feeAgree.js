
/**
 * Created by 10973 on 2017/7/18.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/chargeItem/feeagree',{
        template:require("./html/order/feeAgree.html"),
        controller:"chargeItemFeeAgreeCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("chargeItemFeeAgreeCtrl", ["$rootScope", "$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http" ,function ( $rootScope,$scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http) {;
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"修改费用名称",template:"{{row.chargeItem.name}}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"金额一",template:"{{row.marketFee}}",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"金额二",template:"{{row.otherFee}}",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"金额三",template:"{{row.divideFee}}",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"修改理由",template:"{{row.reason}}",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"状态",template:"{{row.status | feeStatus }}",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<a href=''  ng-if='row.status==01' ng-click='instance.agree(row)'>同意</a>  <a href=''  ng-if='row.status==01' ng-click='instance.refuse(row)'>拒绝</a> ",width:10,thClass:"text-left",tdClass:"text-left"},
    ];
    //定义查询对象
    $scope.searchinfo={};
    //重置密码
    $scope.ngTable = {agree:function (row) {
         console.log("同意"+row);
         console.log(row);
        if(confirm("是否确定此操作？")){
            $http({
                method:'post',
                url:'chargeApply/approve',
                // params:{'id':row.id},
                data:{id:row.id}
            }).success(function(){
                console.log("成功");
                $scope.ngTable.reload();
                // alert("重置成功,您的初始密码为：12344321");
            })
        }
    },
      refuse:function (row) {
        console.log("点击了拒绝");
        console.log(row);
        if(confirm("是否确定此操作？")){
            $http({
                method:'post',
                url:'chargeApply/reject',
                // params:{'id':row.id},
                data:{id:row.id}
            }).success(function(){
                console.log("成功");
                $scope.ngTable.reload();
                // alert("重置成功,您的初始密码为：12344321");
            })
        }
    }
    }

}])

app.filter('feeStatus',function () {
     return function (val) {
         if(val=='01'){
             return "未通过"
         } else if(val=='02'){
             return "已通过"
         }else if(val=='03'){
             return "已拒绝"
         }
     }
})