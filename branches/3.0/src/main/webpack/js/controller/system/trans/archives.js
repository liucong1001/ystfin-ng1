/**
 * Created by 10973 on 2017/6/3.
 */
/**
 * Created by Administrator on 2017/3/8 0008.
 *
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/evaluation/list',{
        template:require("./html/archives.html"),
        controller:"archivesCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("archivesCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {"account.id":$routeParams.id};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"流水号",template:"{{row.code }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"车牌号",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"厂牌型号",template:"{{row.name}}",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"车辆类型",template:"{{row.name}}",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"卖家状态",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"买家状态",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"开票状态",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"发票号",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:10},
        //{title:"",template:"  ",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"",template:" <a href=''>评估</a>&nbsp; <a href=''>修改评估价格</a> ",thClass:"text-center",tdClass:"text-center", width:10}
    ];
    //定义查询对象
    $scope.searchinfo={};


}])