/**
 * Created by 10973 on 2017/7/31.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/chargeItem/addlist',{
        template:require("./html/order/addFeeType.html"),
        controller:"addFeeTypeCtr",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],

        }
    })
}])
app.controller("addFeeTypeCtr", ["$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http","$route", function ($scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http,$route) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //回退上一页
    $scope.back=function(){
        history.back();
    };
    //提交表单
    $scope.save=function(){
        if($scope.feeList.$valid){
            console.log($scope.feeListInfo);
            $http.post('chargeItem/save',$scope.feeListInfo).success(function(){
                alert("数据提交成功");
                history.back(); //返回上一页
            }).error(function(result){
                console.log(result);
                $scope.errorMessage = result.message;
            })
        }else{
            alert("表单提交失败");
        }
    }
}])