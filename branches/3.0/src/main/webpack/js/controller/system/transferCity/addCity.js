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
    $routeProvider.when('/system/addCity',{
        template:require("./html/addCity.html"),
        controller:"addCity",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("addCity", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http","$routeParams", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http,$routeParams) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //定义表单ng-model中的对象
    $scope.addcity={
        "cityId":$routeParams.id
      };
    //提交表单
    $scope.save=function(){
        if($scope.addCity.$valid){
            //alert("提交表单成功");
            console.log($scope.addcity);
            $http.post('citys/city/save',$scope.addcity).success(function(data){
                alert("数据提交成功");
                $location.path('system/transcityService'); //返回上一页
            })
        }else{
            alert("表单提交失败");
        }
    }
}]);