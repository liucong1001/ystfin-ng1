/**
 * Created by Administrator on 2017/3/7 0007.
 */
/**
 * Created by Administrator on 2017/3/6 0006.
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
    $routeProvider.when('/system/transferCityinfo',{
        template:require("./html/transferCityinfo.html"),
        controller:"transferCityinfoCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            transferCityinfo:["$http","$route",function ($http,$route) {
                return $http.get("/citys/toupd/" + $route.current.params.id)
            }]

        }
    })
}])
app.controller("transferCityinfoCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","transferCityinfo",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,transferCityinfo) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //档案管理信息
    $scope.transferCityinfo=transferCityinfo.data;
    //保存修改信息
    $scope.save_info=function(){
        //alert("修改成功");
        //console.log($scope.transferCityinfo);
        $http.post('citys/save',$scope.transferCityinfo).success(function(data){
            alert("数据提交成功");
            $scope.jump('/system/transferCity');
        })
    }
}]);