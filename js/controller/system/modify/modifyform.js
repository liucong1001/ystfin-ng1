/**
 * Created by Administrator on 2017/3/15 0015.
 */
/**
 * Created by Administrator on 2017/3/7 0007.
 */
/**
 * Created by Administrator on 2017/3/3 0003.
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
    $routeProvider.when('/system/modifyform',{
        template:require("./html/modifyform.html"),
        controller:"modifyform",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("modifyform", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http) {


    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //返回
    $scope.back=function(){
        history.back();
    };
    //定义表单ng-model中的对象
    $scope.menuform={ };

    //提交表单
    $scope.save=function(){
        $scope.menuform.checkRoles=[];
        if ($scope.roles.t1==true) $scope.menuform.checkRoles.push("T01");
        if ($scope.roles.t2==true) $scope.menuform.checkRoles.push("T02");
        if ($scope.roles.t3==true) $scope.menuform.checkRoles.push("T01");
        if ($scope.roles.t4==true) $scope.menuform.checkRoles.push("T03");
        if ($scope.roles.t5==true) $scope.menuform.checkRoles.push("T09");
        if ($scope.roles.t6==true) $scope.menuform.checkRoles.push("T10");
        if ($scope.roles.t7==true) $scope.menuform.checkRoles.push("T12");
        if ($scope.roles.t8==true) $scope.menuform.checkRoles.push("T99");
        console.log($scope.menuform.checkRoles);

        if($scope.menu.$valid){
            console.log($scope.menuform);
            $http.post('menu/save',$scope.menuform).success(function(data){
                alert("数据提交成功");
                $scope.back();
            })
        }else{
            alert("表单提交失败");
        }
    }
}])