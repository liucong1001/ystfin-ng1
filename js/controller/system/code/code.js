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
    $routeProvider.when('/system/code',{
        template:require("./html/code.html"),
        controller:"codeCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("codeCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {"account.id":$routeParams.id};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"代码集CODE",template:"{{row.code }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"代码集描述",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"",template:"<a href='/ng#/system/codeService?codemap={{row.code}}'>维护代码项</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<a href='/ng#/system/codeInfo?code={{row.code}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"}

    ];
    //定义查询对象
    $scope.searchinfo={};

    //重置密码
    $scope.ngTable = {reset:function (id) {
        if(confirm("是否确定此操作？")){
            $http.post('/admin/reset?id='+id).success(function () {
                //$scope.ngTable.reload();
                alert("重置成功");
            })
        }
    }}
}])