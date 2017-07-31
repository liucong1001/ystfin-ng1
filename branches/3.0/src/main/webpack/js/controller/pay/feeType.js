/**
 * Created by 10973 on 2017/7/24.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/chargeItem/list',{
        template:require("./html/order/feeType.html"),
        controller:"feeTypeCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("feeTypeCtrl", ["$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http" ,function ($scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };

    $scope.tableColumns = [
        {title:"ID",template:"{{row.id}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"费用名称",template:"{{row.name }}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"金额一",template:"{{row.marketFee }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"金额二",template:"{{row.otherFee }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"金额三",template:"{{row.divideFee }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"",template:"<a href='/ng#/system/managerinfo?id={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        // {title:"",template:"<span ng-click='instance.reset(row.id)'>重置密码</span>",width:10,thClass:"text-left",tdClass:"text-left"}

    ];
    //定义查询对象
    $scope.searchinfo={};
    //重置密码
    $scope.ngTable = {reset:function (id) {
        if(confirm("是否确定此操作？")){
            $http({
                method:'post',
                url:'admin/resetPwd',
                params:{'id':id}
            }).success(function(){ alert("重置成功,您的初始密码为：12344321");})
        }
    }}
}]);