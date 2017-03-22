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
    $routeProvider.when('/system/manager',{
        template:require("./html/manager.html"),
        controller:"managerCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("managerCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
  $scope.jump=function(path){
      $location.path(path);
  };

    $scope.tableColumns = [
        {title:"ID",template:"{{row.id}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"用户名称",template:"{{row.userName }}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"登录名",template:"{{row.loginName }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"用户类型",template:"<ng-convert code='user_type_ms'  value='{{row.type}}' ></ng-convert>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<a href='/ng#/system/managerinfo?id={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<span ng-click='instance.reset(row.id)'>重置密码</span>",width:10,thClass:"text-left",tdClass:"text-left"}

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