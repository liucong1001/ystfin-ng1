/**
 * Created by Administrator on 2017/3/8 0008.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/addCityModify',{
        template:require("./html/addCityModify.html"),
        controller:"addCityModifyCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            addCityinfo:["$http","$route",function ($http,$route) {
                return $http.get("/citys/city/" + $route.current.params.cityId)
            }]

        }
    })
}])
app.controller("addCityModifyCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","addCityinfo" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,addCityinfo) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.back=function(){
        history.back();
    };
    //档案管理信息
    $scope.addCityinfo=addCityinfo.data;
    //保存修改信息
    $scope.save_cityinfo=function(){
        console.log($scope.addCityinfo);
        $http.post('citys/city/save',$scope.addCityinfo).success(function(){
            alert("数据提交成功");
            $scope.back();
        })
    }
}]);