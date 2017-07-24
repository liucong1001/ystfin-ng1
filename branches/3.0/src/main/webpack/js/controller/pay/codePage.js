/**
 * Created by 10973 on 2017/7/18.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/exchange/page',{
        template:require("./html/order/codePage.html"),
        controller:"OrderCodePageCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("OrderCodePageCtrl", ["$rootScope", "$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http" ,function ( $rootScope,$scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http) {;
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"车管所流水",template:"{{row.code }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"创建时间",template:"{{row.createTime }}",thClass:"text-center",tdClass:"text-center", width:20,sortable:true,sorting:true,sortProperty:'createTime'},
        {title:"费用金额(单位:元)",template:"{{row.fee}}",width:10,thClass:"text-left",tdClass:"text-center"},
        {title:"费用类型",template:"<ng-convert code='exchange_type'  value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"支付状态",template:"<ng-convert code='order_status'  value='{{row.payStatus}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},

    ];
    //定义查询对象
    $scope.searchinfo={};

}])