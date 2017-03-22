/**
 * Created by Administrator on 2017/3/7 0007.
 */
/**

/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/transcityService',{
        template:require("./html/transcityService.html"),
        controller:"transcityServiceCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("transcityServiceCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.back=function(){
        history.back();
    };

    //传递id值
    $scope.idd=$routeParams.id;
  //分页
    $scope.tableColumns = [
        {title:"所属城市名2",template:"{{row.name}}",thClass:"text-left",tdClass:"text-left", width:10},
        {title:"",template:"<a href='/ng#/system/addCityModify?cityId={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"},

    ];
    //保存修改信息
    $scope.save_info=function(){
        //console.log($scope.transferCityinfo);
        $http.post('citys/save',$scope.transferCityinfo).success(function(data){
            alert("数据提交成功");
        })
    }
}])