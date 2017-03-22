/**
 * Created by Administrator on 2017/3/15 0015.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/modifyinfo',{
        template:require("./html/modifyinfo.html"),
        controller:"modifyinfoCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            modifyinfo:["$http","$route",function ($http,$route) {
                return $http.get("/menu/toupd/" + $route.current.params.id)
            }]

        }
    })
}])
app.controller("modifyinfoCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","$route","modifyinfo",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,$route,modifyinfo) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //档案管理信息
    $scope.modifyinfo=modifyinfo.data;
    $scope.id=$route.current.params.id;
    $scope.modifyinfo.id=$scope.id;

    //保存修改信息
    $scope.save_info=function(){
        console.log($scope.modifyinfo);
        $http.post('menu/saveByForm',$scope.modifyinfo).success(function(data){
            alert("数据提交成功");
            $scope.jump('/system/modify');
        })
    }
}]);