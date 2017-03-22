/**
 * Created by Administrator on 2017/3/9 0009.
 */
/**
 * Created by Administrator on 2017/3/7 0007.
 */

/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/codeInfo',{
        template:require("./html/codeInfo.html"),
        controller:"codeInfoCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            codeInfo:["$http","$route",function ($http,$route) {
                return $http.get("/cod/toupd/" + $route.current.params.code)
            }]
        }
    })
}])
app.controller("codeInfoCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","codeInfo",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,codeInfo) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    }
    //档案管理信息
    $scope.codeInfo=codeInfo.data;
   //返回
    $scope.back=function(){
        history.back();
    };
    //保存修改信息
    $scope.save_info=function(){
        console.log($scope.codeInfo);
        $http.post('cod/upd',$scope.codeInfo).success(function(data){
            alert("数据提交成功");
            $scope.back();
        })
    }
}]);