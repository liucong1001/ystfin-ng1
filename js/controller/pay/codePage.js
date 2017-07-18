/**
 * Created by 10973 on 2017/7/18.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/pay/codePage',{
        template:require("./html/order/codePage.html"),
        controller:"OrderCodePageCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("OrderCodePageCtrl", ["$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http" ,function ($scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"车管所流水",template:"{{row.code }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"创建时间",template:"{{row.createTime }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"创建人",template:"{{}}",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"状态",template:"{{}}",width:10,thClass:"text-left",tdClass:"text-left"}

    ];
    //定义查询对象
    $scope.searchinfo={};


}])