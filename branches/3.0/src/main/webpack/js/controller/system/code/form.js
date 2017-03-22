/**
 * Created by Administrator on 2017/3/9 0009.
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
    $routeProvider.when('/system/form',{
        template:require("./html/form.html"),
        controller:"form",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("form", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //定义表单ng-model中的对象
    $scope.form={ };
    //返回
    $scope.back=function(){
        history.back();
    };
    //提交表单
    $scope.save=function(){
        if($scope.codeform.$valid){
            console.log($scope.form);
            $http.post('cod/save',$scope.form).success(function(data){
                alert("数据提交成功");
                history.back();
            }).error(function(result){
                console.log(result);
                $scope.errorMessage = result.message;
            })
        }else{
            alert("表单提交失败");
        }
    }
}]);