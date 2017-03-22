/**
 * Created by Administrator on 2017/3/7 0007.
 */
/**
 * Created by Administrator on 2017/3/3 0003.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/transferCity',{
        template:require("./html/transferCity.html"),
        controller:"transferCityCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("transferCityCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    }
    $scope.filter = {"account.id":$routeParams.id};
    $scope.balance = $routeParams.balance;
    $scope.tableColumns = [
        {title:"省份/直辖市",template:"<ng-convert code='province'  value='{{row.province}}' ></ng-convert>",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"提档车管所",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"",template:"<a href='/ng#/system/transcityService?id={{row.id}}'>所属城市维护</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<a href='/ng#/system/transferCityinfo?id={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"}

    ]
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