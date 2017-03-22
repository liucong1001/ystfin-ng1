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
    $routeProvider.when('/system/transferCityform',{
        template:require("./html/transferCityform.html"),
        controller:"transferCityform",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("transferCityform", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http) {


    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //返回
    $scope.back=function(){
        history.back();
    };
    //定义表单ng-model中的对象
    $scope.transfer={ };
    //提交表单
    $scope.save=function(){
        if($scope.transferCity.$valid){
            console.log($scope.transfer);
            $http.post('citys/save',$scope.transfer).success(function(data){
                alert("数据提交成功");
                $scope.back();
            })
        }else{
            alert("表单提交失败");
        }
    }
}])