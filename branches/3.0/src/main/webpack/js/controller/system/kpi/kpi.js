/**
 * Created by Administrator on 2017/3/21 0021.
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
    $routeProvider.when('/system/kpi',{
        template:require("./html/kpi.html"),
        controller:"kpiCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("kpiCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //生成2000到3000之间的随机数
    //var num = Math.random()*1000 + 2000;
    //$scope.num= parseInt(num, 10);
    //
    //var num1 = Math.random()*1000 + 2000;
    //$scope.num1= parseInt(num1, 10);

    //点击产生随机数
    console.log($scope.kpiDate);
    $scope.Randomnum=function(){

        if($scope.kpiDate){
            //var num = Math.random()*1000 + 2000;
            //$scope.num= parseInt(num, 10);
            $scope.num= 2035;
            //var num1 = Math.random()*1000 + 2000;
            //$scope.num1= parseInt(num1, 10);
            //console.log("产生随机数");
        }

    };
    $scope.selectway='0';
    //某月以上个月26号至本月25号为一个月份
    $scope.selectDate=function(dt){
          $scope.year=$scope.kpiDate.getFullYear();
          $scope.lastmounth=$scope.kpiDate.getMonth();
          $scope.lastday=26;
          console.log(dt);
    }
}]);